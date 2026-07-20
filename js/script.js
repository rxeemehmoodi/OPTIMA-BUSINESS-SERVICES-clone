/* ============ HERO SLIDER ============ */
const slides = document.querySelectorAll('.slide');
const dotsWrap = document.getElementById('dotsWrap');
let current = 0;
let heroTimer;

if (slides.length && dotsWrap) {
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { goToSlide(i); resetHeroTimer(); });
    dotsWrap.appendChild(dot);
  });
}
const dots = document.querySelectorAll('.dots span');

function goToSlide(i) {
  slides[current].classList.remove('active');
  if (dots[current]) dots[current].classList.remove('active');
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
  if (dots[current]) dots[current].classList.add('active');
}
function resetHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToSlide(current + 1), 5000);
}
document.getElementById('prevSlide')?.addEventListener('click', () => { goToSlide(current - 1); resetHeroTimer(); });
document.getElementById('nextSlide')?.addEventListener('click', () => { goToSlide(current + 1); resetHeroTimer(); });
if (slides.length) resetHeroTimer();

/* ============ MOBILE NAV ============ */
const hambBtn = document.getElementById('hambBtn');
const mainMenu = document.getElementById('mainMenu');

hambBtn?.addEventListener('click', () => {
  mainMenu.classList.toggle('open');
});

// On mobile, tapping a "has-mega" top level item toggles its dropdown instead of navigating
document.querySelectorAll('nav.menu > ul > li.has-mega').forEach(li => {
  li.addEventListener('click', function (e) {
    if (window.innerWidth <= 980) {
      // only toggle if the click was on the label itself, not a link inside the megamenu
      if (e.target === li || e.target.classList.contains('caret')) {
        const mega = li.querySelector('.megamenu');
        mega.classList.toggle('mobile-open');
      }
    }
  });
});


/* ============ ROUTER ============ */
const pageHome = document.getElementById('page-home');
const pageContact = document.getElementById('page-contact');
const pageGeneric = document.getElementById('page-generic');

const IMAGES = [
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&q=80',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=80',
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1000&q=80'
];

