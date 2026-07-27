export type ServiceKey = 'portrait' | 'wedding' | 'event' | 'commercial' | 'engagement' | 'concierge'

export const studio37Reviews = [
  {
    name: 'Alice J.',
    service: 'Event',
    quote: 'Caitie and her husband make a great team. I am sooo happy that I hired them for my son\'s first birthday party. They were sweet and troopers for working an outside event with crazy rain.',
    detail: 'Birthday party coverage',
  },
  {
    name: 'Felipa Q.',
    service: 'Event',
    quote: 'The pictures and videos for my niece\'s quinceanera were so beautiful and you can tell that a lot of heart and effort was put into them. Both photographers are super nice and made my niece feel so comfortable.',
    detail: 'Quinceanera photo and video',
  },
  {
    name: 'Cassey E.',
    service: 'Event',
    quote: 'Christian and Katy are the best. They were full of energy at my son\'s party. They engaged fully with guests. Very professional and communicate well.',
    detail: 'Private party coverage',
  },
  {
    name: 'Ainslee C.',
    service: 'Portrait',
    quote: 'We had a smooth and seamless experience with Studio 37. We had a bit of cold weather to work around and they were very accommodating. So responsive, kind and professional.',
    detail: 'Outdoor portrait session',
  },
  {
    name: 'Ivana M.',
    service: 'Commercial',
    quote: 'I hired them for shots for my private business website. Everything went smooth. They created a relaxed atmosphere, made me feel at ease, and I had a lot of fun getting my pictures taken.',
    detail: 'Business website imagery',
  },
  {
    name: 'Kelsi R.',
    service: 'Family',
    quote: 'They captured beautiful generational photos of our family with so much care. They were flexible when we had cancellations with other vendors and took the time to bring our vision to life.',
    detail: 'Generational family photos',
  },
  {
    name: 'Joshua G.',
    service: 'Portrait',
    quote: 'They go above and beyond to get you the pictures you need, and even some you did not realize you wanted. Definitely recommend them if you want perfectly crafted and memorable photos.',
    detail: 'Directed portrait session',
  },
  {
    name: 'Lisa D.',
    service: 'Proposal',
    quote: 'They worked closely with the team at Moody Gardens to pull off an incredible surprise and then carefully found the perfect backgrounds for the family moments. They are truly professionals.',
    detail: 'Surprise proposal planning',
  },
  {
    name: 'Mansher G.',
    service: 'Family',
    quote: 'This was our first time doing a family shoot, and Studio 37 nailed it. They worked with us on short notice, brought lighting and other equipment, and made the experience seamless.',
    detail: 'Short-notice family session',
  },
  {
    name: 'Kimberly I.',
    service: 'Family',
    quote: 'Fantastic with kids and incredibly efficient.',
    detail: 'Kid-friendly session',
  },
]

export const localTrustReviews = [
  studio37Reviews[3],
  studio37Reviews[5],
  studio37Reviews[7],
  studio37Reviews[8],
  studio37Reviews[9],
].filter(Boolean)

export const recentWorkItems = [
  {
    title: 'Golden-Hour Engagement Session',
    service: 'Engagement',
    location: 'The Woodlands, TX',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1770033072/PS370397-1_ooxygn.jpg',
    alt: 'Studio37 golden-hour engagement photography session in The Woodlands Texas',
    note: 'Soft sunset portraits with location planning, relaxed direction, and save-the-date variety.',
    galleryUrl: 'https://gallery.studio37.cc',
    featured: true,
    order: 1,
  },
  {
    title: 'Private Proposal Coverage',
    service: 'Proposal',
    location: 'Montgomery County',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784795585/Untitled-160_convert.io_c7oit0.jpg',
    alt: 'Studio37 surprise proposal photography with concierge planning in Montgomery County Texas',
    note: 'A discreet reveal plan with privacy notes, portrait timing, and post-proposal gallery coverage.',
    galleryUrl: 'https://gallery.studio37.cc',
    featured: true,
    order: 2,
  },
  {
    title: 'Editorial Portrait Session',
    service: 'Portraits',
    location: 'Pinehurst, TX',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033088/PS379444_2_1_pge2hl.jpg',
    alt: 'Studio37 editorial portrait session in Pinehurst Texas',
    note: 'Clean direction, polished editing, and gallery-ready portrait variety.',
    featured: true,
    order: 3,
  },
  {
    title: 'Warm Family Session',
    service: 'Family',
    location: 'Montgomery County',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1779269044/Untitled-4-3_dvlcs6.jpg',
    alt: 'Warm Studio37 family photography session in Montgomery County Texas',
    note: 'Relaxed posing, detail coverage, and natural connection moments.',
    featured: true,
    order: 4,
  },
  {
    title: 'Commercial Brand Refresh',
    service: 'Commercial',
    location: 'Greater Houston',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255703/PS373409_pwmxmp.jpg',
    alt: 'Studio37 commercial brand photography refresh in Greater Houston',
    note: 'Business-ready images for web, social, profiles, and campaigns.',
    featured: true,
    order: 5,
  },
]

