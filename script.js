/* ══════════════════════════════════════════════
   Prestige Estates — Main JavaScript
   ══════════════════════════════════════════════ */

// ── Loader ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 900);
});

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Hamburger ──
const hamBtn = document.getElementById('ham-btn');
const mobileMenu = document.getElementById('mobile-menu');
hamBtn.addEventListener('click', () => {
  hamBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
// Close on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── Reveal on scroll ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ── Counter animation ──
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString() + '+';
        if (current >= target) clearInterval(timer);
      }, 25);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// ── Property filter ──
function filterProps(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active-filter', 'bg-navy', 'text-white', 'border-navy');
    b.classList.add('border-gray-300', 'text-gray-600');
  });
  btn.classList.add('active-filter', 'bg-navy', 'text-white', 'border-navy');
  btn.classList.remove('border-gray-300', 'text-gray-600');

  document.querySelectorAll('#props-grid .property-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat.includes(cat)) {
      card.style.display = 'block';
      card.style.animation = 'fadeIn 0.4s ease';
    } else {
      card.style.display = 'none';
    }
  });
}
// Init active style
document.querySelector('.filter-btn').classList.add('bg-navy', 'text-white', 'border-navy');

// ── Testimonial slider ──
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots   = document.querySelectorAll('.dot');

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('bg-gold');
  dots[currentSlide].classList.add('bg-gold/30');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('bg-gold');
  dots[currentSlide].classList.remove('bg-gold/30');
}

// Auto-advance
setInterval(() => {
  goToSlide((currentSlide + 1) % slides.length);
}, 5000);

// ── Contact form ──
function submitForm(e) {
  e.preventDefault();
  document.getElementById('contact-form').style.display = 'none';
  document.getElementById('form-success').classList.remove('hidden');
}

// ── Back to top ──
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    btt.style.opacity = '1';
    btt.style.pointerEvents = 'auto';
  } else {
    btt.style.opacity = '0';
    btt.style.pointerEvents = 'none';
  }
});

/* ══════════════════════════════════════════════
   PROPERTY DETAIL MODAL
   ══════════════════════════════════════════════ */

