/**
 * dashboard-data.js
 * Centralized sample data for the Student User Dashboard
 * Study Abroad & Overseas Education Consultancy
 *
 * Usage: Include this file before dashboard scripts.
 * Access via: window.DashboardData
 */

(function () {
  "use strict";

  // ─── Student Profile ────────────────────────────────────────────────────────
  const student = {
    name: "Ananya Sharma",
    firstName: "Ananya",
    id: "STU-2026-0148",
    email: "ananya.sharma@example.com",
    mobile: "+91 98765 43210",
    qualification: "Bachelor's Degree",
    studyLevel: "Postgraduate",
    destinations: ["United Kingdom", "Canada"],
    interestedCourse: "Computer Science",
    intake: "September 2027",
    profileCompletion: 78,
    initials: "AS",
    counselor: {
      name: "Sarah Williams",
      role: "Education Counselor",
      initials: "SW"
    }
  };

  // ─── Stats ───────────────────────────────────────────────────────────────────
  const stats = {
    universitiesShortlisted: 4,  // matches universities array length
    activeApplications: 3,       // matches applications array length
    documentsCompleted: 8,       // matches uploaded docs count
    documentsTotal: 10,          // matches documents array length
    overallProgress: 68          // percentage
  };

  // ─── Journey Timeline (7 stages) ────────────────────────────────────────────
  const journey = [
    {
      id: 1,
      title: "Profile Evaluation",
      status: "completed",
      description: "Academic and personal profile assessed by counselor."
    },
    {
      id: 2,
      title: "University Shortlisting",
      status: "completed",
      description: "Four universities shortlisted based on profile match."
    },
    {
      id: 3,
      title: "Document Preparation",
      status: "active",
      description: "Collecting and preparing required application documents."
    },
    {
      id: 4,
      title: "Application Submission",
      status: "pending",
      description: "Submit applications to shortlisted universities."
    },
    {
      id: 5,
      title: "Offer Letter",
      status: "pending",
      description: "Receive and review conditional or unconditional offers."
    },
    {
      id: 6,
      title: "Visa Preparation",
      status: "pending",
      description: "Gather visa documents and schedule appointment."
    },
    {
      id: 7,
      title: "Pre-Departure",
      status: "pending",
      description: "Prepare for travel, accommodation, and arrival."
    }
  ];

  // ─── Universities (4 cards) ──────────────────────────────────────────────────
  const universities = [
    {
      id: "uni-001",
      name: "University of Manchester",
      country: "United Kingdom",
      countryCode: "GB",
      program: "MSc Computer Science",
      intake: "September 2027",
      status: "Shortlisted",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
      ranking: "Top 30 QS World",
      description: "A leading research university in the heart of Manchester, offering world-class postgraduate programmes in Computer Science."
    },
    {
      id: "uni-002",
      name: "University of Toronto",
      country: "Canada",
      countryCode: "CA",
      program: "MSc Applied Computing",
      intake: "September 2027",
      status: "Under Review",
      image: "https://images.unsplash.com/photo-1569534403783-4d7fe38da5c6?w=600&q=80",
      ranking: "Top 25 QS World",
      description: "Canada's leading research university offering advanced programmes in Computing and Information Technology."
    },
    {
      id: "uni-003",
      name: "University of Melbourne",
      country: "Australia",
      countryCode: "AU",
      program: "Master of Information Technology",
      intake: "February 2027",
      status: "Shortlisted",
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&q=80",
      ranking: "Top 35 QS World",
      description: "A prestigious university offering innovative IT postgraduate programmes with strong industry connections."
    },
    {
      id: "uni-004",
      name: "University of Birmingham",
      country: "United Kingdom",
      countryCode: "GB",
      program: "MSc Data Science",
      intake: "September 2027",
      status: "Shortlisted",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&q=80",
      ranking: "Top 100 QS World",
      description: "A Russell Group university with an excellent reputation in Data Science and Artificial Intelligence research."
    }
  ];

  // ─── Applications (3 records) ────────────────────────────────────────────────
  const applications = [
    {
      id: "APP-2026-001",
      university: "University of Manchester",
      course: "MSc Computer Science",
      country: "United Kingdom",
      countryCode: "GB",
      intake: "September 2027",
      status: "Documents Pending",
      statusClass: "status-pending",
      appliedDate: "15 Oct 2026",
      refId: "UOM-MSC-CS-2027",
      pendingTasks: [
        "Upload Statement of Purpose",
        "Submit English Language Test Result"
      ],
      nextAction: "Upload your Statement of Purpose and English Language Test Result to proceed."
    },
    {
      id: "APP-2026-002",
      university: "University of Toronto",
      course: "MSc Applied Computing",
      country: "Canada",
      countryCode: "CA",
      intake: "September 2027",
      status: "Under Review",
      statusClass: "status-review",
      appliedDate: "20 Oct 2026",
      refId: "UOT-MSC-AC-2027",
      pendingTasks: [],
      nextAction: "Your application is currently under review by the university admissions team."
    },
    {
      id: "APP-2026-003",
      university: "University of Melbourne",
      course: "Master of IT",
      country: "Australia",
      countryCode: "AU",
      intake: "February 2027",
      status: "Profile Evaluation",
      statusClass: "status-evaluation",
      appliedDate: "25 Oct 2026",
      refId: "UOM-MIT-2027",
      pendingTasks: [
        "Complete profile evaluation session",
        "Confirm document checklist"
      ],
      nextAction: "Schedule a profile evaluation session with your counselor to begin the application process."
    }
  ];

  // ─── Documents (10 items — 8 uploaded, 2 pending) ───────────────────────────
  const documents = [
    {
      id: "doc-001",
      name: "Academic Transcripts",
      type: "Academic",
      status: "uploaded",
      required: true,
      lastUpdated: "10 Oct 2026",
      fileSize: "2.4 MB",
      format: "PDF"
    },
    {
      id: "doc-002",
      name: "Degree Certificate",
      type: "Academic",
      status: "uploaded",
      required: true,
      lastUpdated: "10 Oct 2026",
      fileSize: "1.1 MB",
      format: "PDF"
    },
    {
      id: "doc-003",
      name: "Passport",
      type: "Identity",
      status: "uploaded",
      required: true,
      lastUpdated: "08 Oct 2026",
      fileSize: "0.8 MB",
      format: "PDF"
    },
    {
      id: "doc-004",
      name: "Resume / CV",
      type: "Professional",
      status: "uploaded",
      required: true,
      lastUpdated: "12 Oct 2026",
      fileSize: "0.5 MB",
      format: "PDF"
    },
    {
      id: "doc-005",
      name: "Statement of Purpose",
      type: "Academic",
      status: "pending",
      required: true,
      lastUpdated: null,
      fileSize: null,
      format: "PDF"
    },
    {
      id: "doc-006",
      name: "Letters of Recommendation",
      type: "Academic",
      status: "uploaded",
      required: true,
      lastUpdated: "14 Oct 2026",
      fileSize: "1.8 MB",
      format: "PDF"
    },
    {
      id: "doc-007",
      name: "English Language Test Result",
      type: "Test Score",
      status: "pending",
      required: true,
      lastUpdated: null,
      fileSize: null,
      format: "PDF"
    },
    {
      id: "doc-008",
      name: "Passport-size Photograph",
      type: "Identity",
      status: "uploaded",
      required: true,
      lastUpdated: "08 Oct 2026",
      fileSize: "0.3 MB",
      format: "JPG"
    },
    {
      id: "doc-009",
      name: "Work Experience Certificate",
      type: "Professional",
      status: "not-required",
      required: false,
      lastUpdated: null,
      fileSize: null,
      format: "PDF"
    },
    {
      id: "doc-010",
      name: "Financial Documents",
      type: "Financial",
      status: "pending",
      required: true,
      lastUpdated: null,
      fileSize: null,
      format: "PDF"
    }
  ];

  // ─── Scholarships (3 items) ──────────────────────────────────────────────────
  const scholarships = [
    {
      id: "sch-001",
      title: "University Merit Scholarship",
      category: "Merit Based",
      destination: "United Kingdom",
      eligibility: "Based on academic performance and grades achieved during undergraduate studies.",
      description: "Illustrative merit-based funding opportunity available to high-achieving international students at select UK universities.",
      deadline: "Contact university for current deadlines",
      amount: "Contact university for details"
    },
    {
      id: "sch-002",
      title: "International Student Scholarship",
      category: "International Student Funding",
      destination: "Canada",
      eligibility: "Subject to university-specific requirements for international students.",
      description: "Illustrative funding opportunity for international students at Canadian universities. Eligibility and award amounts vary by institution.",
      deadline: "Contact university for current deadlines",
      amount: "Contact university for details"
    },
    {
      id: "sch-003",
      title: "Graduate Research Funding",
      category: "Research Funding",
      destination: "Australia",
      eligibility: "Depends on research proposal and institution acceptance.",
      description: "Illustrative research funding opportunity for postgraduate research students at Australian universities.",
      deadline: "Contact university for current deadlines",
      amount: "Contact university for details"
    }
  ];

  // ─── Visa Checklist (6 items) ────────────────────────────────────────────────
  const visaChecklist = [
    {
      id: "visa-001",
      task: "Passport Validity",
      status: "completed",
      note: "Ensure passport is valid for the full duration of your studies plus additional months."
    },
    {
      id: "visa-002",
      task: "University Offer Letter",
      status: "pending",
      note: "Required for student visa application. Awaiting university acceptance."
    },
    {
      id: "visa-003",
      task: "Financial Documentation",
      status: "in-progress",
      note: "Bank statements and financial guarantee letters are being prepared."
    },
    {
      id: "visa-004",
      task: "Visa Application Form",
      status: "pending",
      note: "Complete the official student visa application form for your destination country."
    },
    {
      id: "visa-005",
      task: "Medical / Additional Requirements",
      status: "pending",
      note: "Check specific medical and health insurance requirements for your destination."
    },
    {
      id: "visa-006",
      task: "Visa Appointment",
      status: "pending",
      note: "Schedule your visa appointment at the relevant embassy or visa centre."
    }
  ];

  // ─── Messages (conversation) ─────────────────────────────────────────────────
  const messages = [
    {
      id: "msg-001",
      sender: "counselor",
      text: "Hello Ananya! I've reviewed your academic profile. We can now move forward with the document preparation stage.",
      timestamp: "10 Oct 2026, 10:15 AM",
      read: true
    },
    {
      id: "msg-002",
      sender: "student",
      text: "Thank you. I am currently preparing my Statement of Purpose.",
      timestamp: "10 Oct 2026, 11:42 AM",
      read: true
    },
    {
      id: "msg-003",
      sender: "counselor",
      text: "That's great. Please share your draft when it's ready so we can review it.",
      timestamp: "10 Oct 2026, 02:30 PM",
      read: true
    },
    {
      id: "msg-004",
      sender: "student",
      text: "Sure, I will prepare it this week.",
      timestamp: "10 Oct 2026, 03:05 PM",
      read: true
    },
    {
      id: "msg-005",
      sender: "counselor",
      text: "Also, please check if your English Language Test result certificate is available. We will need it for the Manchester application.",
      timestamp: "12 Oct 2026, 09:20 AM",
      read: false
    }
  ];

  // ─── Appointments (1 upcoming) ───────────────────────────────────────────────
  const appointments = [
    {
      id: "apt-001",
      type: "Application Guidance",
      counselor: "Sarah Williams",
      counselorInitials: "SW",
      date: "15 March 2027",
      time: "11:00 AM",
      mode: "Online",
      status: "Scheduled",
      statusNote: "Demo appointment — no real booking has been made.",
      meetingLink: "#"
    }
  ];

  // ─── Notifications (4 items — 3 unread) ─────────────────────────────────────
  const notifications = [
    {
      id: "notif-001",
      text: "Your Statement of Purpose is still pending.",
      section: "documents",
      read: false,
      time: "2 hours ago"
    },
    {
      id: "notif-002",
      text: "Your University of Toronto application is under review.",
      section: "applications",
      read: false,
      time: "1 day ago"
    },
    {
      id: "notif-003",
      text: "A new counselor message is available.",
      section: "messages",
      read: false,
      time: "2 days ago"
    },
    {
      id: "notif-004",
      text: "Your document checklist needs attention.",
      section: "documents",
      read: true,
      time: "3 days ago"
    }
  ];

  // ─── Settings ────────────────────────────────────────────────────────────────
  const settings = {
    theme: "light",       // "light" | "dark"
    direction: "ltr",    // "ltr" | "rtl"
    notifications: {
      emailUpdates: true,
      applicationUpdates: true,
      documentReminders: true,
      messageAlerts: true
    }
  };

  // ─── Export ──────────────────────────────────────────────────────────────────
  window.DashboardData = {
    student,
    stats,
    journey,
    universities,
    applications,
    documents,
    scholarships,
    visaChecklist,
    messages,
    appointments,
    notifications,
    settings
  };

})();
