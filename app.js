/* ==========================================================================
   ZeroPerson Auto Interactive Engine (UK Edition)
   Houses 20+ Detailed UK Clients (MOTs, Servicing, Bodywork, Repairs)
   ========================================================================== */

// --- Comprehensive Multi-Tenant Garage Mock Database (20+ UK Clients) ---
const tenantData = {
    dental: {
        companyName: "Apex MOT & Auto Care",
        stats: {
            calls: "1,248",
            duration: "2m 45s",
            savings: "£3,420.50",
            sentiment: "84% Success"
        },
        assistants: [
            { name: "Apex Booking Assistant", type: "Inbound Bookings", calls: 890, handoffs: "12%", cost: "£0.32", status: "Active" },
            { name: "MOT Expiry Reminders", type: "Outbound Campaign", calls: 358, handoffs: "5%", cost: "£0.18", status: "Active" }
        ],
        chartData: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            calls: [142, 168, 155, 189, 210, 85, 45],
            cost: [45.4, 53.7, 49.6, 60.4, 67.2, 27.2, 14.4]
        },
        teasers: [
            {
                id: "t-dent-1",
                label: "Hot Opportunity",
                labelClass: "hot",
                title: "🚗 Brake Pad Upgrade Opportunity",
                preview: "Caller Sarah Jenkins booking MOT mentioned a screeching sound when braking. Estimated brake pad change value £180.",
                benefitDesc: "Sarah spent 4m 12s booking her MOT. ZeroPerson captured her license plate 'LF19 XWZ' and flagged the squeaking brake symptom. Unlock to log brake repair lead.",
                crmTag: "upgrade",
                crmContact: {
                    name: "Sarah Jenkins (LF19 XWZ)",
                    phone: "+44 7700 900076",
                    summary: "Booked MOT. Mentioned squeaking brakes when stopping. Needs inspection of front pads.",
                    tag: "booking",
                    status: "hot"
                }
            },
            {
                id: "t-dent-2",
                label: "Frustrated Customer",
                labelClass: "frustrated",
                title: "⚠️ Exhaust Emissions Failure Repair",
                preview: "Caller James Vance was notified his BMW failed MOT on emissions. Inquired about catalytic converter repair (£420).",
                benefitDesc: "James was stressed about MOT failure. ZeroPerson logged his vehicle ID 'BD67 UVM' and verified catalytic converter request. Unlock to expedite quote.",
                crmTag: "billing",
                crmContact: {
                    name: "James Vance (BD67 UVM)",
                    phone: "+44 7700 900124",
                    summary: "MOT failed on exhaust emissions. Requested callback with quote for catalytic converter replacement.",
                    tag: "billing",
                    status: "followup"
                }
            }
        ],
        calls: [
            {
                id: "c-1",
                caller: "Sarah Jenkins",
                phone: "LF19 XWZ (Ford Focus)",
                duration: "4m 12s",
                cost: "£0.84",
                time: "10 mins ago",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_sj_lf19xwz.mp3",
                summary: "Customer successfully booked MOT test for next Tuesday at 2 PM. During booking, customer mentioned a high-pitched squeaking noise from her front brakes. AI assistant offered a free brake inspection during the MOT, which customer accepted.",
                transcript: [
                    { speaker: "assistant", text: "Thank you for calling Apex MOT & Auto Care! This is Rachel, your digital reception assistant. How can I help you book today?" },
                    { speaker: "user", text: "Hi, I need to book my Ford Focus in for an MOT test. The certificate is expiring next week." },
                    { speaker: "assistant", text: "I can absolutely book that for you! Could you please confirm your vehicle registration mark?" },
                    { speaker: "user", text: "Yes, it's Lima Foxtrot One Nine, X-Ray Whiskey Zulu. LF19 XWZ." },
                    { speaker: "assistant", text: "Excellent, Focus 1.0 EcoBoost. Our standard booking fee is £45. We have an slot open next Tuesday at 2:00 PM. Would that work for you?" },
                    { speaker: "user", text: "Perfect. Also, when I am braking recently there is a high-pitched squeaking sound coming from the front wheels. Can you check that too?" },
                    { speaker: "assistant", text: "Yes, I will log a complimentary brake pads inspection alongside your MOT slot. If they need changing, we can do it on the same day. I have secured your booking for next Tuesday at 2 PM!" }
                ]
            },
            {
                id: "c-2",
                caller: "James Vance",
                phone: "BD67 UVM (BMW 3 Series)",
                duration: "2m 15s",
                cost: "£0.45",
                time: "1 hour ago",
                sentiment: "negative",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_jv_bd67uvm.mp3",
                summary: "Customer upset that vehicle failed MOT test on exhaust emissions limit. AI receptionist logged detailed repair callback request.",
                transcript: [
                    { speaker: "assistant", text: "Hello! Thank you for calling Apex MOT & Auto Care, this is Rachel." },
                    { speaker: "user", text: "Hi, I just got the automated MOT report and it says my BMW failed! It says carbon monoxide emissions exceeded the limit. How is that possible? I just got it serviced!" },
                    { speaker: "assistant", text: "I understand that can be frustrating, James. Let me pull up your MOT record. Yes, registration BD67 UVM failed on exhaust emissions. That is often caused by an oxygen sensor error or a worn catalytic converter." },
                    { speaker: "user", text: "Well, how much is it going to cost to repair? I need my car back for work tomorrow." },
                    { speaker: "assistant", text: "I am placing an immediate priority callback for you. I will have our workshop manager review the diagnostics and phone you within 30 minutes with a fixed repair quote and booking window. Does that help?" },
                    { speaker: "user", text: "Yes, please do. I'll wait for the call." }
                ]
            },
            {
                id: "c-3",
                caller: "Claire Redfield",
                phone: "HN15 KLS (Vauxhall Corsa)",
                duration: "3m 05s",
                cost: "£0.62",
                time: "2 hours ago",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_cr_hn15kls.mp3",
                summary: "Booked major service, oil change, and spark plugs. Coded for next Friday at 9:00 AM.",
                transcript: [
                    { speaker: "assistant", text: "Hello! Thanks for calling Apex MOT & Auto Care. How can I help you?" },
                    { speaker: "user", text: "Hi, I'd like to book my Vauxhall Corsa for a major annual service. The reg is HN15 KLS." },
                    { speaker: "assistant", text: "Perfect! I have found your Corsa. Our major service package is £189, including new engine oil, filters, and spark plugs. Shall we book that for next Friday morning at 9:00 AM?" },
                    { speaker: "user", text: "Yes, that works beautifully for me. Thank you!" }
                ]
            },
            {
                id: "c-4",
                caller: "Leon Kennedy",
                phone: "KP64 TYU (Audi A3)",
                duration: "2m 10s",
                cost: "£0.43",
                time: "3 hours ago",
                sentiment: "neutral",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_lk_kp64tyu.mp3",
                summary: "MOT booked successfully. Headlight bulb replacement added to job sheet.",
                transcript: [
                    { speaker: "assistant", text: "Welcome to Apex Auto Care, how can I assist you today?" },
                    { speaker: "user", text: "Hi, I need an MOT for my Audi A3, KP64 TYU. Also, my passenger side headlight bulb just went out, can you replace that too?" },
                    { speaker: "assistant", text: "Absolutely, we can swap that bulb during the MOT test for just £15. I've booked your MOT slot for Thursday at 11 AM." }
                ]
            },
            {
                id: "c-5",
                caller: "Jill Valentine",
                phone: "AP13 ERD (Mini Cooper)",
                duration: "4m 20s",
                cost: "£0.87",
                time: "4 hours ago",
                sentiment: "neutral",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_jv_ap13erd.mp3",
                summary: "Inquired about front bumper bodywork repair after a minor parking scrape. Scheduled bodywork estimate.",
                transcript: [
                    { speaker: "assistant", text: "Thank you for calling Apex Auto Care. How can we help you?" },
                    { speaker: "user", text: "Hello, I have a Mini Cooper, AP13 ERD. I had a minor scrape in a supermarket car park, and my front bumper is scuffed. Do you do bodywork?" },
                    { speaker: "assistant", text: "Yes, we do! We can provide a comprehensive insurance-approved bodywork estimate. Let's book a 10-minute assessment slot for tomorrow morning at 10:30 AM." }
                ]
            },
            {
                id: "c-6",
                caller: "Arthur Morgan",
                phone: "WD11 HOR (Range Rover)",
                duration: "3m 40s",
                cost: "£0.73",
                time: "5 hours ago",
                sentiment: "negative",
                disposition: "transferred",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_am_wd11hor.mp3",
                summary: "Complained of air suspension warning light. Transferred to head technician for detailed diagnostics consultation.",
                transcript: [
                    { speaker: "assistant", text: "Hello, thanks for calling Apex. This is Rachel." },
                    { speaker: "user", text: "Hi, my Range Rover Classic has an air suspension fault light on the dashboard, and the rear end is sitting very low. Can you fix this?" },
                    { speaker: "assistant", text: "Suspension issues can be complex. Let me transfer you directly to our lead diagnostic technician, Steve, who can guide you on the repair window. One moment." }
                ]
            },
            {
                id: "c-7",
                caller: "Peter Parker",
                phone: "SP18 WEB (Audi A4)",
                duration: "2m 55s",
                cost: "£0.58",
                time: "Yesterday",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_pp_sp18web.mp3",
                summary: "Booked rear brake discs and pads replacement. Quoted £220 fully fitted.",
                transcript: [
                    { speaker: "assistant", text: "Hi! Welcome to Apex Auto Care." },
                    { speaker: "user", text: "Hi, I need a quote for rear brake discs and pads replacement for my Audi A4, SP18 WEB." },
                    { speaker: "assistant", text: "Certainly! The package price for premium rear discs and pads on your A4 is £220, including parts, labor, and a 12-month warranty. I can book you in for this Friday at 1 PM." }
                ]
            },
            {
                id: "c-8",
                caller: "Bruce Wayne",
                phone: "BT66 BAT (Aston Martin)",
                duration: "5m 15s",
                cost: "£1.05",
                time: "Yesterday",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_bw_bt66bat.mp3",
                summary: "Booked bespoke Gold Service and engine oil analysis on Aston Martin V8 Vantage.",
                transcript: [
                    { speaker: "assistant", text: "Apex Auto Care, Rachel speaking. How may we serve you?" },
                    { speaker: "user", text: "Hello, I require a high-end Gold service and a preventative oil diagnostics report for an Aston Martin Vantage, registration BT66 BAT." },
                    { speaker: "assistant", text: "An absolute classic! Our premium gold service covers a 75-point check, high-grade performance fluids, and full diagnostics. I have booked your Aston in for next Wednesday with our senior technician." }
                ]
            },
            {
                id: "c-9",
                caller: "Clark Kent",
                phone: "SM13 KNT (Ford Transit)",
                duration: "2m 50s",
                cost: "£0.56",
                time: "2 days ago",
                sentiment: "neutral",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_ck_sm13knt.mp3",
                summary: "Booked annual MOT test and fuel filter change for commercial work van.",
                transcript: [
                    { speaker: "assistant", text: "Hello! Welcome to Apex. How can I help you book today?" },
                    { speaker: "user", text: "Hi, I've got my work Transit van, SM13 KNT, which needs its MOT. Let's do a fuel filter replacement too as it's been sputtering." },
                    { speaker: "assistant", text: "Perfect, I've booked your MOT test for next Thursday morning at 8:30 AM, with the fuel filter replacement added." }
                ]
            },
            {
                id: "c-10",
                caller: "Tony Stark",
                phone: "IM08 ARC (Audi R8)",
                duration: "4m 10s",
                cost: "£0.83",
                time: "2 days ago",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_ts_im08arc.mp3",
                summary: "Booked performance 4-wheel alignment and Hunter laser tracking.",
                transcript: [
                    { speaker: "assistant", text: "Nova Performance & Apex MOT, how can I help you today?" },
                    { speaker: "user", text: "Hello! I need a precise 4-wheel laser alignment and steering angle calibration on my Audi R8, IM08 ARC." },
                    { speaker: "assistant", text: "Excellent choice. We use the state-of-the-art Hunter Elite laser alignment system. I have booked your vehicle for next Tuesday at 3:00 PM." }
                ]
            },
            {
                id: "c-11",
                caller: "Diana Prince",
                phone: "WW14 GRD (Vauxhall Corsa)",
                duration: "2m 30s",
                cost: "£0.50",
                time: "3 days ago",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_dp_ww14grd.mp3",
                summary: "Booked MOT and standard battery replacement. Quoted £115 for heavy-duty battery.",
                transcript: [
                    { speaker: "assistant", text: "Hello, Apex Auto Care! How can I help you today?" },
                    { speaker: "user", text: "Hi, my Vauxhall Corsa needs its MOT. The reg is WW14 GRD. Also, the battery has been sluggish in the morning, could we replace it?" },
                    { speaker: "assistant", text: "Yes! A brand new heavy-duty battery with 3-year warranty is £115 fitted. I have booked your MOT and battery swap for Wednesday morning." }
                ]
            },
            {
                id: "c-12",
                caller: "Lara Croft",
                phone: "TR13 ADV (Land Rover Defender)",
                duration: "4m 50s",
                cost: "£0.97",
                time: "3 days ago",
                sentiment: "neutral",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_lc_tr13adv.mp3",
                summary: "Booked heavy-duty clutch replacement on Land Rover Defender. Quoted £550 fully fitted.",
                transcript: [
                    { speaker: "assistant", text: "Welcome to Apex, how can I help you?" },
                    { speaker: "user", text: "Hi, my Land Rover Defender, TR13 ADV, has a slipping clutch. How much is a heavy-duty clutch replacement?" },
                    { speaker: "assistant", text: "We do many off-road clutch upgrades! A full heavy-duty clutch kit fully fitted is £550. I can book your Land Rover in for a two-day workshop slot starting next Monday." }
                ]
            },
            {
                id: "c-13",
                caller: "John Marston",
                phone: "RD10 BUL (Ford Fiesta)",
                duration: "2m 15s",
                cost: "£0.45",
                time: "4 days ago",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_jm_rd10bul.mp3",
                summary: "Booked two front tyres (Michelin Pilot Sport) and front-toe wheel tracking.",
                transcript: [
                    { speaker: "assistant", text: "Hello! Welcome to Apex MOT & Auto Care." },
                    { speaker: "user", text: "Hi, I need two new front tyres for my Ford Fiesta, RD10 BUL. Michelin if possible, and check the tracking." },
                    { speaker: "assistant", text: "Yes, we have Michelin Pilot Sport 4 tyres in stock at £95 each. Front wheel tracking is £35. I have booked you in for tomorrow at 2:00 PM!" }
                ]
            },
            {
                id: "c-14",
                caller: "Nathan Drake",
                phone: "UC16 TRE (Jeep Grand Cherokee)",
                duration: "3m 55s",
                cost: "£0.78",
                time: "4 days ago",
                sentiment: "neutral",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_nd_uc16tre.mp3",
                summary: "Booked MOT and transfer box oil service on Jeep 4x4.",
                transcript: [
                    { speaker: "assistant", text: "Apex Auto Care, how can I help you book?" },
                    { speaker: "user", text: "Hi, my Jeep Cherokee needs its annual MOT, reg UC16 TRE. Can we also do a transfer box oil service while it is on the ramp?" },
                    { speaker: "assistant", text: "Perfect, our 4x4 transfer box fluid service is £85. I've booked your MOT and oil service for Friday at 3 PM." }
                ]
            },
            {
                id: "c-15",
                caller: "Sherlock Holmes",
                phone: "SH22 DET (Jaguar XF)",
                duration: "3m 30s",
                cost: "£0.70",
                time: "5 days ago",
                sentiment: "neutral",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_sh_sh22det.mp3",
                summary: "Booked diesel particulate filter (DPF) force regeneration and chemical clean.",
                transcript: [
                    { speaker: "assistant", text: "Hello! Thanks for calling Apex." },
                    { speaker: "user", text: "Hi, my Jaguar XF diesel, reg SH22 DET, has a DPF warning light and is in limp mode. Can you perform a DPF clean?" },
                    { speaker: "assistant", text: "Yes, we offer a professional DPF deep chemical clean and forced regeneration for £160, which resolves most blocks. I have booked your vehicle in for tomorrow at 9 AM." }
                ]
            },
            {
                id: "c-16",
                caller: "John Watson",
                phone: "WJ12 DRG (Honda Civic)",
                duration: "1m 50s",
                cost: "£0.37",
                time: "5 days ago",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_jw_wj12drg.mp3",
                summary: "Booked annual MOT test. Confirmed standard £45 booking fee.",
                transcript: [
                    { speaker: "assistant", text: "Thank you for calling Apex MOT! How can I help?" },
                    { speaker: "user", text: "Hi, just booking my Honda Civic, WJ12 DRG, for a standard MOT." },
                    { speaker: "assistant", text: "Easy! I have booked your slot for Saturday morning at 10 AM. We look forward to seeing you." }
                ]
            },
            {
                id: "c-17",
                caller: "Harry Potter",
                phone: "HP07 WIZ (Ford Anglia)",
                duration: "4m 02s",
                cost: "£0.81",
                time: "Last week",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_hp_hp07wiz.mp3",
                summary: "Booked classic carburetor tuning and annual safety inspection callback.",
                transcript: [
                    { speaker: "assistant", text: "Welcome to Apex Auto Care." },
                    { speaker: "user", text: "Hi, I have a classic 1962 Ford Anglia, HP07 WIZ, that is running rough and needs its carburetor tuned. Do you handle classics?" },
                    { speaker: "assistant", text: "We love classic cars! I've booked your Anglia for a specialized safety check and carburetor tuning next Monday morning with our tuning lead." }
                ]
            },
            {
                id: "c-18",
                caller: "Geralt Rivia",
                phone: "WH19 HNT (Volvo XC90)",
                duration: "2m 45s",
                cost: "£0.55",
                time: "Last week",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_gr_wh19hnt.mp3",
                summary: "Booked Haldex AWD coupling oil change and rear brake pads.",
                transcript: [
                    { speaker: "assistant", text: "Hello! Thanks for calling Apex." },
                    { speaker: "user", text: "Hi, I need to book my Volvo XC90, WH19 HNT, for a Haldex AWD coupling fluid change and rear brake pads." },
                    { speaker: "assistant", text: "Certainly! Haldex service is £120 and rear brake pads are £85. I've booked that slot for Friday afternoon at 2 PM." }
                ]
            },
            {
                id: "c-19",
                caller: "Lando Calrissian",
                phone: "MF77 SGL (Ford Mustang)",
                duration: "3m 15s",
                cost: "£0.65",
                time: "Last week",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_lc_mf77sgl.mp3",
                summary: "Booked custom exhaust manifold gasket replacement. Quoted £180.",
                transcript: [
                    { speaker: "assistant", text: "Apex Auto Care, how can I help you book?" },
                    { speaker: "user", text: "Hi, my Ford Mustang, reg MF77 SGL, has a blow from the exhaust manifold gasket. Can you fit a new one?" },
                    { speaker: "assistant", text: "Yes! A replacement gasket and fitting is £180. I've booked your Mustang for next Thursday." }
                ]
            },
            {
                id: "c-20",
                caller: "Luke Skywalker",
                phone: "XW11 RED (Toyota RAV4)",
                duration: "2m 50s",
                cost: "£0.57",
                time: "Last week",
                sentiment: "neutral",
                disposition: "completed",
                assistant: "Apex Booking Assistant",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_ls_xw11red.mp3",
                summary: "Booked MOT and minor air conditioning system re-gas. Quoted £60 for gas.",
                transcript: [
                    { speaker: "assistant", text: "Welcome to Apex MOT & Auto Care!" },
                    { speaker: "user", text: "Hi, I need an MOT for my Toyota RAV4, XW11 RED, and the air con needs a re-gas." },
                    { speaker: "assistant", text: "Perfect! We can do the air con re-gas alongside the MOT. I have booked your slot for Tuesday at 9 AM." }
                ]
            }
        ],
        crm: [
            { id: "crm-1", name: "Sarah Jenkins (LF19 XWZ)", phone: "+44 7700 900076", summary: "Booked MOT. Squeaking front brakes to check.", tag: "booking", status: "hot" },
            { id: "crm-2", name: "James Vance (BD67 UVM)", phone: "+44 7700 900124", summary: "MOT failed on emissions. Needs catalytic converter quote.", tag: "billing", status: "followup" },
            { id: "crm-3", name: "Claire Redfield (HN15 KLS)", phone: "+44 7700 900621", summary: "Completed MOT and minor service. Highly satisfied.", tag: "booking", status: "closed" },
            { id: "crm-4", name: "Leon Kennedy (KP64 TYU)", phone: "+44 7700 900543", summary: "Booked MOT + headlight bulb swap.", tag: "booking", status: "followup" },
            { id: "crm-5", name: "Jill Valentine (AP13 ERD)", phone: "+44 7700 900421", summary: "Bumper scuff damage estimate pending.", tag: "booking", status: "hot" },
            { id: "crm-6", name: "Arthur Morgan (WD11 HOR)", phone: "+44 7700 900892", summary: "Range Rover suspension diagnostic callback scheduled.", tag: "upgrade", status: "followup" },
            { id: "crm-7", name: "Peter Parker (SP18 WEB)", phone: "+44 7700 900993", summary: "Completed rear brake discs & pads replacement.", tag: "booking", status: "closed" },
            { id: "crm-8", name: "Bruce Wayne (BT66 BAT)", phone: "+44 7700 900100", summary: "Gold service completed on Vantage. Customer praised expertise.", tag: "upgrade", status: "closed" },
            { id: "crm-9", name: "Clark Kent (SM13 KNT)", phone: "+44 7700 900222", summary: "Transit MOT + fuel filter change scheduled.", tag: "booking", status: "followup" },
            { id: "crm-10", name: "Tony Stark (IM08 ARC)", phone: "+44 7700 900333", summary: "Laser alignment and tracking booked.", tag: "upgrade", status: "hot" },
            { id: "crm-11", name: "Diana Prince (WW14 GRD)", phone: "+44 7700 900444", summary: "Battery swap + MOT test booked.", tag: "booking", status: "followup" },
            { id: "crm-12", name: "Lara Croft (TR13 ADV)", phone: "+44 7700 900555", summary: "Heavy-duty clutch replacement ordered.", tag: "upgrade", status: "hot" },
            { id: "crm-13", name: "John Marston (RD10 BUL)", phone: "+44 7700 900666", summary: "Tyres and tracking job complete.", tag: "booking", status: "closed" },
            { id: "crm-14", name: "Nathan Drake (UC16 TRE)", phone: "+44 7700 900777", summary: "MOT + transfer box oil change booked.", tag: "booking", status: "followup" },
            { id: "crm-15", name: "Sherlock Holmes (SH22 DET)", phone: "+44 7700 900888", summary: "DPF chem clean complete. Restored from limp mode.", tag: "upgrade", status: "closed" },
            { id: "crm-16", name: "John Watson (WJ12 DRG)", phone: "+44 7700 900999", summary: "Standard MOT test completed.", tag: "booking", status: "closed" },
            { id: "crm-17", name: "Harry Potter (HP07 WIZ)", phone: "+44 7700 900111", summary: "Anglia safety check and carb tune booked.", tag: "upgrade", status: "hot" },
            { id: "crm-18", name: "Geralt Rivia (WH19 HNT)", phone: "+44 7700 900223", summary: "Haldex AWD coupling service booked.", tag: "booking", status: "followup" },
            { id: "crm-19", name: "Lando Calrissian (MF77 SGL)", phone: "+44 7700 900334", summary: "Mustang blow manifold gasket booked.", tag: "booking", status: "followup" },
            { id: "crm-20", name: "Luke Skywalker (XW11 RED)", phone: "+44 7700 900446", summary: "Completed air con regas + MOT test.", tag: "booking", status: "closed" }
        ]
    },
    solar: {
        companyName: "Greenlight Motors & Garage",
        stats: {
            calls: "865",
            duration: "3m 12s",
            savings: "£2,890.00",
            sentiment: "79% Success"
        },
        assistants: [
            { name: "Fleet Service Planner", type: "Inbound Routing", calls: 620, handoffs: "28%", cost: "£0.48", status: "Active" },
            { name: "EV Booking Assistant", type: "Inbound Bookings", calls: 245, handoffs: "15%", cost: "£0.36", status: "Active" }
        ],
        chartData: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            calls: [95, 110, 125, 130, 115, 60, 40],
            cost: [38.0, 44.0, 50.0, 52.0, 46.0, 24.0, 16.0]
        },
        teasers: [
            {
                id: "t-sol-1",
                label: "Hot Opportunity",
                labelClass: "hot",
                title: "🚚 £1,200 Commercial Fleet Service",
                preview: "Caller Mark Higgins (Logistics Manager) wants to book MOT tests and major service items for 4 delivery vans.",
                benefitDesc: "Mark spent 5m discussing recurring service contracts. ZeroPerson logged his business details and company registration. Unlock to lock contract.",
                crmTag: "upgrade",
                crmContact: {
                    name: "Mark Higgins (Fleet Logistics)",
                    phone: "+44 7700 900332",
                    summary: "Fleet Manager. Wants 4 commercial van MOTs + full servicing slots. High priority lead.",
                    tag: "upgrade",
                    status: "hot"
                }
            }
        ],
        calls: [
            {
                id: "c-sol-1",
                caller: "Mark Higgins",
                phone: "Commercial Fleet Manager",
                duration: "5m 02s",
                cost: "£1.00",
                time: "15 mins ago",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Fleet Service Planner",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_mh_fleet.mp3",
                summary: "Logistics company owner wants to book four vans in for annual MOT and intermediate service. Confirmed commercial rate.",
                transcript: [
                    { speaker: "assistant", text: "Thanks for calling Greenlight Motors! This is Sunny, how can I assist you with your business fleet bookings today?" },
                    { speaker: "user", text: "Hello, I manage a local delivery fleet. I've got four Mercedes Sprinter vans that are all due their MOT tests and an intermediate servicing this month." },
                    { speaker: "assistant", text: "We specialize in commercial vehicle maintenance! We can coordinate same-day MOT and servicing for your Sprinters to minimize vehicle down-time. Would you like us to arrange collection and delivery?" },
                    { speaker: "user", text: "Yes, that would be ideal. Can you book them in batches of two starting next Monday?" },
                    { speaker: "assistant", text: "Certainly! I have scheduled the first two vans for Monday, and the remaining two for Wednesday. Commercial invoice rates will be applied." }
                ]
            }
        ],
        crm: [
            { id: "crm-s1", name: "Alan Grant (RE20 OOP)", phone: "+44 7700 900445", summary: "Tesla Model 3 tire replacement quote and calibration.", tag: "upgrade", status: "followup" }
        ]
    },
    ecommerce: {
        companyName: "Nova Performance & MOT",
        stats: {
            calls: "2,410",
            duration: "1m 55s",
            savings: "£6,540.00",
            sentiment: "91% Success"
        },
        assistants: [
            { name: "Nova Dyno Receptionist", type: "Performance Tuning", calls: 1820, handoffs: "3%", cost: "£0.20", status: "Active" },
            { name: "Exhaust Service Specialist", type: "Custom Fabrications", calls: 590, handoffs: "8%", cost: "£0.24", status: "Active" }
        ],
        chartData: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            calls: [290, 340, 310, 380, 420, 390, 280],
            cost: [58.0, 68.0, 62.0, 76.0, 84.0, 78.0, 56.0]
        },
        teasers: [
            {
                id: "t-eco-1",
                label: "Hot Opportunity",
                labelClass: "hot",
                title: "🏎️ Custom Exhaust & Remap Upsell",
                preview: "Caller Emily Stone booked MOT, inquired about custom dyno remap and stainless exhaust upgrade (£850 procedure) for Golf GTI.",
                benefitDesc: "Emily Stone discussed Golf GTI performance tuning. ZeroPerson captured her Golf GTI year and tuning requests. Unlock to close dyno slot.",
                crmTag: "upgrade",
                crmContact: {
                    name: "Emily Stone (GT18 RUN)",
                    phone: "+44 7700 900998",
                    summary: "Wants dyno stage 1 remap + custom exhaust fabrication alongside MOT. High budget lead.",
                    tag: "upgrade",
                    status: "hot"
                }
            }
        ],
        calls: [
            {
                id: "c-eco-1",
                caller: "Emily Stone",
                phone: "GT18 RUN (Golf GTI)",
                duration: "2m 50s",
                cost: "£0.56",
                time: "5 mins ago",
                sentiment: "positive",
                disposition: "completed",
                assistant: "Nova Dyno Receptionist",
                recordingUrl: "https://recordings.zeroperson.co.uk/rec_es_golf.mp3",
                summary: "Customer successfully booked performance MOT and exhaust testing. Inquired about aftermarket tuning quotes.",
                transcript: [
                    { speaker: "assistant", text: "Welcome to Nova Performance! This is your booking assistant. Are we looking to book a track prep, dyno run, or standard MOT today?" },
                    { speaker: "user", text: "Hi, I need to book my Golf GTI for its yearly MOT test. But I'm also looking to get a stage 1 engine remap done to boost performance." },
                    { speaker: "assistant", text: "A stage 1 tune is a fantastic upgrade! For your Golf GTI, it will increase horsepower by roughly 45 brake horsepower and improve fuel efficiency. We can schedule your MOT and perform the dyno remap on the same afternoon." },
                    { speaker: "user", text: "Oh, that's brilliant. How much is the package deal?" },
                    { speaker: "assistant", text: "The performance MOT is £45, and the custom Stage 1 dyno remap with printout is £399. I have secured an afternoon performance slot for you next Wednesday!" }
                ]
            }
        ],
        crm: [
            { id: "crm-e1", name: "David Beck (DB08 FLY)", phone: "+44 7700 900771", summary: "Inquired about track-day exhaust noise testing. Coded as minor follow-up.", tag: "billing", status: "followup" }
        ]
    }
};

