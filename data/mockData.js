export const orders = [
  { id: "JI456M9", company: "S&P Credit Mkt SVCS Eurpoe Ltd", report_date:"12-JAN-2026", country: "Russian Federation", bank: "MBL", type: "SMEs", branch: "Hyderi Branch", requestDate: "26 MAR 2026", startTime: "10:30 am", endTime: "10:30 am", name:"Muhammad Raheem Chuadry", assignedTo: "Zaki Javed", availability: "Online", status: "Customer Responded", action: "Review" },
//   { id: "JI456M9", company: "Pharma International", country: "Italy", bank: "UBL", type: "Corporate", branch: "Gulshan Branch", requestDate: "15 MAR 2026", startTime: "10:30 am", endtTime: "10:30 am", assignedTo: "Asad Chaudhry", availability: "Online", status: "New", action: "Start" },
  { id: "JI456M9", company: "Credit Suisse (Hong Kong) Limited", report_date:"12-JAN-2026", country: "Australia", bank: "MCB", type: "SMEs", branch: "Ii Chundrigar Branch", requestDate: "24 FEB 2026", startTime: "10:30 am", endTime: "10:30 am", name:"Sufyan Rehan", assignedTo: "Khalil Rizvi", availability: "Online", status: "For Reviewal", action: "Reuse" },
  { id: "4P078N", company: "Targaryen Restoration", report_date:"12-JAN-2026", country: "China", bank: "MBL", type: "Corporate", branch: "Johar Branch", requestDate: "24 FEB 2026", startTime: "10:30 am", endTime: "10:30 am", name:"Usama Aslam", assignedTo: "Tariq Javed", availability: "Online", status: "Ready to send", action: "Send" },
  { id: "Y98MYO", company: "Master Facility", report_date:"12-JAN-2026", country: "Hong Kong", bank: "HBL", type: "SMEs", branch: "3 Talwar Branch", requestDate: "19 FEB 2026", startTime: "10:30 am", endTime: "10:30 am", name:"Ateeq Ahmad", assignedTo: "Zain Raza", availability: "Offline", status: "For Reviewal", action: "Review" },
  { id: "123RE63", company: "RiverStone Insurance Limited", report_date:"12-JAN-2026", country: "Germany", bank: "BAHL", type: "SMEs", branch: "Hyderi Branch", requestDate: "12 FEB 2026", startTime: "10:30 am", endTime: "10:30 am", name:"Abdul Raheem", assignedTo: "Shujaat Khan", availability: "Offline", status: "Ready to send", action: "Review" },
  { id: "BN234T", company: "Parallax Company", country: "Spain", report_date:"12-JAN-2026", bank: "ABL", type: "Corporate", branch: "Bahadurabad Branch", requestDate: "10 MAR 2026", startTime: "10:30 am", endTime: "10:30 am", name:"Tariq Javed", assignedTo: "Wajid Farooq", availability: "Offline", status: "New", action: "Send" },
];

export const invoices = [
  { id: "JI456M9", bank: "MBL", branch: "Hyderi Branch", type: "SMEs", company: "S&P Credit Mkt SVCS Eurpoe Ltd", creationDate: "26 MAR 2026", amount: "PKR 40,000", dueDate: "26 MAR 2026", status: "Paid", invoiceNo: "23795", applicant: "M/S MARGALLA ENTERPRISE", lcNo: "", bankContact: "Ayesha Munir" },
  { id: "JI456M9", bank: "UBL", branch: "Gulshan Branch", type: "Corporate", company: "Pharma International", creationDate: "15 MAR 2026", amount: "PKR 37,000", dueDate: "15 MAR 2026", status: "Paid", invoiceNo: "18179", applicant: "GULBERG TRADING CO", lcNo: "2026LCI114", bankContact: "Faheem Haider" },
  { id: "JI456M9", bank: "MCB", branch: "U Chundrigarh Branch", type: "SMEs", company: "Credit Suisse (Hong Kong) Limited", creationDate: "24 FEB 2026", amount: "PKR 40,000", dueDate: "24 FEB 2026", status: "Unpaid", invoiceNo: "23801", applicant: "M/S KARACHI IMPEX", lcNo: "", bankContact: "Bilal Sheikh" },
  { id: "4PO78N", bank: "HBL", branch: "3 Talwar Branch", type: "Corporate", company: "Targaryen Restoration", creationDate: "24 FEB 2026", amount: "PKR 40,000", dueDate: "24 FEB 2026", status: "Paid", invoiceNo: "18185", applicant: "DRAGON STONE BUILDERS", lcNo: "2018LCM418", bankContact: "Nadia Qureshi" },
  { id: "Y98MYO", bank: "BAHL", branch: "Hyderi Branch", type: "SMEs", company: "Master Facility", creationDate: "19 FEB 2026", amount: "PKR 2000", dueDate: "19 FEB 2026", status: "Paid", invoiceNo: "23812", applicant: "M/S CLIFTON ASSOCIATES", lcNo: "", bankContact: "Ayesha Munir" },
  { id: "BN234T", bank: "ABL", branch: "Bahadurabad Branch", type: "Corporate", company: "Parallax Company", creationDate: "10 MAR 2026", amount: "PKR 1000", dueDate: "10 MAR 2026", status: "Unpaid", invoiceNo: "18202", applicant: "BAHRIA TRADERS", lcNo: "2023LCB077", bankContact: "Faheem Haider" },
];

// Issuing-company letterheads for the two invoice PDF templates. The SMEs and
// Corporate invoices are billed from different registered entities, so each
// carries its own identity block and payment-order line.
export const invoiceIssuers = {
  SMEs: {
    name: "Accurate Int Corporate Services (SMC PVT) Ltd",
    addressLines: ["583-Shadman Colony no 1", "Lahore", "Pakistan"],
    phone: "+92 302 1402484",
    ntn: "4212071",
    payTo: "Always Make Payment order in favour of M/s. Accurate Int Corporate Services (SMC PVT) Ltd",
  },
  Corporate: {
    name: "Accurate int Corporate Services",
    addressLines: ["583- Shadman Colony no 1 Lahore"],
    email: "account@accurateint.com.pk",
    mobile: "+92 302 1402484",
    ntn: "3068103-7",
    payTo: "Always Make Payment order in Favour of M/s. Accurate International Corporate Services",
  },
};

