export const orders = [
  { id: "JI456M9", company: "S&P Credit Mkt SVCS Eurpoe Ltd", country: "Russian Federation", bank: "MBL", type: "SMEs", branch: "Hyderi Branch", requestDate: "26 MAR 2026", startTime: "10:30 am", assignedTo: "Zaki Javed", availability: "Online", status: "In Verification", action: "Review" },
  { id: "JI456M9", company: "Pharma International", country: "Italy", bank: "UBL", type: "Normal", branch: "Gulshan Branch", requestDate: "15 MAR 2026", startTime: "10:30 am", assignedTo: "Asad Chaudhry", availability: "Online", status: "New", action: "Start" },
  { id: "JI456M9", company: "Credit Suisse (Hong Kong) Limited", country: "Australia", bank: "MCB", type: "SMEs", branch: "Ii Chundrigar Branch", requestDate: "24 FEB 2026", startTime: "10:30 am", assignedTo: "Khalil Rizvi", availability: "Online", status: "Reusable", action: "Reuse" },
  { id: "4P078N", company: "Targaryen Restoration", country: "China", bank: "MBL", type: "Normal", branch: "Johar Branch", requestDate: "24 FEB 2026", startTime: "10:30 am", assignedTo: "Tariq Javed", availability: "Online", status: "Complete", action: "Send" },
  { id: "Y98MYO", company: "Master Facility", country: "Hong Kong", bank: "HBL", type: "SMEs", branch: "3 Talwar Branch", requestDate: "19 FEB 2026", startTime: "10:30 am", assignedTo: "Zain Raza", availability: "Offline", status: "Flagged", action: "Review" },
  { id: "123RE63", company: "RiverStone Insurance Limited", country: "Germany", bank: "BAHL", type: "SMEs", branch: "Hyderi Branch", requestDate: "12 FEB 2026", startTime: "10:30 am", assignedTo: "Shujaat Khan", availability: "Offline", status: "Flagged", action: "Review" },
  { id: "BN234T", company: "Parallax Company", country: "Spain", bank: "ABL", type: "Normal", branch: "Bahadurabad Branch", requestDate: "10 MAR 2026", startTime: "10:30 am", assignedTo: "Wajid Farooq", availability: "Offline", status: "New", action: "Start" },
];

export const invoices = [
  { id: "JI456M9", bank: "MBL", branch: "Hyderi Branch", type: "SMEs", company: "S&P Credit Mkt SVCS Eurpoe Ltd", creationDate: "26 MAR 2026", amount: "PKR 40,000", dueDate: "26 MAR 2026", status: "Paid" },
  { id: "JI456M9", bank: "UBL", branch: "Gulshan Branch", type: "Normal", company: "Pharma International", creationDate: "15 MAR 2026", amount: "PKR 37,000", dueDate: "15 MAR 2026", status: "Paid" },
  { id: "JI456M9", bank: "MCB", branch: "U Chundrigarh Branch", type: "SMEs", company: "Credit Suisse (Hong Kong) Limited", creationDate: "24 FEB 2026", amount: "PKR 40,000", dueDate: "24 FEB 2026", status: "Unpaid" },
  { id: "4PO78N", bank: "HBL", branch: "3 Talwar Branch", type: "Normal", company: "Targaryen Restoration", creationDate: "24 FEB 2026", amount: "PKR 40,000", dueDate: "24 FEB 2026", status: "Paid" },
  { id: "Y98MYO", bank: "BAHL", branch: "Hyderi Branch", type: "SMEs", company: "Master Facility", creationDate: "19 FEB 2026", amount: "PKR 2000", dueDate: "19 FEB 2026", status: "Paid" },
  { id: "BN234T", bank: "ABL", branch: "Bahadurabad Branch", type: "Normal", company: "Parallax Company", creationDate: "10 MAR 2026", amount: "PKR 1000", dueDate: "10 MAR 2026", status: "Unpaid" },
];