// --- Active System State ---
let currentTenant = "dental";
let activeTab = "dashboard";
let selectedCallId = null;
let trendChart = null;
let isServerConnected = false;

// --- DOM Element References ---
const DOMElements = {
    tenantSelect: document.getElementById("tenant-select"),
    tabButtons: document.querySelectorAll(".sidebar-nav .nav-btn"),
    tabs: document.querySelectorAll(".content-tab"),
    tabTitle: document.getElementById("tab-title"),
    tabSubtitle: document.getElementById("tab-subtitle"),
    
    // Stats elements
    statCalls: document.getElementById("stat-calls"),
    statDuration: document.getElementById("stat-duration"),
    statSavings: document.getElementById("stat-savings"),
    statSentiment: document.getElementById("stat-sentiment"),
    
    // List elements
    assistantSummaryTbody: document.getElementById("assistant-summary-tbody"),
    teasersList: document.getElementById("teasers-list"),
    callScrollList: document.getElementById("call-scroll-list"),
    callDetailPanel: document.getElementById("call-detail-panel"),
    callCountLabel: document.getElementById("call-count-label"),
    
    // Filters
    searchCalls: document.getElementById("search-calls"),
    filterSentiment: document.getElementById("filter-sentiment"),
    filterStatus: document.getElementById("filter-status"),
    
    // CRM
    cardsHot: document.getElementById("cards-hot"),
    cardsFollowup: document.getElementById("cards-followup"),
    cardsClosed: document.getElementById("cards-closed"),
    countHot: document.getElementById("count-hot"),
    countFollowup: document.getElementById("count-followup"),
    countClosed: document.getElementById("count-closed"),
    crmTotalLeads: document.getElementById("crm-total-leads"),
    crmNeedsAction: document.getElementById("crm-needs-action"),
    crmConvertedRev: document.getElementById("crm-converted-rev"),
    addCrmLeadBtn: document.getElementById("add-crm-lead-btn"),
    
    // Modal
    insightModal: document.getElementById("insight-modal"),
    modalClose: document.getElementById("modal-close"),
    modalTitle: document.getElementById("modal-title"),
    modalTeaserDesc: document.getElementById("modal-teaser-desc"),
    modalCancel: document.getElementById("modal-cancel"),
    modalUnlock: document.getElementById("modal-unlock"),
    
    // Config Form
    vapiConfigForm: document.getElementById("vapi-config-form")
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", async () => {
    setupEventListeners();
    await checkServerConnection();
    await checkDatabaseStatus();
    await fetchSyncData();
    renderAll();
});