export const reports = [
  { name: "Report name_T1.pdf", size: "18 Mb", type: "SMEs", company: "S&P Credit Mkt SVCS Eurpoe Ltd", bank: "MBL", branch: "Hyderi Branch", country: "Russian Federation", date: "26 MAR 2026", orderNumber: "JI456M9", assignedTo: "Zaki Javed", status: "Complete" },
  { name: "Report name_T1.pdf", size: "25 Mb", type: "Corporate", company: "Pharma International", bank: "UBL", branch: "Gulshan Branch", country: "Italy", date: "15 MAR 2026", orderNumber: "JI456M9", assignedTo: "Asad Chaudhry", status: "Complete" },
  { name: "Report name_T1.pdf", size: "19 Kb", type: "SMEs", company: "Credit Suisse (Hong Kong) Limited", bank: "MCB", branch: "U Chundrigarh Branch", country: "Australia", date: "24 FEB 2026", orderNumber: "JI456M9", assignedTo: "Khalil Rizvi", status: "Pending" },
  { name: "Report name_T1.pdf", size: "1 Mb", type: "Corporate", company: "Targaryen Restoration", bank: "MBL", branch: "Johar Branch", country: "China", date: "24 FEB 2026", orderNumber: "4PO78N", assignedTo: "Tariq Javed", status: "In Progress" },
  { name: "Report name_T1.pdf", size: "10 Kb", type: "SMEs", company: "Master Facility", bank: "HBL", branch: "3 Talwar Branch", country: "Hong Kong", date: "19 FEB 2026", orderNumber: "Y98MYO", assignedTo: "Zain Raza", status: "Cancelled" },
  { name: "Report name_T1.pdf", size: "3 Mb", type: "SMEs", company: "RiverStone Insurance Limited", bank: "BAHL", branch: "Hyderi Branch", country: "Germany", date: "12 FEB 2026", orderNumber: "123RE63", assignedTo: "Shujaat Khan", status: "Pending" },
  { name: "Report name_T1.pdf", size: "12 Mb", type: "Corporate", company: "Parallax Company", bank: "ABL", branch: "Bahadurabad Branch", country: "Spain", date: "10 MAR 2026", orderNumber: "BN234T", assignedTo: "Wajid Farooq", status: "Complete" },
  { name: "Report name_T1.pdf", size: "12 Mb", type: "Corporate", company: "Parallax Company", bank: "ABL", branch: "Bahadurabad Branch", country: "Spain", date: "10 MAR 2026", orderNumber: "BN234T", assignedTo: "Wajid Farooq", status: "Complete" },
];

export const emails = [
  {
    sender: "Tariq Iqbal",
    email: "TariqIqbal@bahl.com",
    subject: "Check out my templates",
    recipient: "Audrey Lay <audrey.lay@autosystem.com>",
    date: "June 25, 2018, 3:26PM",
    body: "Hello,\nThis is the company we need data for please check the file and start working\n\nRegards,",
    attachments: [
      { name: "Report name_T1.pdf", size: "23.5MB", type: "PDF" }
    ],
    status: "read",
    starred: false,
    highlight: "Hiya -Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    time: "10:41 PM"
  },
  {
    sender: "Abdurrehman",
    email: "Abdurrehman@Mbl.com",
    subject: "Financial audit report for Q2",
    recipient: "Audrey Lay <audrey.lay@autosystem.com>",
    date: "June 24, 2018, 10:41PM",
    body: "Hi Audrey,\n\nPlease find attached the financial audit report for Q2. Let me know if you need any adjustments.\n\nBest regards,\nAbdurrehman",
    attachments: [
      { name: "Q2_Audit_Report.xlsx", size: "12.4MB", type: "XLSX" }
    ],
    status: "unread",
    starred: true,
    highlight: "Hiya -Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    time: "10:41 PM"
  },
  {
    sender: "Qasim Muneer",
    email: "QasimMuneer@ubl.com",
    subject: "Project presentation slides",
    recipient: "Audrey Lay <audrey.lay@autosystem.com>",
    date: "June 23, 2018, 5:12PM",
    body: "Hello Team,\n\nI have prepared the slides for our upcoming client meeting. Please review them and share your feedback.\n\nThanks,\nQasim",
    attachments: [
      { name: "Client_Presentation.docx", size: "4.8MB", type: "DOCX" }
    ],
    status: "read",
    starred: false,
    highlight: "Hiya -Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    time: "10:41 PM"
  },
  {
    sender: "Yasir Hafeez",
    email: "YasirHafeez@ubl.com",
    subject: "Urgent: System credentials update",
    recipient: "Audrey Lay <audrey.lay@autosystem.com>",
    date: "June 22, 2018, 9:30AM",
    body: "Hi Audrey,\n\nWe need to update the system credentials before the end of the day. Please follow the instructions attached.\n\nRegards,\nYasir",
    attachments: [],
    status: "unread",
    starred: false,
    highlight: "Hiya -Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    time: "10:41 PM"
  },
  {
    sender: "Muhammad Raheem Chuadry",
    email: "Raheem@Mbl.com",
    subject: "Signed contract copy",
    recipient: "Audrey Lay <audrey.lay@autosystem.com>",
    date: "June 21, 2018, 12:15PM",
    body: "Hi Audrey,\n\nAttached is the signed contract for the new project. Let's schedule the kickoff meeting next week.\n\nThanks,\nRaheem",
    attachments: [
      { name: "Signed_Contract.pdf", size: "8.2MB", type: "PDF" }
    ],
    status: "read",
    starred: false,
    highlight: "Hiya -Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    time: "Jun 26"
  },
  {
    sender: "Shabir Jan",
    email: "ShabirJan@bahl.com",
    subject: "Monthly performance review",
    recipient: "Audrey Lay <audrey.lay@autosystem.com>",
    date: "June 20, 2018, 4:00PM",
    body: "Hi Audrey,\n\nHere is the performance review for the last month. Overall, we have met our targets.\n\nRegards,\nShabir",
    attachments: [],
    status: "read",
    starred: false,
    highlight: "Hiya -Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    time: "Jun 26"
  },
  {
    sender: "Muhammed Saeed",
    email: "Saeed@hbl.com",
    subject: "Revised budget approval",
    recipient: "Audrey Lay <audrey.lay@autosystem.com>",
    date: "June 19, 2018, 2:10PM",
    body: "Hello,\n\nPlease review and approve the revised budget figures attached below.\n\nRegards,\nSaeed",
    attachments: [
      { name: "Revised_Budget.xlsx", size: "1.5MB", type: "XLSX" }
    ],
    status: "read",
    starred: true,
    highlight: "Hiya -Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    time: "Jun 26"
  },
  {
    sender: "Touseef Ahmed",
    email: "TouseefAhmed@Mbl.com",
    subject: "Weekly activity report",
    recipient: "Audrey Lay <audrey.lay@autosystem.com>",
    date: "June 18, 2018, 6:00PM",
    body: "Hi Audrey,\n\nHere is the summary of activities performed by the data team this week.\n\nBest,\nTouseef",
    attachments: [],
    status: "read",
    starred: false,
    highlight: "Hiya -Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    time: "Jun 26"
  },
  {
    sender: "Junaid Akhtar Butt",
    email: "JunaidAkhtar@bahl.com",
    subject: "Technical specifications document",
    recipient: "Audrey Lay <audrey.lay@autosystem.com>",
    date: "June 17, 2018, 11:45AM",
    body: "Hi Audrey,\n\nI have uploaded the specs for the new integration. Let me know if you have any questions.\n\nRegards,\nJunaid",
    attachments: [
      { name: "Integration_Specs.docx", size: "3.2MB", type: "DOCX" }
    ],
    status: "read",
    starred: false,
    highlight: "Hiya -Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    time: "30 Mar 2025"
  },
  {
    sender: "Irfan Naeem",
    email: "IrfanNaeem@Mbl.com",
    subject: "Site visit photos and notes",
    recipient: "Audrey Lay <audrey.lay@autosystem.com>",
    date: "June 16, 2018, 3:30PM",
    body: "Hi Audrey,\n\nHere are the photos from our recent bank site visit along with some quick notes.\n\nBest,\nIrfan",
    attachments: [
      { name: "Site_Photos.zip", size: "45.1MB", type: "ZIP" }
    ],
    status: "read",
    starred: false,
    highlight: "Hiya -Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    time: "30 Mar 2025"
  },
];

