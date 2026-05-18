const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client using Vercel Environment Variables
const supabaseUrl = process.env.SUPABASE_URL || "https://aygohzqrlssxbuswesvn.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "sb_publishable_dVU_OP_PiZmRfwWUX4laIw_jdbhb4JO";
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    // Enable CORS for Vapi webhook ingestion
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const payload = req.body;
        console.log(`📡 Vapi Webhook Received: Event type [${payload?.message?.type || 'Unknown'}]`);

        // Handle Vapi's End-of-Call Webhook report
        if (payload?.message?.type === 'end-of-call-report') {
            const call = payload.message.call;
            const summary = call.summary || "No summary provided by Vapi.";
            const phone = call.customer?.number || "Unknown Phone";
            
            // Parse structured parameters extracted by Vapi's LLM analysis
            const structuredData = call.analysis?.structuredData || {};
            const customerName = structuredData.customer_name || "Unknown Caller";
            const vrm = structuredData.vrm ? ` (${structuredData.vrm.toUpperCase()})` : "";
            const symptom = structuredData.symptom || "";
            const intent = structuredData.intent || "booking"; // default CRM column tag

            const tenant = req.query.tenant || "dental"; // default to Apex MOT
            const leadId = `crm-vapi-${call.id || Date.now()}`;
            const crmName = `${customerName}${vrm}`;

            // Check if this is a high-value "Teaser" opportunity based on customer symptoms
            const lowerSymptom = symptom.toLowerCase();
            const isHighValueTeaser = lowerSymptom.includes("brake") || 
                                      lowerSymptom.includes("exhaust") || 
                                      lowerSymptom.includes("suspension") ||
                                      lowerSymptom.includes("clutch") ||
                                      lowerSymptom.includes("emissions");

            if (isHighValueTeaser) {
                const teaserId = `t-vapi-${call.id || Date.now()}`;
                const teaserTitle = `🚗 AI Spotted: ${symptom.charAt(0).toUpperCase() + symptom.slice(1)} Issue`;
                const benefitDesc = `${customerName} spent time talking. Vapi captured license mark '${structuredData.vrm || 'Unknown'}' and flagged the '${symptom}' symptom. Unlock to log lead.`;
                
                const teaserData = {
                    id: teaserId,
                    tenant,
                    label: "Hot Opportunity",
                    label_class: "hot",
                    title: teaserTitle,
                    preview: `Caller ${customerName} mentioned a ${symptom} issue during the call. Estimated repair value pending assessment.`,
                    benefit_desc: benefitDesc,
                    crm_tag: "upgrade",
                    crm_contact: JSON.stringify({
                        name: crmName,
                        phone,
                        summary: `${symptom.toUpperCase()} repair callback requested. ${summary}`,
                        tag: "upgrade",
                        status: "hot"
                    })
                };

                const { error } = await supabase.from('teasers').insert([teaserData]);
                if (error) throw error;
                console.log(`✨ Unlocked Teaser Opportunity logged for ${crmName}!`);

            } else {
                // Standard Lead -> Insert directly into active CRM
                const crmData = {
                    id: leadId,
                    tenant,
                    name: crmName,
                    phone,
                    summary: summary,
                    tag: intent,
                    status: "hot"
                };

                const { error } = await supabase.from('crm').insert([crmData]);
                if (error) throw error;
                console.log(`💼 Standard CRM Lead logged for ${crmName}!`);
            }
        }

        return res.status(200).json({ received: true });
    } catch (err) {
        console.error("❌ Error parsing Vapi Webhook on Vercel:", err);
        return res.status(500).json({ error: err.message });
    }
};