const PROPERTIES = {
  1: {
    title: 'The Meridian Residence',
    location: 'Beverly Hills, California',
    price: '$4,850,000',
    priceLabel: 'Asking Price',
    estMortgage: '~$22,400 / mo',
    status: 'For Sale',
    tags: ['For Sale', 'Luxury'],
    tagColors: ['#c9a96e', '#0f172a'],
    beds: 5, baths: 4, sqft: '4,200', garage: '3-Car', pool: 'Yes', year: '2019',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85&auto=format&fit=crop',
    ],
    description: `Nestled in the prestigious hills of Beverly Hills, The Meridian Residence is a masterclass in contemporary luxury. Designed by award-winning architects, the home seamlessly blends indoor and outdoor living with floor-to-ceiling glass walls that frame sweeping canyon views. The chef's kitchen features Miele appliances, custom walnut cabinetry, and an oversized marble island. The primary suite is a sanctuary unto itself - complete with a spa-like bath, dual walk-in closets, and a private terrace. Smart home technology controls lighting, climate, and security throughout.`,
    amenities: ['🏊 Infinity Pool', '🎭 Home Theater', '🍷 Wine Cellar', '🏋️ Fitness Room', '🌿 Landscaped Gardens', '🔒 Smart Security', '☀️ Solar Panels', '🚗 3-Car Garage', '🔥 Outdoor Fireplace', '📡 Smart Home System', '🛁 Spa Bathroom', '🍽️ Outdoor Kitchen'],
    details: [
      ['Property Type', 'Single Family Home'],
      ['Style', 'Modern Contemporary'],
      ['Lot Size', '12,500 sqft'],
      ['HOA Fees', '$850/month'],
      ['Taxes (Annual)', '$48,200'],
      ['MLS #', 'PE-2026-001'],
      ['Status', 'Active'],
      ['Days on Market', '14'],
    ],
    neighborhood: `Beverly Hills offers one of the most prestigious addresses in the world. World-class dining, luxury shopping on Rodeo Drive, and top-rated schools make this neighborhood perennially sought after by discerning buyers.`,
    scores: [
      { label: 'Walk Score', score: 72 },
      { label: 'Transit Score', score: 58 },
      { label: 'School Rating', score: 95 },
      { label: 'Safety Index', score: 88 },
    ],
    agent: { name: 'Alexander Reed', title: 'Founding Partner', phone: '+1 (310) 555-0101', email: 'a.reed@prestigeestates.com', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop&crop=face' },
  },
  2: {
    title: 'Azure Sky Penthouse',
    location: 'Manhattan, New York',
    price: '$18,500 / mo',
    priceLabel: 'Monthly Rent',
    estMortgage: 'Utilities not included',
    status: 'For Rent',
    tags: ['For Rent', 'New'],
    tagColors: ['#c9a96e', '#0f172a'],
    beds: 3, baths: 3, sqft: '2,800', garage: 'Valet', pool: 'Rooftop', year: '2022',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85&auto=format&fit=crop',
    ],
    description: `Perched on the 52nd floor of Midtown Manhattan, Azure Sky Penthouse redefines urban living. With 270-degree panoramic views of the skyline, Central Park, and the Hudson River, every moment here feels cinematic. The open-plan living area features 12-foot ceilings, custom herringbone hardwood floors, and a bespoke Italian kitchen. Three en-suite bedrooms offer spa-level finishes, while private terraces provide rare outdoor space in the sky. Building amenities include a rooftop infinity pool, concierge, fitness center, and private screening room.`,
    amenities: ['🌆 Panoramic Views', '🏊 Rooftop Pool', '🏋️ Fitness Center', '🎬 Screening Room', '🚪 24/7 Doorman', '🅿️ Valet Parking', '🐕 Pet Friendly', '📦 Package Concierge', '🛗 Private Elevator', '🛁 Soaking Tub', '❄️ Climate Control', '🔑 Keyless Entry'],
    details: [
      ['Property Type', 'Penthouse'],
      ['Floor', '52nd'],
      ['Building', 'Azure Tower'],
      ['Lease Term', '12+ Months'],
      ['Pet Policy', 'Allowed (Deposit)'],
      ['MLS #', 'PE-2026-002'],
      ['Availability', 'March 15, 2026'],
      ['Furnished', 'Optional'],
    ],
    neighborhood: `Midtown Manhattan places you at the center of the world. Steps from Central Park, world-class restaurants, Broadway theaters, and major transit hubs - 5th Avenue, Times Square, and the High Line are all at your doorstep.`,
    scores: [
      { label: 'Walk Score', score: 98 },
      { label: 'Transit Score', score: 100 },
      { label: 'School Rating', score: 82 },
      { label: 'Safety Index', score: 76 },
    ],
    agent: { name: 'Sophia Martinez', title: 'Senior Sales Director', phone: '+1 (212) 555-0202', email: 's.martinez@prestigeestates.com', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80&auto=format&fit=crop&crop=face' },
  },
  3: {
    title: 'Coral Vista Estate',
    location: 'Coral Gables, Miami',
    price: '$7,200,000',
    priceLabel: 'Asking Price',
    estMortgage: '~$34,100 / mo',
    status: 'For Sale',
    tags: ['For Sale', 'Hot'],
    tagColors: ['#c9a96e', '#c0392b'],
    beds: 6, baths: 5, sqft: '5,600', garage: '4-Car', pool: 'Yes', year: '2017',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85&auto=format&fit=crop',
    ],
    description: `A stunning Mediterranean-inspired estate set on a private waterfront lot in the exclusive Coral Gables neighborhood. Coral Vista Estate features soaring arched ceilings, original terrazzo floors, and a main living area that opens directly to a resort-style pool deck and 80-foot private dock. The gourmet kitchen is appointed with Sub-Zero and Wolf appliances, a butler's pantry, and summer kitchen. Six bedroom suites - including a lavish mother-in-law suite - make it perfect for multi-generational living or elegant entertaining.`,
    amenities: ['⛵ Private Dock', '🌊 Waterfront', '🏊 Resort Pool', '🤿 Summer Kitchen', '🎪 Entertainment Deck', '🌴 Tropical Gardens', '🔐 Gated Entry', '🚗 4-Car Garage', '🍷 Wine Cellar', '🎬 Media Room', '🧖 Spa Room', '⚡ Generator'],
    details: [
      ['Property Type', 'Waterfront Estate'],
      ['Waterfront', 'Canal — Bay Access'],
      ['Lot Size', '18,200 sqft'],
      ['HOA Fees', 'None'],
      ['Taxes (Annual)', '$72,400'],
      ['MLS #', 'PE-2026-003'],
      ['Status', 'Active'],
      ['Days on Market', '5'],
    ],
    neighborhood: `Coral Gables is Miami's crown jewel - a lushly canopied city of Mediterranean architecture, Miracle Mile dining, the iconic Venetian Pool, and the University of Miami. Brickell's financial district is just 10 minutes away.`,
    scores: [
      { label: 'Walk Score', score: 65 },
      { label: 'Transit Score', score: 48 },
      { label: 'School Rating', score: 91 },
      { label: 'Safety Index', score: 85 },
    ],
    agent: { name: 'Sophia Martinez', title: 'Senior Sales Director', phone: '+1 (305) 555-0303', email: 's.martinez@prestigeestates.com', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80&auto=format&fit=crop&crop=face' },
  },
  4: {
    title: 'Park View Loft',
    location: 'Lincoln Park, Chicago',
    price: '$6,800 / mo',
    priceLabel: 'Monthly Rent',
    estMortgage: 'Heat & water included',
    status: 'For Rent',
    tags: ['For Rent', 'New'],
    tagColors: ['#c9a96e', '#0f172a'],
    beds: 2, baths: 2, sqft: '1,900', garage: '1-Car', pool: 'No', year: '2021',
    images: [
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85&auto=format&fit=crop',
    ],
    description: `An industrial-chic loft perched directly above Lincoln Park, one of Chicago's most beloved green spaces. Exposed concrete ceilings, original factory windows, and a striking open floor plan create a space that's both dramatic and liveable. The chef-grade kitchen features Bosch appliances and a waterfall-edge island. Both bedrooms have floor-to-ceiling park views, and the primary suite boasts a walk-in closet and designer en-suite bath. In-unit laundry, private rooftop terrace access, and garage parking complete this rare urban retreat.`,
    amenities: ['🌳 Park Views', '🏋️ Fitness Center', '🛗 Private Elevator', '🐕 Dog Friendly', '🅿️ Garage Parking', '🌀 In-Unit Laundry', '🏙️ Rooftop Terrace', '🔒 Secure Building', '📦 Package Room', '♻️ Recycling', '❄️ Central A/C', '🔥 Gas Fireplace'],
    details: [
      ['Property Type', 'Luxury Loft'],
      ['Floor', '8th'],
      ['Building', 'Greenfield Lofts'],
      ['Lease Term', '12 Months'],
      ['Pet Policy', 'Cats & Dogs OK'],
      ['MLS #', 'PE-2026-004'],
      ['Availability', 'Immediate'],
      ['Parking', 'Included'],
    ],
    neighborhood: `Lincoln Park is Chicago's most desirable neighborhood - tree-lined streets, the famous zoo, North Avenue Beach, and a walkable strip of boutiques and Michelin-starred restaurants. The Red Line puts downtown at your fingertips.`,
    scores: [
      { label: 'Walk Score', score: 94 },
      { label: 'Transit Score', score: 87 },
      { label: 'School Rating', score: 78 },
      { label: 'Safety Index', score: 80 },
    ],
    agent: { name: 'Emily Hartwell', title: 'Relocation Specialist', phone: '+1 (312) 555-0404', email: 'e.hartwell@prestigeestates.com', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&auto=format&fit=crop&crop=face' },
  },
  5: {
    title: 'Ocean Cliff House',
    location: 'Malibu, California',
    price: '$6,100,000',
    priceLabel: 'Asking Price',
    estMortgage: '~$28,900 / mo',
    status: 'For Sale',
    tags: ['For Sale'],
    tagColors: ['#c9a96e'],
    beds: 4, baths: 3, sqft: '3,450', garage: '2-Car', pool: 'Yes', year: '2015',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85&auto=format&fit=crop',
    ],
    description: `Dramatically positioned on the Malibu cliffs, Ocean Cliff House delivers one of the most breathtaking settings on the California coast. Every room in this architect-designed retreat faces the Pacific Ocean, with terraces and decks at multiple levels allowing you to experience the sea, surf, and sunsets in complete privacy. The open living pavilion features seagrass walls, limestone floors, and a double-sided fireplace. The primary suite spans the entire top floor with a soaking tub positioned to capture the horizon.`,
    amenities: ['🌊 Oceanfront', '🏊 Infinity Pool', '🔥 Dual Fireplace', '🌅 Multiple Terraces', '🏄 Surf Access', '🌿 Native Landscaping', '☀️ Solar Array', '🚗 2-Car Garage', '🛁 Soaking Tub', '🍽️ Outdoor Dining', '📡 Smart Home', '🔒 Gated Entry'],
    details: [
      ['Property Type', 'Single Family Home'],
      ['Frontage', 'Direct Ocean'],
      ['Lot Size', '9,800 sqft'],
      ['HOA Fees', 'None'],
      ['Taxes (Annual)', '$61,000'],
      ['MLS #', 'PE-2026-005'],
      ['Status', 'Active'],
      ['Days on Market', '21'],
    ],
    neighborhood: `Malibu is synonymous with the California dream - 21 miles of pristine coastline, celebrity neighbors, world-class surf breaks, and the Santa Monica Mountains as a backdrop. The Pacific Coast Highway connects you to Santa Monica and LA in under 45 minutes.`,
    scores: [
      { label: 'Walk Score', score: 28 },
      { label: 'Transit Score', score: 20 },
      { label: 'School Rating', score: 86 },
      { label: 'Safety Index', score: 90 },
    ],
    agent: { name: 'Alexander Reed', title: 'Founding Partner', phone: '+1 (310) 555-0505', email: 'a.reed@prestigeestates.com', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop&crop=face' },
  },
  6: {
    title: 'The Hamptons Manor',
    location: 'Hamptons, New York',
    price: '$12,500,000',
    priceLabel: 'Asking Price',
    estMortgage: '~$59,200 / mo',
    status: 'For Sale',
    tags: ['For Sale', 'Exclusive'],
    tagColors: ['#c9a96e', '#0f172a'],
    beds: 7, baths: 6, sqft: '8,100', garage: '4-Car', pool: 'Yes', year: '2012',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop',
    ],
    description: `The Hamptons Manor is a rare jewel of East Coast grandeur - a shingle-style estate set on 3.2 acres of manicured Hamptons grounds. Designed in the tradition of the great Gatsby-era summer cottages, the manor features 7 en-suite bedrooms, a grand staircase entry hall, formal dining for 24, a library, billiards room, and professional chef's kitchen. The grounds include a 60-foot pool, clay tennis court, putting green, and a private pond with a dock. The guest house offers two additional bedrooms with full kitchen facilities.`,
    amenities: ['🎾 Tennis Court', '🏊 60ft Pool', '⛳ Putting Green', '🎭 Billiards Room', '📚 Library', '🍷 Wine Cellar', '🏡 Guest House', '🌿 Pond & Dock', '🚗 4-Car Garage', '🔒 Full Security', '🌳 3.2 Acres', '🔥 Multiple Fireplaces'],
    details: [
      ['Property Type', 'Estate'],
      ['Style', 'Shingle-Style Manor'],
      ['Lot Size', '3.2 Acres'],
      ['Guest House', 'Yes — 2BR/2BA'],
      ['Taxes (Annual)', '$124,000'],
      ['MLS #', 'PE-2026-006'],
      ['Status', 'Off-Market / Exclusive'],
      ['Days on Market', '—'],
    ],
    neighborhood: `The Hamptons is the ultimate New York escape - pristine Atlantic beaches, legendary summer social scene, award-winning vineyards, and farm stands lining the roads to Montauk. Southampton Village, with its designer boutiques and fine dining, is 5 minutes away.`,
    scores: [
      { label: 'Walk Score', score: 22 },
      { label: 'Transit Score', score: 15 },
      { label: 'School Rating', score: 88 },
      { label: 'Safety Index', score: 93 },
    ],
    agent: { name: 'David Chen', title: 'Investment Advisor', phone: '+1 (631) 555-0606', email: 'd.chen@prestigeestates.com', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format&fit=crop&crop=face' },
  },
};

// gallery state
let currentGalleryIndex = 0;
let currentGalleryImages = [];

function openProperty(id) {
  const p = PROPERTIES[id];
  if (!p) return;

  // Populate basic
  document.getElementById('pm-breadcrumb').textContent = p.title;
  document.getElementById('pm-title').textContent = p.title;
  document.getElementById('pm-location').textContent = p.location;
  document.getElementById('pm-price').textContent = p.price;
  document.getElementById('pm-price-label').textContent = p.priceLabel;
  document.getElementById('pm-est').textContent = p.estMortgage;
  document.getElementById('pm-beds').textContent = p.beds;
  document.getElementById('pm-baths').textContent = p.baths;
  document.getElementById('pm-sqft').textContent = p.sqft + ' ft²';
  document.getElementById('pm-garage').textContent = p.garage;
  document.getElementById('pm-pool').textContent = p.pool;
  document.getElementById('pm-year').textContent = p.year;
  document.getElementById('pm-desc').textContent = p.description;
  document.getElementById('pm-neighborhood').textContent = p.neighborhood;

  // Badges
  const badgesEl = document.getElementById('pm-badges');
  badgesEl.innerHTML = p.tags.map((t, i) =>
    `<span class="badge-tag" style="background:${p.tagColors[i]}">${t}</span>`
  ).join('');

  // Gallery
  currentGalleryImages = p.images;
  currentGalleryIndex = 0;
  renderGallery();

  // Amenities
  document.getElementById('pm-amenities').innerHTML = p.amenities.map(a => {
    const parts = a.split(' ');
    const icon = parts[0];
    const label = parts.slice(1).join(' ');
    return `<div class="prop-amenity-item"><span>${icon}</span><span>${label}</span></div>`;
  }).join('');

  // Details table
  document.getElementById('pm-details-table').innerHTML = p.details.map(([k, v]) =>
    `<div class="prop-detail-row"><div class="prop-detail-key">${k}</div><div class="prop-detail-val">${v}</div></div>`
  ).join('');

  // Scores
  document.getElementById('pm-scores').innerHTML = p.scores.map(s =>
    `<div class="flex items-center gap-3">
      <span class="text-xs text-gray-500 w-28">${s.label}</span>
      <div class="score-bar-track"><div class="score-bar-fill" style="width:0%" data-width="${s.score}%"></div></div>
      <span class="text-xs font-semibold text-navy w-8">${s.score}</span>
    </div>`
  ).join('');

  // Agent
  document.getElementById('pm-agent-name').textContent = p.agent.name;
  document.getElementById('pm-agent-title').textContent = p.agent.title;
  document.getElementById('pm-agent-phone').textContent = p.agent.phone;
  document.getElementById('pm-agent-email').textContent = p.agent.email;
  document.getElementById('pm-agent-photo').src = p.agent.photo;

  // Reset sidebar form
  document.querySelector('#prop-modal form').style.display = '';
  document.getElementById('sidebar-form-success').classList.add('hidden');

  // Open modal
  const overlay = document.getElementById('prop-modal');
  overlay.classList.add('open');
  document.body.classList.add('modal-open');

  // Animate score bars after a tick
  setTimeout(() => {
    overlay.querySelectorAll('.score-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }, 300);

  // Scroll panel to top
  document.getElementById('prop-panel').scrollTo({ top: 0 });
}

function renderGallery() {
  const imgs = currentGalleryImages;
  const mainImg = document.getElementById('pm-main-img');
  mainImg.style.opacity = '0';
  setTimeout(() => {
    mainImg.src = imgs[currentGalleryIndex];
    mainImg.style.opacity = '1';
  }, 150);

  document.getElementById('pm-img-current').textContent = currentGalleryIndex + 1;
  document.getElementById('pm-img-total').textContent = imgs.length;

  // Thumbs
  const thumbsEl = document.getElementById('pm-thumbs');
  thumbsEl.innerHTML = imgs.map((src, i) =>
    `<div class="prop-thumb ${i === currentGalleryIndex ? 'active' : ''}" onclick="goToImage(${i})">
       <img src="${src}" alt="Thumbnail ${i+1}" loading="lazy"/>
     </div>`
  ).join('');
}

function goToImage(n) {
  currentGalleryIndex = n;
  renderGallery();
}

function galleryPrev() {
  currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  renderGallery();
}

function galleryNext() {
  currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
  renderGallery();
}

function closePropModal() {
  document.getElementById('prop-modal').classList.remove('open');
  document.body.classList.remove('modal-open');
}

function closePropModalOutside(e) {
  if (e.target === document.getElementById('prop-modal')) closePropModal();
}

function sidebarFormSubmit(e) {
  e.preventDefault();
  e.target.style.display = 'none';
  document.getElementById('sidebar-form-success').classList.remove('hidden');
}

// Keyboard: Escape closes modal, arrow keys navigate gallery
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('prop-modal');
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') closePropModal();
  if (e.key === 'ArrowLeft') galleryPrev();
  if (e.key === 'ArrowRight') galleryNext();
});
