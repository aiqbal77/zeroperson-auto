// --- ZeroPerson Auto Cloud Database Integration Active (Cloud Seeding Completed) ---
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// --- State and Database Mode ---
let dbMode = "sqlite"; // "supabase" or "sqlite"
let supabase = null;
let sqliteDb = null;

// Validate Supabase credentials
const sbUrl = process.env.SUPABASE_URL;
const sbKey = process.env.SUPABASE_KEY;
const isSupabaseConfigured = sbUrl && sbKey && 
                             sbUrl !== 'your-supabase-project-url' && 
                             sbKey !== 'your-supabase-anon-key';

if (isSupabaseConfigured) {
    try {
        supabase = createClient(sbUrl, sbKey);
        dbMode = "supabase";
        console.log("☁️ Connected to Supabase Cloud Database!");
    } catch (e) {
        console.error("⚠️ Failed to initialize Supabase client, falling back to SQLite:", e);
        dbMode = "sqlite";
    }
} else {
    dbMode = "sqlite";
    console.log("💾 Running in Local SQLite Relational Mode (Supabase not configured in .env)");
}

// --- SQLite Database Initializer ---
const sqliteDbPath = path.join(__dirname, 'database.sqlite');
sqliteDb = new sqlite3.Database(sqliteDbPath, (err) => {
    if (err) {
        console.error("Failed to connect to SQLite file:", err);
    } else {
        console.log("💾 SQLite Relational database file opened successfully.");
        initializeTables();
    }
});