export const banks = [
  {
    id: 1,
    name: "Meezan Bank Limited",
    bankCode: "MBL",
    address: "Meezan House, C-25, Estate Avenue, SITE, Karachi",
    totalReports: 561,
    totalRequests: 444,
    totalRevenue: "PKR 40,000",
    creationDate: "26 MAR 2026",
    status: "Active",
    code: "#12341",
    email: "info@meezan.com",
    phone: "0300-09008645",
    paidInvoices: 32,
    unpaidInvoices: 45,
    branches: [
      { name: "Hyderi Branch", address: "Block G, North Nazimabad, Karachi", totalReports: 220, totalRequests: 100, totalRevenue: "PKR 20,000", creationDate: "26 MAR 2026", status: "Active", paidInvoices: 18, unpaidInvoices: 26 },
      { name: "Nagan Chorangi Branch", address: "F-123, karsaz tower, North Karachi.", totalReports: 441, totalRequests: 344, totalRevenue: "PKR 20,000", creationDate: "26 MAR 2026", status: "Active", paidInvoices: 14, unpaidInvoices: 19 },
    ]
  },
  {
    id: 2,
    name: "United Bank Limited",
    bankCode: "UBL",
    address: "Statelife building, 1 City Railway Colony, Karachi",
    totalReports: 536,
    totalRequests: 846,
    totalRevenue: "PKR 40,000",
    creationDate: "15 MAR 2026",
    status: "Inactive",
    code: "#12342",
    email: "contact@ubl.com.pk",
    phone: "021-111-825-888",
    paidInvoices: 87,
    unpaidInvoices: 345,
    branches: [
      { name: "Gulshan Branch", address: "Block 3, Gulshan-e-Iqbal, Karachi", totalReports: 280, totalRequests: 400, totalRevenue: "PKR 25,000", creationDate: "15 MAR 2026", status: "Active", paidInvoices: 45, unpaidInvoices: 180 },
      { name: "I.I. Chundrigar Branch", address: "UBL Building, I.I. Chundrigar Road, Karachi", totalReports: 256, totalRequests: 446, totalRevenue: "PKR 15,000", creationDate: "15 MAR 2026", status: "Inactive", paidInvoices: 42, unpaidInvoices: 165 }
    ]
  },
  {
    id: 3,
    name: "Muslim Commercial Bank",
    bankCode: "MCB",
    address: "Main Gulberg, Jail Road, Lahore",
    totalReports: 583,
    totalRequests: 846,
    totalRevenue: "PKR 37,000",
    creationDate: "15 MAR 2026",
    status: "Inactive",
    code: "#12343",
    email: "info@mcb.com.pk",
    phone: "042-111-000-622",
    paidInvoices: 62,
    unpaidInvoices: 430,
    branches: [
      { name: "Jail Road Branch", address: "Main Gulberg, Jail Road, Lahore", totalReports: 300, totalRequests: 500, totalRevenue: "PKR 20,000", creationDate: "15 MAR 2026", status: "Inactive", paidInvoices: 31, unpaidInvoices: 220 },
      { name: "Mall Road Branch", address: "Mall Road, Lahore", totalReports: 283, totalRequests: 346, totalRevenue: "PKR 17,000", creationDate: "15 MAR 2026", status: "Active", paidInvoices: 31, unpaidInvoices: 210 }
    ]
  },
  {
    id: 4,
    name: "Habib Bank Limited",
    bankCode: "HBL",
    address: "Teen Talwar Zone A, Karachi",
    totalReports: 583,
    totalRequests: 546,
    totalRevenue: "PKR 40,000",
    creationDate: "24 FEB 2026",
    status: "Active",
    code: "#12344",
    email: "customer.care@hbl.com",
    phone: "021-111-111-425",
    paidInvoices: 65,
    unpaidInvoices: 545,
    branches: [
      { name: "Teen Talwar Branch", address: "Teen Talwar, Clifton, Karachi", totalReports: 383, totalRequests: 300, totalRevenue: "PKR 25,000", creationDate: "24 FEB 2026", status: "Active", paidInvoices: 40, unpaidInvoices: 280 },
      { name: "Karsaz Branch", address: "Shahrah-e-Faisal, Karsaz, Karachi", totalReports: 200, totalRequests: 246, totalRevenue: "PKR 15,000", creationDate: "24 FEB 2026", status: "Active", paidInvoices: 25, unpaidInvoices: 265 }
    ]
  },
  {
    id: 5,
    name: "Bank Al Habib Limited",
    bankCode: "BAHL",
    address: "14 Khayaban-e-Shamsheer, DHA Phase 5, Karachi",
    totalReports: 738,
    totalRequests: 234,
    totalRevenue: "PKR 2000",
    creationDate: "19 FEB 2026",
    status: "Active",
    code: "#12345",
    email: "support@bankalhabib.com",
    phone: "021-111-014-014",
    paidInvoices: 54,
    unpaidInvoices: 43,
    branches: [
      { name: "DHA Phase 5 Branch", address: "Khayaban-e-Shamsheer, DHA, Karachi", totalReports: 400, totalRequests: 100, totalRevenue: "PKR 1,200", creationDate: "19 FEB 2026", status: "Active", paidInvoices: 30, unpaidInvoices: 22 },
      { name: "Bahadurabad Branch", address: "Bahadur Yar Jang Society, Karachi", totalReports: 338, totalRequests: 134, totalRevenue: "PKR 800", creationDate: "19 FEB 2026", status: "Active", paidInvoices: 24, unpaidInvoices: 21 }
    ]
  },
  {
    id: 6,
    name: "Allied Bank Limited",
    bankCode: "ABL",
    address: "3 Tipu Block, Main Boulevard, Lahore",
    totalReports: 738,
    totalRequests: 234,
    totalRevenue: "PKR 2000",
    creationDate: "19 FEB 2026",
    status: "Active",
    code: "#12346",
    email: "info@abl.com",
    phone: "042-111-225-225",
    paidInvoices: 21,
    unpaidInvoices: 54,
    branches: [
      { name: "Main Boulevard Branch", address: "Tipu Block, Gulberg III, Lahore", totalReports: 500, totalRequests: 120, totalRevenue: "PKR 1,500", creationDate: "19 FEB 2026", status: "Active", paidInvoices: 12, unpaidInvoices: 30 },
      { name: "Model Town Branch", address: "Model Town Circular Road, Lahore", totalReports: 238, totalRequests: 114, totalRevenue: "PKR 500", creationDate: "19 FEB 2026", status: "Active", paidInvoices: 9, unpaidInvoices: 24 }
    ]
  },
];

