/* ============================================================
   LeadaLine Demo Factory — bundled CompanyProfiles.
   Each profile is the shape a research pass produces. These ship with
   the Factory so it works fully offline and so the output is reproducible.
   Exposes global `LL_PROFILES`.
   ============================================================ */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.LL_PROFILES = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ---- D3C Electrical — the original reference, expressed as data ----
  var d3c = {
    slug: 'd3c-electrical',
    name: 'D3C Electrical',
    shortName: 'D3C',
    industry: 'electrical contractor',
    registration: 'NICEIC registered',
    location: 'Leicester',
    website: 'd3celectrical.co.uk',
    email: 'info@d3celectrical.co.uk',
    phone: '0116 000 0000',
    contactFirstName: 'Dan',
    brand: { primary: '#F5A623', primaryHi: '#FFC24B', accent: '#FF7A1A', bg: '#0A0705', bg2: '#080D13', surface: '#0C131B', surface2: '#111A24', line: '#1C2A36' },
    serviceCategories: ['domestic', 'commercial', 'industrial'],
    services: [
      { name: 'EV Charger Installation', detail: '7kW home & workplace chargers, DNO handled' },
      { name: 'EICR & Testing', detail: 'domestic & commercial certification' },
      { name: 'Full Rewires', detail: 'consumer units, new circuits' },
      { name: 'Fault Finding', detail: 'tripping, power loss, urgent' },
      { name: 'Commercial & Industrial', detail: 'fit-out, maintenance, testing' }
    ],
    areas: ['Leicester · LE3', 'Oadby · LE2', 'Wigston · LE18', 'Leicester · LE4'],
    hours: { weekdays: 'Mon–Sat 8:00–18:00', saturday: 'Sat 8:00–18:00', sunday: 'Closed', emergency: 'Urgent fault line — priority triage' },
    reviews: { rating: 4.9, count: 87, source: 'Google' },
    strengths: [
      { title: 'NICEIC registered & trusted', detail: 'Strong local reputation, clear accreditation.' },
      { title: 'Broad service range', detail: 'Domestic, commercial and industrial covered.' }
    ],
    weaknesses: [
      { title: 'No instant response', detail: 'Calls missed while on the tools go to voicemail.' },
      { title: 'Closed Sundays', detail: 'Weekend quote requests go unanswered.' },
      { title: 'No online booking', detail: 'Every survey needs a manual phone call to arrange.' },
      { title: 'No quote follow-up', detail: 'Quiet quotes are never chased automatically.' }
    ],
    painPoints: [
      'Owner answering the phone while on jobs',
      'Missed calls become missed jobs',
      'Weekend enquiries lost to competitors',
      'Quotes not chased — revenue leaks'
    ],
    roi: { enquiriesPerMonth: 62, missedPct: 32, avgJobValue: 1100, recoveryRate: 0.35 },
    aiReceptionist: {
      greeting: 'Thanks for calling D3C Electrical, how can I help today?',
      tone: 'Warm, local Leicester tradesman. Confident, reassuring, plain-spoken — never salesy.',
      emergencyRule: 'If the caller has lost power, smells burning, or sees sparks, treat as URGENT: reassure, get address fast, and send a priority alert to the owner immediately.',
      qualifyingQuestions: ['What electrical work do you need?', 'What\'s the address / postcode?', 'Domestic, commercial or industrial?', 'Is it urgent or can we schedule a survey?', 'Best number and time to call you back?']
    },
    faqs: [
      { q: 'Are you NICEIC registered?', a: 'Yes — fully NICEIC registered and insured, certificates issued on completion.' },
      { q: 'Do you install EV chargers?', a: 'Yes, 7kW home and workplace chargers. We handle the DNO notification for you.' },
      { q: 'Do you cover commercial work?', a: 'Yes — EICRs, fit-outs and maintenance across Leicestershire.' }
    ],
    dashboard: {
      metrics: { leadsWk: 14, qualified: 11, booked: 6, answered: 92 },
      pipelineValue: '£24,800',
      sources: [{ label: 'AI Voice', pct: 48 }, { label: 'Website', pct: 26 }, { label: 'WhatsApp', pct: 16 }, { label: 'Referral', pct: 10 }],
      leads: [
        { id: 'L1', name: 'Chris M.', initials: 'CM', job: 'EV charger install', status: 'New', scls: 'new', area: 'Leicester · LE3', phone: '07700 900123', email: 'chris.m@email.com', service: 'EV Charger Install', product: '7kW home charger', property: 'Semi · driveway', urgency: 'Within 2 weeks', callback: 'After 5pm', source: 'AI Voice Assistant', quality: 'High', value: '£800–1,400', summary: 'Homeowner in Leicester wants a 7kW EV charger fitted on the driveway for a new EV. Clean standard domestic install.', activity: [['Enquiry captured', 'AI Receptionist · 14:32'], ['Owner alerted', 'AI Admin · 14:32'], ['Logged as New', 'System · 14:32']] },
        { id: 'L2', name: 'Oadby Dental', initials: 'OD', job: 'Commercial EICR', status: 'Booked', scls: 'book', area: 'Oadby · LE2', phone: '0116 900044', email: 'practice@oadbydental.co.uk', service: 'EICR & Testing', product: 'Commercial · full report', property: 'Dental practice', urgency: 'This month', callback: 'Office hours', source: 'AI Voice Assistant', quality: 'High', value: '£2k–6k', summary: 'Practice manager needs a commercial EICR with certification for insurance. Recurring testing relationship potential.', activity: [['Enquiry captured', 'AI Receptionist'], ['Owner alerted', 'AI Admin'], ['Survey booked · Thu 10:00', 'AI Booking']] },
        { id: 'L3', name: 'D. Barnes', initials: 'DB', job: 'Full house rewire', status: 'Quoted', scls: '', area: 'Wigston · LE18', phone: '07700 900177', email: 'd.barnes@email.com', service: 'Full Rewire', product: '4-bed · new consumer unit', property: 'Detached · renovation', urgency: 'Flexible', callback: 'Evenings', source: 'AI Voice Assistant', quality: 'Medium', value: '£6k–10k', summary: 'Homeowner renovating a 4-bed wants a full rewire and new consumer unit. High-value domestic project.', activity: [['Enquiry captured', 'AI Receptionist'], ['Owner alerted', 'AI Admin'], ['Quote sent · £7,400', 'Owner']] },
        { id: 'L4', name: 'P. Shah', initials: 'PS', job: 'Tripping consumer unit', status: 'Urgent', scls: 'urgent', area: 'Leicester · LE4', phone: '07700 900210', email: 'p.shah@email.com', service: 'Fault Finding', product: 'RCD keeps tripping', property: 'Terraced house', urgency: 'Urgent — today', callback: 'ASAP', source: 'AI Voice Assistant', quality: 'High', value: '£150–500', summary: 'Consumer unit keeps tripping and part of the house has lost power. Time-sensitive fault call.', activity: [['Enquiry captured', 'AI Receptionist · 08:05'], ['Urgent owner alert', 'AI Admin · 08:05']] }
      ]
    },
    demo: {
      phoneIcon: '⚡',
      offDay: 'Sunday',
      channels: ['📞 Calls', '🌐 Website', '💬 WhatsApp', '📝 Forms'],
      urgentLine: 'Emergencies (sparks, power loss) jump the queue with a priority alert.',
      reviewQuote: 'Completely rewired our house — professional, tidy, and finished ahead of schedule.',
      report: { hoursSaved: 11, weeks: [{ label: 'Week 1', w: 55, v: 9 }, { label: 'Week 2', w: 68, v: 12 }, { label: 'Week 3', w: 62, v: 11 }, { label: 'Week 4', w: 82, v: 14 }] },
      sampleLead: {
        name: 'Chris M.', service: 'EV Charger Install', product: '7kW home charger', area: 'Leicester · LE3',
        property: 'Semi · driveway', callback: 'After 5pm', quality: 'High', value: '£800–1,400',
        summary: 'Homeowner in Leicester wants a 7kW EV charger fitted on the driveway for a new EV. Clean standard domestic install.',
        recommendedAction: 'Call back after 5pm to book a survey; quote at standard EV rate — DNO notification handled.'
      },
      calendar: {
        monthLabel: 'June 2026', dateLabel: 'Thursday 19 June', offDayDate: 'Sunday 22 June',
        days: [{ dn: 'Mon', dd: 16 }, { dn: 'Tue', dd: 17 }, { dn: 'Wed', dd: 18 }, { dn: 'Thu', dd: 19, sel: true }, { dn: 'Fri', dd: 20 }, { dn: 'Sat', dd: 21 }],
        ghostEvents: [{ time: '09:00', label: 'EICR · Oadby' }, { time: '12:30', label: 'Fault find · Wigston' }],
        newEvent: { time: '16:30', label: 'Survey — Chris M.', tag: '✓ Booked', timeLabel: 'Thu 4:30pm' }
      },
      messages: [
        { who: 'me', text: 'Hi Chris, it\'s D3C Electrical ⚡ We can survey your EV charger install <b>Thu 4–6pm</b> or Sat AM — which suits?', time: '14:48' },
        { who: 'them', text: 'Thursday works great, thanks!' },
        { who: 'me', text: 'Booked for <b>Thursday 4:30pm</b>. Reminder the morning of 👍', time: '15:02' }
      ]
    },
    meetingBrief: {
      summary: 'D3C Electrical — NICEIC electrician in Leicester, 4.9★ (87 reviews). Broad domestic/commercial/industrial range. Est. £23k/mo recoverable from missed & un-chased enquiries.',
      decisionMaker: 'Dan (owner/electrician) — likely answering the phone himself on jobs.',
      bestAngle: 'Missed-call revenue while on the tools + Sunday quote gap. Frame as money already walking out the door.',
      objections: [
        '"I answer my own phone" → not from up a ladder or on Sundays; AI never misses.',
        '"People want a real electrician" → AI books the human call faster, doesn\'t replace you.',
        '"Sounds expensive" → one recovered EICR or EV job covers a month.'
      ],
      discoveryQuestions: ['Roughly how many enquiries a week?', 'What happens to a call when you\'re mid-job?', 'How do you chase quotes now?', 'Average job value across domestic vs commercial?'],
      upsells: ['Reviews automation to climb Leicester Google rankings', 'Commercial EICR recurring-testing pipeline', 'Second number for commercial line'],
      mention: ['No online booking on current site', 'Closed Sundays = lost weekend quotes', 'Founding-client pilot: 2 spots left'],
      avoid: ['Don\'t over-promise exact £ — estimates only', 'Don\'t drift into deep electrical tech talk', 'Don\'t discount below £249 pilot']
    }
  };

  // ---- Ashworth Plumbing & Heating — cross-industry worked example ----
  var ashworth = {
    slug: 'ashworth-plumbing',
    name: 'Ashworth Plumbing & Heating',
    shortName: 'APH',
    industry: 'plumbing & heating engineer',
    registration: 'Gas Safe registered',
    location: 'Manchester',
    website: 'ashworthplumbing.co.uk',
    email: 'hello@ashworthplumbing.co.uk',
    phone: '0161 000 0000',
    contactFirstName: 'James',
    brand: { primary: '#2E8BFF', primaryHi: '#6FB0FF', accent: '#12C2C2', bg: '#060B12', bg2: '#070D16', surface: '#0B131E', surface2: '#101A28', line: '#1B2A3A' },
    serviceCategories: ['domestic', 'landlord', 'commercial'],
    services: [
      { name: 'Boiler Installation', detail: 'combi & system, finance available' },
      { name: 'Boiler Repair & Servicing', detail: 'annual service, breakdowns' },
      { name: 'Emergency Plumbing', detail: 'leaks, burst pipes, no heating' },
      { name: 'Bathroom Installation', detail: 'full fit, tiling, design' },
      { name: 'Landlord Gas Certificates', detail: 'CP12, portfolio cover' }
    ],
    areas: ['Manchester · M20', 'Stockport · SK4', 'Sale · M33', 'Didsbury · M20'],
    hours: { weekdays: 'Mon–Fri 8:00–17:30', saturday: 'Sat 9:00–13:00', sunday: 'Closed', emergency: '24/7 emergency call-out line' },
    reviews: { rating: 4.8, count: 143, source: 'Google' },
    strengths: [
      { title: 'Gas Safe & 4.8★', detail: 'Strong review base, clear trust signals.' },
      { title: 'Emergency call-out offered', detail: 'Already positioned for urgent work.' }
    ],
    weaknesses: [
      { title: 'Long contact form', detail: '9-field form on mobile kills conversion.' },
      { title: 'No instant response', detail: 'Emergency leaks at night hit voicemail.' },
      { title: 'No online booking', detail: 'Every service booked by phone tag.' },
      { title: 'No qualification', detail: 'Owner triages every call manually.' }
    ],
    painPoints: [
      'Emergency calls missed overnight and weekends',
      'Owner on the tools can\'t answer mid-job',
      'Boiler quotes go cold without follow-up',
      'Admin overload booking services around jobs'
    ],
    roi: { enquiriesPerMonth: 85, missedPct: 34, avgJobValue: 950, recoveryRate: 0.35 },
    aiReceptionist: {
      greeting: 'Thanks for calling Ashworth Plumbing & Heating, how can I help?',
      tone: 'Calm, reassuring Mancunian tradesman. Especially steady with panicked emergency callers.',
      emergencyRule: 'If the caller has a burst pipe, major leak, or no heating/hot water in winter, treat as EMERGENCY: reassure, give immediate stop-tap guidance, capture address, and alert the on-call engineer instantly.',
      qualifyingQuestions: ['What\'s the plumbing or heating issue?', 'Is water actively leaking right now?', 'What\'s the postcode?', 'Owner-occupier or landlord?', 'Best number to call straight back?']
    },
    faqs: [
      { q: 'Do you offer emergency call-outs?', a: 'Yes — 24/7 for leaks, bursts and no-heating emergencies across Greater Manchester.' },
      { q: 'Are you Gas Safe registered?', a: 'Yes, fully Gas Safe registered and insured. We issue certificates on completion.' },
      { q: 'Do you do landlord gas certificates?', a: 'Yes — CP12s for single properties and portfolios, with reminders before renewal.' }
    ],
    dashboard: {
      metrics: { leadsWk: 19, qualified: 15, booked: 9, answered: 94 },
      pipelineValue: '£31,200',
      sources: [{ label: 'AI Voice', pct: 44 }, { label: 'Website', pct: 30 }, { label: 'WhatsApp', pct: 18 }, { label: 'Referral', pct: 8 }],
      leads: [
        { id: 'L1', name: 'Sarah T.', initials: 'ST', job: 'New combi boiler', status: 'New', scls: 'new', area: 'Didsbury · M20', phone: '07700 900301', email: 'sarah.t@email.com', service: 'Boiler Installation', product: 'Combi swap · 3-bed', property: 'Semi · owner-occupier', urgency: 'Within 2 weeks', callback: 'After 6pm', source: 'AI Voice Assistant', quality: 'High', value: '£2,400–3,200', summary: 'Old boiler unreliable, wants a combi replacement in a 3-bed semi. Ready to book a survey — strong intent.', activity: [['Enquiry captured', 'AI Receptionist · 19:14'], ['Owner alerted', 'AI Admin · 19:14'], ['Logged as New', 'System']] },
        { id: 'L2', name: 'Miller Lettings', initials: 'ML', job: '6× CP12 certificates', status: 'Booked', scls: 'book', area: 'Stockport · SK4', phone: '0161 900222', email: 'ops@millerlettings.co.uk', service: 'Landlord Gas Certificates', product: '6 properties · CP12', property: 'Letting portfolio', urgency: 'This month', callback: 'Office hours', source: 'Website', quality: 'High', value: '£540 + recurring', summary: 'Letting agent needs CP12s across 6 properties with annual renewals. Recurring contract opportunity.', activity: [['Enquiry captured', 'AI Receptionist'], ['Owner alerted', 'AI Admin'], ['Batch booked · Wed', 'AI Booking']] },
        { id: 'L3', name: 'G. Owens', initials: 'GO', job: 'Full bathroom fit', status: 'Quoted', scls: '', area: 'Sale · M33', phone: '07700 900288', email: 'g.owens@email.com', service: 'Bathroom Installation', product: 'Full refit · tiling', property: 'Detached', urgency: 'Flexible', callback: 'Evenings', source: 'AI Voice Assistant', quality: 'Medium', value: '£5k–8k', summary: 'Homeowner wants a full bathroom refit including tiling. High-value job, comparing quotes.', activity: [['Enquiry captured', 'AI Receptionist'], ['Owner alerted', 'AI Admin'], ['Quote sent · £6,900', 'Owner']] },
        { id: 'L4', name: 'D. Price', initials: 'DP', job: 'Burst pipe — kitchen', status: 'Urgent', scls: 'urgent', area: 'Manchester · M20', phone: '07700 900299', email: 'd.price@email.com', service: 'Emergency Plumbing', product: 'Burst pipe · flooding', property: 'Terraced house', urgency: 'Emergency — now', callback: 'ASAP', source: 'AI Voice Assistant', quality: 'High', value: '£180–450', summary: 'Burst pipe under the kitchen sink, water spreading. AI gave stop-tap guidance and dispatched on-call engineer.', activity: [['Emergency captured', 'AI Receptionist · 22:47'], ['Stop-tap guidance given', 'AI · 22:47'], ['On-call engineer alerted', 'AI Admin · 22:48']] }
      ]
    },
    demo: {
      phoneIcon: '🔧',
      offDay: 'Sunday',
      channels: ['📞 Calls', '🌐 Website', '💬 WhatsApp', '📝 Forms'],
      urgentLine: 'Burst pipes and no-heating calls jump the queue with instant stop-tap guidance + on-call alert.',
      reviewQuote: 'Boiler died on the coldest night — Ashworth answered at 11pm and had us warm again by lunch. Superb.',
      report: { hoursSaved: 13, weeks: [{ label: 'Week 1', w: 58, v: 12 }, { label: 'Week 2', w: 70, v: 15 }, { label: 'Week 3', w: 66, v: 14 }, { label: 'Week 4', w: 88, v: 19 }] },
      sampleLead: {
        name: 'Sarah T.', service: 'Boiler Installation', product: 'Combi swap · 3-bed', area: 'Didsbury · M20',
        property: 'Semi · owner-occupier', callback: 'After 6pm', quality: 'High', value: '£2,400–3,200',
        summary: 'Old boiler unreliable, wants a combi replacement in a 3-bed semi. Ready to book a survey — strong buying intent.',
        recommendedAction: 'Call back after 6pm to book a survey; quote combi swap with finance option — strong close.'
      },
      calendar: {
        monthLabel: 'June 2026', dateLabel: 'Thursday 19 June', offDayDate: 'Sunday 22 June',
        days: [{ dn: 'Mon', dd: 16 }, { dn: 'Tue', dd: 17 }, { dn: 'Wed', dd: 18 }, { dn: 'Thu', dd: 19, sel: true }, { dn: 'Fri', dd: 20 }, { dn: 'Sat', dd: 21 }],
        ghostEvents: [{ time: '09:00', label: 'Boiler service · Sale' }, { time: '13:00', label: 'Leak repair · Stockport' }],
        newEvent: { time: '17:30', label: 'Boiler survey — Sarah T.', tag: '✓ Booked', timeLabel: 'Thu 5:30pm' }
      },
      messages: [
        { who: 'me', text: 'Hi Sarah, it\'s Ashworth Plumbing 🔧 We can survey your new boiler <b>Thu 5–6pm</b> or Sat AM — which suits?', time: '19:22' },
        { who: 'them', text: 'Thursday evening is perfect, cheers!' },
        { who: 'me', text: 'Booked for <b>Thursday 5:30pm</b>. I\'ll text a reminder that morning 👍', time: '19:29' }
      ]
    },
    meetingBrief: {
      summary: 'Ashworth Plumbing & Heating — Gas Safe, Manchester, 4.8★ (143 reviews). Already offers emergency call-out but misses overnight calls. Est. £27k/mo recoverable.',
      decisionMaker: 'James Ashworth (owner) — hands-on engineer, likely values time-saved over tech.',
      bestAngle: 'Overnight/weekend emergency capture + boiler-quote follow-up. They already sell "24/7" but can\'t answer 24/7 — close that gap.',
      objections: [
        '"We already do emergencies" → but who answers at 2am mid-job? AI does, every time.',
        '"Customers want to talk to a person" → AI reassures and books the engineer faster.',
        '"Another monthly bill" → one recovered boiler install covers a year.'
      ],
      discoveryQuestions: ['How many emergency calls come in out-of-hours?', 'What happens to a call at 10pm?', 'How many boiler quotes go cold?', 'Who does the CP12 admin and reminders?'],
      upsells: ['Landlord CP12 recurring-renewal automation', 'Reviews automation for Manchester ranking', 'Finance-option prompts on boiler quotes'],
      mention: ['9-field mobile form is losing enquiries', 'They advertise 24/7 but miss overnight calls', 'Founding pilot pricing'],
      avoid: ['Don\'t undersell the emergency angle', 'Don\'t promise exact revenue', 'Don\'t discount below pilot rate']
    }
  };

  return { d3c: d3c, ashworth: ashworth, all: [d3c, ashworth] };
});