export const photoLocationIdeas: Record<string, Array<{ name: string; bestFor: string; note: string }>> = {
  'pinehurst-tx': [
    { name: 'Quiet neighborhood greenspaces', bestFor: 'family portraits', note: 'Good for relaxed sessions with easy parking and simple movement.' },
    { name: 'Magnolia corridor natural light', bestFor: 'seniors and couples', note: 'Soft tree cover and rural edges work well near golden hour.' },
    { name: 'Studio37 planning radius', bestFor: 'headshots and branding', note: 'We can pair a clean indoor setup with nearby outdoor portraits.' },
  ],
  'the-woodlands-tx': [
    { name: 'The Waterway area', bestFor: 'engagements and branding', note: 'Modern lines, walkable variety, and polished urban backdrops.' },
    { name: 'Town Green Park', bestFor: 'families and seniors', note: 'Open shade, greenery, and simple transitions between looks.' },
    { name: 'Market Street surroundings', bestFor: 'commercial portraits', note: 'Best for elevated business and editorial-style imagery.' },
  ],
  'conroe-tx': [
    { name: 'Downtown Conroe', bestFor: 'seniors and branding', note: 'Brick, storefronts, and walkable texture for personality-driven sessions.' },
    { name: 'Lake Conroe edges', bestFor: 'couples and families', note: 'Great for sunset, water, and relaxed lifestyle imagery.' },
    { name: 'Candy Cane Park area', bestFor: 'families', note: 'Practical outdoor space for movement-heavy sessions with kids.' },
  ],
  'magnolia-tx': [
    { name: 'Magnolia Stroll', bestFor: 'families and seniors', note: 'Small-town texture with easy pacing between portrait looks.' },
    { name: 'Unity Park', bestFor: 'kids and families', note: 'Casual greenery, natural light, and space for candid movement.' },
    { name: 'Rural-road backdrops', bestFor: 'engagements', note: 'Best planned around sunset with simple outfits and clean logistics.' },
  ],
  'tomball-tx': [
    { name: 'Downtown Tomball', bestFor: 'seniors and couples', note: 'Historic storefronts, streetscape texture, and walkable variety.' },
    { name: 'Kleb Woods area', bestFor: 'families', note: 'Natural greens and quieter outdoor options for relaxed sessions.' },
    { name: 'Main Street corridors', bestFor: 'branding', note: 'Good fit for local business portraits with a community feel.' },
  ],
  'spring-tx': [
    { name: 'Old Town Spring', bestFor: 'couples and seniors', note: 'Character-rich streets and varied backgrounds in a compact area.' },
    { name: 'Meyer Park', bestFor: 'family portraits', note: 'Open, approachable, and useful for active kids or extended families.' },
    { name: 'Pundt Park', bestFor: 'outdoor portraits', note: 'Natural paths and softer greenery for simple lifestyle sessions.' },
  ],
  'montgomery-tx': [
    { name: 'Historic Downtown Montgomery', bestFor: 'engagements and seniors', note: 'Small-town polish with easy walking and classic Texas texture.' },
    { name: 'Fernland Historical Park', bestFor: 'families and couples', note: 'Heritage feel, greenery, and quiet portrait pockets.' },
    { name: 'Lake Conroe area', bestFor: 'weddings and engagements', note: 'Best around sunset with a clear parking and access plan.' },
  ],
  'bryan-tx': [
    { name: 'Downtown Bryan', bestFor: 'seniors and branding', note: 'Murals, historic streets, and a strong editorial feel.' },
    { name: 'Lake Walk', bestFor: 'families and couples', note: 'Modern outdoor setting with water, paths, and clean light.' },
    { name: 'Messina Hof area', bestFor: 'weddings and engagements', note: 'Use as a style reference unless your venue access is confirmed.' },
  ],
  'college-station-tx': [
    { name: 'Texas A&M campus areas', bestFor: 'graduations', note: 'Plan around crowds, parking, and landmark timing.' },
    { name: 'Century Square', bestFor: 'seniors and branding', note: 'Modern lifestyle backdrops with easy transitions.' },
    { name: 'Research Park', bestFor: 'families and couples', note: 'Greenery and water features with a calmer feel.' },
  ],
}