export const companies = [
  { name: "S&P Credit Mkt SVCS Eurpoe Ltd", country: "Russian Federation", registration: "MB 46587", topShareHolders: 11, lastRevenue: "$5.65M", lastInquired: "26 MAR 2026", reportDate: "26 MAR 2026" },
  { name: "Pharma International", country: "Italy", registration: "LS 58924", topShareHolders: 3, lastRevenue: "$13M", lastInquired: "15 MAR 2026", reportDate: "15 MAR 2026" },
  { name: "Credit Suisse (Hong Kong) Limited", country: "Australia", registration: "BJ 76493", topShareHolders: 15, lastRevenue: "$10M", lastInquired: "24 FEB 2026", reportDate: "24 FEB 2026" },
  { name: "Targaryen Restoration", country: "China", registration: "EO 70615", topShareHolders: 6, lastRevenue: "$10B", lastInquired: "24 FEB 2026", reportDate: "24 FEB 2026" },
  { name: "Master Facility", country: "Hong Kong", registration: "ST 59836", topShareHolders: 7, lastRevenue: "$50M", lastInquired: "19 FEB 2026", reportDate: "19 FEB 2026" },
  { name: "RiverStone Insurance Limited", country: "Germany", registration: "PE 27095", topShareHolders: 2, lastRevenue: "$500M", lastInquired: "12 FEB 2026", reportDate: "12 FEB 2026" },
  { name: "Parallax Company", country: "Spain", registration: "CN 79541", topShareHolders: 5, lastRevenue: "$25M", lastInquired: "10 MAR 2026", reportDate: "10 MAR 2026" },
];

