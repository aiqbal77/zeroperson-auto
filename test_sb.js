require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const sbUrl = process.env.SUPABASE_URL;
const sbKey = process.env.SUPABASE_KEY;

console.log("URL:", sbUrl);
console.log("Key:", sbKey ? "Present" : "Missing");

const supabase = createClient(sbUrl, sbKey);

async function run() {
    try {
        console.log("Querying crm table...");
        const { data, error } = await supabase.from('crm').select('*');
        if (error) {
            console.error("Query failed:", error.message);
        } else {
            console.log("Success! Rows in CRM:", data.length);
        }
    } catch (e) {
        console.error("Exception:", e);
    }
}

run();
