(function () {
  'use strict';

  const serviceTitles = [
    'Career & Profile Evaluation',
    'University & Course Selection',
    'Admission & Application Assistance',
    'Scholarship & Financial Guidance',
    'Visa Guidance & Assistance',
    'Pre-Departure & Student Support'
  ];

  const blogTitles = [
    'How to Choose the Right Country for Your Higher Education',
    'A Complete Guide to Choosing the Right University and Course',
    'Scholarships for International Students: What You Should Know',
    'How to Prepare a Strong University Application',
    'Student Visa Preparation: A Step-by-Step Guide',
    'Preparing for Life Abroad: Your Essential Pre-Departure Checklist'
  ];

  const data = {
    admin: {
      name: 'Olivia Anderson',
      email: 'olivia.anderson@example.com',
      role: 'Super Admin',
      id: 'ADM-2026-001',
      initials: 'OA'
    },
    students: [
      { id: 'STU-2026-0148', name: 'Ananya Sharma', email: 'ananya.sharma@example.com', mobile: '+91 98765 43210', destination: 'United Kingdom, Canada', studyLevel: 'Postgraduate', status: 'Active', qualification: "Bachelor's Degree", course: 'Computer Science', intake: 'September 2027', universities: ['University of Manchester', 'University of Toronto'], profileCompletion: 78 },
      { id: 'STU-2026-0149', name: 'Rahul Menon', email: 'rahul.menon@example.com', mobile: '+91 98765 43321', destination: 'Australia', studyLevel: 'Postgraduate', status: 'Active', qualification: "Bachelor's Degree", course: 'Data Science', intake: 'February 2027', universities: ['University of Melbourne'], profileCompletion: 86 },
      { id: 'STU-2026-0150', name: 'Emily Thomas', email: 'emily.thomas@example.com', mobile: '+91 98765 43432', destination: 'Germany', studyLevel: 'Undergraduate', status: 'Pending', qualification: 'Higher Secondary', course: 'Business', intake: 'October 2027', universities: ['University of Birmingham'], profileCompletion: 54 },
      { id: 'STU-2026-0151', name: 'Arjun Kumar', email: 'arjun.kumar@example.com', mobile: '+91 98765 43543', destination: 'United Kingdom', studyLevel: 'Postgraduate', status: 'Active', qualification: "Bachelor's Degree", course: 'Finance', intake: 'September 2027', universities: ['University of Manchester'], profileCompletion: 91 },
      { id: 'STU-2026-0152', name: 'Sarah Joseph', email: 'sarah.joseph@example.com', mobile: '+91 98765 43654', destination: 'Canada', studyLevel: 'Research', status: 'Active', qualification: "Master's Degree", course: 'Public Health', intake: 'January 2028', universities: ['University of Toronto'], profileCompletion: 72 }
    ],
    enquiries: [
      { id: 'ENQ-2026-0348', name: 'Meera Nair', email: 'meera.nair@example.com', mobile: '+91 98100 12001', destination: 'United Kingdom', studyLevel: 'Postgraduate', service: serviceTitles[1], course: 'Psychology', intake: 'September 2027', date: '18 Nov 2026', status: 'New', message: 'I would like guidance comparing postgraduate psychology programmes.' },
      { id: 'ENQ-2026-0347', name: 'Daniel Thomas', email: 'daniel.thomas@example.com', mobile: '+91 98100 12002', destination: 'Canada', studyLevel: 'Undergraduate', service: serviceTitles[0], course: 'Engineering', intake: 'January 2028', date: '17 Nov 2026', status: 'In Progress', message: 'Please help me understand the study options for engineering.' },
      { id: 'ENQ-2026-0346', name: 'Aisha Khan', email: 'aisha.khan@example.com', mobile: '+91 98100 12003', destination: 'Australia', studyLevel: 'Postgraduate', service: serviceTitles[3], course: 'Public Health', intake: 'February 2027', date: '16 Nov 2026', status: 'Contacted', message: 'I am exploring funding guidance for postgraduate study.' },
      { id: 'ENQ-2026-0345', name: 'Kiran Patel', email: 'kiran.patel@example.com', mobile: '+91 98100 12004', destination: 'Germany', studyLevel: 'Undergraduate', service: serviceTitles[1], course: 'Design', intake: 'October 2027', date: '15 Nov 2026', status: 'Converted', message: 'I am interested in studying design in Germany.' },
      { id: 'ENQ-2026-0344', name: 'Priya Das', email: 'priya.das@example.com', mobile: '+91 98100 12005', destination: 'Ireland', studyLevel: 'Postgraduate', service: serviceTitles[2], course: 'Business Analytics', intake: 'September 2027', date: '14 Nov 2026', status: 'Closed', message: 'I would like to know about application preparation support.' }
    ],
    applications: [
      { id: 'APP-2026-001', studentId: 'STU-2026-0148', university: 'University of Manchester', course: 'MSc Computer Science', country: 'United Kingdom', intake: 'September 2027', submitted: '15 Oct 2026', status: 'Documents Pending', nextAction: 'Review Statement of Purpose and language test checklist.', notes: 'Demo record. No application has been submitted to the university.' },
      { id: 'APP-2026-002', studentId: 'STU-2026-0148', university: 'University of Toronto', course: 'MSc Applied Computing', country: 'Canada', intake: 'September 2027', submitted: '20 Oct 2026', status: 'Under Review', nextAction: 'Follow up on the sample review timeline.', notes: 'Demo record. Status is illustrative only.' },
      { id: 'APP-2026-003', studentId: 'STU-2026-0149', university: 'University of Melbourne', course: 'Master of Information Technology', country: 'Australia', intake: 'February 2027', submitted: '25 Oct 2026', status: 'Profile Evaluation', nextAction: 'Complete profile evaluation session.', notes: 'Demo record. No application has been submitted to the university.' },
      { id: 'APP-2026-004', studentId: 'STU-2026-0150', university: 'University of Birmingham', course: 'BSc Business Management', country: 'United Kingdom', intake: 'September 2027', submitted: '02 Nov 2026', status: 'Ready to Apply', nextAction: 'Review application checklist with the student.', notes: 'Demo record. No application has been submitted to the university.' },
      { id: 'APP-2026-005', studentId: 'STU-2026-0151', university: 'University of Manchester', course: 'MSc Finance', country: 'United Kingdom', intake: 'September 2027', submitted: '08 Nov 2026', status: 'Offer Received', nextAction: 'Discuss next steps with the student.', notes: 'Illustrative sample status.' },
      { id: 'APP-2026-006', studentId: 'STU-2026-0152', university: 'University of Toronto', course: 'Master of Public Health', country: 'Canada', intake: 'January 2028', submitted: '11 Nov 2026', status: 'Submitted', nextAction: 'Wait for sample status update.', notes: 'Demo record. No application has been submitted to the university.' }
    ],
    documents: [
      { id: 'DOC-2026-081', studentId: 'STU-2026-0148', name: 'Academic Transcripts', type: 'Academic', uploaded: '10 Nov 2026', status: 'Pending Review', filename: 'sample-transcript.pdf', reason: '' },
      { id: 'DOC-2026-082', studentId: 'STU-2026-0148', name: 'Passport', type: 'Identity', uploaded: '11 Nov 2026', status: 'Approved', filename: 'demo-passport-record.pdf', reason: '' },
      { id: 'DOC-2026-083', studentId: 'STU-2026-0149', name: 'Resume / CV', type: 'Professional', uploaded: '12 Nov 2026', status: 'Pending Review', filename: 'sample-resume.pdf', reason: '' },
      { id: 'DOC-2026-084', studentId: 'STU-2026-0150', name: 'Statement of Purpose', type: 'Academic', uploaded: '13 Nov 2026', status: 'Re-upload Required', filename: 'sample-sop.pdf', reason: 'Please check the file is complete before resubmitting.' },
      { id: 'DOC-2026-085', studentId: 'STU-2026-0151', name: 'Degree Certificate', type: 'Academic', uploaded: '14 Nov 2026', status: 'Approved', filename: 'demo-degree-record.pdf', reason: '' },
      { id: 'DOC-2026-086', studentId: 'STU-2026-0152', name: 'English Language Test Result', type: 'Test Score', uploaded: '17 Nov 2026', status: 'Pending Review', filename: 'sample-test-result.pdf', reason: '' }
    ],
    consultations: [
      { id: 'CON-2026-012', name: 'Meera Nair', email: 'meera.nair@example.com', mobile: '+91 98100 12001', destination: 'United Kingdom', studyLevel: 'Postgraduate', course: 'Psychology', mode: 'Video call', date: '25 Nov 2026', time: '10:30 AM', status: 'New Request', message: 'I would like to compare a few course options.' },
      { id: 'CON-2026-011', name: 'Rahul Menon', email: 'rahul.menon@example.com', mobile: '+91 98765 43321', destination: 'Australia', studyLevel: 'Postgraduate', course: 'Data Science', mode: 'Phone call', date: '27 Nov 2026', time: '02:00 PM', status: 'Awaiting Confirmation', message: 'Please review my shortlist.' },
      { id: 'CON-2026-010', name: 'Ananya Sharma', email: 'ananya.sharma@example.com', mobile: '+91 98765 43210', destination: 'Canada', studyLevel: 'Postgraduate', course: 'Computer Science', mode: 'Video call', date: '30 Nov 2026', time: '11:00 AM', status: 'Confirmed (Demo)', message: 'Application progress discussion.' },
      { id: 'CON-2026-009', name: 'Emily Thomas', email: 'emily.thomas@example.com', mobile: '+91 98765 43432', destination: 'Germany', studyLevel: 'Undergraduate', course: 'Business', mode: 'In person', date: '03 Dec 2026', time: '03:30 PM', status: 'Reschedule Requested', message: 'Would like to discuss alternate dates.' }
    ],
    appointments: [
      { id: 'APT-2026-026', studentId: 'STU-2026-0148', counselor: 'Sarah Williams', date: '2026-11-30', time: '11:00', mode: 'Video call', topic: 'Application progress', status: 'Confirmed (Demo)' },
      { id: 'APT-2026-027', studentId: 'STU-2026-0149', counselor: 'Olivia Anderson', date: '2026-12-03', time: '14:00', mode: 'Phone call', topic: 'University shortlist review', status: 'Awaiting Confirmation' },
      { id: 'APT-2026-028', studentId: 'STU-2026-0150', counselor: 'Sarah Williams', date: '2026-12-05', time: '10:30', mode: 'In person', topic: 'Profile evaluation', status: 'Confirmed (Demo)' }
    ],
    messages: [
      { studentId: 'STU-2026-0148', unread: 2, messages: [{ from: 'counselor', text: 'I have reviewed your shortlist. Let us discuss the Manchester application next.', time: 'Today, 9:42 AM' }, { from: 'student', text: 'Thank you. I will prepare the documents before our call.', time: 'Today, 10:08 AM' }, { from: 'counselor', text: 'Please bring your latest transcript and SOP draft.', time: 'Today, 10:20 AM' }] },
      { studentId: 'STU-2026-0149', unread: 1, messages: [{ from: 'counselor', text: 'Your sample profile review is ready.', time: 'Yesterday, 3:10 PM' }, { from: 'student', text: 'Could we go through it in our next call?', time: 'Yesterday, 3:25 PM' }] },
      { studentId: 'STU-2026-0150', unread: 0, messages: [{ from: 'student', text: 'I have a question about my document checklist.', time: '12 Nov, 1:15 PM' }, { from: 'counselor', text: 'I can help with that. Please share which item you are reviewing.', time: '12 Nov, 1:36 PM' }] },
      { studentId: 'STU-2026-0151', unread: 0, messages: [{ from: 'counselor', text: 'Congratulations on the sample offer update. Let us review the next steps together.', time: '11 Nov, 4:10 PM' }] }
    ],
    universities: [
      { id: 'UNI-001', name: 'University of Manchester', country: 'United Kingdom', city: 'Manchester', website: 'https://www.manchester.ac.uk/', courses: 'Computer Science, Finance', levels: 'Postgraduate', status: 'Listed', description: 'Sample directory listing. Confirm programme details with the institution.' },
      { id: 'UNI-002', name: 'University of Toronto', country: 'Canada', city: 'Toronto', website: 'https://www.utoronto.ca/', courses: 'Applied Computing, Public Health', levels: 'Postgraduate, Research', status: 'Listed', description: 'Sample directory listing. Not a confirmed consultancy partnership.' },
      { id: 'UNI-003', name: 'University of Melbourne', country: 'Australia', city: 'Melbourne', website: 'https://www.unimelb.edu.au/', courses: 'Information Technology, Data Science', levels: 'Postgraduate', status: 'Listed', description: 'Sample directory listing. Confirm programme details with the institution.' },
      { id: 'UNI-004', name: 'University of Birmingham', country: 'United Kingdom', city: 'Birmingham', website: 'https://www.birmingham.ac.uk/', courses: 'Business, Data Science', levels: 'Undergraduate, Postgraduate', status: 'Listed', description: 'Sample directory listing. Not a confirmed consultancy partnership.' },
      { id: 'UNI-005', name: 'University of Sydney', country: 'Australia', city: 'Sydney', website: 'https://www.sydney.edu.au/', courses: 'Business, Engineering', levels: 'Undergraduate, Postgraduate', status: 'Draft', description: 'Sample directory listing. Confirm programme details with the institution.' },
      { id: 'UNI-006', name: 'University of British Columbia', country: 'Canada', city: 'Vancouver', website: 'https://www.ubc.ca/', courses: 'Arts, Applied Science', levels: 'Undergraduate, Postgraduate', status: 'Listed', description: 'Sample directory listing. Not a confirmed consultancy partnership.' }
    ],
    scholarships: [
      { id: 'SCH-001', title: 'University Merit Scholarship', destination: 'United Kingdom', category: 'Merit Based', eligibility: 'Check the university website for current criteria.', url: '', deadline: '', status: 'Published' },
      { id: 'SCH-002', title: 'International Student Scholarship', destination: 'Canada', category: 'International Student Funding', eligibility: 'Requirements and availability vary by institution.', url: '', deadline: '', status: 'Published' },
      { id: 'SCH-003', title: 'Graduate Research Funding', destination: 'Australia', category: 'Research Funding', eligibility: 'Confirm eligibility with the relevant university.', url: '', deadline: '', status: 'Draft' }
    ],
    services: serviceTitles.map((title, index) => ({
      id: 'SRV-' + String(index + 1).padStart(3, '0'),
      title,
      category: ['Planning & Guidance', 'University Admissions', 'Application Support', 'Funding Guidance', 'Visa Preparation', 'Student Support'][index],
      description: [
        'Review academic strengths, goals, and study pathway options.',
        'Compare suitable study destinations, universities, and courses.',
        'Organize application preparation and submission guidance.',
        'Explore scholarship information and financial planning guidance.',
        'Prepare for visa processes using official destination information.',
        'Plan practical next steps before departure.'
      ][index],
      features: ['Guidance session', 'Personalized next steps', 'Sample checklist'],
      process: ['Initial discussion', 'Review and planning', 'Follow-up guidance'],
      faqs: ['Contact the consultancy for current service details.'],
      status: 'Published'
    })),
    pricingPlans: [
      { id: 'PLAN-001', name: 'Essential Guidance', description: 'A starting point for profile guidance and university exploration.', price: '$350 · demo package fee', features: ['Initial student profile evaluation', 'Study destination exploration', 'Basic university selection guidance'], status: 'Published' },
      { id: 'PLAN-002', name: 'Complete Application Support', description: 'Structured guidance for university selection and application preparation.', price: '$750 · demo package fee', features: ['University and course selection', 'Application document guidance', 'Scholarship opportunity exploration'], status: 'Published' },
      { id: 'PLAN-003', name: 'Premium Journey Support', description: 'Broader guidance across admissions, visa preparation, and pre-departure.', price: '$1,250 · demo package fee', features: ['Application preparation support', 'Visa documentation guidance', 'Pre-departure preparation'], status: 'Published' }
    ],
    blogs: blogTitles.map((title, index) => ({
      id: 'BLOG-00' + (index + 1),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      category: ['Study Destinations', 'University Admissions', 'Scholarships', 'Applications', 'Visa Guidance', 'Student Life'][index],
      author: ['Elena Rostova', 'Marcus Chen', 'Elena Rostova', 'Marcus Chen', 'Sarah Williams', 'Sarah Williams'][index],
      date: ['12 Nov 2026', '08 Nov 2026', '04 Nov 2026', '28 Oct 2026', '21 Oct 2026', '14 Oct 2026'][index],
      readTime: [6, 7, 8, 6, 9, 7][index] + ' min read',
      excerpt: 'A practical guide to help students plan their international education journey.',
      image: '',
      content: '',
      tags: ['Study abroad', 'Student guide'],
      related: '',
      status: index < 4 ? 'Published' : 'Draft'
    })),
    websiteEnquiries: [
      { id: 'WEB-2026-091', name: 'Nisha Roy', email: 'nisha.roy@example.com', mobile: '+91 98000 12345', subject: 'General study abroad enquiry', date: '18 Nov 2026', status: 'Unread', note: '' },
      { id: 'WEB-2026-090', name: 'Thomas George', email: 'thomas.george@example.com', mobile: '+91 98000 12346', subject: 'Application support information', date: '16 Nov 2026', status: 'Read', note: 'Asked for a follow-up by email.' },
      { id: 'WEB-2026-089', name: 'Leena Bose', email: 'leena.bose@example.com', mobile: '+91 98000 12347', subject: 'Study destination options', date: '13 Nov 2026', status: 'Closed', note: '' }
    ],
    notifications: [
      { id: 'NTF-001', text: 'A new student enquiry has been received.', section: 'enquiries', unread: true, time: '8 min ago' },
      { id: 'NTF-002', text: 'Ananya Sharma uploaded a document.', section: 'documents', unread: true, time: '35 min ago' },
      { id: 'NTF-003', text: 'A consultation request is waiting for review.', section: 'consultations', unread: true, time: '1 hr ago' },
      { id: 'NTF-004', text: "Rahul Menon's application needs an update.", section: 'applications', unread: true, time: '3 hrs ago' },
      { id: 'NTF-005', text: 'A student message is waiting for a reply.', section: 'messages', unread: true, time: '4 hrs ago' }
    ],
    analytics: {
      months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
      enquiries: [18, 24, 21, 32, 29, 36],
      destinations: [
        { name: 'United Kingdom', value: 34 },
        { name: 'Canada', value: 25 },
        { name: 'Australia', value: 18 },
        { name: 'United States', value: 11 },
        { name: 'Germany', value: 7 },
        { name: 'Ireland', value: 5 }
      ]
    }
  };

  window.AdminDashboardData = data;
})();