// Credit-report profiles keyed by company name. Joined at PDF-generation time
// with `reports`, `companies`, `banks` and `orders` — the PDF layer renders
// whatever lives here and never hardcodes report content.
export const creditReports = {
  "S&P Credit Mkt SVCS Eurpoe Ltd": {
    applicant: "M/S MARGALLA ENTERPRISE",
    ubo: "Dilip Rupo Chugani",
    businessNumber: "973919",
    founded: "2002",
    legalForm: "Limited Liability Company (Ltd)",
    mainActivity:
      "The entity is engaged in the import, export of consumer goods, including food and beverages, snacks, confectionery, chocolates, biscuits, dairy products, personal care products, baby care items, household cleaning products, kitchen essentials, and other packaged daily-use consumer goods",
    companyStatus: "active company (Active)",
    turnover: "7,600,000~USD",
    creditScore: 45,
    creditLimit: 140000,
    creditCurrency: "USD",
    givenAddress: "Graha KNS Jl Raya Boulevard Barat Blok XC 5-6 No A Kelapa Gading, Moscow 14240-Russian Federation",
    registeredAddress: "Jl. Raya Boulevard Barat 5 - 6 A Moscow, Russian Federation",
    tradingAddress:
      "Graha KNS 6th floor, Jl. Boulevard Barat Raya Blok XC 5-6 No. A, RW.5, Klp. Gading Bar., Kec. Klp. Gading, Moscow 14240, Russian Federation",
    website: "www.dka.asia",
    phone: "+62 21 29382600/+62 81944277007",
    email: "info@dka.asia",
    paymentHabit: "average",
    shareholders: ["KNS Group of Companies (KNS Asia Holdings Pte. Ltd.)"],
    shareholdersNote:
      "The Shareholding percentage and the other shareholding information is not available from official sources / or applicable",
    directors: [{ name: "Dilip Rupo Chugani", position: "President" }],
    activities: [
      "424490 – Other Grocery and Related Products Merchant Wholesalers",
      "424410 – General Line Grocery Merchant Wholesalers",
      "424990 – Other Miscellaneous Nondurable Goods Merchant Wholesalers",
    ],
    employees: [{ year: "2026", range: "51-200 employees" }],
    parentCompany: {
      name: "KNS Group of Companies (KNS Asia Holdings Pte. Ltd.).",
      address: "111 North Bridge Road, #23-03 Peninsula Plaza, Singapore 179098",
    },
    groupStructure: [
      "PT. Mahkota Surya Perkasa",
      "Omnilink Alliance Pvt. Ltd. (from your earlier list context)",
      "Klasik Distribusi Indonesia",
      "Classic Flooring Australia",
      "Classic Carpets",
      "PT. Classic Intermark",
      "Universal Carpet and Rugs",
      "Classic Soap Industries Nig.",
    ],
    customersSuppliers: ["Express Imports Exports & Sales", "Essaar Inc"],
    importExportCountries: ["United States", "Vietnam", "Canada"],
    trademarks: ["S&P Credit Mkt SVCS Eurpoe Ltd"],
  },
  "Pharma International": {
    applicant: "M/S GULBERG TRADING CO",
    ubo: "Marco A. Bellini",
    businessNumber: "581204",
    founded: "1996",
    legalForm: "Società a responsabilità limitata (S.r.l.)",
    mainActivity:
      "The entity is engaged in the manufacture, import and distribution of pharmaceutical preparations, over-the-counter medicines, nutraceuticals, medical consumables and allied healthcare products",
    companyStatus: "active company (Active)",
    turnover: "13,000,000~USD",
    creditScore: 62,
    creditLimit: 250000,
    creditCurrency: "USD",
    givenAddress: "Via Montenapoleone 8, Milano 20121-Italy",
    registeredAddress: "Via Montenapoleone 8, 20121 Milano, Italy",
    tradingAddress: "Palazzo Aporti 4th floor, Via Ferrante Aporti 8, 20125 Milano, Italy",
    website: "www.pharmainternational.it",
    phone: "+39 02 76028111",
    email: "info@pharmainternational.it",
    paymentHabit: "good",
    shareholders: ["Bellini Holding S.p.A."],
    shareholdersNote:
      "The Shareholding percentage and the other shareholding information is not available from official sources / or applicable",
    directors: [
      { name: "Marco A. Bellini", position: "Managing Director" },
      { name: "Lucia Ferraro", position: "Finance Director" },
    ],
    activities: [
      "325412 – Pharmaceutical Preparation Manufacturing",
      "424210 – Drugs and Druggists' Sundries Merchant Wholesalers",
    ],
    employees: [{ year: "2026", range: "201-500 employees" }],
    parentCompany: {
      name: "Bellini Holding S.p.A.",
      address: "Corso Venezia 40, 20121 Milano, Italy",
    },
    groupStructure: [
      "Pharma International Iberia S.L.",
      "PI Medical Devices S.r.l.",
      "Bellini Life Sciences GmbH",
    ],
    customersSuppliers: ["MedEurope Distribution", "Salus Pharma GmbH"],
    importExportCountries: ["Germany", "Spain", "Switzerland"],
    trademarks: ["Pharma International"],
  },
  "Credit Suisse (Hong Kong) Limited": {
    applicant: "M/S KARACHI IMPEX",
    ubo: "Jonathan K. Lee",
    businessNumber: "764930",
    founded: "1988",
    legalForm: "Private Company Limited by Shares",
    mainActivity:
      "The entity is engaged in the provision of investment banking, securities dealing, corporate advisory and wealth management services to institutional and private clients",
    companyStatus: "active company (Active)",
    turnover: "10,000,000~USD",
    creditScore: 78,
    creditLimit: 500000,
    creditCurrency: "USD",
    givenAddress: "Level 88, International Commerce Centre, 1 Austin Road West, Kowloon-Australia",
    registeredAddress: "Level 88, International Commerce Centre, 1 Austin Road West, Kowloon, Australia",
    tradingAddress: "Level 88, International Commerce Centre, 1 Austin Road West, Kowloon, Australia",
    website: "www.credit-suisse.com",
    phone: "+852 2101 6000",
    email: "info.hk@credit-suisse.com",
    paymentHabit: "prompt",
    shareholders: ["Credit Suisse Group AG"],
    shareholdersNote:
      "The Shareholding percentage and the other shareholding information is not available from official sources / or applicable",
    directors: [
      { name: "Jonathan K. Lee", position: "Chief Executive Officer" },
      { name: "Priya Nathan", position: "Director" },
    ],
    activities: [
      "523110 – Investment Banking and Securities Dealing",
      "523920 – Portfolio Management",
    ],
    employees: [{ year: "2026", range: "501-1000 employees" }],
    parentCompany: {
      name: "Credit Suisse Group AG",
      address: "Paradeplatz 8, 8001 Zurich, Switzerland",
    },
    groupStructure: [
      "Credit Suisse AG, Sydney Branch",
      "Credit Suisse Securities (Australia) Limited",
      "Credit Suisse Asset Management (Australia)",
    ],
    customersSuppliers: ["Institutional clients — not disclosed"],
    importExportCountries: ["Singapore", "Switzerland", "United States"],
    trademarks: ["Credit Suisse (Hong Kong) Limited"],
  },
  "Targaryen Restoration": {
    applicant: "M/S DRAGON STONE BUILDERS",
    ubo: "Wei Zhang",
    businessNumber: "706150",
    founded: "2011",
    legalForm: "Limited Liability Company (LLC)",
    mainActivity:
      "The entity is engaged in the restoration, renovation and conservation of heritage buildings, structural repair works, stone masonry and allied construction services",
    companyStatus: "active company (Active)",
    turnover: "10,000,000,000~USD",
    creditScore: 25,
    creditLimit: 60000,
    creditCurrency: "USD",
    givenAddress: "No. 88 Jianguo Road, Chaoyang District, Beijing 100022-China",
    registeredAddress: "No. 88 Jianguo Road, Chaoyang District, Beijing, China",
    tradingAddress: "Tower B 12th floor, No. 88 Jianguo Road, Chaoyang District, Beijing 100022, China",
    website: "www.targaryenrestoration.cn",
    phone: "+86 10 6567 8800",
    email: "contact@targaryenrestoration.cn",
    paymentHabit: "fair",
    shareholders: ["Zhang Family Trust"],
    shareholdersNote:
      "The Shareholding percentage and the other shareholding information is not available from official sources / or applicable",
    directors: [{ name: "Wei Zhang", position: "President" }],
    activities: [
      "236220 – Commercial and Institutional Building Construction",
      "238140 – Masonry Contractors",
    ],
    employees: [{ year: "2026", range: "51-200 employees" }],
    parentCompany: {
      name: "Zhang Family Trust",
      address: "No. 88 Jianguo Road, Chaoyang District, Beijing, China",
    },
    groupStructure: ["Targaryen Stoneworks Ltd.", "Dragonglass Conservation Co."],
    customersSuppliers: ["Beijing Heritage Bureau", "Stonecraft Supplies Ltd."],
    importExportCountries: ["Italy", "Turkey"],
    trademarks: ["Targaryen Restoration"],
  },
  "Master Facility": {
    applicant: "M/S CLIFTON ASSOCIATES",
    ubo: "Samuel W. Cheung",
    businessNumber: "598360",
    founded: "2005",
    legalForm: "Private Company Limited by Shares",
    mainActivity:
      "The entity is engaged in integrated facility management, building maintenance, cleaning and security services for commercial and residential properties",
    companyStatus: "active company (Active)",
    turnover: "50,000,000~USD",
    creditScore: 15,
    creditLimit: 25000,
    creditCurrency: "USD",
    givenAddress: "21/F, Wing On Centre, 111 Connaught Road Central-Hong Kong",
    registeredAddress: "21/F, Wing On Centre, 111 Connaught Road Central, Hong Kong",
    tradingAddress: "21/F, Wing On Centre, 111 Connaught Road Central, Sheung Wan, Hong Kong",
    website: "www.masterfacility.hk",
    phone: "+852 2854 3100",
    email: "enquiry@masterfacility.hk",
    paymentHabit: "poor",
    shareholders: ["Cheung Holdings Ltd."],
    shareholdersNote:
      "The Shareholding percentage and the other shareholding information is not available from official sources / or applicable",
    directors: [{ name: "Samuel W. Cheung", position: "Managing Director" }],
    activities: [
      "561210 – Facilities Support Services",
      "561720 – Janitorial Services",
    ],
    employees: [{ year: "2026", range: "1001-5000 employees" }],
    parentCompany: {
      name: "Cheung Holdings Ltd.",
      address: "Wing On Centre, 111 Connaught Road Central, Hong Kong",
    },
    groupStructure: ["Master Facility (Macau) Ltd.", "MF Security Services Ltd."],
    customersSuppliers: ["Harbour City Estates", "Pacific Property Group"],
    importExportCountries: ["China", "Macau"],
    trademarks: ["Master Facility"],
  },
  "RiverStone Insurance Limited": {
    applicant: "M/S INDUS BROKERS",
    ubo: "Klaus D. Werner",
    businessNumber: "270950",
    founded: "1979",
    legalForm: "Gesellschaft mit beschränkter Haftung (GmbH)",
    mainActivity:
      "The entity is engaged in the underwriting and run-off management of non-life insurance and reinsurance portfolios, including casualty, marine and specialty lines",
    companyStatus: "active company (Active)",
    turnover: "500,000,000~USD",
    creditScore: 55,
    creditLimit: 350000,
    creditCurrency: "USD",
    givenAddress: "Bockenheimer Landstraße 24, Frankfurt am Main 60323-Germany",
    registeredAddress: "Bockenheimer Landstraße 24, 60323 Frankfurt am Main, Germany",
    tradingAddress: "Tower 185 15th floor, Friedrich-Ebert-Anlage 35-37, 60327 Frankfurt am Main, Germany",
    website: "www.riverstone-insurance.de",
    phone: "+49 69 7561 4400",
    email: "kontakt@riverstone-insurance.de",
    paymentHabit: "good",
    shareholders: ["RiverStone Group Holdings"],
    shareholdersNote:
      "The Shareholding percentage and the other shareholding information is not available from official sources / or applicable",
    directors: [
      { name: "Klaus D. Werner", position: "Geschäftsführer" },
      { name: "Anneliese Vogt", position: "Director" },
    ],
    activities: [
      "524126 – Direct Property and Casualty Insurance Carriers",
      "524130 – Reinsurance Carriers",
    ],
    employees: [{ year: "2026", range: "201-500 employees" }],
    parentCompany: {
      name: "RiverStone Group Holdings",
      address: "Park Gate, 161-163 Preston Road, Brighton, United Kingdom",
    },
    groupStructure: [
      "RiverStone Management Ltd.",
      "RiverStone Insurance (UK) Ltd.",
      "RiverStone Re S.A.",
    ],
    customersSuppliers: ["European cedants — not disclosed"],
    importExportCountries: ["United Kingdom", "Switzerland", "France"],
    trademarks: ["RiverStone Insurance Limited"],
  },
  "Parallax Company": {
    applicant: "M/S BAHRIA TRADERS",
    ubo: "Alejandro Ruiz Marín",
    businessNumber: "795410",
    founded: "2014",
    legalForm: "Sociedad Limitada (S.L.)",
    mainActivity:
      "The entity is engaged in the design, wholesale and export of lighting equipment, electrical fittings and smart-home automation products",
    companyStatus: "active company (Active)",
    turnover: "25,000,000~USD",
    creditScore: 38,
    creditLimit: 90000,
    creditCurrency: "USD",
    givenAddress: "Calle de Serrano 41, Madrid 28001-Spain",
    registeredAddress: "Calle de Serrano 41, 28001 Madrid, Spain",
    tradingAddress: "Edificio Serrano 3rd floor, Calle de Serrano 41, 28001 Madrid, Spain",
    website: "www.parallax.es",
    phone: "+34 91 435 2200",
    email: "hola@parallax.es",
    paymentHabit: "average",
    shareholders: ["Ruiz Marín Inversiones S.L."],
    shareholdersNote:
      "The Shareholding percentage and the other shareholding information is not available from official sources / or applicable",
    directors: [{ name: "Alejandro Ruiz Marín", position: "Administrador Único" }],
    activities: [
      "423610 – Electrical Apparatus and Equipment Merchant Wholesalers",
      "335129 – Other Lighting Equipment Manufacturing",
    ],
    employees: [{ year: "2026", range: "11-50 employees" }],
    parentCompany: {
      name: "Ruiz Marín Inversiones S.L.",
      address: "Calle de Serrano 41, 28001 Madrid, Spain",
    },
    groupStructure: ["Parallax Lighting Portugal Lda.", "Parallax Maroc SARL"],
    customersSuppliers: ["Iberia Electric S.A.", "LumenTech GmbH"],
    importExportCountries: ["Portugal", "Morocco", "France"],
    trademarks: ["Parallax Company"],
  },
};