// Seed data to verify
const seedCrm = [
    { id: "crm-1", tenant: "dental", name: "Sarah Jenkins (LF19 XWZ)", phone: "+44 7700 900076", summary: "Booked MOT. Squeaking front brakes to check.", tag: "booking", status: "hot" },
    { id: "crm-2", tenant: "dental", name: "James Vance (BD67 UVM)", phone: "+44 7700 900124", summary: "MOT failed on emissions. Needs catalytic converter quote.", tag: "billing", status: "followup" },
    { id: "crm-3", tenant: "dental", name: "Claire Redfield (HN15 KLS)", phone: "+44 7700 900621", summary: "Completed MOT and minor service. Highly satisfied.", tag: "booking", status: "closed" },
    { id: "crm-4", tenant: "dental", name: "Leon Kennedy (KP64 TYU)", phone: "+44 7700 900543", summary: "Booked MOT + headlight bulb swap.", tag: "booking", status: "followup" },
    { id: "crm-5", tenant: "dental", name: "Jill Valentine (AP13 ERD)", phone: "+44 7700 900421", summary: "Bumper scuff damage estimate pending.", tag: "booking", status: "hot" },
    { id: "crm-6", tenant: "dental", name: "Arthur Morgan (WD11 HOR)", phone: "+44 7700 900892", summary: "Range Rover suspension diagnostic callback scheduled.", tag: "upgrade", status: "followup" },
    { id: "crm-7", tenant: "dental", name: "Peter Parker (SP18 WEB)", phone: "+44 7700 900993", summary: "Completed rear brake discs & pads replacement.", tag: "booking", status: "closed" },
    { id: "crm-8", tenant: "dental", name: "Bruce Wayne (BT66 BAT)", phone: "+44 7700 900100", summary: "Gold service completed on Vantage. Customer praised expertise.", tag: "upgrade", status: "closed" },
    { id: "crm-9", tenant: "dental", name: "Clark Kent (SM13 KNT)", phone: "+44 7700 900222", summary: "Transit MOT + fuel filter change scheduled.", tag: "booking", status: "followup" },
    { id: "crm-10", tenant: "dental", name: "Tony Stark (IM08 ARC)", phone: "+44 7700 900333", summary: "Laser alignment and tracking booked.", tag: "upgrade", status: "hot" },
    { id: "crm-11", tenant: "dental", name: "Diana Prince (WW14 GRD)", phone: "+44 7700 900444", summary: "Battery swap + MOT test booked.", tag: "booking", status: "followup" },
    { id: "crm-12", tenant: "dental", name: "Lara Croft (TR13 ADV)", phone: "+44 7700 900555", summary: "Heavy-duty clutch replacement ordered.", tag: "upgrade", status: "hot" },
    { id: "crm-13", tenant: "dental", name: "John Marston (RD10 BUL)", phone: "+44 7700 900666", summary: "Tyres and tracking job complete.", tag: "booking", status: "closed" },
    { id: "crm-14", tenant: "dental", name: "Nathan Drake (UC16 TRE)", phone: "+44 7700 900777", summary: "MOT + transfer box oil change booked.", tag: "booking", status: "followup" },
    { id: "crm-15", tenant: "dental", name: "Sherlock Holmes (SH22 DET)", phone: "+44 7700 900888", summary: "DPF chem clean complete. Restored from limp mode.", tag: "upgrade", status: "closed" },
    { id: "crm-16", tenant: "dental", name: "John Watson (WJ12 DRG)", phone: "+44 7700 900999", summary: "Standard MOT test completed.", tag: "booking", status: "closed" },
    { id: "crm-17", tenant: "dental", name: "Harry Potter (HP07 WIZ)", phone: "+44 7700 900111", summary: "Anglia safety check and carb tune booked.", tag: "upgrade", status: "hot" },
    { id: "crm-18", tenant: "dental", name: "Geralt Rivia (WH19 HNT)", phone: "+44 7700 900223", summary: "Haldex AWD coupling service booked.", tag: "booking", status: "followup" },
    { id: "crm-19", tenant: "dental", name: "Lando Calrissian (MF77 SGL)", phone: "+44 7700 900334", summary: "Mustang blow manifold gasket booked.", tag: "booking", status: "followup" },
    { id: "crm-20", tenant: "dental", name: "Luke Skywalker (XW11 RED)", phone: "+44 7700 900446", summary: "Completed air con regas + MOT test.", tag: "booking", status: "closed" },
    { id: "crm-s1", tenant: "solar", name: "Alan Grant (RE20 OOP)", phone: "+44 7700 900445", summary: "Tesla Model 3 tire replacement quote and calibration.", tag: "upgrade", status: "followup" },
    { id: "crm-e1", tenant: "ecommerce", name: "David Beck (DB08 FLY)", phone: "+44 7700 900771", summary: "Inquired about track-day exhaust noise testing. Coded as minor follow-up.", tag: "billing", status: "followup" }
];

