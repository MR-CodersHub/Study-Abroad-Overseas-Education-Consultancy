/**
 * service-data.js - Study Upbroad
 * Centralized Single Source of Truth for all 6 Consultancy Services
 * Powers both services.html (listing) and service-details.html (dynamic details)
 */

const serviceData = {
  "career-profile-evaluation": {
    id: "career-profile-evaluation",
    number: "01",
    category: "Planning & Guidance",
    title: "Career & Profile Evaluation",
    shortDescription: "Understand your academic strengths, career interests, and international education goals with personalized profile guidance.",
    heroDescription: "Build your international education plan on a clear understanding of your academic background, interests, and future aspirations.",
    heroImage: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=1200&q=85",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    highlights: [
      "Academic Profile Review",
      "Career Goal Assessment",
      "Study Path Recommendations"
    ],
    overview: `Every successful international education journey begins with self-awareness and honest academic evaluation. Career & Profile Evaluation is designed to help students map their academic achievements, professional ambitions, and personal strengths against international university standards.

Our experienced advisors take the time to examine your transcripts, extracurricular achievements, language proficiency, and long-term career aspirations. Rather than suggesting generic universities, we help you uncover which academic disciplines and study destinations will provide the strongest foundation for your future career.

Through this personalized assessment, you will gain a realistic understanding of entry benchmarks, identify potential areas for profile enhancement, and establish a clear roadmap before investing time and resources into formal applications.`,
    overviewHighlights: [
      "Thorough evaluation of transcripts, grades, and academic achievements",
      "In-depth discussion on personal interests, career trends, and target industries",
      "Identification of competitive strengths and actionable areas for improvement",
      "Clear recommendation of suitable degree types and study destination options"
    ],
    features: [
      {
        title: "Academic Background Review",
        description: "Comprehensive review of your GPA, coursework, grading scale conversions, and subject-specific qualifications.",
        icon: "academic"
      },
      {
        title: "Interest & Career Goal Discussion",
        description: "One-on-one sessions exploring your long-term career vision, industry demands, and lifestyle preferences abroad.",
        icon: "compass"
      },
      {
        title: "Profile Strength Identification",
        description: "Pinpointing your distinctive research, leadership, internship, or project experiences that stand out to admissions panels.",
        icon: "award"
      },
      {
        title: "Study Path Recommendations",
        description: "Curated options covering undergraduate or postgraduate disciplines, specializations, and interdisciplinary tracks.",
        icon: "map"
      },
      {
        title: "Initial Eligibility Awareness",
        description: "Transparent assessment of prerequisite subjects, standardized testing needs, and language proficiency requirements.",
        icon: "check-circle"
      }
    ],
    benefits: [
      {
        title: "Clarity Before Commitment",
        description: "Avoid costly mistakes by understanding where your profile stands before submitting university applications."
      },
      {
        title: "Targeted Degree Selection",
        description: "Discover programs that align genuinely with your future employment aspirations and international career avenues."
      },
      {
        title: "Profile Enhancement Advice",
        description: "Receive practical recommendations on short courses, certifications, or projects to strengthen your profile ahead of deadlines."
      },
      {
        title: "Objective, Student-First Guidance",
        description: "Benefit from unbiased advice focused entirely on your potential rather than institutional commission priorities."
      }
    ],
    process: [
      {
        step: "01",
        title: "Initial Student Enquiry",
        description: "You share your educational history, current transcripts, and preliminary thoughts about studying abroad."
      },
      {
        step: "02",
        title: "Academic Background Review",
        description: "Our guidance team thoroughly examines your grades, qualifications, curriculum, and extracurricular achievements."
      },
      {
        step: "03",
        title: "Goal & Interest Discussion",
        description: "A focused consultation to discuss your career dreams, preferred global regions, budget comfort, and study pace."
      },
      {
        step: "04",
        title: "Profile Assessment",
        description: "We benchmark your background against international admission criteria across leading education destinations."
      },
      {
        step: "05",
        title: "Personalized Guidance Report",
        description: "You receive a structured pathway plan outlining recommended study tracks, next steps, and timeline milestones."
      }
    ],
    pricing: {
      headline: "Transparent Consultation-Based Guidance",
      note: "Every student's profile is distinct. We believe in providing tailored advisory support without hidden commitments or artificial pressure.",
      packages: [
        {
          name: "Essential Profile Review",
          tagline: "Ideal for early-stage exploratory research",
          price: "Complimentary Consultation",
          badge: "Starter",
          features: [
            "Introductory academic evaluation",
            "Broad destination eligibility check",
            "General timeline overview",
            "1-on-1 advisor consultation (30 mins)"
          ],
          cta: "Book Free Session"
        },
        {
          name: "Comprehensive Assessment",
          tagline: "In-depth profiling and pathway planning",
          price: "Discuss Your Requirements",
          badge: "Recommended",
          features: [
            "Detailed transcript & credential review",
            "In-depth career alignment analysis",
            "Custom profile strengthening suggestions",
            "Curated preliminary course pathway list",
            "Full written assessment report"
          ],
          cta: "Contact for Details"
        },
        {
          name: "Integrated Guidance Suite",
          tagline: "Seamless continuum into university applications",
          price: "Tailored Package",
          badge: "Full Journey",
          features: [
            "All Comprehensive Assessment features",
            "Direct transition into university selection",
            "Dedicated senior education mentor",
            "Parent-student strategy session",
            "Ongoing profile milestone tracking"
          ],
          cta: "Inquire About Support"
        }
      ]
    },
    faqs: [
      {
        q: "When is the best time to undertake a Career & Profile Evaluation?",
        a: "The ideal time is 12 to 18 months before your targeted university intake. This gives you ample opportunity to address any prerequisites, prepare for English proficiency exams, or complete meaningful extracurricular experiences that enhance your profile."
      },
      {
        q: "What documents should I prepare for my initial evaluation?",
        a: "Having your academic transcripts (high school or bachelor's marksheets), an updated CV or resume, any test scores (IELTS/TOEFL/GRE/GMAT if available), and a brief list of your preferred fields of study will allow our counselors to give you the most accurate advice."
      },
      {
        q: "Can I still explore studying abroad if my academic grades are average?",
        a: "Yes, absolutely. International education offers a diverse spectrum of prestigious universities with varied entry requirements, pathway programs, and foundation courses. Our advisors specialize in identifying institutions that recognize practical potential and holistic achievements."
      },
      {
        q: "Does this evaluation commit me to applying through Study Upbroad?",
        a: "Not at all. Our profile evaluation is meant to empower you with clarity and realistic perspective. You are free to make your own informed decisions about your educational pathway at your own pace."
      },
      {
        q: "How does profile evaluation connect to university shortlisting?",
        a: "Profile evaluation is the critical foundational step. By clearly understanding your academic standing and career ambitions, we ensure that the university shortlist created in the next stage consists of realistic, well-matched, and ambitious yet attainable institutions."
      }
    ],
    relatedServices: [
      "university-course-selection",
      "admission-application-assistance",
      "scholarship-financial-guidance"
    ],
    ctaTitle: "Start With a Clear Understanding of Your Future.",
    ctaDescription: "Connect with our experienced guidance advisors to review your academic strengths and discover global education pathways tailored to your goals."
  },

  "university-course-selection": {
    id: "university-course-selection",
    number: "02",
    category: "University Admissions",
    title: "University & Course Selection",
    shortDescription: "Discover suitable universities, courses, and international study destinations that align with your academic profile and future ambitions.",
    heroDescription: "Navigate world-class universities and select the academic programs that fit your learning style, career objectives, and personal lifestyle.",
    heroImage: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=85",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
    highlights: [
      "Destination Exploration",
      "Course & University Matching",
      "Admission Requirement Guidance"
    ],
    overview: `Choosing where and what to study abroad is one of the most consequential decisions of your educational journey. With thousands of accredited universities and specialized degree tracks across the UK, USA, Canada, Australia, Germany, and Ireland, the options can be overwhelming.

Our University & Course Selection guidance brings structure, clarity, and objective analysis to your decision-making. We take into account critical variables such as curriculum structure, industry partnerships, campus location, tuition costs, post-study work opportunities, and international student support services.

We create a balanced, strategic shortlist classified into ambitious, target, and safe institutions—maximizing your likelihood of securing an offer that aligns with both your academic interests and your financial plan.`,
    overviewHighlights: [
      "Objective comparison across major study destinations (UK, USA, Canada, Australia, Europe)",
      "Curriculum alignment ensuring your chosen major matches your desired career track",
      "Three-tier shortlisting model (Aspirational, Target, and Practical options)",
      "Detailed analysis of living expenses, campus culture, and post-study opportunities"
    ],
    features: [
      {
        title: "Destination Comparison",
        description: "Comparative insights on visa rules, tuition structures, cost of living, climate, and cultural environments across 25+ countries.",
        icon: "globe"
      },
      {
        title: "Course Selection Guidance",
        description: "Evaluating module contents, elective options, faculty specializations, and internship/co-op opportunities.",
        icon: "book-open"
      },
      {
        title: "University Shortlisting",
        description: "Developing a refined list of institutions that match your academic profile, budget parameters, and lifestyle expectations.",
        icon: "layers"
      },
      {
        title: "Entry Requirement Review",
        description: "Checking minimum academic thresholds, required prerequisites, standardized test policies, and application deadlines.",
        icon: "clipboard-check"
      },
      {
        title: "Course & Career Alignment",
        description: "Validating that your degree accreditation meets international professional licensing requirements in your target market.",
        icon: "briefcase"
      }
    ],
    benefits: [
      {
        title: "Informed Decision-Making",
        description: "Filter through thousands of programs with data-backed insights rather than relying on promotional marketing."
      },
      {
        title: "Balanced Application Strategy",
        description: "Protect your prospects by balancing competitive top-tier universities with dependable, high-quality alternatives."
      },
      {
        title: "Location & Lifestyle Fit",
        description: "Choose cities and campuses that provide a comfortable, welcoming, and safe environment for your student life."
      },
      {
        title: "Optimized Investment",
        description: "Select universities that deliver high educational value, industry connections, and potential scholarship avenues."
      }
    ],
    process: [
      {
        step: "01",
        title: "Understand Study Preferences",
        description: "We review your preferred countries, academic focus, campus environment, and budget parameters."
      },
      {
        step: "02",
        title: "Explore Destinations",
        description: "Compare international study destinations in terms of education systems, work rights, and living conditions."
      },
      {
        step: "03",
        title: "Review Course Options",
        description: "Deep dive into course curriculums, assessment methods, practical research, and professional accreditations."
      },
      {
        step: "04",
        title: "Compare University Requirements",
        description: "Evaluate admission criteria, language standards, application fees, and key intake deadlines across shortlisted options."
      },
      {
        step: "05",
        title: "Prepare a Suitable Shortlist",
        description: "Finalize a strategic, tier-structured shortlist ready for the application and documentation phase."
      }
    ],
    pricing: {
      headline: "Curated University Selection Advisory",
      note: "We offer unbiased guidance to help you choose universities that match your profile. Pricing depends on the depth of research required.",
      packages: [
        {
          name: "Standard Shortlisting",
          tagline: "Focused selection for single-destination applicants",
          price: "Consultation Advisory",
          badge: "Essential",
          features: [
            "Single destination comparison",
            "Up to 5 university & course recommendations",
            "Entry requirements checklist",
            "Intake deadline planner"
          ],
          cta: "Select Option"
        },
        {
          name: "Multi-Destination Strategy",
          tagline: "Comprehensive cross-country university matching",
          price: "Discuss Requirements",
          badge: "Most Popular",
          features: [
            "Cross-comparison of 2-3 study destinations",
            "Up to 8-10 university recommendations",
            "Course syllabus & accreditation review",
            "Scholarship availability mapping",
            "Post-study work rights summary"
          ],
          cta: "Explore Multi-Country"
        },
        {
          name: "Executive & Specialized Matching",
          tagline: "Tailored for specialized masters, MBA, & research",
          price: "Tailored Advisory",
          badge: "Specialized",
          features: [
            "Global search across specialized faculties",
            "Faculty research alignment guidance",
            "Industry co-op & placement analysis",
            "Full strategic roadmap consultation"
          ],
          cta: "Consult Specialist"
        }
      ]
    },
    faqs: [
      {
        q: "How many universities should I typically apply to?",
        a: "We generally recommend applying to 4 to 6 universities: 1-2 ambitious options, 2-3 target universities where your profile matches well, and 1-2 safe options where you comfortably meet or exceed requirements."
      },
      {
        q: "What is the difference between applying to universities in the UK vs USA vs Canada?",
        a: "The UK generally assesses academic focus through UCAS with strict subject prerequisites; the USA looks holistically at GPA, SAT/ACT, essays, and extracurriculars; while Canada places significant weight on high school or bachelor marks and specific prerequisites for your faculty."
      },
      {
        q: "Can I switch my course or major after arriving at university?",
        a: "In flexible systems like the USA, switching majors is very common during the first two years. In more specialized systems like the UK or Germany, switching requires formal faculty approval and may impact your student visa regulations."
      },
      {
        q: "Do you only recommend partner universities?",
        a: "No. Our commitment is strictly student-first. We guide you toward the institutions and programs that offer the genuine best fit for your academic profile, budget, and career goals."
      },
      {
        q: "How do tuition fees and cost of living compare across destinations?",
        a: "Tuition and living costs vary widely. Destinations like Germany offer low or tuition-free options at public universities, while countries like the UK, Australia, and USA range from moderate to high, often balanced by scholarship opportunities."
      }
    ],
    relatedServices: [
      "career-profile-evaluation",
      "admission-application-assistance",
      "scholarship-financial-guidance"
    ],
    ctaTitle: "Find the Academic Path That Matches Your Ambitions.",
    ctaDescription: "Let our counselors guide you through international university options and build a balanced shortlist tailored to your academic journey."
  },

  "admission-application-assistance": {
    id: "admission-application-assistance",
    number: "03",
    category: "University Admissions",
    title: "Admission & Application Assistance",
    shortDescription: "Navigate the university application process with structured guidance on applications, documents, statements, and submission requirements.",
    heroDescription: "Present your strongest self to university admissions panels through organized document preparation, essay guidance, and deadline management.",
    heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    highlights: [
      "Application Preparation",
      "Document Guidance",
      "Submission Support"
    ],
    overview: `Submitting a competitive university application requires meticulous attention to detail, rigorous timeline management, and a compelling articulation of your academic journey. Even well-qualified students can face setbacks due to incomplete documentation, generic personal statements, or missed portal deadlines.

Our Admission & Application Assistance service provides a disciplined, step-by-step framework to ensure every component of your application package meets international academic standards. From navigating portals like UCAS, Common App, or university-specific systems, to reviewing transcripts and credential evaluations, we keep your process organized and stress-free.

We offer detailed structural reviews of your Statement of Purpose (SOP), letters of recommendation (LOR), and academic CV—helping you convey your motivation and achievements authentically without ever writing or fabricating content on your behalf.`,
    overviewHighlights: [
      "Comprehensive checklist tailored to each university's application portal requirements",
      "Detailed structural and qualitative feedback on Statements of Purpose and essays",
      "Guidance on securing academic and professional Letters of Recommendation",
      "Active deadline tracking, submission verification, and offer letter review"
    ],
    features: [
      {
        title: "Application Requirement Review",
        description: "Verifying exact portal guidelines, supplementary question prompts, and portfolio/writing sample standards.",
        icon: "list"
      },
      {
        title: "Application Form Guidance",
        description: "Assistance with form completion across UCAS, Common App, university portals, and international application portals.",
        icon: "edit"
      },
      {
        title: "Statement of Purpose Guidance",
        description: "Feedback on clarity, tone, narrative structure, and academic motivation to help you craft an authentic personal essay.",
        icon: "file-text"
      },
      {
        title: "Supporting Document Preparation",
        description: "Guidance on formatting transcripts, grading scale explanations, CVs, and recommendation letter requests.",
        icon: "folder"
      },
      {
        title: "Application Submission Guidance",
        description: "Final quality check of all files, fees, and attachments prior to submission to prevent administrative delays.",
        icon: "send"
      }
    ],
    benefits: [
      {
        title: "Error-Free Submissions",
        description: "Minimize the risk of technical rejections or delays caused by missing documents or incorrect portal inputs."
      },
      {
        title: "Authentic Personal Narrative",
        description: "Learn how to highlight your genuine experiences and academic interests in a way that resonates with admissions officers."
      },
      {
        title: "Stress-Free Timeline Control",
        description: "Stay ahead of rolling admissions, early-action dates, and scholarship deadlines with structured milestone schedules."
      },
      {
        title: "Transparent Offer Evaluation",
        description: "Receive objective support in understanding conditional vs unconditional offers and enrollment deposit procedures."
      }
    ],
    process: [
      {
        step: "01",
        title: "Identify Application Requirements",
        description: "We assemble the exact documentation and prompt requirements for every selected university."
      },
      {
        step: "02",
        title: "Prepare Required Information",
        description: "You collect transcripts, academic records, test scores, and initial drafts of your personal statement."
      },
      {
        step: "03",
        title: "Review Supporting Documents",
        description: "Advisors provide iterative structural review on your CV, essays, SOP, and recommendation letter formats."
      },
      {
        step: "04",
        title: "Guide Application Preparation",
        description: "Step-by-step support while you complete university portal forms and upload supplementary materials."
      },
      {
        step: "05",
        title: "Support Submission & Follow-Up",
        description: "Final pre-submission audit, submission support, tracking application status, and interpreting admissions decisions."
      }
    ],
    pricing: {
      headline: "Structured Application Guidance Plans",
      note: "We assist with the preparation and organization of your applications. All fees reflect advisory support; university application fees are paid directly to institutions.",
      packages: [
        {
          name: "Single Application Support",
          tagline: "Dedicated assistance for one priority university",
          price: "Inquire for Pricing",
          badge: "Single Focus",
          features: [
            "1 university application package review",
            "SOP review & structural feedback (up to 2 rounds)",
            "CV formatting guidance",
            "Portal submission checklist"
          ],
          cta: "Start Application"
        },
        {
          name: "Standard Application Cohort",
          tagline: "Recommended for 3-5 target institutions",
          price: "Discuss Requirements",
          badge: "Most Selected",
          features: [
            "Up to 5 university applications guidance",
            "Comprehensive SOP & essay reviews",
            "Letter of recommendation guidance",
            "Deadline & status tracking support",
            "Offer letter review & response guidance"
          ],
          cta: "Select Cohort"
        },
        {
          name: "Comprehensive Premier Suite",
          tagline: "Full-spectrum support across multiple destinations",
          price: "Custom Consultation",
          badge: "Premier",
          features: [
            "Up to 8 university applications",
            "Unlimited SOP/essay refinement rounds",
            "Interview preparation sessions where applicable",
            "Scholarship essay guidance included",
            "Priority advisor response channel"
          ],
          cta: "Schedule Consultation"
        }
      ]
    },
    faqs: [
      {
        q: "Will Study Upbroad write my Statement of Purpose (SOP) for me?",
        a: "No. Ethical admissions standards require personal statements to be written by the student. Our role is to provide expert editorial guidance, structure advice, content suggestions, and proofreading feedback so that your authentic voice shines through."
      },
      {
        q: "What is the difference between a conditional and an unconditional offer?",
        a: "An unconditional offer means you have met all academic, language, and administrative criteria and have secured a firm place. A conditional offer means you must achieve specific remaining requirements (such as final exam scores or English tests) before your place is confirmed."
      },
      {
        q: "How early should I begin preparing my application documents?",
        a: "We recommend starting document preparation at least 4 to 6 months prior to the university application deadline. Crafting quality personal statements and requesting recommendation letters often takes longer than anticipated."
      },
      {
        q: "Can you guarantee my admission to a top university?",
        a: "No consultancy can ethically guarantee admission, as the final decision rests solely with the university's admissions committee. What we guarantee is rigorous, professional preparation that presents your qualifications in the strongest possible manner."
      },
      {
        q: "What happens if an application is deferred or waitlisted?",
        a: "If placed on a waitlist, we help you understand the university's update policy and guide you on submitting a concise Letter of Continued Interest with any new achievements or updated grades."
      }
    ],
    relatedServices: [
      "university-course-selection",
      "scholarship-financial-guidance",
      "visa-guidance-assistance"
    ],
    ctaTitle: "Take the Next Step Toward Your University Application.",
    ctaDescription: "Work with our admissions advisors to prepare an organized, compelling application package that reflects your true academic potential."
  },

  "scholarship-financial-guidance": {
    id: "scholarship-financial-guidance",
    number: "04",
    category: "Financial Support",
    title: "Scholarship & Financial Guidance",
    shortDescription: "Explore scholarship opportunities and understand tuition fees, education expenses, and financial planning considerations.",
    heroDescription: "Plan your international education budget with clarity, discover accessible scholarship options, and prepare transparent financial documentation.",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>`,
    highlights: [
      "Scholarship Exploration",
      "Financial Planning Guidance",
      "Funding Requirement Awareness"
    ],
    overview: `Pursuing higher education abroad is a substantial financial investment for students and their families. Transparent financial planning and early awareness of funding requirements are essential to completing your studies without avoidable stress.

Our Scholarship & Financial Guidance service assists students in identifying legitimate merit-based, need-based, and country-specific scholarship opportunities offered by universities, governmental bodies, and independent trusts. We demystify eligibility criteria, application timelines, and required supplementary essays.

Furthermore, we provide structured guidance on calculating total cost of attendance—including tuition, mandatory healthcare, accommodation, utilities, and daily living costs. We help you understand the strict financial proof and maintenance fund criteria enforced by international visa authorities.`,
    overviewHighlights: [
      "Identification of institutional merit scholarships, faculty discounts, and regional awards",
      "Realistic budgeting templates covering total cost of attendance and living expenses",
      "Guidance on scholarship application questions and supporting financial statements",
      "Awareness of immigration proof-of-funds rules (maintenance funds, blocked accounts, sponsors)"
    ],
    features: [
      {
        title: "Scholarship Opportunity Exploration",
        description: "Mapping university merit awards, early-bird fee reductions, and government-funded scholarship schemes.",
        icon: "search"
      },
      {
        title: "Eligibility Awareness",
        description: "Analyzing academic percentage cut-offs, research prerequisites, and financial criteria required for specific awards.",
        icon: "check-square"
      },
      {
        title: "Tuition & Expense Planning",
        description: "Comprehensive financial projection covering tuition, books, health insurance, housing, and emergency funds.",
        icon: "pie-chart"
      },
      {
        title: "Funding Documentation Guidance",
        description: "Explaining the formatting of bank statements, sponsorship letters, education loan sanction letters, and affidavits.",
        icon: "file-check"
      },
      {
        title: "Financial Preparation Roadmap",
        description: "Setting up a timely schedule for fund maturation, deposit payment deadlines, and currency conversion timelines.",
        icon: "trending-up"
      }
    ],
    benefits: [
      {
        title: "Budget Transparency",
        description: "Understand the true total cost of attendance upfront with no unexpected surprises after arrival."
      },
      {
        title: "Scholarship Opportunity Maximization",
        description: "Identify and apply for legitimate scholarship opportunities well before early institutional deadlines close."
      },
      {
        title: "Immigration-Compliant Funding",
        description: "Ensure your financial proofs strictly adhere to the specific holding period and documentation rules of embassy guidelines."
      },
      {
        title: "Family Financial Confidence",
        description: "Help parents and sponsors gain a clear, realistic financial roadmap throughout the entire duration of the degree."
      }
    ],
    process: [
      {
        step: "01",
        title: "Understand Financial Requirements",
        description: "Calculate expected tuition fees and destination-specific living costs based on your shortlisted universities."
      },
      {
        step: "02",
        title: "Explore Relevant Scholarship Options",
        description: "Identify applicable merit scholarships, department bursaries, and external funding opportunities."
      },
      {
        step: "03",
        title: "Review Eligibility Information",
        description: "Verify criteria such as GPA thresholds, essay topics, and submission dates for each scholarship program."
      },
      {
        step: "04",
        title: "Prepare Funding Documents",
        description: "Guidance on gathering and organizing verifiable sponsor proof, loan sanction letters, or bank documentation."
      },
      {
        step: "05",
        title: "Plan Financial Next Steps",
        description: "Establish a clear schedule for tuition deposit deadlines, currency transfers, and visa financial readiness."
      }
    ],
    pricing: {
      headline: "Objective Financial & Scholarship Advisory",
      note: "We do not sell financial products or make loan guarantees. Our services are focused purely on education budgeting and scholarship application guidance.",
      packages: [
        {
          name: "Scholarship Discovery Session",
          tagline: "Find opportunities tailored to your target universities",
          price: "Advisory Consultation",
          badge: "Essential",
          features: [
            "Review of target universities scholarship lists",
            "Eligibility criteria audit",
            "Key deadline timeline sheet",
            "General financial requirements overview"
          ],
          cta: "Book Discovery"
        },
        {
          name: "Comprehensive Financial Planning",
          tagline: "In-depth scholarship essay & budgeting support",
          price: "Discuss Requirements",
          badge: "Complete Support",
          features: [
            "Up to 3 scholarship application reviews",
            "Scholarship essay structural feedback",
            "Detailed Cost of Attendance breakdown",
            "Visa financial documentation checklist",
            "Sponsorship affidavit guidance"
          ],
          cta: "Plan Finances"
        },
        {
          name: "Full Journey Financial Suite",
          tagline: "End-to-end guidance from funding to visa readiness",
          price: "Custom Package",
          badge: "Integrated",
          features: [
            "All Comprehensive Planning features",
            "Multi-destination scholarship mapping",
            "Education loan document readiness advisory",
            "Direct coordination with visa documentation advisors"
          ],
          cta: "Contact Team"
        }
      ]
    },
    faqs: [
      {
        q: "Are full scholarships common for international students?",
        a: "Full scholarships (covering 100% of tuition and living expenses) are rare and fiercely competitive, typically reserved for top academic achievers or specific research programs. However, partial merit scholarships ranging from 10% to 50% tuition reduction are widely available across many universities."
      },
      {
        q: "What are maintenance funds or 'living cost proof' for a student visa?",
        a: "Most international visa authorities require you to demonstrate that you possess sufficient liquid funds in a recognized bank account to cover living expenses for at least the first 9 to 12 months, in addition to unpaid tuition."
      },
      {
        q: "Can I rely entirely on part-time work to pay my tuition fees?",
        a: "No. While student visas in countries like the UK, Australia, and Canada permit part-time work (typically up to 20 hours per week during term time), part-time earnings should only be viewed as supplementary pocket money or partial living expense support—not as a primary means to pay tuition."
      },
      {
        q: "Does Study Upbroad charge a commission on scholarships awarded to students?",
        a: "Never. 100% of any scholarship, grant, or bursary awarded by a university or institution goes directly to you and your university fee account. We charge only transparent advisory fees."
      },
      {
        q: "What is a 'Blocked Account' in Germany?",
        a: "For students heading to Germany, a Blocked Account (Sperrkonto) is a mandatory bank account where students deposit a set amount mandated by the German government to cover their living costs for one year. A fixed monthly amount is released once you arrive in Germany."
      }
    ],
    relatedServices: [
      "university-course-selection",
      "admission-application-assistance",
      "visa-guidance-assistance"
    ],
    ctaTitle: "Explore Your Options and Plan With Confidence.",
    ctaDescription: "Take control of your educational investment with expert scholarship exploration and structured financial planning guidance."
  },

  "visa-guidance-assistance": {
    id: "visa-guidance-assistance",
    number: "05",
    category: "Visa & Preparation",
    title: "Visa Guidance & Assistance",
    shortDescription: "Understand student visa requirements and prepare the necessary documentation with organized, step-by-step guidance.",
    heroDescription: "Navigate strict student visa regulations, assemble immigration-compliant document files, and prepare with confidence for your embassy submission.",
    heroImage: "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=1200&q=85",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    highlights: [
      "Visa Requirement Guidance",
      "Documentation Checklist",
      "Application Preparation Support"
    ],
    overview: `Securing your university offer letter is a major milestone, but your overseas journey is not complete without an approved student visa. Immigration rules and documentary requirements differ significantly across jurisdictions and change regularly in response to government policy.

Our Visa Guidance & Assistance service provides methodical, organized support tailored to the specific immigration guidelines of the United Kingdom, United States (F-1), Canada (Study Permit), Australia (Subclass 500), Germany, and Ireland.

We guide you through assembling an airtight dossier: Confirmation of Acceptance for Studies (CAS) / I-20 / COE verification, financial proof verification, medical examination protocols, biometric appointment booking, and visa interview preparation (where mandated). We ensure you understand every question on the visa form thoroughly.`,
    overviewHighlights: [
      "Destination-specific document checklists aligned strictly with official immigration rules",
      "Detailed scrutiny of financial evidence to ensure compliance with holding periods",
      "Guidance through online visa portal forms, visa fee payments, and biometrics booking",
      "Realistic mock interview sessions for countries requiring visa interviews (such as the USA or Germany)"
    ],
    features: [
      {
        title: "Student Visa Requirement Overview",
        description: "Clear explanation of current immigration criteria, processing times, and eligibility prerequisites.",
        icon: "shield"
      },
      {
        title: "Document Checklist Preparation",
        description: "A tailored checklist of academic, identity, and financial documents formatted to embassy specifications.",
        icon: "check-circle"
      },
      {
        title: "Application Form Guidance",
        description: "Assistance with filling out visa forms accurately to avoid discrepancies that trigger delays or refusals.",
        icon: "edit"
      },
      {
        title: "Interview Preparation Guidance",
        description: "Realistic mock interview questions and confidence-building coaching for US F-1 or genuine student interviews.",
        icon: "message-circle"
      },
      {
        title: "Pre-Submission Review",
        description: "Comprehensive multi-point audit of all digital uploads and documentation prior to official submission.",
        icon: "file-text"
      }
    ],
    benefits: [
      {
        title: "Reduced Administrative Stress",
        description: "Navigate complex immigration jargon and technical portal steps with the reassurance of seasoned advisors."
      },
      {
        title: "Minimization of Preventable Errors",
        description: "Avoid common document pitfalls, incorrect financial classifications, and inconsistent dates that lead to refusals."
      },
      {
        title: "Confidence in Visa Interviews",
        description: "Be fully prepared to explain your study intentions, course selection, and funding truthfully and articulately."
      },
      {
        title: "Timely Submission & Processing",
        description: "Submit well within your university's recommended timeline to ensure you arrive on campus for orientation."
      }
    ],
    process: [
      {
        step: "01",
        title: "Understand Destination Visa Requirements",
        description: "Review current embassy policies, CAS/I-20 issuance rules, and applicable healthcare surcharges."
      },
      {
        step: "02",
        title: "Prepare the Document Checklist",
        description: "Assemble verified academic records, valid passport, medical reports, and compliant financial proofs."
      },
      {
        step: "03",
        title: "Review Application Information",
        description: "Thoroughly review each section of your draft visa application for consistency and truthfulness."
      },
      {
        step: "04",
        title: "Guide Application Preparation",
        description: "Assist with fee payment, biometric appointment scheduling, and submission of electronic documents."
      },
      {
        step: "05",
        title: "Prepare for the Next Stage",
        description: "Conduct mock interview practice if applicable, track passport return, and transition to pre-departure planning."
      }
    ],
    pricing: {
      headline: "Professional Visa Guidance Advisory",
      note: "We offer professional procedural advice. Visa application fees and government health surcharges are paid directly to immigration authorities. Visa decisions remain strictly at the discretion of the embassy.",
      packages: [
        {
          name: "Visa File Audit",
          tagline: "Independent review for self-prepared applicants",
          price: "Inquire for Audit",
          badge: "Essential Review",
          features: [
            "Document completeness check",
            "Financial proof holding period audit",
            "Single review session of completed form",
            "Summary recommendations"
          ],
          cta: "Request File Audit"
        },
        {
          name: "Complete Visa Guidance",
          tagline: "End-to-end guidance through the entire visa procedure",
          price: "Discuss Requirements",
          badge: "Most Popular",
          features: [
            "Customized country-specific document checklist",
            "Step-by-step visa form completion assistance",
            "Biometric and medical appointment guidance",
            "2 mock visa interview sessions (where applicable)",
            "Active status follow-up advisory"
          ],
          cta: "Select Complete Guidance"
        },
        {
          name: "Combined Admissions & Visa Suite",
          tagline: "Integrated support covering both offers and visa",
          price: "Custom Package",
          badge: "Comprehensive",
          features: [
            "Seamless transition from university offer to CAS/I-20",
            "All Complete Visa Guidance features",
            "Priority advisor support",
            "Includes Pre-Departure preparation briefing"
          ],
          cta: "Explore Combined Suite"
        }
      ]
    },
    faqs: [
      {
        q: "Can any agency guarantee a 100% student visa approval?",
        a: "No. Any agency claiming guaranteed visa approval is acting deceptively. Sovereign governments and their consular officers hold sole legal authority over visa decisions. Our role is to ensure your application is strictly compliant, thorough, honest, and presented with optimal clarity."
      },
      {
        q: "How long does a student visa typically take to be processed?",
        a: "Processing times vary significantly: from 3 weeks for standard UK student visas to 4–8 weeks for Canada and Australia, or dependent on interview appointment availability for the USA. We always advise submitting as early as your university's CAS/I-20 allows."
      },
      {
        q: "What should I expect during a US F-1 visa interview?",
        a: "The US visa interview is usually brief (3 to 5 minutes). The consular officer will ask about your chosen university, your academic background, how your studies are funded, and your plans upon graduation. Honesty, clarity, and concise answers are vital."
      },
      {
        q: "Can I bring my spouse or dependents on a student visa?",
        a: "Dependent visa policies vary widely by country and degree level. For example, the UK currently restricts dependents for most taught master's students, while Australia, Canada, and the US allow dependents under specific degree categories and financial proof rules."
      },
      {
        q: "What should I do if my visa application has a previous refusal?",
        a: "If you have a past refusal, you must disclose it honestly. We help examine the refusal letter, understand the specific grounds cited, address the deficiencies with verifiable evidence, and prepare an honest re-application if permissible."
      }
    ],
    relatedServices: [
      "admission-application-assistance",
      "scholarship-financial-guidance",
      "pre-departure-student-support"
    ],
    ctaTitle: "Prepare for Your Next Step Abroad With Confidence.",
    ctaDescription: "Connect with our visa guidance team to review your documentation checklist and navigate student visa requirements with peace of mind."
  },

  "pre-departure-student-support": {
    id: "pre-departure-student-support",
    number: "06",
    category: "Visa & Preparation",
    title: "Pre-Departure & Student Support",
    shortDescription: "Prepare for your transition abroad with practical guidance on travel preparation, accommodation research, and settling into a new environment.",
    heroDescription: "Transition smoothly into your international university life with comprehensive briefings on packing, housing research, banking, and cultural adaptation.",
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85",
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>`,
    highlights: [
      "Pre-Departure Preparation",
      "Travel & Accommodation Guidance",
      "Initial Student Support"
    ],
    overview: `Receiving your student visa is a momentous achievement, but stepping onto a plane to live in a new country brings a host of practical considerations. From understanding customs regulations and booking verified accommodation to setting up local bank accounts, a well-prepared departure makes all the difference.

Our Pre-Departure & Student Support service is designed to equip students and their families with practical confidence. We conduct pre-departure briefing sessions covering travel documentation checklists, health and travel insurance guidelines, luggage allowances, and airport arrival protocols.

We also provide guidance on researching on-campus vs off-campus housing, understanding tenancy lease terms safely, navigating public transit, setting up mobile SIM cards and student bank accounts, and adapting smoothly to your university's academic culture.`,
    overviewHighlights: [
      "Comprehensive pre-departure briefings for students and parents before flying",
      "Guidance on researching university student halls, private halls, and homestays safely",
      "Checklists covering essential original documents, medical prescriptions, and packing",
      "Practical orientation on student banking, SIM cards, transport cards, and emergency support"
    ],
    features: [
      {
        title: "Pre-Departure Checklist",
        description: "A comprehensive list detailing essential flight documents, enrollment papers, prescriptions, and currency needs.",
        icon: "check-square"
      },
      {
        title: "Travel Preparation Guidance",
        description: "Advice on flight booking timing, baggage regulations, transit rules, and port of entry immigration clearance.",
        icon: "plane"
      },
      {
        title: "Accommodation Research Guidance",
        description: "Guidance on exploring university halls of residence, PBSAs (Purpose-Built Student Accommodation), and tenancy contracts.",
        icon: "home"
      },
      {
        title: "Understanding Arrival Requirements",
        description: "Guidance on university registration dates, orientation week schedules, campus biometric card pickup, and police registration.",
        icon: "info"
      },
      {
        title: "Initial Settling-In Guidance",
        description: "Practical advice on opening student bank accounts, setting up telecom plans, registering with local doctors, and student discounts.",
        icon: "users"
      }
    ],
    benefits: [
      {
        title: "Smooth Transition Abroad",
        description: "Arrive at your campus feeling informed, organized, and confident rather than anxious or overwhelmed."
      },
      {
        title: "Safe Accommodation Choices",
        description: "Learn how to identify legitimate, verified student housing and avoid online rental scams before arrival."
      },
      {
        title: "Prepared for Immigration Entry",
        description: "Carry the exact documents required at border control to clear airport immigration smoothly."
      },
      {
        title: "Peace of Mind for Families",
        description: "Provide parents with clear information on support contacts, campus safety, and initial communication plans."
      }
    ],
    process: [
      {
        step: "01",
        title: "Review Departure Requirements",
        description: "Verify visa validity dates, official university arrival windows, and orientation week schedules."
      },
      {
        step: "02",
        title: "Prepare Travel Documentation",
        description: "Organize hand-luggage document folder containing offer letter, CAS/I-20, visa grant, and medical clearances."
      },
      {
        step: "03",
        title: "Explore Accommodation Options",
        description: "Review university housing applications, private hall options, lease agreements, and deposit safety guidelines."
      },
      {
        step: "04",
        title: "Understand Arrival Arrangements",
        description: "Map airport pickup services, local transit connections, temporary stays, and key campus check-in points."
      },
      {
        step: "05",
        title: "Complete Pre-Departure Checklist",
        description: "Attend the interactive pre-departure briefing session, connect with fellow traveling students, and pack with confidence."
      }
    ],
    pricing: {
      headline: "Essential Student Transition Guidance",
      note: "Pre-departure briefings are often included for students who have utilized our comprehensive application and visa services, or available as a standalone session.",
      packages: [
        {
          name: "Standard Departure Briefing",
          tagline: "Group orientation & checklist session",
          price: "Included with Admissions",
          badge: "Essential",
          features: [
            "Group pre-departure orientation briefing",
            "Complete physical & digital document checklist",
            "Port-of-entry customs & immigration guide",
            "General packing and luggage allowance tips"
          ],
          cta: "Access Checklist"
        },
        {
          name: "Personalized Transition Advisory",
          tagline: "1-on-1 session for student and parents",
          price: "Discuss Requirements",
          badge: "Personalized",
          features: [
            "Private 1-on-1 advisor briefing session",
            "Accommodation contract review guidance",
            "Local banking and SIM setup advice",
            "City-specific transit & cost of living breakdown",
            "Alumni network connection where available"
          ],
          cta: "Book 1-on-1 Session"
        },
        {
          name: "Complete Global Onboarding",
          tagline: "Full-scale support including post-arrival check-ins",
          price: "Custom Package",
          badge: "Complete Care",
          features: [
            "All Personalized Advisory features",
            "Airport arrival coordination advisory",
            "First 30 days settling-in checklist and check-ins",
            "Ongoing emergency advisory contact"
          ],
          cta: "Inquire for Full Care"
        }
      ]
    },
    faqs: [
      {
        q: "When should I book my flight tickets?",
        a: "We strongly advise waiting until your student visa has been officially approved and physically stamped in your passport or digitally confirmed before booking non-refundable flight tickets."
      },
      {
        q: "Should I choose on-campus or off-campus accommodation for my first year?",
        a: "For most international students, on-campus university halls or purpose-built student accommodation (PBSA) is strongly recommended for the first year. It simplifies bills, provides 24/7 security, and makes it much easier to make friends and settle into campus life."
      },
      {
        q: "What documents must I keep in my hand luggage?",
        a: "Never check in critical documents. Keep in your hand luggage: original passport with visa vignette, university offer letter, CAS/I-20 document, financial proof summary, address of confirmed accommodation, vaccination/medical records, and university emergency contact numbers."
      },
      {
        q: "How do I pay for expenses during my first few days abroad?",
        a: "Carry a modest amount of foreign currency cash (for immediate transport or meals), an international multi-currency travel card, or an activated international debit/credit card until your local student bank account is operational."
      },
      {
        q: "Can I connect with other students traveling to the same university?",
        a: "Yes! During our pre-departure sessions, we often facilitate connections among students heading to the same city or university, so you can share travel plans and establish early friendships."
      }
    ],
    relatedServices: [
      "visa-guidance-assistance",
      "admission-application-assistance",
      "university-course-selection"
    ],
    ctaTitle: "Get Ready for the Experience Ahead.",
    ctaDescription: "Join our pre-departure briefing to ensure you have every detail covered—from packing and documentation to settling smoothly into your new campus."
  }
};

// Export for browser global and module environments if needed
if (typeof window !== 'undefined') {
  window.serviceData = serviceData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = serviceData;
}