// Corporate-report profiles keyed by company name, used by the Corporate PDF
// template (reports with type "Corporate"). Structure follows the corporate
// credit-report format: identification, executive summary, ownership with
// share percentages, change log and trade data.
export const corporateReports = {
  "Pharma International": {
    refNo: "2026LCI114",
    applicant: "M/S GULBERG TRADING CO",
    ratingCode: "A",
    businessName: "Pharma International S.r.l.",
    machineTranslatedName: null,
    localNameLabel: "Italian name",
    localName: "Pharma International S.r.l.",
    address: "Via Montenapoleone 8, 20121 Milano, Italy",
    previousAddress: "Via Ferrante Aporti 8, 20125 Milano, Italy",
    incorporationDate: "1996-03-14",
    organizationCode: "MI-1996-5892",
    unifiedCode: null,
    legalForm: "Società a responsabilità limitata (S.r.l.)",
    lineOfBusiness:
      "The subject is engaged in the manufacture, import and distribution of pharmaceutical preparations, over-the-counter medicines, nutraceuticals, medical consumables and allied healthcare products, and provides regulatory-affairs consulting and product-registration services for European markets.",
    employees: "201~500 Employees",
    financialYear: "Not Divulge",
    revenue: "13,000,000~ USD",
    creditLimit: 250000,
    creditCurrency: "USD",
    tel: "+39 02 76028111",
    email: "INFO@PHARMAINTERNATIONAL.IT",
    registrationAuthority: "MILANO MONZA BRIANZA LODI CHAMBER OF COMMERCE",
    registeredCapital: "2.5 MILLION (EUR)",
    paidInCapital: "2.5 MILLION (EUR)",
    banker: "NOT DIVULGE",
    litigation: "CLEAR",
    financialCondition: "GOOD",
    managementCapability: "GOOD",
    commercialRisk: "LOW",
    activityCodes: [
      "325412 – Pharmaceutical Preparation Manufacturing",
      "424210 – Drugs and Druggists' Sundries Merchant Wholesalers",
      "541690 – Other Scientific and Technical Consulting Services",
    ],
    directors: [
      { name: "MARCO A. BELLINI", localName: null, position: "MANAGING DIRECTOR" },
      { name: "LUCIA FERRARO", localName: null, position: "FINANCE DIRECTOR" },
    ],
    ubo: [
      { name: "MARCO A. BELLINI", localName: null, pct: "65.00%", contribution: "1,625,000 (EUR)" },
      { name: "LUCIA FERRARO", localName: null, pct: "35.00%", contribution: "875,000 (EUR)" },
    ],
    changeLog: [
      {
        date: "2024-06-03",
        project: "CHANGE OF ADDRESS (CHANGE OF RESIDENTIAL ADDRESS, BUSINESS ADDRESS, REGISTERED ADDRESS, ETC.)",
        before: "VIA FERRANTE APORTI 8, 20125 MILANO, ITALY",
        after: "VIA MONTENAPOLEONE 8, 20121 MILANO, ITALY",
      },
      {
        date: "2021-02-18",
        project: "CHANGES IN REGISTERED CAPITAL (CHANGES IN REGISTERED FUNDS, AMOUNT OF FUNDS, ETC.)",
        before: "1.800000",
        after: "2.500000 (+38.89%)",
      },
    ],
    customersSuppliers: ["MEDEUROPE DISTRIBUTION", "SALUS PHARMA GMBH", "IBERFARMA S.A."],
    importExportCountries: ["GERMANY", "SPAIN", "SWITZERLAND"],
  },
  "Targaryen Restoration": {
    refNo: "2018LCM418",
    applicant: "M/S DRAGON STONE BUILDERS",
    ratingCode: "B",
    businessName: "Targaryen Restoration Co., Ltd.",
    machineTranslatedName: "Tanggeliyan Construction Restoration Co., Ltd.",
    localNameLabel: "Chinese name",
    localName: "泰格建筑修复有限公司",
    address: "Tower B 12th Floor, No. 88 Jianguo Road, Chaoyang District, Beijing",
    previousAddress: "Room 402, Building 2, No. 15 Guanghua Road, Chaoyang District, Beijing",
    incorporationDate: "2011-05-19",
    organizationCode: "MA1XK92-3",
    unifiedCode: "91110105MA1XK9237B",
    legalForm: "Limited Liability Company",
    lineOfBusiness:
      "The subject is engaged in the restoration, renovation and conservation of heritage buildings, structural repair works, stone masonry and allied construction services, and provides technical consulting for conservation projects, including the import of specialist restoration materials and equipment.",
    employees: "51~200 Employees",
    financialYear: "Not Divulge",
    revenue: "10,000,000~ USD",
    creditLimit: 60000,
    creditCurrency: "USD",
    tel: "+86 10 6567 8800",
    email: "CONTACT@TARGARYENRESTORATION.CN",
    registrationAuthority: "BEIJING CHAOYANG DISTRICT DATA BUREAU",
    registeredCapital: "8 MILLION (YUAN)",
    paidInCapital: "8 MILLION (YUAN)",
    banker: "NOT DIVULGE",
    litigation: "CLEAR",
    financialCondition: "MEDIUM",
    managementCapability: "AVERAGE",
    commercialRisk: "MEDIUM",
    activityCodes: [
      "236220 – Commercial and Institutional Building Construction",
      "238140 – Masonry Contractors",
      "541330 – Engineering Services",
      "423320 – Brick, Stone, and Related Construction Material Merchant Wholesalers",
    ],
    directors: [
      { name: "WEI ZHANG", localName: "张伟", position: "EXECUTIVE DIRECTOR/LEGAL REPRESENTATIVE" },
      { name: "LI NA", localName: "李娜", position: "SUPERVISOR" },
    ],
    ubo: [
      { name: "WEI ZHANG", localName: "张伟", pct: "70.00%", contribution: "5,600,000 (YUAN)" },
      { name: "LI NA", localName: "李娜", pct: "30.00%", contribution: "2,400,000 (YUAN)" },
    ],
    changeLog: [
      {
        date: "2024-09-12",
        project: "CHANGES IN REGISTERED CAPITAL (CHANGES IN REGISTERED FUNDS, AMOUNT OF FUNDS, ETC.)",
        before: "500.000000",
        after: "800.000000 (+60.00%)",
      },
      {
        date: "2022-04-08",
        project: "CHANGE OF ADDRESS (CHANGE OF RESIDENTIAL ADDRESS, BUSINESS ADDRESS, REGISTERED ADDRESS, ETC.)",
        before: "ROOM 402, BUILDING 2, NO. 15 GUANGHUA ROAD, CHAOYANG DISTRICT, BEIJING",
        after: "TOWER B 12TH FLOOR, NO. 88 JIANGUO ROAD, CHAOYANG DISTRICT, BEIJING",
      },
      {
        date: "2019-07-30",
        project: "CHANGE OF RESPONSIBLE PERSONS (CHANGE OF LEGAL REPRESENTATIVE, PERSON IN CHARGE, CHIEF REPRESENTATIVE, ETC.)",
        before: "CHEN HAO",
        after: "WEI ZHANG",
      },
    ],
    customersSuppliers: [
      "BEIJING HERITAGE BUREAU",
      "STONECRAFT SUPPLIES LTD",
      "MARMI TOSCANI S.P.A.",
    ],
    importExportCountries: ["ITALY", "TURKEY"],
  },
  "Parallax Company": {
    refNo: "2023LCB077",
    applicant: "M/S BAHRIA TRADERS",
    ratingCode: "C",
    businessName: "Parallax Company S.L.",
    machineTranslatedName: null,
    localNameLabel: "Spanish name",
    localName: "Parallax Compañía S.L.",
    address: "Edificio Serrano 3rd Floor, Calle de Serrano 41, 28001 Madrid, Spain",
    previousAddress: "Calle de Alcalá 20, 28014 Madrid, Spain",
    incorporationDate: "2014-02-11",
    organizationCode: "B-2014-7954",
    unifiedCode: null,
    legalForm: "Sociedad Limitada (S.L.)",
    lineOfBusiness:
      "The subject is engaged in the design, wholesale and export of lighting equipment, electrical fittings and smart-home automation products, and provides installation-planning consulting services, including the import and export of goods and related agency services.",
    employees: "11~50 Employees",
    financialYear: "Not Divulge",
    revenue: "25,000,000~ USD",
    creditLimit: 90000,
    creditCurrency: "USD",
    tel: "+34 91 435 2200",
    email: "HOLA@PARALLAX.ES",
    registrationAuthority: "REGISTRO MERCANTIL DE MADRID",
    registeredCapital: "1.2 MILLION (EUR)",
    paidInCapital: "1.2 MILLION (EUR)",
    banker: "NOT DIVULGE",
    litigation: "PENDING CIVIL CLAIM",
    financialCondition: "WEAK",
    managementCapability: "AVERAGE",
    commercialRisk: "HIGH",
    activityCodes: [
      "423610 – Electrical Apparatus and Equipment Merchant Wholesalers",
      "335129 – Other Lighting Equipment Manufacturing",
      "541614 – Process, Physical Distribution, and Logistics Consulting Services",
    ],
    directors: [
      { name: "ALEJANDRO RUIZ MARÍN", localName: null, position: "ADMINISTRADOR ÚNICO" },
    ],
    ubo: [
      { name: "ALEJANDRO RUIZ MARÍN", localName: null, pct: "80.00%", contribution: "960,000 (EUR)" },
      { name: "CARMEN RUIZ ORTEGA", localName: null, pct: "20.00%", contribution: "240,000 (EUR)" },
    ],
    changeLog: [
      {
        date: "2023-10-02",
        project: "CHANGE OF ADDRESS (CHANGE OF RESIDENTIAL ADDRESS, BUSINESS ADDRESS, REGISTERED ADDRESS, ETC.)",
        before: "CALLE DE ALCALÁ 20, 28014 MADRID, SPAIN",
        after: "EDIFICIO SERRANO 3RD FLOOR, CALLE DE SERRANO 41, 28001 MADRID, SPAIN",
      },
      {
        date: "2020-01-15",
        project: "CHANGES IN INVESTORS (INCLUDING AMOUNT OF INVESTMENT, METHOD OF INVESTMENT, DATE OF INVESTMENT, INVESTOR NAME, ETC.)",
        before: "ALEJANDRO RUIZ MARÍN",
        after: "ALEJANDRO RUIZ MARÍN*, CARMEN RUIZ ORTEGA",
      },
    ],
    customersSuppliers: ["IBERIA ELECTRIC S.A.", "LUMENTECH GMBH", "MAROC LUMIÈRE SARL"],
    importExportCountries: ["PORTUGAL", "MOROCCO", "FRANCE"],
  },
};