const seedTeasers = [
    {
        id: "t-dent-1",
        tenant: "dental",
        label: "Hot Opportunity",
        label_class: "hot",
        title: "🚗 Brake Pad Upgrade Opportunity",
        preview: "Caller Sarah Jenkins booking MOT mentioned a screeching sound when braking. Estimated brake pad change value £180.",
        benefit_desc: "Sarah spent 4m 12s booking her MOT. ZeroPerson captured her license plate 'LF19 XWZ' and flagged the squeaking brake symptom. Unlock to log brake repair lead.",
        crm_tag: "upgrade",
        crm_contact: JSON.stringify({
            name: "Sarah Jenkins (LF19 XWZ)",
            phone: "+44 7700 900076",
            summary: "Booked MOT. Mentioned squeaking brakes when stopping. Needs inspection of front pads.",
            tag: "booking",
            status: "hot"
        })
    },
    {
        id: "t-dent-2",
        tenant: "dental",
        label: "Frustrated Customer",
        label_class: "frustrated",
        title: "⚠️ Exhaust Emissions Failure Repair",
        preview: "Caller James Vance was notified his BMW failed MOT on emissions. Inquired about catalytic converter repair (£420).",
        benefit_desc: "James was stressed about MOT failure. ZeroPerson logged his vehicle ID 'BD67 UVM' and verified catalytic converter request. Unlock to expedite quote.",
        crm_tag: "billing",
        crm_contact: JSON.stringify({
            name: "James Vance (BD67 UVM)",
            phone: "+44 7700 900124",
            summary: "MOT failed on exhaust emissions. Requested callback with quote for catalytic converter replacement.",
            tag: "billing",
            status: "followup"
        })
    },
    {
        id: "t-sol-1",
        tenant: "solar",
        label: "Hot Opportunity",
        label_class: "hot",
        title: "🚚 £1,200 Commercial Fleet Service",
        preview: "Caller Mark Higgins (Logistics Manager) wants to book MOT tests and major service items for 4 delivery vans.",
        benefit_desc: "Mark spent 5m discussing recurring service contracts. ZeroPerson logged his business details and company registration. Unlock to lock contract.",
        crm_tag: "upgrade",
        crm_contact: JSON.stringify({
            name: "Mark Higgins (Fleet Logistics)",
            phone: "+44 7700 900332",
            summary: "Fleet Manager. Wants 4 commercial van MOTs + full servicing slots. High priority lead.",
            tag: "upgrade",
            status: "hot"
        })
    },
    {
        id: "t-eco-1",
        tenant: "ecommerce",
        label: "Hot Opportunity",
        label_class: "hot",
        title: "🏎️ Custom Exhaust & Remap Upsell",
        preview: "Caller Emily Stone booked MOT, inquired about custom dyno remap and stainless exhaust upgrade (£850 procedure) for Golf GTI.",
        benefit_desc: "Emily Stone discussed Golf GTI performance tuning. ZeroPerson captured her Golf GTI year and tuning requests. Unlock to close dyno slot.",
        crm_tag: "upgrade",
        crm_contact: JSON.stringify({
            name: "Emily Stone (GT18 RUN)",
            phone: "+44 7700 900998",
            summary: "Wants dyno stage 1 remap + custom exhaust fabrication alongside MOT. High budget lead.",
            tag: "upgrade",
            status: "hot"
        })
    }
];

const seedTenants = [
    { id: "dental", name: "Apex MOT & Auto Care", vapi_agent_id: "vapi-agent-apex", contact_email: "apex@mot.co.uk", status: "active" },
    { id: "solar", name: "Greenlight Motors & Garage", vapi_agent_id: "vapi-agent-greenlight", contact_email: "info@greenlight.co.uk", status: "active" },
    { id: "ecommerce", name: "Nova Performance & MOT", vapi_agent_id: "vapi-agent-nova", contact_email: "team@novaperformance.co.uk", status: "active" }
];

