/**
 * pricing-data.js - Study Upbroad
 * Centralized Single Source of Truth for Pricing Packages,
 * Package Comparison Matrix, and Pricing FAQs.
 */

const pricingPlans = {
  essential: {
    id: "essential",
    name: "Essential Guidance",
    tagline: "Ideal for early-stage profiling and university exploration",
    description: "A starting point for students who need help understanding their academic profile and exploring suitable study opportunities.",
    price: 350,
    displayPrice: "$350",
    pricePeriod: "demo package fee",
    pricingType: "demo",
    recommended: false,
    badge: "Starter",
    ctaText: "Choose Essential",
    features: [
      "Initial Student Profile Evaluation",
      "Academic Background Review",
      "Career Goal Discussion",
      "Study Destination Exploration",
      "Basic University Selection Guidance",
      "Initial 1-on-1 Consultation Session"
    ],
    includedServices: [
      "career-profile-evaluation",
      "university-course-selection"
    ],
    serviceMatrix: {
      "career-profile-evaluation": "included",
      "university-course-selection": "included",
      "admission-application-assistance": "not-included",
      "scholarship-financial-guidance": "not-included",
      "visa-guidance-assistance": "not-included",
      "pre-departure-student-support": "not-included"
    }
  },

  complete: {
    id: "complete",
    name: "Complete Application Support",
    tagline: "Structured guidance from university shortlisting to submission",
    description: "Structured guidance for students who want support through university selection and the application preparation journey.",
    price: 750,
    displayPrice: "$750",
    pricePeriod: "demo package fee",
    pricingType: "demo",
    recommended: true,
    badge: "Most Popular",
    ctaText: "Choose Complete",
    features: [
      "Everything in Essential Guidance",
      "Detailed University & Course Selection Guidance",
      "Application Requirement Review",
      "Application Document Guidance (SOP / LOR / CV)",
      "Scholarship Opportunity Exploration",
      "Financial Planning Guidance",
      "Application Preparation Support (up to 5 universities)",
      "Continued Counselor Guidance"
    ],
    includedServices: [
      "career-profile-evaluation",
      "university-course-selection",
      "admission-application-assistance",
      "scholarship-financial-guidance"
    ],
    serviceMatrix: {
      "career-profile-evaluation": "included",
      "university-course-selection": "included",
      "admission-application-assistance": "included",
      "scholarship-financial-guidance": "included",
      "visa-guidance-assistance": "addon",
      "pre-departure-student-support": "addon"
    }
  },

  premium: {
    id: "premium",
    name: "Premium Journey Support",
    tagline: "End-to-end guidance from admissions through pre-departure",
    description: "Broader guidance for students looking for support across multiple stages of their overseas education preparation.",
    price: 1250,
    displayPrice: "$1,250",
    pricePeriod: "demo package fee",
    pricingType: "demo",
    recommended: false,
    badge: "Comprehensive",
    ctaText: "Choose Premium",
    features: [
      "Everything in Complete Application Support",
      "Personalized Student Guidance & Senior Mentor",
      "Extended Application Preparation Support (up to 8 universities)",
      "Scholarship & Financial Guidance",
      "Visa Documentation Guidance & Mock Interviews",
      "Pre-Departure Preparation Briefing",
      "Travel & Accommodation Research Guidance",
      "Additional Onboarding Student Support"
    ],
    includedServices: [
      "career-profile-evaluation",
      "university-course-selection",
      "admission-application-assistance",
      "scholarship-financial-guidance",
      "visa-guidance-assistance",
      "pre-departure-student-support"
    ],
    serviceMatrix: {
      "career-profile-evaluation": "included",
      "university-course-selection": "included",
      "admission-application-assistance": "included",
      "scholarship-financial-guidance": "included",
      "visa-guidance-assistance": "included",
      "pre-departure-student-support": "included"
    }
  }
};

const pricingServicesList = [
  {
    id: "career-profile-evaluation",
    name: "Career & Profile Evaluation",
    category: "Planning & Guidance",
    description: "Academic background evaluation, strengths assessment, and study path recommendations."
  },
  {
    id: "university-course-selection",
    name: "University & Course Selection",
    category: "University Admissions",
    description: "Destination comparison, university matching, and entry requirement guidance."
  },
  {
    id: "admission-application-assistance",
    name: "Admission & Application Assistance",
    category: "University Admissions",
    description: "Application documentation, SOP structural guidance, and portal submission review."
  },
  {
    id: "scholarship-financial-guidance",
    name: "Scholarship & Financial Guidance",
    category: "Financial Support",
    description: "Scholarship opportunity exploration, cost of attendance planning, and funding proofs."
  },
  {
    id: "visa-guidance-assistance",
    name: "Visa Guidance & Assistance",
    category: "Visa & Preparation",
    description: "Immigration document checklists, form guidance, and visa interview preparation."
  },
  {
    id: "pre-departure-student-support",
    name: "Pre-Departure & Student Support",
    category: "Visa & Preparation",
    description: "Pre-departure briefings, accommodation research, student banking, and travel checklists."
  }
];