// --- Server-Check Helper ---
async function checkServerConnection() {
    try {
        const res = await fetch('/api/data/dental');
        if (res.ok) {
            isServerConnected = true;
            console.log("⚡ ZeroPerson Live Server Connected!");
        }
    } catch (e) {
        isServerConnected = false;
        console.warn("⚠️ Local server not running, falling back to static mockup mode.");
    }
}

// --- Database Status Helper ---
async function checkDatabaseStatus() {
    const badge = document.getElementById("db-status-badge");
    if (!badge) return;

    if (!isServerConnected) {
        badge.innerHTML = `<span style="display:inline-block; width:6px; height:6px; border-radius:50%; background-color:#ef4444; animation:pulseGlow 1.5s infinite alternate;"></span>📴 Static Mock Mode`;
        badge.style.backgroundColor = "rgba(239, 68, 68, 0.08)";
        badge.style.color = "#ef4444";
        badge.style.borderColor = "rgba(239, 68, 68, 0.15)";
        return;
    }

    try {
        const res = await fetch('/api/db-status');
        if (res.ok) {
            const data = await res.json();
            if (data.mode === "supabase") {
                badge.innerHTML = `<span style="display:inline-block; width:6px; height:6px; border-radius:50%; background-color:#10b981; animation:pulseGlow 1.5s infinite alternate;"></span>☁️ Live Supabase Cloud`;
                badge.style.backgroundColor = "rgba(16, 185, 129, 0.08)";
                badge.style.color = "#10b981";
                badge.style.borderColor = "rgba(16, 185, 129, 0.15)";
            } else {
                badge.innerHTML = `<span style="display:inline-block; width:6px; height:6px; border-radius:50%; background-color:#06b6d4; animation:pulseGlow 1.5s infinite alternate;"></span>💾 SQLite Local SQL`;
                badge.style.backgroundColor = "rgba(6, 182, 212, 0.08)";
                badge.style.color = "#06b6d4";
                badge.style.borderColor = "rgba(6, 182, 212, 0.15)";
            }
        }
    } catch (e) {
        console.error("Failed to query DB status:", e);
    }
}