function initializeTables() {
    sqliteDb.serialize(() => {
        // 1. CRM Table
        sqliteDb.run(`CREATE TABLE IF NOT EXISTS crm (
            id TEXT PRIMARY KEY,
            tenant TEXT,
            name TEXT,
            phone TEXT,
            summary TEXT,
            tag TEXT,
            status TEXT
        )`);

        // 2. Teasers Table
        sqliteDb.run(`CREATE TABLE IF NOT EXISTS teasers (
            id TEXT PRIMARY KEY,
            tenant TEXT,
            label TEXT,
            label_class TEXT,
            title TEXT,
            preview TEXT,
            benefit_desc TEXT,
            crm_tag TEXT,
            crm_contact TEXT
        )`);

        // 3. Tenants Table
        sqliteDb.run(`CREATE TABLE IF NOT EXISTS tenants (
            id TEXT PRIMARY KEY,
            name TEXT,
            vapi_agent_id TEXT,
            contact_email TEXT,
            status TEXT
        )`);

        // Seed if empty
        sqliteDb.get("SELECT count(*) as count FROM crm", [], (err, row) => {
            if (row && row.count === 0) {
                console.log("💾 Seeding local SQLite database...");
                const crmStmt = sqliteDb.prepare("INSERT INTO crm (id, tenant, name, phone, summary, tag, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
                seedCrm.forEach(c => crmStmt.run(c.id, c.tenant, c.name, c.phone, c.summary, c.tag, c.status));
                crmStmt.finalize();

                const tStmt = sqliteDb.prepare("INSERT INTO teasers (id, tenant, label, label_class, title, preview, benefit_desc, crm_tag, crm_contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                seedTeasers.forEach(t => tStmt.run(t.id, t.tenant, t.label, t.label_class, t.title, t.preview, t.benefit_desc, t.crm_tag, t.crm_contact));
                tStmt.finalize();

                const tenStmt = sqliteDb.prepare("INSERT INTO tenants (id, name, vapi_agent_id, contact_email, status) VALUES (?, ?, ?, ?, ?)");
                seedTenants.forEach(ten => tenStmt.run(ten.id, ten.name, ten.vapi_agent_id, ten.contact_email, ten.status));
                tenStmt.finalize();
                
                console.log("💾 Local database successfully seeded.");
            }
        });
    });
}

// --- Cloud Seed Script (Pushes to Supabase tables if they are empty) ---
async function checkAndSeedSupabase() {
    if (dbMode !== "supabase") return;
    try {
        const { data: crmData, error: crmErr } = await supabase.from('crm').select('id');
        if (crmErr) {
            console.error("❌ Supabase connection error (verify tables exist):", crmErr.message);
            return;
        }

        if (crmData && crmData.length === 0) {
            console.log("☁️ Seeding Supabase Cloud CRM and Teaser tables...");
            const { error: insErr } = await supabase.from('crm').insert(seedCrm);
            if (insErr) console.error("Error inserting seed CRM to Supabase:", insErr);

            const { error: tErr } = await supabase.from('teasers').insert(seedTeasers);
            if (tErr) console.error("Error inserting seed Teasers to Supabase:", tErr);
        }

        // Check tenants in Supabase
        const { data: tenantsData, error: tenantsErr } = await supabase.from('tenants').select('id');
        if (!tenantsErr && tenantsData && tenantsData.length === 0) {
            console.log("☁️ Seeding Supabase Cloud tenants table...");
            const { error: tenErr } = await supabase.from('tenants').insert(seedTenants);
            if (tenErr) console.error("Error inserting seed Tenants to Supabase:", tenErr);
        }

    } catch (e) {
        console.error("Supabase seeding exception:", e);
    }
}

// Trigger async Supabase checks
setTimeout(checkAndSeedSupabase, 2000);

// --- API ENDPOINTS ---

// Check database mode status
app.get('/api/db-status', (req, res) => {
    res.json({ mode: dbMode });
});

// 1. Get database records for active tenant
app.get('/api/data/:tenant', async (req, res) => {
    const tenant = req.params.tenant;

    if (dbMode === "supabase") {
        try {
            const { data: crm, error: c1 } = await supabase.from('crm').select('*').eq('tenant', tenant);
            const { data: rawTeasers, error: c2 } = await supabase.from('teasers').select('*').eq('tenant', tenant);
            
            if (c1 || c2) throw new Error(c1?.message || c2?.message);

            // Re-format json string contact objects from Supabase
            const teasers = rawTeasers.map(t => ({
                ...t,
                labelClass: t.label_class,
                benefitDesc: t.benefit_desc,
                crmTag: t.crm_tag,
                crmContact: typeof t.crm_contact === 'string' ? JSON.parse(t.crm_contact) : t.crm_contact
            }));

            res.json({ crm, teasers });
        } catch (e) {
            console.error("Supabase fetch failed, fallback to local:", e);
            fetchSqliteData(tenant, res);
        }
    } else {
        fetchSqliteData(tenant, res);
    }
});

function fetchSqliteData(tenant, res) {
    sqliteDb.all("SELECT * FROM crm WHERE tenant = ?", [tenant], (err, crm) => {
        if (err) return res.status(500).json({ error: err.message });
        
        sqliteDb.all("SELECT * FROM teasers WHERE tenant = ?", [tenant], (err, rawTeasers) => {
            if (err) return res.status(500).json({ error: err.message });
            
            const teasers = rawTeasers.map(t => ({
                ...t,
                labelClass: t.label_class,
                benefitDesc: t.benefit_desc,
                crmTag: t.crm_tag,
                crmContact: JSON.parse(t.crm_contact)
            }));

            res.json({ crm, teasers });
        });
    });
}

// 2. Add dynamic CRM lead manually
app.post('/api/crm/:tenant', async (req, res) => {
    const tenant = req.params.tenant;
    const { name, phone, summary, tag, status } = req.body;
    const newId = `crm-api-${Date.now()}`;

    if (dbMode === "supabase") {
        try {
            const { data, error } = await supabase.from('crm').insert([{
                id: newId,
                tenant,
                name: name || "Anonymous Lead",
                phone: phone || "No Phone",
                summary: summary || "Manual",
                tag: tag || "booking",
                status: status || "hot"
            }]).select();

            if (error) throw error;
            return res.status(201).json(data[0]);
        } catch (e) {
            console.error("Supabase insert failed, fallback to local:", e);
        }
    }

    // SQLite fallback
    const query = "INSERT INTO crm (id, tenant, name, phone, summary, tag, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    sqliteDb.run(query, [newId, tenant, name, phone, summary, tag, status], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: newId, tenant, name, phone, summary, tag, status });
    });
});