const pricingFaqs = [
  {
    question: "What is included in each pricing plan?",
    q: "What is included in each pricing plan?",
    answer: "Our plans are structured around different stages of your overseas education journey. Essential Guidance focuses on early academic profiling and university exploration. Complete Application Support adds full guidance through university selection, document preparation (SOP/CV), and scholarship exploration for up to 5 universities. Premium Journey Support covers the entire continuum through visa documentation and pre-departure preparation.",
    a: "Our plans are structured around different stages of your overseas education journey. Essential Guidance focuses on early academic profiling and university exploration. Complete Application Support adds full guidance through university selection, document preparation (SOP/CV), and scholarship exploration for up to 5 universities. Premium Journey Support covers the entire continuum through visa documentation and pre-departure preparation."
  },
  {
    question: "Can I choose an individual service instead of a complete package?",
    q: "Can I choose an individual service instead of a complete package?",
    answer: "Yes, absolutely. If you only require assistance with a specific stage—such as Visa Guidance or Statement of Purpose review—you can speak with our team to arrange standalone guidance tailored to that specific need.",
    a: "Yes, absolutely. If you only require assistance with a specific stage—such as Visa Guidance or Statement of Purpose review—you can speak with our team to arrange standalone guidance tailored to that specific need."
  },
  {
    question: "Can I change my selected package later?",
    q: "Can I change my selected package later?",
    answer: "Yes. Many students begin with the Essential Guidance package to assess their profile and decide their target destinations, and subsequently upgrade to Complete or Premium support as their application deadlines approach. Any fee already paid can be credited toward your upgraded package.",
    a: "Yes. Many students begin with the Essential Guidance package to assess their profile and decide their target destinations, and subsequently upgrade to Complete or Premium support as their application deadlines approach. Any fee already paid can be credited toward your upgraded package."
  },
  {
    question: "Are university application fees included in the package?",
    q: "Are university application fees included in the package?",
    answer: "No. Our fees reflect independent, student-first educational consultancy and advisory services. University application fees (charged directly by portals like UCAS or individual universities) and test fees (IELTS, TOEFL, GRE) are paid directly to the respective examining bodies and institutions.",
    a: "No. Our fees reflect independent, student-first educational consultancy and advisory services. University application fees (charged directly by portals like UCAS or individual universities) and test fees (IELTS, TOEFL, GRE) are paid directly to the respective examining bodies and institutions."
  },
  {
    question: "Are visa fees and university tuition fees included?",
    q: "Are visa fees and university tuition fees included?",
    answer: "No. Sovereign government visa application fees, immigration health surcharges (IHS), and university tuition fees are payable directly to the respective embassies, governments, and university bank accounts. We provide procedural and documentary guidance to ensure compliance.",
    a: "No. Sovereign government visa application fees, immigration health surcharges (IHS), and university tuition fees are payable directly to the respective embassies, governments, and university bank accounts. We provide procedural and documentary guidance to ensure compliance."
  },
  {
    question: "Can I discuss my requirements before selecting a plan?",
    q: "Can I discuss my requirements before selecting a plan?",
    answer: "Yes, we actively encourage it! You can schedule a complimentary 1-on-1 consultation with our senior advisors before selecting any package. We will review your academic goals and help you understand which level of support is genuinely appropriate for your timeline.",
    a: "Yes, we actively encourage it! You can schedule a complimentary 1-on-1 consultation with our senior advisors before selecting any package. We will review your academic goals and help you understand which level of support is genuinely appropriate for your timeline."
  },
  {
    question: "How do I complete the enrollment process?",
    q: "How do I complete the enrollment process?",
    answer: "You can click on any plan's 'Choose' button above to open our enrollment form, enter your academic and study abroad preferences, review your details on the order summary screen, and proceed through our frontend demo checkout.",
    a: "You can click on any plan's 'Choose' button above to open our enrollment form, enter your academic and study abroad preferences, review your details on the order summary screen, and proceed through our frontend demo checkout."
  }
];

// Export for browser global and module environments
if (typeof window !== 'undefined') {
  window.pricingPlans = pricingPlans;
  window.pricingServicesList = pricingServicesList;
  window.pricingFaqs = pricingFaqs;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { pricingPlans, pricingServicesList, pricingFaqs };
}