// --- Sync Data from Server if Connected ---
async function fetchSyncData() {
    if (!isServerConnected) return;
    try {
        const res = await fetch(`/api/data/${currentTenant}`);
        if (res.ok) {
            const serverData = await res.json();
            // Sync current CRM and teasers with the database server
            tenantData[currentTenant].crm = serverData.crm;
            tenantData[currentTenant].teasers = serverData.teasers;
        }
    } catch (e) {
        console.error("Failed syncing data from server:", e);
    }
}

// --- Event Listener Setup ---
function setupEventListeners() {
    // Tenant switcher
    DOMElements.tenantSelect.addEventListener("change", async (e) => {
        currentTenant = e.target.value;
        selectedCallId = null;
        await fetchSyncData();
        renderAll();
    });

    // Sidebar tab buttons
    DOMElements.tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            DOMElements.tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            activeTab = btn.getAttribute("data-tab");
            switchTab(activeTab);
        });
    });

    // Filters for calls
    DOMElements.searchCalls.addEventListener("input", filterAndRenderCalls);
    DOMElements.filterSentiment.addEventListener("change", filterAndRenderCalls);
    DOMElements.filterStatus.addEventListener("change", filterAndRenderCalls);

    // Modal control
    DOMElements.modalClose.addEventListener("click", closeModal);
    DOMElements.modalCancel.addEventListener("click", closeModal);

    // Manual lead generation
    DOMElements.addCrmLeadBtn.addEventListener("click", handleAddManualContact);

    // Configuration form save
    DOMElements.vapiConfigForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("🎉 Platform Settings successfully saved & deployed to active voice receptionists!");
    });
}