// 3. Move Lead Column status
app.patch('/api/crm/:tenant/:id', async (req, res) => {
    const { tenant, id } = req.params;
    const { status } = req.body;

    if (dbMode === "supabase") {
        try {
            const { data, error } = await supabase.from('crm').update({ status }).eq('id', id).select();
            if (error) throw error;
            return res.json(data[0]);
        } catch (e) {
            console.error("Supabase patch failed, fallback to local:", e);
        }
    }

    // SQLite fallback
    sqliteDb.run("UPDATE crm SET status = ? WHERE id = ?", [status, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, status });
    });
});

// 4. Delete Lead
app.delete('/api/crm/:tenant/:id', async (req, res) => {
    const { tenant, id } = req.params;

    if (dbMode === "supabase") {
        try {
            const { error } = await supabase.from('crm').delete().eq('id', id);
            if (error) throw error;
            return res.json({ success: true });
        } catch (e) {
            console.error("Supabase delete failed, fallback to local:", e);
        }
    }

    // SQLite fallback
    sqliteDb.run("DELETE FROM crm WHERE id = ?", [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// 5. Unlock Teaser Insight
app.post('/api/teasers/unlock/:tenant', async (req, res) => {
    const tenant = req.params.tenant;
    const { id } = req.body;

    if (dbMode === "supabase") {
        try {
            // Get Teaser
            const { data: teasers, error: fe } = await supabase.from('teasers').select('*').eq('id', id);
            if (fe || teasers.length === 0) throw new Error("Teaser not found");

            const teaser = teasers[0];
            const contact = typeof teaser.crm_contact === 'string' ? JSON.parse(teaser.crm_contact) : teaser.crm_contact;
            const newId = `crm-unlocked-api-${Date.now()}`;

            // Add to CRM
            const { error: insErr } = await supabase.from('crm').insert([{
                id: newId,
                tenant,
                name: contact.name,
                phone: contact.phone,
                summary: contact.summary,
                tag: contact.tag,
                status: contact.status
            }]);
            if (insErr) throw insErr;

            // Delete Teaser
            const { error: delErr } = await supabase.from('teasers').delete().eq('id', id);
            if (delErr) throw delErr;

            return res.json({ success: true });
        } catch (e) {
            console.error("Supabase unlock failed, fallback to local:", e);
        }
    }

    // SQLite fallback
    sqliteDb.get("SELECT * FROM teasers WHERE id = ?", [id], (err, teaser) => {
        if (err || !teaser) return res.status(404).json({ error: "Teaser not found" });

        const contact = JSON.parse(teaser.crm_contact);
        const newId = `crm-unlocked-api-${Date.now()}`;

        sqliteDb.serialize(() => {
            sqliteDb.run("INSERT INTO crm (id, tenant, name, phone, summary, tag, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [newId, tenant, contact.name, contact.phone, contact.summary, contact.tag, contact.status]);
            
            sqliteDb.run("DELETE FROM teasers WHERE id = ?", [id]);
        });

        res.json({ success: true });
    });
});

// 6. Voice Platform Webhook Endpoint (Vapi.ai Integration)
app.post('/api/voice-webhook', async (req, res) => {
    try {
        const payload = req.body;
        console.log(`📡 Voice Webhook Received: Event type [${payload?.message?.type || 'Unknown'}]`);

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

                if (dbMode === "supabase") {
                    await supabase.from('teasers').insert([teaserData]);
                } else {
                    sqliteDb.run(`INSERT INTO teasers (id, tenant, label, label_class, title, preview, benefit_desc, crm_tag, crm_contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [teaserData.id, teaserData.tenant, teaserData.label, teaserData.label_class, teaserData.title, teaserData.preview, teaserData.benefit_desc, teaserData.crm_tag, teaserData.crm_contact]);
                }
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

                if (dbMode === "supabase") {
                    await supabase.from('crm').insert([crmData]);
                } else {
                    sqliteDb.run(`INSERT INTO crm (id, tenant, name, phone, summary, tag, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [crmData.id, crmData.tenant, crmData.name, crmData.phone, crmData.summary, crmData.tag, crmData.status]);
                }
                console.log(`💼 Standard CRM Lead logged for ${crmName}!`);
            }
        }

        res.status(200).json({ received: true });
    } catch (err) {
        console.error("❌ Error parsing Vapi Voice Webhook:", err);
        res.status(500).json({ error: err.message });
    }
});

// --- Tenant (Garage Accounts) Endpoints ---

// 1. Get all active tenants
app.get('/api/tenants', async (req, res) => {
    if (dbMode === "supabase") {
        try {
            const { data, error } = await supabase.from('tenants').select('*');
            if (error) throw error;
            return res.json(data);
        } catch (e) {
            console.error("Supabase tenants fetch failed, fallback to local:", e);
        }
    }
    sqliteDb.all("SELECT * FROM tenants", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 2. Provision new tenant
app.post('/api/tenants', async (req, res) => {
    const { id, name, vapi_agent_id, contact_email, status } = req.body;
    
    if (dbMode === "supabase") {
        try {
            const { data, error } = await supabase.from('tenants').insert([{
                id,
                name,
                vapi_agent_id,
                contact_email,
                status: status || 'active'
            }]).select();
            if (error) throw error;
            return res.status(201).json(data[0]);
        } catch (e) {
            console.error("Supabase tenant insert failed, fallback to local:", e);
        }
    }
    
    sqliteDb.run(`INSERT INTO tenants (id, name, vapi_agent_id, contact_email, status) VALUES (?, ?, ?, ?, ?)`,
        [id, name, vapi_agent_id, contact_email, status || 'active'], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, name, vapi_agent_id, contact_email, status: status || 'active' });
        });
});

// 3. Delete tenant
app.delete('/api/tenants/:id', async (req, res) => {
    const { id } = req.params;
    
    if (dbMode === "supabase") {
        try {
            const { error } = await supabase.from('tenants').delete().eq('id', id);
            if (error) throw error;
            return res.json({ success: true });
        } catch (e) {
            console.error("Supabase tenant delete failed, fallback to local:", e);
        }
    }
    
    sqliteDb.run(`DELETE FROM tenants WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Start listening
app.listen(PORT, () => {
    console.log(`
🚀 ==========================================================
🔥 ZeroPerson Auto Local SaaS Server Started!
🎙️ Access Dashboard: http://localhost:${PORT}
📡 Webhook Endpoint: http://localhost:${PORT}/api/voice-webhook
💾 Database Mode: ${dbMode.toUpperCase()}
========================================================== 🚀
    `);
});