export const venueStyleExamples: Record<'wedding' | 'event', Array<{ style: string; examples: string; planningNote: string }>> = {
  wedding: [
    { style: 'Chapel or church ceremony', examples: 'aisle moments, family formals, quiet prayer, exit coverage', planningNote: 'We build a photo timeline around ceremony rules, lighting limits, and family list size.' },
    { style: 'Ranch, estate, or outdoor venue', examples: 'wide property scenes, sunset portraits, reception candids, detail styling', planningNote: 'Access, walking distance, and weather backup matter most for these locations.' },
    { style: 'Downtown or hotel celebration', examples: 'getting-ready coverage, editorial couple portraits, ballroom reception, guest energy', planningNote: 'Elevators, parking, and room transitions are mapped before the wedding day.' },
  ],
  event: [
    { style: 'Corporate program or conference', examples: 'speakers, sponsor signage, VIPs, breakout rooms, audience reactions', planningNote: 'We prioritize shot lists, brand deliverables, and quick-turn highlight needs.' },
    { style: 'Private party or milestone celebration', examples: 'decor, guests, group photos, key moments, candid connection', planningNote: 'We keep coverage low-friction so guests feel present instead of staged.' },
    { style: 'Fundraiser, gala, or community event', examples: 'step-and-repeat, awards, donors, room energy, detail coverage', planningNote: 'Two photographers help cover simultaneous moments without slowing the event.' },
  ],
}

export const turnaroundByService: Record<ServiceKey, { sneakPeek: string; highlights: string; finalGallery: string; rush: string }> = {
  portrait: {
    sneakPeek: '24-hour sneak peeks are available as an add-on on eligible portrait sessions.',
    highlights: 'Best images are selected and edited for a polished portrait gallery.',
    finalGallery: 'Most portrait galleries are delivered in about three weeks.',
    rush: 'Rush delivery can be quoted when announcements, resumes, or campaigns have a deadline.',
  },
  wedding: {
    sneakPeek: 'Wedding previews typically arrive within 24-48 hours.',
    highlights: 'Highlight sets are prioritized for sharing with family and vendors.',
    finalGallery: 'Full wedding galleries are typically delivered in 3-6 weeks depending on coverage.',
    rush: 'Rush edits are available for announcements, thank-you cards, and publication needs.',
  },
  event: {
    sneakPeek: 'Event highlight previews can be added when a fast social or PR set matters.',
    highlights: 'PR, sponsor, and social-ready highlights are prioritized first.',
    finalGallery: 'Most event galleries are delivered within about three weeks.',
    rush: 'Same-day or next-day highlight delivery can be added for marketing teams.',
  },
  commercial: {
    sneakPeek: 'Commercial selects can be prioritized for review within 24-48 hours.',
    highlights: 'Campaign-ready hero images are edited before broader library delivery.',
    finalGallery: 'Most brand and product galleries deliver within 5-10 business days.',
    rush: 'Rush production is available for launches, ads, websites, and press deadlines.',
  },
  engagement: {
    sneakPeek: 'Engagement previews can be prioritized within 24-48 hours.',
    highlights: 'Save-the-date favorites and story images are edited first.',
    finalGallery: 'Most engagement galleries are delivered in about two weeks.',
    rush: 'Rush delivery can be quoted for announcements or invitations.',
  },
  concierge: {
    sneakPeek: 'Proposal previews can be prioritized quickly for family and social sharing.',
    highlights: 'Reveal, reaction, and portrait highlights are edited first.',
    finalGallery: 'Final delivery depends on photo/video scope and planning complexity.',
    rush: 'Rush photo and video highlights can be scoped during consultation.',
  },
}