export const reports = [
  { name: "Report name_T1.pdf", size: "18 Mb", type: "SMEs", company: "S&P Credit Mkt SVCS Eurpoe Ltd", bank: "MBL", branch: "Hyderi Branch", country: "Russian Federation", date: "26 MAR 2026", orderNumber: "JI456M9", assignedTo: "Zaki Javed", status: "Complete" },
  { name: "Report name_T1.pdf", size: "25 Mb", type: "Normal", company: "Pharma International", bank: "UBL", branch: "Gulshan Branch", country: "Italy", date: "15 MAR 2026", orderNumber: "JI456M9", assignedTo: "Asad Chaudhry", status: "Complete" },
  { name: "Report name_T1.pdf", size: "19 Kb", type: "SMEs", company: "Credit Suisse (Hong Kong) Limited", bank: "MCB", branch: "U Chundrigarh Branch", country: "Australia", date: "24 FEB 2026", orderNumber: "JI456M9", assignedTo: "Khalil Rizvi", status: "Pending" },
  { name: "Report name_T1.pdf", size: "1 Mb", type: "Normal", company: "Targaryen Restoration", bank: "MBL", branch: "Johar Branch", country: "China", date: "24 FEB 2026", orderNumber: "4PO78N", assignedTo: "Tariq Javed", status: "In Progress" },
  { name: "Report name_T1.pdf", size: "10 Kb", type: "SMEs", company: "Master Facility", bank: "HBL", branch: "3 Talwar Branch", country: "Hong Kong", date: "19 FEB 2026", orderNumber: "Y98MYO", assignedTo: "Zain Raza", status: "Cancelled" },
  { name: "Report name_T1.pdf", size: "3 Mb", type: "SMEs", company: "RiverStone Insurance Limited", bank: "BAHL", branch: "Hyderi Branch", country: "Germany", date: "12 FEB 2026", orderNumber: "123RE63", assignedTo: "Shujaat Khan", status: "Pending" },
  { name: "Report name_T1.pdf", size: "12 Mb", type: "Normal", company: "Parallax Company", bank: "ABL", branch: "Bahadurabad Branch", country: "Spain", date: "10 MAR 2026", orderNumber: "BN234T", assignedTo: "Wajid Farooq", status: "Complete" },
  { name: "Report name_T1.pdf", size: "12 Mb", type: "Normal", company: "Parallax Company", bank: "ABL", branch: "Bahadurabad Branch", country: "Spain", date: "10 MAR 2026", orderNumber: "BN234T", assignedTo: "Wajid Farooq", status: "Complete" },
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
    branches: [
      { name: "Hyderi Branch", address: "Block G, North Nazimabad, Karachi", totalReports: 220, totalRequests: 100, totalRevenue: "PKR 20,000", creationDate: "26 MAR 2026", status: "Active" },
      { name: "Nagan Chorangi Branch", address: "F-123, karsaz tower, North Karachi.", totalReports: 441, totalRequests: 344, totalRevenue: "PKR 20,000", creationDate: "26 MAR 2026", status: "Active" },
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
    branches: [
      { name: "Gulshan Branch", address: "Block 3, Gulshan-e-Iqbal, Karachi", totalReports: 280, totalRequests: 400, totalRevenue: "PKR 25,000", creationDate: "15 MAR 2026", status: "Active" },
      { name: "I.I. Chundrigar Branch", address: "UBL Building, I.I. Chundrigar Road, Karachi", totalReports: 256, totalRequests: 446, totalRevenue: "PKR 15,000", creationDate: "15 MAR 2026", status: "Inactive" }
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
    branches: [
      { name: "Jail Road Branch", address: "Main Gulberg, Jail Road, Lahore", totalReports: 300, totalRequests: 500, totalRevenue: "PKR 20,000", creationDate: "15 MAR 2026", status: "Inactive" },
      { name: "Mall Road Branch", address: "Mall Road, Lahore", totalReports: 283, totalRequests: 346, totalRevenue: "PKR 17,000", creationDate: "15 MAR 2026", status: "Active" }
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
    branches: [
      { name: "Teen Talwar Branch", address: "Teen Talwar, Clifton, Karachi", totalReports: 383, totalRequests: 300, totalRevenue: "PKR 25,000", creationDate: "24 FEB 2026", status: "Active" },
      { name: "Karsaz Branch", address: "Shahrah-e-Faisal, Karsaz, Karachi", totalReports: 200, totalRequests: 246, totalRevenue: "PKR 15,000", creationDate: "24 FEB 2026", status: "Active" }
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
    branches: [
      { name: "DHA Phase 5 Branch", address: "Khayaban-e-Shamsheer, DHA, Karachi", totalReports: 400, totalRequests: 100, totalRevenue: "PKR 1,200", creationDate: "19 FEB 2026", status: "Active" },
      { name: "Bahadurabad Branch", address: "Bahadur Yar Jang Society, Karachi", totalReports: 338, totalRequests: 134, totalRevenue: "PKR 800", creationDate: "19 FEB 2026", status: "Active" }
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
    branches: [
      { name: "Main Boulevard Branch", address: "Tipu Block, Gulberg III, Lahore", totalReports: 500, totalRequests: 120, totalRevenue: "PKR 1,500", creationDate: "19 FEB 2026", status: "Active" },
      { name: "Model Town Branch", address: "Model Town Circular Road, Lahore", totalReports: 238, totalRequests: 114, totalRevenue: "PKR 500", creationDate: "19 FEB 2026", status: "Active" }
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
  { id: "JI456M9", company: "S&P Credit Mkt SVCS Eurpoe Ltd", country: "Russian Federation", bank: "MBL", branch: "Hyderi Branch", type: "SMEs", requestDate: "26 MAR 2026", startTime: "10:30 am", assignedTo: "Zaki Javed", availability: "Online" },
  { id: "JI456M9", company: "Pharma International", country: "Italy", bank: "UBL", branch: "Gulshan Branch", type: "Normal", requestDate: "15 MAR 2026", startTime: "10:30 am", assignedTo: "Asad Chaudhry", availability: "Online" },
  { id: "JI456M9", company: "Credit Suisse (Hong Kong) Limited", country: "Australia", type: "SMEs", bank: "MCB", branch: "I.I Chundrigarh Branch", requestDate: "24 FEB 2026", startTime: "10:30 am", assignedTo: "Khalil Rizvi", availability: "Online" },
  { id: "4PO78N", company: "Targaryen Restoration", country: "China", bank: "MBL", branch: "Johar Branch", type: "Normal", requestDate: "24 FEB 2026", startTime: "10:30 am", assignedTo: "Tariq Javed", availability: "Online" },
  { id: "Y98MYO", company: "Master Facility", country: "Hong Kong", bank: "HBL", branch: "3 Talwar Branch", type: "SMEs", requestDate: "19 FEB 2026", startTime: "10:30 am", assignedTo: "Zain Raza", availability: "Offline" },
  { id: "123RE63", company: "RiverStone Insurance Limited", country: "Germany", type: "SMEs", bank: "BAHL", branch: "Hyderi Branch", requestDate: "12 FEB 2026", startTime: "10:30 am", assignedTo: "Shujaat Khan", availability: "Online" },
];