const PAGES = {
  'mainland-overview': {
    crumb: 'Business Setup / Mainland', title: 'Mainland Overview',
    intro: 'A Dubai Mainland company license, issued by the Department of Economy and Tourism (DET), lets you trade anywhere in the UAE and internationally with no restriction on business activity.',
    points: ['Trade directly in the local UAE market with no restrictions', 'Access government and semi-government contracts', 'Unlimited visa eligibility based on office size', '100% foreign ownership available on most activities', 'Open a corporate bank account with any UAE bank'],
    side: 'Talk to a Optima mainland specialist about the right license and activity combination for your business.'
  },
  'sponsorship': {
    crumb: 'Business Setup / Mainland', title: 'Local Sponsorship Services',
    intro: 'Certain mainland activities still require a UAE national local service agent or sponsor. Optima arranges vetted, professional sponsorship agreements that protect your ownership and control.',
    points: ['Transparent, fixed annual sponsorship fee', 'No involvement in day-to-day operations or profits', 'Legally drafted MOA & side agreements', 'Ongoing renewal handled on your behalf'],
    side: 'We match you with a reliable local sponsor within days.'
  },
  'mainland-licenses': {
    crumb: 'Business Setup / Mainland', title: 'Mainland Licenses',
    intro: 'We help you choose and register the correct Dubai mainland license type for your activity — commercial, professional, industrial, or tourism.',
    points: ['Commercial License — trading and general business activities', 'Professional License — consultancy and service activities', 'Industrial License — manufacturing and production', 'Tourism License — travel and hospitality operators'],
    side: 'Not sure which license fits your activity? Send us your business plan for a free review.'
  },
  'business-activities': {
    crumb: 'Business Setup / Mainland', title: 'Business Activities',
    intro: 'Dubai mainland allows over 3,000 approved business activities across trading, professional, and industrial categories. We help you pick the exact activity codes DET requires.',
    points: ['Single or multiple activities under one license', 'Activity-specific approvals from relevant authorities', 'Guidance on activities requiring external NOCs', 'Future-proofing your license for expansion'],
    side: 'Tell us what your business does — we will confirm the matching official activity codes.'
  },
  'optima-best-offers': {
    crumb: 'Business Setup', title: 'Optima Best Offers',
    intro: 'Seasonal packages that bundle license, visa, and banking support at a fixed, transparent price — no hidden costs.',
    points: ['Free zone license from AED 5,500/year', 'Mainland license from AED 8,500/year', 'Free basic website with domain & hosting on every package', 'Free WIO bank account opening assistance'],
    side: 'Offers are updated monthly — contact us for the current promotion.'
  },
  'professional-trade-license': {
    crumb: 'Business Setup / Mainland', title: 'Professional Trade License',
    intro: 'Designed for consultants, freelancers, and service providers who want 100% ownership without a local service agent share in profits.',
    points: ['100% foreign ownership', 'Ideal for consultancy, IT, marketing & creative services', 'Lower setup and renewal cost vs. commercial license', 'Fast issuance, typically within a few working days'],
    side: 'Get a same-day cost estimate for your professional license.'
  },
  'commercial-trade-license': {
    crumb: 'Business Setup / Mainland', title: 'Commercial Trade License',
    intro: 'For businesses trading goods, import/export, or general commercial activities across the UAE and abroad.',
    points: ['Covers trading, general stores, and import-export activities', 'Enables customs code registration', 'Supports multiple related activities under one license', 'Eligible for investor and partner visas'],
    side: 'Ask us about combining your commercial license with a warehouse or showroom lease.'
  },
  'freezone-overview': {
    crumb: 'Business Setup / Free Zone', title: 'Free Zone Overview',
    intro: 'The UAE has more than 50 free zones, each with its own cost structure, permitted activities, and visa quota. Optima compares them for you and recommends the best fit.',
    points: ['100% foreign ownership in every free zone', '0% corporate and personal income tax on qualifying income', 'No customs duty within the free zone', 'Repatriate 100% of capital and profits'],
    side: 'Answer 3 quick questions on WhatsApp and we will shortlist the best free zone for you.'
  },
  'ifza-free-zone': {
    crumb: 'Business Setup / Free Zone', title: 'IFZA Free Zone (Dubai)',
    intro: 'International Free Zone Authority (IFZA) in Dubai is one of the most cost-effective and popular free zones for consultancy, trading, and holding companies.',
    points: ['Packages starting from a low annual cost', 'Wide range of approved business activities', 'Flexi-desk and physical office options', 'Fast license issuance, typically 3–5 working days'],
    side: 'Get the latest IFZA package pricing and visa quota options.'
  },
  'meydan-free-zone': {
    crumb: 'Business Setup / Free Zone', title: 'Meydan Free Zone Dubai',
    intro: 'Meydan Free Zone offers a prestigious Dubai address with flexible visa packages, popular with trading, media, and consultancy businesses.',
    points: ['Central Dubai business address', 'Multiple visa allocation options', 'Wide activity list including e-commerce', 'Easy renewal process'],
    side: 'Ask about Meydan bundled visa + license packages.'
  },
  'shams-free-zone': {
    crumb: 'Business Setup / Free Zone', title: 'SHAMS Free Zone – Sharjah',
    intro: 'Sharjah Media City (SHAMS) is a cost-efficient free zone ideal for media, creative, and consultancy businesses looking to serve the wider UAE market.',
    points: ['Competitive setup cost', 'No paid-up share capital requirement', 'Media, marketing & consultancy focused activities', 'Remote incorporation available'],
    side: 'SHAMS packages are among the most affordable in the UAE — ask for a quote.'
  },
  'hamriyah-free-zone': {
    crumb: 'Business Setup / Free Zone', title: 'Hamriyah Free Zone',
    intro: 'Hamriyah Free Zone in Sharjah is well suited for industrial, trading, and logistics businesses, with access to a deep-water port.',
    points: ['Industrial and warehousing facilities available', 'Deep-water port access for shipping & logistics', 'Competitive land and warehouse lease rates', 'Suitable for manufacturing licenses'],
    side: 'Looking for warehouse or industrial land? We can arrange a site visit.'
  },
  'spc-free-zone': {
    crumb: 'Business Setup / Free Zone', title: 'SPC Free Zone – Sharjah',
    intro: 'Sharjah Publishing City (SPC) Free Zone offers budget-friendly licenses covering a broad range of activities beyond publishing.',
    points: ['Affordable annual package pricing', 'Broad activity list including trading & consultancy', 'Dual license option to operate in mainland too', 'Quick digital incorporation process'],
    side: 'SPC also offers a dual license — ask us how it works.'
  },
  'srtip': {
    crumb: 'Business Setup / Free Zone', title: 'Sharjah Research Technology and Innovation Park',
    intro: 'SRTIP is designed for technology, R&D, and innovation-driven companies, offering access to labs, incubators, and research partnerships.',
    points: ['Focused on tech, R&D and innovation companies', 'Access to shared labs and incubation support', 'Partnerships with research institutions', 'Attractive for startups and scale-ups'],
    side: 'Building a tech or R&D company? SRTIP may unlock grants and lab access.'
  },
  'bank-account-opening': {
    crumb: 'Services / Essential', title: 'Bank Account Opening',
    intro: 'Opening a corporate bank account in the UAE can be one of the trickiest steps after incorporation. Optima prepares your file and introduces you directly to relationship managers.',
    points: ['Document preparation & compliance review', 'Introductions to leading UAE banks and digital banks (e.g. WIO)', 'Support with KYC and source-of-funds questions', 'Faster approval through pre-vetted applications'],
    side: 'Most clients receive account approval within 2–4 weeks with our support.'
  },
  'document-attestation': {
    crumb: 'Services / Essential', title: 'Document Attestation',
    intro: 'We handle attestation of degrees, commercial documents, and powers of attorney through MOFA and relevant embassies so your paperwork is accepted across the UAE.',
    points: ['Educational & professional certificate attestation', 'Commercial document and MOA attestation', 'MOFA and embassy coordination', 'Tracked, time-bound turnaround'],
    side: 'Send us a scan of your document for an attestation cost & time estimate.'
  },
  'accounting-services': {
    crumb: 'Services / Essential', title: 'Accounting Services',
    intro: 'Stay compliant with UAE bookkeeping and reporting requirements with monthly, quarterly, or annual accounting support from our finance team.',
    points: ['Monthly bookkeeping and reconciliation', 'Financial statement preparation', 'Payroll processing support', 'Audit-ready reporting'],
    side: 'Bundle accounting with VAT filing for a discounted monthly rate.'
  },
  'compliance-services': {
    crumb: 'Services / Essential', title: 'Compliance Services (VAT, ESR, UBO, AML)',
    intro: 'UAE companies must meet VAT, Economic Substance Regulations (ESR), Ultimate Beneficial Owner (UBO), and Anti-Money Laundering (goAML) obligations. We manage the full compliance calendar for you.',
    points: ['VAT registration & quarterly filing', 'Economic Substance Regulations (ESR) notifications & reports', 'UBO register filing and updates', 'goAML registration for regulated activities'],
    side: 'Missed a compliance deadline? We can help you regularize your status.'
  },
  'investor-employee-visa': {
    crumb: 'Services / Support', title: 'Investor / Employee Visa',
    intro: 'From investor visas for shareholders to employment visas for your staff, Optima manages the entire visa lifecycle — application, medical, Emirates ID, and stamping.',
    points: ['Investor (partner) visa processing', 'Employment visa quota management', 'Medical test & Emirates ID coordination', 'Visa renewal and cancellation handling'],
    side: 'Visa timelines usually take 7–10 working days once documents are ready.'
  },
  'golden-visa': {
    crumb: 'Services / Support', title: 'Golden Visa',
    intro: 'The UAE Golden Visa gives eligible investors, entrepreneurs, and professionals a long-term (5 or 10-year) residency without needing a national sponsor.',
    points: ['Long-term 5 or 10-year residency', 'No local sponsor required', 'Eligibility review for investors, founders & specialists', 'Family sponsorship options included'],
    side: 'Check your Golden Visa eligibility with a free document review.'
  },
  'tourist-visa': {
    crumb: 'Services / Support', title: 'Tourist Visa',
    intro: 'Short-term UAE tourist visas for business visitors, family, and partners planning to explore setup options in person.',
    points: ['30 and 60-day tourist visa options', 'Fast digital processing', 'Extension and status change assistance', 'Support for multiple nationalities'],
    side: 'Planning a scouting trip to Dubai? We can arrange your visa in advance.'
  },
  'pro-services': {
    crumb: 'Services / Support', title: 'PRO Services',
    intro: 'Our Public Relations Officer (PRO) team handles the government paperwork — labor cards, immigration filings, and notarizations — so you never have to queue at a government office.',
    points: ['Labor card & establishment card processing', 'Immigration file setup and amendments', 'Notary and legal document submission', 'Ongoing government liaison'],
    side: 'A dedicated PRO can be assigned to your account for recurring government tasks.'
  },
  'it-services': {
    crumb: 'Services / Operational', title: 'IT Services',
    intro: 'From company websites to internal systems, our IT team supports the digital side of your UAE business setup.',
    points: ['Website design & hosting', 'Domain and business email setup', 'Basic digital marketing setup', 'Ongoing technical support'],
    side: 'Every Optima package includes a free basic website with domain & hosting.'
  },
  'user-login-portal': {
    crumb: 'Services / Operational', title: 'User Login Portal',
    intro: 'Track your application status, download documents, and message your case manager through the Optima client portal.',
    points: ['Real-time application status tracking', 'Secure document upload & download', 'Direct messaging with your case manager', 'Renewal reminders and notifications'],
    side: 'Portal access is provided once your onboarding is confirmed.'
  },
  'setup-guide': {
    crumb: 'Resources', title: 'Business Setup Guide',
    intro: 'A step-by-step walkthrough of how company formation works in the UAE — from choosing a jurisdiction to opening your bank account.',
    points: ['Step 1 — Choose mainland or free zone', 'Step 2 — Select your business activity & license type', 'Step 3 — Reserve trade name & submit documents', 'Step 4 — Visa processing & bank account opening'],
    side: 'Download the full PDF guide by contacting our team.'
  },
  'company-setup': {
    crumb: 'Resources', title: 'Company Setup',
    intro: 'Optima manages the full company formation journey end-to-end, whether you are opening a free zone entity, a mainland company, or an offshore structure.',
    points: ['Free zone, mainland & offshore incorporation', 'Trade name reservation and initial approval', 'MOA/AOA drafting', 'License issuance and post-setup support'],
    side: 'Get a free consultation to map out your ideal company structure.'
  },
  'about-us': {
    crumb: 'Resources', title: 'About Optima Business Services ',
    intro: 'Optima Business Services  is a Dubai-based corporate services firm with over 15 years of combined team experience helping entrepreneurs and enterprises establish and grow in the UAE.',
    points: ['15+ years of combined team experience', 'Hundreds of companies formed across UAE free zones and mainland', 'A single point of contact from setup to renewal', 'Transparent, fixed-fee pricing'],
    side: 'Office 1503, Sobha Sapphire Building, Business Bay, Dubai, UAE.'
  },
  'blogs': {
    crumb: 'Resources', title: 'Blogs',
    intro: 'Guides and updates on UAE company formation, visas, tax, and compliance, written by the Optima team.',
    points: ['How to choose between mainland and free zone', 'VAT registration thresholds explained', 'Golden Visa eligibility checklist', 'Cost of setting up a business in Dubai in 2026'],
    side: 'New articles are published regularly — check back often.'
  },
  'faqs': {
    crumb: 'Resources', title: "FAQ's",
    intro: 'Answers to the questions we hear most often from entrepreneurs planning a UAE company.',
    points: ['How long does company formation take? Typically 3–10 working days.', 'Can I own 100% of my company? Yes, in free zones and most mainland activities.', 'Do I need to visit the UAE in person? Not always — many steps can be done remotely.', 'What is the cheapest way to set up? Free zone licenses generally start lower than mainland.'],
    side: 'Have a question that is not listed? Message us directly.'
  }
};