// --- Tab Router Switcher ---
function switchTab(tabId) {
    DOMElements.tabs.forEach(tab => tab.classList.remove("active"));
    const activeTabSection = document.getElementById(`tab-${tabId}`);
    if (activeTabSection) activeTabSection.classList.add("active");

    // Update Header Text dynamically based on active tab
    const tenantName = tenantData[currentTenant].companyName;
    if (tabId === "dashboard") {
        DOMElements.tabTitle.innerText = "Executive Dashboard";
        DOMElements.tabSubtitle.innerText = `Real-time Voice AI insights & booking analytics for ${tenantName}`;
        renderChart(); // redraw chart to ensure proper canvas layout
    } else if (tabId === "calls") {
        DOMElements.tabTitle.innerText = "Conversational Call Logs";
        DOMElements.tabSubtitle.innerText = `Search, play recordings, and inspect detailed AI summaries for ${tenantName}`;
    } else if (tabId === "crm") {
        DOMElements.tabTitle.innerText = "Lightweight Voice CRM";
        DOMElements.tabSubtitle.innerText = `Track booking opportunities and scheduled car repair followups from phone calls`;
    } else if (tabId === "config") {
        DOMElements.tabTitle.innerText = "Platform Integration Hub";
        DOMElements.tabSubtitle.innerText = `Configure API credentials, choose voices, and customize agent prompts`;
    }
}

