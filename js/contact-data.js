/**
 * contact-data.js - Study Upbroad
 * Centralized Contact Information, Branch Locations, and Consultation Data
 */
const contactData = {
  company: {
    name: "Study Upbroad Global Education Consultancy",
    tagline: "Empowering Global Education Journeys",
    phone: "+44 20 7946 0928",
    phoneFormatted: "+44 (0) 20 7946 0928",
    tollFree: "+1 (800) 123-4567",
    email: "advisors@studyupbroad.com",
    supportEmail: "hello@studyupbroad.com",
    primaryAddress: "452 Global Education Plaza, Suite 800, London, WC2H 9JQ, United Kingdom",
    metroStation: "Leicester Square / Covent Garden (3 min walk)",
    officeHours: {
      weekdays: "Monday – Friday: 9:00 AM – 6:00 PM GMT",
      saturday: "Saturday: 10:00 AM – 2:00 PM GMT (By Appointment)",
      sunday: "Sunday: Closed"
    },
    // Confirmed London headquarters Google Maps embed URL
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2889249767844!2d-0.12948922338006354!3d51.507914471814674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a5342fdf089dd65!2sTrafalgar%20Square!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk",
    directionsUrl: "https://maps.google.com/?q=London+WC2H+9JQ+UK"
  },

  contactChannels: [
    {
      id: "call",
      title: "Speak With Our Team",
      subtitle: "Direct Line to Senior Counselors",
      value: "+44 20 7946 0928",
      displayValue: "+44 20 7946 0928",
      meta: "Mon – Fri, 9:00 AM – 6:00 PM GMT",
      actionText: "Call Now",
      actionHref: "tel:+442079460928",
      type: "tel",
      badge: "Fastest Response"
    },
    {
      id: "email",
      title: "Send Us an Email",
      subtitle: "Written Guidance & Documentation",
      value: "advisors@studyupbroad.com",
      displayValue: "advisors@studyupbroad.com",
      meta: "Replies within 24 business hours",
      actionText: "Send Email",
      actionHref: "mailto:advisors@studyupbroad.com",
      type: "email",
      badge: "24h Response"
    },
    {
      id: "visit",
      title: "Meet Us in Person",
      subtitle: "Face-to-Face Consultation",
      value: "452 Global Education Plaza, Suite 800",
      displayValue: "London, WC2H 9JQ, UK",
      meta: "Leicester Square / Covent Garden station",
      actionText: "Get Directions",
      actionHref: "#officeMapSection",
      type: "location",
      badge: "In-Person Hub"
    },
    {
      id: "hours",
      title: "We're Available to Help",
      subtitle: "Weekly Consultation Schedule",
      value: "Mon – Fri: 9:00 AM – 6:00 PM",
      displayValue: "Sat: 10:00 AM – 2:00 PM",
      meta: "Sunday: Closed (Online Enquiries Open)",
      actionText: "Schedule Session",
      actionHref: "#enquiryFormSection",
      type: "schedule",
      badge: "Flexible Times"
    }
  ],

  branches: [
    {
      id: "london-hq",
      name: "London Global Headquarters",
      label: "Primary Advisory Hub",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      address: "452 Global Education Plaza, Suite 800, London, WC2H 9JQ, United Kingdom",
      transit: "Underground: Leicester Square (Piccadilly & Northern lines)",
      phone: "+44 20 7946 0928",
      email: "london@studyupbroad.com",
      hours: "Monday – Friday: 9:00 AM – 6:00 PM GMT",
      mapUrl: "https://maps.google.com/?q=London+WC2H+9JQ+UK",
      isPrimary: true
    },
    {
      id: "dubai-hub",
      name: "Dubai Regional Advisory Hub",
      label: "Middle East & South Asia",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      address: "Level 14, Emirates International Towers, Sheikh Zayed Road, Dubai, UAE",
      transit: "Metro: Emirates Towers Station (Red Line)",
      phone: "+971 4 312 8900",
      email: "dubai@studyupbroad.com",
      hours: "Sunday – Thursday: 9:00 AM – 6:00 PM GST",
      mapUrl: "https://maps.google.com/?q=Emirates+Towers+Dubai+UAE",
      isPrimary: false
    },
    {
      id: "singapore-hub",
      name: "Singapore Asia-Pacific Office",
      label: "Asia-Pacific Region",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
      address: "12 Marina Boulevard, Marina Bay Financial Centre Tower 3, Singapore 018982",
      transit: "MRT: Downtown (DT17) / Marina Bay (NS27)",
      phone: "+65 6812 7400",
      email: "singapore@studyupbroad.com",
      hours: "Monday – Friday: 9:00 AM – 6:00 PM SGT",
      mapUrl: "https://maps.google.com/?q=Marina+Bay+Financial+Centre+Singapore",
      isPrimary: false
    }
  ],

  whyConnect: [
    {
      number: "01",
      title: "Understand Your Options",
      description: "Discuss suitable study destinations, universities, and courses tailored to your academic background, career ambitions, and budget."
    },
    {
      number: "02",
      title: "Get Clear Next Steps",
      description: "Deconstruct the international application process into manageable milestones with unambiguous deadlines, requirements, and checkpoints."
    },
    {
      number: "03",
      title: "Explore Available Support",
      description: "Discover which of our six dedicated guidance services matches your current stage—from profile evaluation to pre-departure briefing."
    },
    {
      number: "04",
      title: "Plan With Confidence",
      description: "Receive realistic, evidence-based recommendations backed by certified counselors with years of overseas education advisory experience."
    }
  ],

  faqs: [
    {
      question: "How can I contact your consultancy?",
      answer: "You can reach us through several convenient channels: submitting the online student enquiry form on this page, calling our direct telephone lines (+44 20 7946 0928), sending an email to advisors@studyupbroad.com, or visiting one of our advisory hubs in London, Dubai, or Singapore during regular business hours."
    },
    {
      question: "Can I discuss my study abroad plans before selecting a service?",
      answer: "Yes, absolutely. We offer an initial free 30-minute discovery consultation where our counselors evaluate your background, discuss your aspirations, and outline your potential options before you commit to any specific guidance package."
    },
    {
      question: "Can I enquire about a specific country or university?",
      answer: "Yes. Our team covers 25+ premier international study destinations, including the United Kingdom, United States, Canada, Australia, Germany, and Ireland. Whether you have a specific institution in mind or are deciding between multiple countries, we provide comprehensive admissions insights."
    },
    {
      question: "Can I request guidance for scholarships?",
      answer: "Yes. Scholarship & Financial Guidance is one of our six dedicated core services. We help identify merit-based, need-based, and government-sponsored grants, assist in reviewing financial aid essays, and guide you on documentation deadlines."
    },
    {
      question: "Can I visit the office in person?",
      answer: "Yes! We welcome students and families to our offices. Our London headquarters is conveniently located at 452 Global Education Plaza, London WC2H 9JQ. While walk-ins are welcomed, booking an appointment in advance guarantees dedicated counseling time with a specialist for your destination."
    },
    {
      question: "What information should I provide in my enquiry?",
      answer: "To give you the most tailored initial advice, it is helpful to provide your current qualification, academic grades or GPA, preferred countries of interest, intended intake period, and any English proficiency test scores (such as IELTS or TOEFL) you may have already completed."
    },
    {
      question: "How can I know which service is suitable for me?",
      answer: "During our initial discussion or upon reviewing your enquiry form, our counselors will diagnose where you are in the application timeline. We will recommend the exact guidance tier or standalone service that provides the highest value for your current stage without unnecessary costs."
    }
  ]
};

// Expose globally
if (typeof window !== "undefined") {
  window.contactData = contactData;
}