function renderGeneric(slug) {
  const data = PAGES[slug];
  if (!data) return false;
  const img = IMAGES[Object.keys(PAGES).indexOf(slug) % IMAGES.length];
  pageGeneric.innerHTML = `
    <section class="inner-hero">
      <div class="container">
        <div class="crumb">${data.crumb}</div>
        <h1>${data.title}</h1>
        <p>${data.intro}</p>
      </div>
    </section>
    <section>
      <div class="container inner-body">
        <div>
          <h2>What's Included</h2>
          <ul class="inner-list">
            ${data.points.map(p => `<li>${p}</li>`).join('')}
          </ul>
          <img src="${img}" alt="${data.title}" style="border-radius:14px; margin-top:20px;">
        </div>
        <div class="inner-side">
          <h3>Need this service?</h3>
          <p>${data.side}</p>
          <p>📞 +971 55 775 5987</p>
          <p>✉️ info@rxeebusiness.ae</p>
          <button class="btn btn-teal" data-route="contact">Contact Us</button>
          <a class="btn btn-outline" style="background:var(--teal); color:#fff; border:none;" href="https://wa.me/971557755987" target="_blank" rel="noopener">Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  `;
  return true;
}

function showRoute(route) {
  const validRoute = route || 'home';
  // hide all
  pageHome.style.display = 'none';
  pageContact.style.display = 'none';
  pageGeneric.style.display = 'none';

  if (validRoute === 'home') {
    pageHome.style.display = 'block';
  } else if (validRoute === 'contact') {
    pageContact.style.display = 'block';
  } else if (renderGeneric(validRoute)) {
    pageGeneric.style.display = 'block';
  } else {
    // unknown route fallback to home
    pageHome.style.display = 'block';
  }

  // close mobile menu after navigating
  mainMenu?.classList.remove('open');
  document.querySelectorAll('.megamenu.mobile-open').forEach(m => m.classList.remove('mobile-open'));

  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

// Delegate clicks on any element carrying data-route
document.addEventListener('click', function (e) {
  const el = e.target.closest('[data-route]');
  if (!el) return;
  e.preventDefault();
  const route = el.getAttribute('data-route');
  window.location.hash = route;
});

window.addEventListener('hashchange', () => {
  showRoute(window.location.hash.replace('#', ''));
});

// initial load
showRoute(window.location.hash.replace('#', '') || 'home');



// =======================================
// Quick Links Swiper
// =======================================

const quickLinksSlider = new Swiper(".quickLinksSlider", {

    // Loop Infinite
    loop: true,

    // Space Between Cards
    spaceBetween: 24,

    // Smooth Speed
    speed: 800,

    // Cursor
    grabCursor: true,

    // Auto Height
    autoHeight: false,

    // Center
    centeredSlides: false,

    // Autoplay
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    // Responsive
    breakpoints: {

        0: {
            slidesPerView: 1
        },

        576: {
            slidesPerView: 2
        },

        768: {
            slidesPerView: 3
        },

        1200: {
            slidesPerView: 1
        }

    }


  });