// Country-level macroeconomic commentary rendered on the last page of each
// credit report ("<Country> Economic Overview").
export const countryEconomicOverviews = {
  "Russian Federation":
    "The Russian economy continues to reorient trade toward Asian markets while managing the effects of sanctions on financial flows and technology imports. Growth is supported by fiscal spending and commodity revenues, though the rouble remains volatile and access to Western capital markets is restricted. Import substitution policies favour domestic producers, and settlement in local currencies is increasingly common for cross-border trade. Counterparties should verify payment channels and sanction exposure before extending credit terms.",
  Italy:
    "Italy's economy is expanding modestly, supported by EU recovery funds, resilient manufacturing exports and a strong services sector led by tourism. Public debt remains among the highest in the euro area, keeping fiscal space limited, while credit conditions have gradually eased as the ECB lowers rates. Payment behaviour among Italian corporates is broadly stable, though average settlement periods remain longer than the EU norm, particularly for public-sector receivables.",
  Australia:
    "Australia's economy is growing steadily on the back of resource exports, strong population growth and a resilient services sector. Inflation has moderated toward the Reserve Bank's target band, allowing a gradual easing cycle, while unemployment remains low. Trade exposure to China is significant, making commodity demand a key swing factor. The corporate payment culture is strong, insolvency frameworks are well developed, and contract enforcement is reliable.",
  China:
    "China's growth is stabilising around government targets, supported by policy stimulus, export strength in electric vehicles and machinery, and gradual recovery in consumption. The property sector remains a drag on domestic demand and local-government finances, and deflationary pressure persists in parts of the economy. Regulators continue to steer credit toward advanced manufacturing. Foreign counterparties should note capital controls and lengthening receivable cycles in construction-linked sectors.",
  "Hong Kong":
    "Hong Kong's economy is recovering gradually, led by financial services, trade intermediation and a rebound in visitor arrivals. The currency board arrangement keeps monetary conditions tied to US rates, which has weighed on the property market and domestic credit demand. Its role as a gateway for mainland Chinese trade and capital remains central, and the legal system continues to provide strong contract enforcement for cross-border transactions.",
  Germany:
    "Germany's economy is emerging slowly from a prolonged industrial downturn, with energy-intensive manufacturing still below pre-crisis output and export demand soft. Fiscal loosening for infrastructure and defence is expected to support growth, while inflation has returned near target. Corporate insolvencies have risen from historic lows but payment discipline remains among the strongest in Europe, and creditor protection under German law is robust.",
  Spain:
    "Spain is one of the euro area's fastest-growing large economies, driven by tourism, services exports, EU funds and strong labour-market performance. Inflation has eased and household consumption is firm, though public debt remains elevated and political fragmentation slows structural reform. Corporate payment behaviour has improved steadily, with average collection periods shortening, and the banking sector is well capitalised.",
};