// --- Universal Renderer ---
function renderAll() {
    const data = tenantData[currentTenant];

    // 1. Stats rendering
    DOMElements.statCalls.innerText = data.stats.calls;
    DOMElements.statDuration.innerText = data.stats.duration;
    DOMElements.statSavings.innerText = data.stats.savings;
    DOMElements.statSentiment.innerText = data.stats.sentiment;

    // 2. Active Assistant Performance table
    let assistantsHtml = "";
    data.assistants.forEach(a => {
        assistantsHtml += `
            <tr>
                <td><strong>${a.name}</strong></td>
                <td><span class="badge">${a.type}</span></td>
                <td>${a.calls}</td>
                <td>${a.handoffs}</td>
                <td>${a.cost}</td>
                <td><span class="badge active">${a.status}</span></td>
            </tr>
        `;
    });
    DOMElements.assistantSummaryTbody.innerHTML = assistantsHtml;

    // 3. Teasers
    renderTeasers();

    // 4. Calls tab rendering
    renderCalls();

    // 5. CRM Kanban rendering
    renderCRM();

    // 6. Chart.js rendering
    renderChart();
}

// --- Render Chart.js Visualization ---
function renderChart() {
    const ctx = document.getElementById("callTrendsChart");
    if (!ctx) return;

    if (trendChart) {
        trendChart.destroy();
    }

    const data = tenantData[currentTenant].chartData;

    // Custom gradient coloring
    const canvasCtx = ctx.getContext('2d');
    const gradient = canvasCtx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.25)');
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0.01)');

    trendChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: "Calls Handled",
                    data: data.calls,
                    borderColor: "#4f46e5",
                    borderWidth: 3,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: "#06b6d4",
                    pointBorderColor: "#ffffff",
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: "Operational Savings (£)",
                    data: data.cost.map(c => c * 2.5), // simulated savings scale
                    borderColor: "#06b6d4",
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#64748b',
                        font: { family: 'Outfit', size: 12, weight: '500' }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(0,0,0,0.03)' },
                    ticks: { color: '#64748b', font: { family: 'Outfit', weight: '500' } }
                },
                y: {
                    grid: { color: 'rgba(0,0,0,0.03)' },
                    ticks: { color: '#64748b', font: { family: 'Outfit', weight: '500' } }
                }
            }
        }
    });
}

// --- Render AI Teasers Panel ---
function renderTeasers() {
    const teasers = tenantData[currentTenant].teasers;
    let teasersHtml = "";

    if (teasers.length === 0) {
        teasersHtml = `
            <div class="no-teasers-box" style="text-align: center; color: var(--text-dimmed); padding: 20px;">
                <p>✨ AI analysis is running on incoming garage calls. No new insights at this moment.</p>
            </div>
        `;
        DOMElements.teasersList.innerHTML = teasersHtml;
        return;
    }

    teasers.forEach(t => {
        teasersHtml += `
            <div class="teaser-card premium-locked" id="${t.id}">
                <div class="teaser-header">
                    <span class="teaser-label ${t.labelClass}">${t.label}</span>
                    <span class="teaser-badge locked">🔒 Preview</span>
                </div>
                <h4 class="teaser-title">${t.title}</h4>
                <p class="teaser-preview">${t.preview}</p>
            </div>
        `;
    });

    DOMElements.teasersList.innerHTML = teasersHtml;

    // Attach click listeners to trigger premium modal
    teasers.forEach(t => {
        const card = document.getElementById(t.id);
        if (card) {
            card.addEventListener("click", () => triggerTeaserModal(t));
        }
    });
}