export const testimonialsByService: Record<ServiceKey, Array<{ quote: string; name: string; context: string; source: string }>> = {
  portrait: [
    { quote: 'We had a smooth and seamless experience with Studio 37. So responsive, kind and professional.', name: 'Ainslee C.', context: 'Outdoor portrait session', source: 'Verified client review' },
    { quote: 'They go above and beyond to get you the pictures you need, and even some you did not realize you wanted.', name: 'Joshua G.', context: 'Directed portrait session', source: 'Verified client review' },
  ],
  wedding: [
    { quote: 'They guided us through the session and it felt flawless. I will use this company again.', name: 'Deborah B.', context: 'Guided coverage experience', source: 'Verified client review' },
    { quote: 'Very responsive to our wants and needs. They really took the time to get to know us and what we were looking for.', name: 'Lane G.', context: 'Planning and direction', source: 'Verified client review' },
  ],
  event: [
    { quote: 'They were full of energy at my son\'s party. They engaged fully with guests. Very professional and communicate well.', name: 'Cassey E.', context: 'Private party coverage', source: 'Verified client review' },
    { quote: 'The pictures and videos for my niece\'s quinceanera were so beautiful. Both photographers are super nice and made my niece feel so comfortable.', name: 'Felipa Q.', context: 'Quinceanera photo and video', source: 'Verified client review' },
  ],
  commercial: [
    { quote: 'I hired them for shots for my private business website. Everything went smooth and they created a relaxed atmosphere.', name: 'Ivana M.', context: 'Business website imagery', source: 'Verified client review' },
    { quote: 'They were very easy to work with and speak to when it came to grabbing the image I wanted.', name: 'Joshua G.', context: 'Image direction', source: 'Verified client review' },
  ],
  engagement: [
    { quote: 'Despite our shoot being very last minute, they were incredibly flexible and accommodating. They truly listened to what we wanted.', name: 'Astini S.', context: 'Couple session', source: 'Verified client review' },
    { quote: 'Wonderful experience. Catie and Christian were so nice and easy to work with.', name: 'Ally F.', context: 'Couple portraits', source: 'Verified client review' },
  ],
  concierge: [
    { quote: 'They worked closely with the team at Moody Gardens to pull off an incredible surprise and then carefully found the perfect backgrounds for the family moments.', name: 'Lisa D.', context: 'Surprise proposal planning', source: 'Verified client review' },
    { quote: 'They truly listened to what we wanted and made the whole experience relaxed and fun.', name: 'Astini S.', context: 'Last-minute couple session', source: 'Verified client review' },
  ],
}

export type PrepGuideKey = 'portrait' | 'wedding' | 'event' | 'commercial'

export const prepGuideDownloads: Record<PrepGuideKey, { title: string; summary: string; bullets: string[]; filename: string; serviceInterest: string }> = {
  portrait: {
    title: 'Portrait Prep Checklist',
    summary: 'A practical checklist for outfits, grooming, timing, kids, props, and gallery-ready portrait planning.',
    bullets: ['Choose 2-3 outfit options.', 'Plan grooming and touch-ups before arrival.', 'Bring meaningful props only when they support the story.', 'Arrive 10-15 minutes early.'],
    filename: 'studio37-portrait-prep-checklist.txt',
    serviceInterest: 'Portrait Prep Checklist download',
  },
  wedding: {
    title: 'Wedding Day Photo Prep',
    summary: 'A planning guide for family formals, detail items, vendor timing, ceremony rules, and reception priorities.',
    bullets: ['Finalize family formal list.', 'Share timeline and vendor contacts.', 'Gather rings, invitations, shoes, and detail items.', 'Build buffer time before ceremony and sunset portraits.'],
    filename: 'studio37-wedding-photo-prep.txt',
    serviceInterest: 'Wedding Day Photo Prep download',
  },
  event: {
    title: 'Event Coverage Planner',
    summary: 'A run-of-show and shot-priority guide for corporate events, parties, fundraisers, graduations, and milestones.',
    bullets: ['Confirm run-of-show and key people.', 'List sponsor, VIP, and signage priorities.', 'Share lighting or venue access notes.', 'Plan delivery needs for press or social posts.'],
    filename: 'studio37-event-coverage-planner.txt',
    serviceInterest: 'Event Coverage Planner download',
  },
  commercial: {
    title: 'Commercial Shoot Prep Guide',
    summary: 'A brand-session guide for usage, shot lists, product/team prep, staging, and campaign deliverables.',
    bullets: ['Define usage channels and image priorities.', 'Prepare shot list by product, team, space, and lifestyle.', 'Clean and stage work areas.', 'Gather brand guidelines and campaign references.'],
    filename: 'studio37-commercial-shoot-prep.txt',
    serviceInterest: 'Commercial Shoot Prep Guide download',
  },
}