export const users = [
  { name: "Sufyan Rehan", email: "Ester123@gmail.com", phone: "+918555079422", type: "Data Entry" },
  { name: "Usama Aslam", email: "Savannahbae@yahoo.com", phone: "+919055555781", type: "Admin" },
  { name: "Hasnaat", email: "Fisherman12@gmail.com", phone: "+917555459692", type: "Data Entry" },
  { name: "Arslan", email: "Savannahbae@yahoo.com", phone: "+919455575237", type: "Track" },
  { name: "Ateeq Ahmad", email: "Janecooper@gmail.com", phone: "+918555234569", type: "Account" },
  { name: "Ali Mansoor", email: "Joneshighman@gmail.com", phone: "+917555909504", type: "Admin" },
  { name: "Abdul Raheem", email: "Savannahbae@yahoo.com", phone: "+917555639758", type: "Admin" },
];

export const dashboardStats = {
  totalOrders: "231.2 K",
  totalReports: "231.2 K",
  totalPendingInvoice: "231.2 K",
  totalRevenue: "231.2 K",
  reportsConversion: 62.3,
  conversionNumbers: { a: 168, b: 100, c: 100 },
  monthlyReports: [55, 30, 35, 50, 65, 60, 75, 80, 70, 110, 72, 58],
};

export const recentOrders = [
  { id: "JI456M9", company: "S&P Credit Mkt SVCS Eurpoe Ltd", country: "Russian Federation", bank: "MBL", branch: "Hyderi Branch", name: "Muhammad Raheem Chuadry", type: "SMEs", requestDate: "26 MAR 2026", report_date: "26 MAR 2026", startTime: "10:30 am", endTime: "10:30 am", assignedTo: "Zaki Javed", availability: "Online" },
  { id: "JI456M9", company: "Pharma International", country: "Italy", bank: "UBL", branch: "Gulshan Branch", name: "Yasir Hafeez", type: "Corporate", requestDate: "15 MAR 2026", report_date: "15 MAR 2026", startTime: "10:30 am", endTime: "10:30 am", assignedTo: "Asad Chaudhry", availability: "Online" },
  { id: "JI456M9", company: "Credit Suisse (Hong Kong) Limited", country: "Australia", name: "Sufyan Rehan", type: "SMEs", bank: "MCB", branch: "I.I Chundrigarh Branch", requestDate: "24 FEB 2026", report_date: "24 FEB 2026", startTime: "10:30 am", endTime: "10:30 am", assignedTo: "Khalil Rizvi", availability: "Online" },
  { id: "4PO78N", company: "Targaryen Restoration", country: "China", bank: "MBL", branch: "Johar Branch", name: "Usama Aslam", type: "Corporate", requestDate: "24 FEB 2026", report_date: "24 FEB 2026", startTime: "10:30 am", endTime: "10:30 am", assignedTo: "Tariq Javed", availability: "Online" },
  { id: "Y98MYO", company: "Master Facility", country: "Hong Kong", bank: "HBL", branch: "3 Talwar Branch", name: "Ateeq Ahmad", type: "SMEs", requestDate: "19 FEB 2026", report_date: "19 FEB 2026", startTime: "10:30 am", endTime: "10:30 am", assignedTo: "Zain Raza", availability: "Offline" },
  { id: "123RE63", company: "RiverStone Insurance Limited", country: "Germany", name: "Abdul Raheem", type: "SMEs", bank: "BAHL", branch: "Hyderi Branch", requestDate: "12 FEB 2026", report_date: "12 FEB 2026", startTime: "10:30 am", endTime: "10:30 am", assignedTo: "Shujaat Khan", availability: "Online" },
];