// --- Trigger Premium Locked Insights Modal ---
let activeUnlockingTeaser = null;
function triggerTeaserModal(teaser) {
    activeUnlockingTeaser = teaser;
    DOMElements.modalTitle.innerText = `Unlock AI Lead: ${teaser.crmContact.name}`;
    DOMElements.modalTeaserDesc.innerText = teaser.benefitDesc;
    DOMElements.insightModal.classList.add("active");
}

DOMElements.modalUnlock.addEventListener("click", async () => {
    if (activeUnlockingTeaser) {
        const contact = activeUnlockingTeaser.crmContact;
        
        if (isServerConnected) {
            try {
                // Post to Express backend
                const res = await fetch(`/api/teasers/unlock/${currentTenant}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: activeUnlockingTeaser.id })
                });
                
                if (res.ok) {
                    await fetchSyncData();
                }
            } catch (e) {
                console.error("Error unlocking lead on server:", e);
            }
        } else {
            // Local fallback logic
            tenantData[currentTenant].crm.push({
                id: `crm-unlocked-${Date.now()}`,
                name: contact.name,
                phone: contact.phone,
                summary: contact.summary,
                tag: contact.tag,
                status: contact.status
            });

            // Remove teaser locally
            tenantData[currentTenant].teasers = tenantData[currentTenant].teasers.filter(t => t.id !== activeUnlockingTeaser.id);
        }

        closeModal();
        renderAll();

        alert(`🔓 Success! ${contact.name}'s contact profile, call summary, and vehicle details have been fully unlocked and synchronized to your Light CRM!`);
        document.querySelector('[data-tab=crm]').click();
    }
});

function closeModal() {
    DOMElements.insightModal.classList.remove("active");
    activeUnlockingTeaser = null;
}

// --- Render Calls Log List & Detail Viewer ---
function renderCalls() {
    const calls = tenantData[currentTenant].calls;
    filterAndRenderCalls();
}

function filterAndRenderCalls() {
    const searchVal = DOMElements.searchCalls.value.toLowerCase();
    const sentimentVal = DOMElements.filterSentiment.value;
    const statusVal = DOMElements.filterStatus.value;
    
    const calls = tenantData[currentTenant].calls;
    
    // Apply filters
    const filteredCalls = calls.filter(c => {
        const matchesSearch = c.caller.toLowerCase().includes(searchVal) || 
                              c.phone.includes(searchVal) ||
                              c.summary.toLowerCase().includes(searchVal);
                              
        const matchesSentiment = (sentimentVal === "all") || (c.sentiment === sentimentVal);
        const matchesStatus = (statusVal === "all") || (c.disposition === statusVal);
        
        return matchesSearch && matchesSentiment && matchesStatus;
    });

    DOMElements.callCountLabel.innerText = `${filteredCalls.length} calls found`;

    // Render list
    let listHtml = "";
    if (filteredCalls.length === 0) {
        listHtml = `<div style="padding: 30px; text-align: center; color: var(--text-dimmed);">No calls match criteria</div>`;
        DOMElements.callScrollList.innerHTML = listHtml;
        DOMElements.callDetailPanel.innerHTML = `
            <div class="no-call-selected">
                <div class="no-call-icon">📞</div>
                <p>No call logs match filters or are available.</p>
            </div>
        `;
        return;
    }

    filteredCalls.forEach(c => {
        const activeClass = (selectedCallId === c.id) ? "active" : "";
        listHtml += `
            <div class="call-item ${activeClass}" id="item-${c.id}">
                <div class="call-item-header">
                    <span>${c.caller}</span>
                    <span class="call-time">${c.time}</span>
                </div>
                <div class="call-item-details">
                    <span>${c.phone.split(" ")[0]}...</span>
                    <span>
                        <span class="sentiment-dot ${c.sentiment}"></span>
                        ${c.duration}
                    </span>
                </div>
            </div>
        `;
    });
    DOMElements.callScrollList.innerHTML = listHtml;

    // Attach click triggers to call items
    filteredCalls.forEach(c => {
        const elem = document.getElementById(`item-${c.id}`);
        if (elem) {
            elem.addEventListener("click", () => {
                selectedCallId = c.id;
                // Redraw list to update active class
                filterAndRenderCalls();
            });
        }
    });

    // Render Detail Panel
    if (!selectedCallId && filteredCalls.length > 0) {
        selectedCallId = filteredCalls[0].id;
    }

    const activeCall = calls.find(c => c.id === selectedCallId);
    if (!activeCall) {
        DOMElements.callDetailPanel.innerHTML = `
            <div class="no-call-selected">
                <div class="no-call-icon">📞</div>
                <p>Select a call from the list to view transcripts & summaries.</p>
            </div>
        `;
        return;
    }

    renderCallDetailView(activeCall);
}

function renderCallDetailView(call) {
    let transcriptHtml = "";
    call.transcript.forEach(b => {
        transcriptHtml += `
            <div class="bubble ${b.speaker}">
                <div class="bubble-speaker">${b.speaker === "assistant" ? "🤖 AI Voice Assistant" : "👤 Customer"}</div>
                <div>${b.text}</div>
            </div>
        `;
    });

    // Link/Play status with Call Recording Link
    DOMElements.callDetailPanel.innerHTML = `
        <div class="call-detail-header">
            <div class="call-detail-title">
                <h3>${call.caller}</h3>
                <p class="call-detail-subtitle">${call.phone} • Handled by ${call.assistant}</p>
            </div>
            <div class="call-meta-box">
                <div class="meta-item">
                    <span class="label">Duration</span>
                    <span class="val">${call.duration}</span>
                </div>
                <div class="meta-item">
                    <span class="label">Call Fee</span>
                    <span class="val">${call.cost}</span>
                </div>
            </div>
        </div>
        
        <div class="call-detail-body">
            <!-- Simulated Audio Player with Call Recording Link -->
            <div class="audio-player-container">
                <div style="font-size: 11px; color: var(--text-dimmed); margin-bottom: 8px; font-weight: 700;">
                    🔗 Recording: <a href="${call.recordingUrl}" target="_blank" style="color: var(--color-primary); text-decoration: none;">${call.recordingUrl.split('/').pop()} ↗</a>
                </div>
                <div class="audio-controls">
                    <button class="btn btn-secondary btn-play" id="audio-play-btn" style="padding: 8px 12px; font-size: 12px;">▶ Play Recording</button>
                    <div class="audio-progress" id="audio-progress-bar">
                        <div class="audio-bar" id="audio-progress-fill"></div>
                    </div>
                    <span class="audio-time-label" id="audio-time-lbl">0:00 / ${call.duration}</span>
                </div>
            </div>

            <!-- AI Summary Box -->
            <div class="ai-summary-box">
                <div class="ai-summary-title">🤖 AI Executive Summary</div>
                <p class="ai-summary-content">${call.summary}</p>
            </div>

            <!-- Transcript Scroll Box -->
            <div class="transcript-box">
                <div class="transcript-header">Full Call Transcript</div>
                <div class="transcript-scroll">
                    ${transcriptHtml}
                </div>
            </div>
        </div>
    `;

    // Hook audio player simulation
    const playBtn = document.getElementById("audio-play-btn");
    const progFill = document.getElementById("audio-progress-fill");
    const timeLbl = document.getElementById("audio-time-lbl");
    let playing = false;
    let playInterval = null;
    let currentPct = 0;

    playBtn.addEventListener("click", () => {
        playing = !playing;
        if (playing) {
            playBtn.innerText = "⏸ Pause";
            playInterval = setInterval(() => {
                currentPct += 2;
                if (currentPct > 100) {
                    currentPct = 0;
                    playing = false;
                    playBtn.innerText = "▶ Play Recording";
                    clearInterval(playInterval);
                }
                progFill.style.width = `${currentPct}%`;
                
                // simulate clock ticking
                const totalSeconds = parseInt(call.duration.split("m")[0]) * 60 + parseInt(call.duration.split("m")[1].replace("s",""));
                const currentSeconds = Math.round((currentPct / 100) * totalSeconds);
                const curM = Math.floor(currentSeconds / 60);
                const curS = currentSeconds % 60;
                timeLbl.innerText = `${curM}:${curS < 10 ? '0' : ''}${curS} / ${call.duration}`;
            }, 200);
        } else {
            playBtn.innerText = "▶ Play Recording";
            clearInterval(playInterval);
        }
    });
}

// --- Render Minimal CRM (Kanban columns & metrics) ---
function renderCRM() {
    const crm = tenantData[currentTenant].crm;
    
    // Filter by statuses
    const hotLeads = crm.filter(c => c.status === "hot");
    const followupLeads = crm.filter(c => c.status === "followup");
    const closedLeads = crm.filter(c => c.status === "closed");

    // Update Kanban Header Counts
    DOMElements.countHot.innerText = hotLeads.length;
    DOMElements.countFollowup.innerText = followupLeads.length;
    DOMElements.countClosed.innerText = closedLeads.length;

    // Update CRM Dashboard Top Metrics
    DOMElements.crmTotalLeads.innerText = crm.length;
    DOMElements.crmNeedsAction.innerText = (hotLeads.length + followupLeads.length);
    
    // Simulate converted revenue based on closed dental solar or ecommerce metrics
    let rev = 0;
    if (currentTenant === "dental") {
        rev = closedLeads.length * 45; // MOT booking value
    } else if (currentTenant === "solar") {
        rev = closedLeads.length * 1200; // Commercial fleet major repairs
    } else {
        rev = closedLeads.length * 450; // Tuning pack
    }
    DOMElements.crmConvertedRev.innerText = `£${rev.toLocaleString()}`;

    // Render Cards in Columns
    renderColumn("cards-hot", hotLeads);
    renderColumn("cards-followup", followupLeads);
    renderColumn("cards-closed", closedLeads);
}

function renderColumn(containerId, leads) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (leads.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-dimmed); padding: 30px; font-size: 12px; border: 1px dashed rgba(0,0,0,0.06); border-radius: 8px;">Column empty</div>`;
        return;
    }

    let cardsHtml = "";
    leads.forEach(l => {
        // determine move actions based on current status
        let actionBtn = "";
        if (l.status === "hot") {
            actionBtn = `<button class="crm-move-btn" onclick="moveLead('${l.id}', 'followup')">⏳ Schedule Followup</button>`;
        } else if (l.status === "followup") {
            actionBtn = `<button class="crm-move-btn" onclick="moveLead('${l.id}', 'closed')" style="color: var(--color-emerald)">✅ Book & Resolve</button>`;
        } else {
            actionBtn = `<button class="crm-move-btn" onclick="moveLead('${l.id}', 'hot')" style="color: var(--color-rose)">🔥 Reopen Booking Opportunity</button>`;
        }

        cardsHtml += `
            <div class="crm-card">
                <div class="crm-card-header">
                    <span class="crm-card-name">${l.name}</span>
                    <span class="crm-card-tag ${l.tag}">${l.tag}</span>
                </div>
                <div class="crm-card-phone">${l.phone}</div>
                <p class="crm-card-summary">${l.summary}</p>
                <div class="crm-card-footer">
                    <div class="crm-card-actions">
                        ${actionBtn}
                    </div>
                    <button class="crm-delete-btn" onclick="deleteLead('${l.id}')" style="background:none; border:none; cursor:pointer; font-size:12px; color:var(--text-dimmed); transition:0.2s;" onmouseover="this.style.color='#f43f5e'" onmouseout="this.style.color='var(--text-dimmed)'">🗑️</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = cardsHtml;
}

// Global scope window methods for board manipulation
window.moveLead = async function(leadId, newStatus) {
    if (isServerConnected) {
        try {
            const res = await fetch(`/api/crm/${currentTenant}/${leadId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                await fetchSyncData();
            }
        } catch (e) {
            console.error("Error moving lead on server:", e);
        }
    } else {
        const crm = tenantData[currentTenant].crm;
        const lead = crm.find(l => l.id === leadId);
        if (lead) {
            lead.status = newStatus;
        }
    }
    renderCRM();
};

window.deleteLead = async function(leadId) {
    if (confirm("Are you sure you want to remove this customer contact from your CRM?")) {
        if (isServerConnected) {
            try {
                const res = await fetch(`/api/crm/${currentTenant}/${leadId}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    await fetchSyncData();
                }
            } catch (e) {
                console.error("Error deleting lead on server:", e);
            }
        } else {
            tenantData[currentTenant].crm = tenantData[currentTenant].crm.filter(l => l.id !== leadId);
        }
        renderCRM();
    }
};

// --- Handle Add Manual CRM Contact ---
async function handleAddManualContact() {
    const name = prompt("Enter customer name & registration:");
    if (!name) return;
    const phone = prompt("Enter customer phone number:");
    if (!phone) return;
    const summary = prompt("Enter booking requirements or requested date:");
    if (!summary) return;

    if (isServerConnected) {
        try {
            const res = await fetch(`/api/crm/${currentTenant}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    summary: summary,
                    tag: "booking",
                    status: "hot"
                })
            });
            if (res.ok) {
                await fetchSyncData();
            }
        } catch (e) {
            console.error("Error adding lead manually on server:", e);
        }
    } else {
        tenantData[currentTenant].crm.push({
            id: `crm-manual-${Date.now()}`,
            name: name,
            phone: phone,
            summary: summary,
            tag: "booking",
            status: "hot"
        });
    }

    renderCRM();
    alert("🎉 Customer contact added directly to Hot Opportunities!");
}
