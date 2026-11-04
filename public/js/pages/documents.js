// ===================================================================
// DOCUMENT STUDIO — INVOICE, CONTRACT & ONBOARDING GENERATOR
// ===================================================================

const TODAY = new Date();
const formatDate = (d) => d.toISOString().slice(0, 10);
const formatDisplayDate = (dStr) => {
  if (!dStr) return '';
  const d = new Date(dStr + 'T00:00:00');
  return isNaN(d) ? dStr : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Available Currencies
const CURRENCIES = {
  USD: { symbol: '$', code: 'USD' },
  EUR: { symbol: '€', code: 'EUR' },
  GBP: { symbol: '£', code: 'GBP' },
  CAD: { symbol: 'CA$', code: 'CAD' },
  AUD: { symbol: 'AU$', code: 'AUD' },
  NGN: { symbol: '₦', code: 'NGN' },
  INR: { symbol: '₹', code: 'INR' },
  JPY: { symbol: '¥', code: 'JPY' }
};

// 14 Comprehensive Business Document Templates
const TEMPLATES = [
  {
    id: 'inv-standard',
    category: 'invoices',
    title: 'Standard Tax Invoice',
    subtitle: 'Itemized services, rates, tax & bank wire details',
    tag: 'Invoice',
    icon: `<path d="M6 3h9l3 3v15l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3V3z"/><path d="M9 8h6M9 12h6M9 16h4"/>`,
    bodyType: 'invoice',
    data: {
      docType: 'COMMERCIAL INVOICE',
      docNum: 'INV-2026-0148',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 14 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'Digital Product Design & Development Systems',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'billing@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Managing Partner'
      },
      recipient: {
        name: 'Dana Osei',
        company: 'Reef Co. Technologies',
        address: '420 Harbor Blvd, 6th Fl\nSan Francisco, CA 94105',
        taxId: 'VAT/EIN: 91-440291',
        email: 'dana@reefco.io',
        phone: '+1 (415) 890-2134'
      },
      items: [
        { desc: 'Sprint 3: Design System Architecture & UI Tokens', qty: 45, rate: 120 },
        { desc: 'Full-Stack Dashboard Implementation (React/Node)', qty: 60, rate: 135 },
        { desc: 'Automated CI/CD Pipeline & Security Hardening', qty: 15, rate: 140 },
        { desc: 'Cloud Infrastructure Setup & Domain Provisioning', qty: 1, rate: 650 }
      ],
      taxPercent: 8.875,
      discountPercent: 5,
      banking: {
        bankName: 'Silicon Valley Bank / First Republic',
        accountName: 'Northside Studio Inc.',
        accountNumber: '9283-4920-1102',
        routingNumber: '021000021',
        swift: 'SVBUS33NYC',
        terms: 'Payment is due within 14 calendar days via ACH, Wire, or Credit Card. Late balances incur 1.5% monthly finance charge.'
      },
      notes: 'Thank you for your partnership! Please remit payment referencing invoice #INV-2026-0148.'
    }
  },
  {
    id: 'inv-retainer',
    category: 'invoices',
    title: 'Monthly Retainer Invoice',
    subtitle: 'Recurring advisory, dedicated sprint capacity & SLA',
    tag: 'Retainer',
    icon: `<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>`,
    bodyType: 'invoice',
    data: {
      docType: 'MONTHLY RETAINER INVOICE',
      docNum: 'RET-2026-0812',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 7 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'Digital Product Design & Development Systems',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'billing@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Managing Partner'
      },
      recipient: {
        name: 'Jamie Ruiz',
        company: 'Ruiz & Partners Capital',
        address: '888 Brickell Ave, Penthouse\nMiami, FL 33131',
        taxId: 'US-EIN 47-9201948',
        email: 'j.ruiz@ruizpartners.com',
        phone: '+1 (305) 774-9021'
      },
      items: [
        { desc: 'Tier 1 Dedicated Engineering & Design Retainer (40 hrs/mo)', qty: 1, rate: 5200 },
        { desc: 'Priority On-Call SLA & Infrastructure Monitoring', qty: 1, rate: 850 },
        { desc: 'Quarterly Strategic Roadmap & Security Review', qty: 1, rate: 1200 }
      ],
      taxPercent: 0,
      discountPercent: 0,
      banking: {
        bankName: 'JPMorgan Chase Bank, N.A.',
        accountName: 'Northside Studio Inc.',
        accountNumber: '4491-0294-8119',
        routingNumber: '021000021',
        swift: 'CHASUS33',
        terms: 'Retainer hours expire at the end of billing cycle unless written rollover agreement is confirmed.'
      },
      notes: 'Billed in advance for the upcoming calendar month service period.'
    }
  },
  {
    id: 'inv-milestone',
    category: 'invoices',
    title: 'Milestone Deposit Invoice',
    subtitle: 'Project kickoff deposit and phased deliverable billing',
    tag: 'Milestone',
    icon: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    bodyType: 'invoice',
    data: {
      docType: 'MILESTONE DEPOSIT INVOICE',
      docNum: 'DEP-2026-0043',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 5 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'Digital Product Design & Development Systems',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'billing@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Managing Partner'
      },
      recipient: {
        name: 'Alex Kim',
        company: 'Northline Logistics Inc.',
        address: '772 W Washington Blvd\nChicago, IL 60661',
        taxId: 'US-EIN 36-2910492',
        email: 'akim@northline.io',
        phone: '+1 (312) 554-9120'
      },
      items: [
        { desc: 'Phase 1: Discovery, UX Wireframes & Interactive Prototypes (50% Deposit)', qty: 1, rate: 4500 },
        { desc: 'Architecture Specification & Database Schema Validation', qty: 1, rate: 1500 }
      ],
      taxPercent: 0,
      discountPercent: 0,
      banking: {
        bankName: 'Silicon Valley Bank / First Republic',
        accountName: 'Northside Studio Inc.',
        accountNumber: '9283-4920-1102',
        routingNumber: '021000021',
        swift: 'SVBUS33NYC',
        terms: 'Commencement of Phase 1 work begins immediately upon confirmation of deposit receipt.'
      },
      notes: 'Initial deposit invoice under Master Services Agreement dated July 2026.'
    }
  },
  {
    id: 'ctr-msa',
    category: 'contracts',
    title: 'Master Services Agreement (MSA)',
    subtitle: 'Comprehensive client legal contract & terms of work',
    tag: 'Contract',
    icon: `<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>`,
    bodyType: 'contract',
    data: {
      docType: 'MASTER SERVICES AGREEMENT',
      docNum: 'MSA-2026-0092',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 365 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'Provider / Service Contractor',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'legal@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Managing Partner'
      },
      recipient: {
        name: 'Dana Osei',
        company: 'Reef Co. Technologies',
        address: '420 Harbor Blvd, 6th Fl\nSan Francisco, CA 94105',
        taxId: 'US-EIN 91-440291',
        email: 'dana@reefco.io',
        phone: '+1 (415) 890-2134',
        signatory: 'Dana Osei',
        signatoryTitle: 'Chief Executive Officer'
      },
      scope: 'Provider agrees to furnish software architecture, user interface design, full-stack engineering, and cloud deployment services described in mutually approved Statements of Work.',
      clauses: [
        {
          title: '1. Services & Statements of Work',
          body: 'All work executed under this Agreement shall be governed by individual Statements of Work ("SOW") detailing deliverables, timelines, milestones, acceptance criteria, and specific compensation.'
        },
        {
          title: '2. Intellectual Property Rights & Work For Hire',
          body: 'Upon full and final payment of all corresponding fees, Provider assigns to Client all right, title, and interest in and to custom deliverables specifically created for Client. Provider retains ownership of its pre-existing tools, libraries, workflows, and proprietary starter code.'
        },
        {
          title: '3. Fees, Invoicing & Payment Terms',
          body: 'Client agrees to pay all undisputed invoices within fourteen (14) days of issuance. Late payments accrue interest at 1.5% per month or the highest statutory rate permitted by law.'
        },
        {
          title: '4. Confidentiality & Non-Disclosure',
          body: 'Each party agrees to maintain in strict confidence all proprietary, technical, and commercial information disclosed during the term of this Agreement and for three (3) years thereafter.'
        },
        {
          title: '5. Limitation of Liability & Warranties',
          body: 'Except for gross negligence or willful misconduct, neither party shall be liable for indirect, punitive, or consequential damages. Maximum aggregate liability under this Agreement shall not exceed the total fees paid during the prior six (6) month period.'
        },
        {
          title: '6. Term, Termination & Governing Law',
          body: 'This Agreement takes effect upon mutual signature and remains in force for one (1) year. Either party may terminate with thirty (30) days written notice. This Agreement is governed by the laws of the State of New York.'
        }
      ],
      notes: 'Executed in counterpart duplicates, each of which shall be deemed an original legal instrument.'
    }
  },
  {
    id: 'ctr-nda',
    category: 'contracts',
    title: 'Mutual Non-Disclosure Agreement (NDA)',
    subtitle: 'Confidentiality, trade secrets & non-circumvention',
    tag: 'Legal',
    icon: `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>`,
    bodyType: 'contract',
    data: {
      docType: 'MUTUAL NON-DISCLOSURE AGREEMENT',
      docNum: 'NDA-2026-0314',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 730 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'Disclosing & Receiving Party',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'legal@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Managing Partner'
      },
      recipient: {
        name: 'Priya Shah',
        company: 'Lumen Studio Enterprises',
        address: '142 S 4th St\nBrooklyn, NY 11211',
        taxId: 'US-EIN 13-9021844',
        email: 'priya@lumenstudio.co',
        phone: '+1 (917) 402-9981',
        signatory: 'Priya Shah',
        signatoryTitle: 'Founder & Principal'
      },
      scope: 'The parties wish to explore a mutual business transaction involving proprietary software engineering, API integrations, and product IP, and seek to safeguard their trade secrets and confidential information.',
      clauses: [
        {
          title: '1. Definition of Confidential Information',
          body: 'Confidential Information includes all non-public technical data, source code, user data, financial metrics, customer lists, architectural schematics, marketing plans, and strategic roadmaps disclosed verbally, visually, or in writing.'
        },
        {
          title: '2. Standard of Care & Use Restrictions',
          body: 'Each party agrees to hold the other\'s Confidential Information in strict confidence using no less than a reasonable degree of care, and shall use such information solely for evaluating and pursuing the contemplated business relationship.'
        },
        {
          title: '3. Exclusions from Confidentiality',
          body: 'Information is not confidential if it is or becomes publicly known through no breach, was already known prior to disclosure, is independently developed without reference to the disclosed information, or is required by law to be produced.'
        },
        {
          title: '4. Non-Circumvention & Return of Materials',
          body: 'Neither party shall circumvent the other to exploit disclosed business connections or opportunities directly. Upon written request, all documents, prototypes, and data copies shall be immediately returned or permanently destroyed.'
        },
        {
          title: '5. Duration & Equitable Relief',
          body: 'Obligations of confidentiality shall survive for two (2) years from the disclosure date. The parties acknowledge that unauthorized breach causes irreparable harm entitling injunctive relief without bond.'
        }
      ],
      notes: 'Signatures below affirm agreement to all terms herein.'
    }
  },
  {
    id: 'ctr-contractor',
    category: 'contracts',
    title: 'Independent Contractor Agreement',
    subtitle: 'Freelancer/contractor deliverables, IP & tax status',
    tag: 'Contract',
    icon: `<path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>`,
    bodyType: 'contract',
    data: {
      docType: 'INDEPENDENT CONTRACTOR AGREEMENT',
      docNum: 'ICA-2026-0055',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 180 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'The Company / Client',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'talent@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Managing Partner'
      },
      recipient: {
        name: 'Marcus Webb',
        company: 'Webb Engineering LLC',
        address: '390 Pine St\nSeattle, WA 98101',
        taxId: 'SSN/EIN: 91-884210',
        email: 'marcus@webb.dev',
        phone: '+1 (206) 441-9032',
        signatory: 'Marcus Webb',
        signatoryTitle: 'Principal Consultant'
      },
      scope: 'Contractor shall perform Senior Cloud Infrastructure & DevOps consulting, containerization, and AWS serverless migration for Northside Studio client engagements.',
      clauses: [
        {
          title: '1. Services & Standard of Performance',
          body: 'Contractor agrees to perform the services with high professional standards, adhering to industry best practices, project milestones, and company code style guidelines.'
        },
        {
          title: '2. Independent Contractor Status (Form 1099)',
          body: 'Contractor is an independent business and not an employee. Contractor is solely responsible for all federal, state, and local income taxes, self-employment taxes, and worker\'s compensation insurance.'
        },
        {
          title: '3. Compensation & Invoicing',
          body: 'Company shall compensate Contractor at the agreed rate of $115.00 USD per billable hour or milestone rate. Invoices submitted bi-weekly shall be payable within seven (7) business days.'
        },
        {
          title: '4. Complete Assignment of Inventions & IP',
          body: 'Contractor hereby assigns to Company all right, title, and copyright in all work product, source code, designs, documentation, and inventions authored in connection with this engagement as works made for hire.'
        },
        {
          title: '5. Non-Solicitation & Termination',
          body: 'Contractor shall not solicit Company\'s clients or team members for twelve (12) months following termination. Either party may terminate with fourteen (14) days prior written notice.'
        }
      ],
      notes: 'Governed by the laws of New York State. Contractor represents full right to enter into this agreement.'
    }
  },
  {
    id: 'ctr-sow',
    category: 'contracts',
    title: 'Statement of Work (SOW)',
    subtitle: 'Project objectives, milestone schedule & deliverables',
    tag: 'SOW',
    icon: `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>`,
    bodyType: 'contract',
    data: {
      docType: 'STATEMENT OF WORK #01',
      docNum: 'SOW-2026-0210',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 90 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'Software Architecture Agency',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'projects@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Managing Partner'
      },
      recipient: {
        name: 'Sana Malik',
        company: 'Foundry Co. Systems',
        address: '1800 Market St, Suite 200\nAustin, TX 78701',
        taxId: 'US-EIN 74-8819201',
        email: 's.malik@foundry.co',
        phone: '+1 (512) 902-3310',
        signatory: 'Sana Malik',
        signatoryTitle: 'VP of Product'
      },
      scope: 'End-to-end design and engineering of Foundry Co.\'s customer analytics portal, real-time telemetry streaming pipelines, and multi-tenant billing integration.',
      clauses: [
        {
          title: 'Milestone 1: UX/UI Design & Interactive Prototype',
          body: 'Complete high-fidelity Figma design system, 32 application views, interactive mobile/desktop prototype, and usability testing summary. Target Completion: 3 Weeks.'
        },
        {
          title: 'Milestone 2: Backend Architecture & GraphQL API Engine',
          body: 'Production PostgreSQL schema, Redis caching tier, WebSocket telemetry consumer, and fully documented GraphQL endpoints. Target Completion: 6 Weeks.'
        },
        {
          title: 'Milestone 3: Frontend Integration & Stripe Billing Engine',
          body: 'Next.js 15 frontend application, role-based access control, Stripe usage billing, and customer team invitations. Target Completion: 9 Weeks.'
        },
        {
          title: 'Milestone 4: QA, Load Testing, Documentation & Handoff',
          body: 'Security pen-test remediation, automated Cypress test suite, deployment runbooks, and client team onboarding session. Target Completion: 12 Weeks.'
        }
      ],
      notes: 'Total fixed project fee: $38,500.00 USD, billed in 4 equal milestone tranches upon client written sign-off.'
    }
  },
  {
    id: 'onb-offer',
    category: 'employee',
    title: 'Employment Offer Letter',
    subtitle: 'Role, base salary, equity, benefits & start date',
    tag: 'HR / Offer',
    icon: `<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>`,
    bodyType: 'offer',
    data: {
      docType: 'OFFER OF EMPLOYMENT',
      docNum: 'OFF-2026-0019',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 7 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'Digital Product Studio & Operations',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'careers@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Founder & Managing Partner'
      },
      recipient: {
        name: 'Jordan Hayes',
        company: 'Prospective Employee',
        address: '522 Columbus Ave, Apt 3\nNew York, NY 10024',
        taxId: 'SSN: XXX-XX-4912',
        email: 'jordan.hayes@example.com',
        phone: '+1 (646) 381-9022',
        signatory: 'Jordan Hayes',
        signatoryTitle: 'Candidate / Employee'
      },
      offer: {
        positionTitle: 'Lead Full-Stack Engineer',
        department: 'Product & Engineering',
        reportingTo: 'Joseph Prince, Head of Engineering',
        startDate: formatDate(new Date(TODAY.getTime() + 21 * 86400000)),
        employmentType: 'Full-time Exempt (Remote / Hybrid)',
        baseSalary: '$145,000.00 USD / year',
        paymentSchedule: 'Semi-monthly on the 15th and last business day',
        equity: '0.75% Equity Option Grant subject to standard 4-year vesting with a 1-year cliff',
        bonus: 'Annual target performance bonus of up to 15% of base compensation',
        benefits: [
          'Comprehensive Platinum Health, Dental, and Vision coverage (100% employer-funded premiums)',
          '401(k) retirement plan with automatic 4% dollar-for-dollar company match',
          'Unlimited Flexible Paid Time Off (PTO) with minimum mandatory 20 days off/year',
          '$3,500 annual home office setup, tech equipment stipend & high-speed internet reimbursement',
          '$2,000 annual continuous learning, conference, and professional development allowance'
        ]
      },
      notes: 'This offer is contingent upon successful background verification and execution of the Proprietary Information and Inventions Agreement.'
    }
  },
  {
    id: 'onb-ip',
    category: 'employee',
    title: 'Employee IP & Invention Assignment',
    subtitle: 'Protection of proprietary code, inventions & confidentiality',
    tag: 'HR / Legal',
    icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    bodyType: 'contract',
    data: {
      docType: 'EMPLOYEE INVENTIONS & PROPRIETARY INFORMATION AGREEMENT',
      docNum: 'EIP-2026-0044',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 14 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'The Company',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'legal@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Managing Partner'
      },
      recipient: {
        name: 'Jordan Hayes',
        company: 'Employee',
        address: '522 Columbus Ave, Apt 3\nNew York, NY 10024',
        taxId: 'SSN: XXX-XX-4912',
        email: 'jordan.hayes@example.com',
        phone: '+1 (646) 381-9022',
        signatory: 'Jordan Hayes',
        signatoryTitle: 'Employee'
      },
      scope: 'This Agreement safeguards Company intellectual property, patented technologies, trade secrets, and codebases developed by Employee during their tenure.',
      clauses: [
        {
          title: '1. Confidential Information Safeguards',
          body: 'Employee shall hold all Company proprietary data, software, algorithms, methodologies, customer records, and strategic roadmaps in confidence and shall never disclose them without authorization.'
        },
        {
          title: '2. Complete Assignment of Inventions',
          body: 'Employee hereby irrevocably transfers and assigns to the Company all right, title, and interest in any invention, software, copyright, patent, or design conceived or developed during employment that relates to the Company’s actual or demonstrably anticipated business.'
        },
        {
          title: '3. Pre-Existing IP Disclosure',
          body: 'Any prior inventions owned by Employee prior to employment are explicitly excluded from this Agreement provided they are documented on Schedule A attached hereto.'
        },
        {
          title: '4. Non-Solicitation of Personnel and Clients',
          body: 'During employment and for twelve (12) months thereafter, Employee shall not solicit or induce any employee or contractor to terminate their affiliation, nor solicit Company active clients.'
        },
        {
          title: '5. Return of Company Property upon Departure',
          body: 'Upon resignation or termination, Employee shall return all computers, storage drives, encryption keys, passes, and documents containing Company proprietary information.'
        }
      ],
      notes: 'Binding upon Employee\'s heirs, executors, and legal representatives.'
    }
  },
  {
    id: 'onb-equipment',
    category: 'employee',
    title: 'Equipment & Asset Handover Agreement',
    subtitle: 'Hardware serial tracking, condition & usage policy',
    tag: 'Assets',
    icon: `<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>`,
    bodyType: 'equipment',
    data: {
      docType: 'EQUIPMENT HANDOVER & ASSET RESPONSIBILITY FORM',
      docNum: 'AST-2026-0082',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 365 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'IT Asset Operations',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'it-support@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Operations & IT Custodian'
      },
      recipient: {
        name: 'Jordan Hayes',
        company: 'Northside Studio Team',
        address: '522 Columbus Ave, Apt 3\nNew York, NY 10024',
        taxId: 'Employee ID: NS-048',
        email: 'jordan@northsidestudio.com',
        phone: '+1 (646) 381-9022',
        signatory: 'Jordan Hayes',
        signatoryTitle: 'Asset Recipient'
      },
      equipment: [
        { item: 'Apple MacBook Pro 16" (M3 Max, 64GB RAM, 1TB SSD)', serial: 'C02GK993MD6R', condition: 'Brand New In Box', tag: 'TAG-1049' },
        { item: 'Dell UltraSharp 32" 4K USB-C Hub Monitor (U3223QE)', serial: 'CN-0N8892-74', condition: 'Excellent / Tested', tag: 'TAG-1050' },
        { item: 'YubiKey 5C NFC Dual Hardware Security Keys (x2)', serial: 'YK-88291039', condition: 'Brand New', tag: 'TAG-1051' },
        { item: 'Bose 700 Noise Cancelling Headset & MagSafe Charger', serial: 'SN-78401928', condition: 'Excellent', tag: 'TAG-1052' }
      ],
      policy: 'Assets remain the sole property of Northside Studio Inc. Recipient agrees to practice full disk encryption (FileVault), adhere to MDM security policies, never install unvetted third-party software, and return all equipment within 5 days of separation.',
      notes: 'Recipient acknowledges physical receipt of listed equipment in stated operating condition.'
    }
  },
  {
    id: 'onb-directdeposit',
    category: 'employee',
    title: 'Direct Deposit Authorization Form',
    subtitle: 'Payroll banking details, account validation & tax status',
    tag: 'Payroll',
    icon: `<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>`,
    bodyType: 'directdeposit',
    data: {
      docType: 'DIRECT DEPOSIT & BANKING AUTHORIZATION',
      docNum: 'DIR-2026-0031',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 7 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'Payroll & HR Department',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'payroll@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Payroll Administrator'
      },
      recipient: {
        name: 'Jordan Hayes',
        company: 'Employee / Contractor',
        address: '522 Columbus Ave, Apt 3\nNew York, NY 10024',
        taxId: 'SSN: XXX-XX-4912',
        email: 'jordan@northsidestudio.com',
        phone: '+1 (646) 381-9022',
        signatory: 'Jordan Hayes',
        signatoryTitle: 'Account Holder'
      },
      banking: {
        bankName: 'Chase Bank / JPMorgan Chase N.A.',
        accountHolder: 'Jordan Hayes',
        accountType: 'Checking Account',
        routingNumber: '021000021',
        accountNumber: '9928-4019-3382',
        allocationPercent: '100% of Net Pay',
        authorizedDate: formatDate(TODAY)
      },
      terms: 'I authorize Northside Studio Inc. to initiate electronic credit entries (and debit adjustments if necessary for errors) to my financial account indicated above. This authorization remains in effect until written revocation is delivered to Payroll at least 10 business days prior to processing.',
      notes: 'Please attach a voided check or official direct deposit verification letter from your bank.'
    }
  },
  {
    id: 'onb-checklist',
    category: 'employee',
    title: 'New Hire Onboarding Roadmap',
    subtitle: 'Day 1 setup, 30-day goals, mentor & security checklist',
    tag: 'Checklist',
    icon: `<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/>`,
    bodyType: 'checklist',
    data: {
      docType: 'NEW HIRE ROADMAP & WELCOME PACKET',
      docNum: 'ONB-2026-0012',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 30 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'People Operations & Culture Team',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'people@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Founder & Culture Lead'
      },
      recipient: {
        name: 'Jordan Hayes',
        company: 'New Team Member',
        address: '522 Columbus Ave, Apt 3\nNew York, NY 10024',
        taxId: 'Role: Lead Full-Stack Engineer',
        email: 'jordan@northsidestudio.com',
        phone: '+1 (646) 381-9022',
        signatory: 'Jordan Hayes',
        signatoryTitle: 'Team Member'
      },
      mentorName: 'Priya Shah (Principal Architect)',
      phases: [
        {
          phase: 'Phase 1: Day 1 — Systems Access & Welcoming',
          items: [
            '1Password vault provisioning & 2-factor YubiKey configuration',
            'Google Workspace & Slack invitation to #general, #eng, #random channels',
            'GitHub organization access, SSH keys setup & pre-commit security hooks',
            'Welcome lunch & 1-on-1 kick-off sync with your onboarding buddy'
          ]
        },
        {
          phase: 'Phase 2: Week 1 — Development Environment & First PR',
          items: [
            'Clone core repos, run local Docker test suites & seed staging DBs',
            'Review architecture RFCs, coding standards, and deployment pipelines',
            'Ship your first production bugfix or small enhancement to verify CI/CD flow',
            'Benefits enrollment completion via Gusto / Platinum Health portal'
          ]
        },
        {
          phase: 'Phase 3: 30-Day Checkpoint & Independent Ownership',
          items: [
            'Lead architecture breakdown for upcoming client milestone sprint',
            'Participate in on-call engineering rotations & design reviews',
            '30-day feedback reflection sync with Founder & Engineering Lead'
          ]
        }
      ],
      notes: 'Welcome aboard! We are thrilled to build extraordinary software together.'
    }
  },
  {
    id: 'clt-kickoff',
    category: 'client',
    title: 'Client Onboarding & Project Protocol',
    subtitle: 'Communication cadence, SLA response times & approvals',
    tag: 'Client',
    icon: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>`,
    bodyType: 'contract',
    data: {
      docType: 'CLIENT ONBOARDING & ENGAGEMENT PROTOCOL',
      docNum: 'COP-2026-0077',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 180 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'Digital Product Agency',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'partners@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Client Success Director'
      },
      recipient: {
        name: 'Dana Osei',
        company: 'Reef Co. Technologies',
        address: '420 Harbor Blvd, 6th Fl\nSan Francisco, CA 94105',
        taxId: 'Client Account: CL-901',
        email: 'dana@reefco.io',
        phone: '+1 (415) 890-2134',
        signatory: 'Dana Osei',
        signatoryTitle: 'Client Lead'
      },
      scope: 'Defines operational standards, sprint cadences, communication protocols, response SLAs, and deliverable sign-off procedures for the duration of engagement.',
      clauses: [
        {
          title: '1. Primary Communication & Dedicated Channels',
          body: 'All day-to-day coordination occurs via dedicated shared Slack channel #northside-reefco. Formal approvals, change requests, and invoices shall be transmitted via email.'
        },
        {
          title: '2. Meeting Cadence & Sprint Reviews',
          body: 'Weekly 30-minute Sprint Planning each Tuesday at 10:00 AM EST. Bi-weekly Sprint Demonstration and interactive build walk-through every other Friday at 2:00 PM EST.'
        },
        {
          title: '3. Response Times & Emergency Support SLA',
          body: 'Standard requests responded to within four (4) business hours. Critical production incidents (P1 severity) acknowledged within 30 minutes with 24/7 on-call triage.'
        },
        {
          title: '4. Deliverable Review & Approval Turnaround',
          body: 'Client agrees to provide consolidated stakeholder feedback or milestone approval within five (5) business days of deliverable transmission.'
        }
      ],
      notes: 'Sign-off below certifies operational alignment on working methodologies.'
    }
  },
  {
    id: 'clt-vendor',
    category: 'client',
    title: 'Vendor & Supplier Agreement',
    subtitle: 'Vendor compliance, delivery timelines & payment terms',
    tag: 'Vendor',
    icon: `<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`,
    bodyType: 'contract',
    data: {
      docType: 'VENDOR & SUPPLIER MASTER AGREEMENT',
      docNum: 'VND-2026-0028',
      status: 'pending',
      currency: 'USD',
      issueDate: formatDate(TODAY),
      dueDate: formatDate(new Date(TODAY.getTime() + 365 * 86400000)),
      company: {
        name: 'Northside Studio Inc.',
        subtitle: 'Buyer / Client Enterprise',
        address: '104 Mercer St, Suite 4B\nNew York, NY 10012',
        taxId: 'US-EIN 84-2938102',
        email: 'procurement@northsidestudio.com',
        phone: '+1 (555) 239-8100',
        signatory: 'Joseph Prince',
        signatoryTitle: 'Managing Partner'
      },
      recipient: {
        name: 'Carlos Mendez',
        company: 'CloudMatrix Hosting Solutions',
        address: '100 Technology Sq\nCambridge, MA 02139',
        taxId: 'US-EIN 04-9912049',
        email: 'carlos@cloudmatrix.io',
        phone: '+1 (617) 550-9811',
        signatory: 'Carlos Mendez',
        signatoryTitle: 'Enterprise Sales VP'
      },
      scope: 'Vendor agrees to furnish managed dedicated Kubernetes cloud hosting clusters, automated daily encrypted snapshot backups, and 99.99% network uptime availability.',
      clauses: [
        {
          title: '1. Service Delivery & High Availability SLA',
          body: 'Vendor guarantees 99.99% monthly cluster availability. Any failure to meet uptime SLAs results in a 10% credit of monthly billing per hour of downtime.'
        },
        {
          title: '2. SOC2, GDPR & Security Compliance',
          body: 'Vendor warrants maintaining continuous SOC2 Type II certification, GDPR compliance, and ISO 27001 data center physical security standards.'
        },
        {
          title: '3. Invoicing & Net-30 Payment Terms',
          body: 'Invoices submitted electronically at month-end shall be payable Net 30 days via ACH wire transfer without financing charges.'
        },
        {
          title: '4. Data Ownership & Immediate Export Rights',
          body: 'All client code, customer databases, and telemetry stored on Vendor infrastructure remain the exclusive property of Northside Studio Inc., exportable on demand in unencrypted standard archive formats.'
        }
      ],
      notes: 'Terms prevail over any conflicting vendor click-through terms of service.'
    }
  }
];

// Seed Data for Saved Documents History
const SEED_HISTORY = [
  {
    id: 'SAV-001',
    title: 'Commercial Invoice #INV-2026-0142',
    docType: 'Invoice',
    recipient: 'Dana Osei (Reef Co.)',
    amount: '$1,200',
    date: '2026-07-18',
    status: 'paid',
    tplId: 'inv-standard'
  },
  {
    id: 'SAV-002',
    title: 'Master Services Agreement #MSA-2026-0092',
    docType: 'Contract',
    recipient: 'Reef Co. Technologies',
    amount: 'Retainer / Phased',
    date: '2026-07-20',
    status: 'executed',
    tplId: 'ctr-msa'
  },
  {
    id: 'SAV-003',
    title: 'Mutual NDA #NDA-2026-0314',
    docType: 'Legal',
    recipient: 'Lumen Studio Enterprises',
    amount: 'Mutual',
    date: '2026-07-22',
    status: 'executed',
    tplId: 'ctr-nda'
  },
  {
    id: 'SAV-004',
    title: 'Employment Offer #OFF-2026-0019',
    docType: 'Offer Letter',
    recipient: 'Jordan Hayes (Lead Engineer)',
    amount: '$145k/yr',
    date: '2026-07-25',
    status: 'pending',
    tplId: 'onb-offer'
  }
];

// App State
let activeTemplate = TEMPLATES[0];
let currentDoc = JSON.parse(JSON.stringify(TEMPLATES[0].data));
currentDoc.bodyType = TEMPLATES[0].bodyType;
currentDoc.templateId = TEMPLATES[0].id;
currentDoc.watermark = 'none';

let savedDocuments = [];
try {
  const local = localStorage.getItem('northside_documents_hub');
  savedDocuments = local ? JSON.parse(local) : SEED_HISTORY;
} catch (e) {
  savedDocuments = SEED_HISTORY;
}

// ===================================================================
// DOM ELEMENTS
// ===================================================================
const templateGrid = document.getElementById('templateGrid');
const configBody = document.getElementById('configBody');
const docPaper = document.getElementById('documentPaper');
const watermarkOverlay = document.getElementById('watermarkOverlay');
const filterChips = document.querySelectorAll('.filter-chip');
const watermarkSelect = document.getElementById('watermarkSelect');
const historyModal = document.getElementById('historyModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const historyList = document.getElementById('historyList');
const savedCountBadge = document.getElementById('savedCountBadge');
const statTotalDocs = document.getElementById('statTotalDocs');
const statInvoicesVal = document.getElementById('statInvoicesVal');
const statContractsVal = document.getElementById('statContractsVal');
const statOnboardingVal = document.getElementById('statOnboardingVal');

// ===================================================================
// TEMPLATES CAROUSEL & FILTERING
// ===================================================================
function renderTemplateGrid(filter = 'all') {
  templateGrid.innerHTML = '';
  const filtered = filter === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

  filtered.forEach(tpl => {
    const card = document.createElement('div');
    card.className = `template-pill-card ${tpl.id === activeTemplate.id ? 'active' : ''}`;
    card.dataset.id = tpl.id;
    card.innerHTML = `
      <div class="tpl-head">
        <div class="tpl-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${tpl.icon}</svg></div>
        <span class="tpl-tag">${tpl.tag}</span>
      </div>
      <div class="tpl-title">${tpl.title}</div>
      <div class="tpl-desc">${tpl.subtitle}</div>
    `;
    card.addEventListener('click', () => selectTemplate(tpl.id));
    templateGrid.appendChild(card);
  });
}

function selectTemplate(tplId) {
  const tpl = TEMPLATES.find(t => t.id === tplId);
  if (!tpl) return;
  activeTemplate = tpl;

  // Clone template data into currentDoc preserving watermark
  const wm = currentDoc.watermark;
  currentDoc = JSON.parse(JSON.stringify(tpl.data));
  currentDoc.bodyType = tpl.bodyType;
  currentDoc.templateId = tpl.id;
  currentDoc.watermark = wm;

  document.querySelectorAll('.template-pill-card').forEach(c => {
    c.classList.toggle('active', c.dataset.id === tplId);
  });

  renderConfigForm();
  renderDocumentPaper();
  showToast(`Loaded ${tpl.title}`);
}

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderTemplateGrid(chip.dataset.category);
  });
});

// ===================================================================
// DYNAMIC FORM CONFIGURATOR (LEFT COLUMN)
// ===================================================================
function renderConfigForm() {
  const curSymbol = CURRENCIES[currentDoc.currency]?.symbol || '$';
  let dynamicSection = '';

  // 1. INVOICE LINE ITEMS & BANKING
  if (currentDoc.bodyType === 'invoice') {
    const itemsRows = currentDoc.items.map((item, idx) => `
      <tr data-index="${idx}">
        <td><input type="text" class="item-desc-input" value="${escapeHtml(item.desc)}" placeholder="Service description"></td>
        <td style="width:70px;"><input type="number" step="any" min="1" class="item-qty-input" value="${item.qty}"></td>
        <td style="width:90px;"><input type="number" step="any" min="0" class="item-rate-input" value="${item.rate}"></td>
        <td style="width:85px; font-weight:700; text-align:right;">${curSymbol}${(item.qty * item.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td style="width:36px; text-align:center;">
          <button class="btn-del-item" data-index="${idx}" title="Remove line"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        </td>
      </tr>
    `).join('');

    dynamicSection = `
      <div class="editor-section open">
        <div class="editor-section-head">
          <span>Line Items & Calculations</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="editor-section-content">
          <div class="items-table-wrap">
            <table class="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty / Hrs</th>
                  <th>Rate</th>
                  <th style="text-align:right;">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="itemsTableBody">
                ${itemsRows}
              </tbody>
            </table>
          </div>
          <button class="btn-add-item" id="btnAddItem">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Line Item
          </button>

          <div class="form-row" style="margin-top:.75rem;">
            <div class="field">
              <label>Tax Rate (%)</label>
              <input type="number" step="0.01" min="0" class="field-input" id="cfgTax" value="${currentDoc.taxPercent || 0}">
            </div>
            <div class="field">
              <label>Discount (%)</label>
              <input type="number" step="0.01" min="0" class="field-input" id="cfgDiscount" value="${currentDoc.discountPercent || 0}">
            </div>
          </div>
        </div>
      </div>

      <div class="editor-section">
        <div class="editor-section-head">
          <span>Bank Wire & Payment Terms</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="editor-section-content">
          <div class="field"><label>Bank Institution Name</label><input type="text" class="field-input" id="cfgBankName" value="${escapeHtml(currentDoc.banking?.bankName || '')}"></div>
          <div class="form-row">
            <div class="field"><label>Account Number</label><input type="text" class="field-input" id="cfgAccountNum" value="${escapeHtml(currentDoc.banking?.accountNumber || '')}"></div>
            <div class="field"><label>Routing / SWIFT</label><input type="text" class="field-input" id="cfgRouting" value="${escapeHtml(currentDoc.banking?.routingNumber || '')}"></div>
          </div>
          <div class="field"><label>Payment Terms</label><textarea class="field-textarea" id="cfgBankTerms" style="min-height:55px;">${escapeHtml(currentDoc.banking?.terms || '')}</textarea></div>
        </div>
      </div>
    `;
  }

  // 2. CONTRACT / AGREEMENT / SOW / NDA CLAUSES
  else if (currentDoc.bodyType === 'contract') {
    const clauseCards = (currentDoc.clauses || []).map((c, i) => `
      <div class="editor-section" style="margin-bottom:.5rem;">
        <div class="editor-section-head" style="padding:.5rem .75rem; font-size:.82rem;">
          <span>${escapeHtml(c.title)}</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="editor-section-content" style="padding:.75rem;">
          <div class="field"><label>Clause Title</label><input type="text" class="field-input clause-title-input" data-index="${i}" value="${escapeHtml(c.title)}"></div>
          <div class="field" style="margin-top:.4rem;"><label>Clause Body</label><textarea class="field-textarea clause-body-input" data-index="${i}">${escapeHtml(c.body)}</textarea></div>
        </div>
      </div>
    `).join('');

    dynamicSection = `
      <div class="editor-section open">
        <div class="editor-section-head">
          <span>Scope of Engagement</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="editor-section-content">
          <div class="field"><label>Scope / Purpose Summary</label><textarea class="field-textarea" id="cfgScope" style="min-height:80px;">${escapeHtml(currentDoc.scope || '')}</textarea></div>
        </div>
      </div>

      <div class="editor-section open">
        <div class="editor-section-head">
          <span>Standard Contract Clauses (${currentDoc.clauses?.length || 0})</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="editor-section-content">
          <p style="font-size:.74rem; color:var(--ink-soft); margin-bottom:.5rem;">Click any clause header to modify terms or add specific conditions.</p>
          ${clauseCards}
        </div>
      </div>
    `;
  }

  // 3. EMPLOYEE OFFER LETTER
  else if (currentDoc.bodyType === 'offer') {
    const offer = currentDoc.offer || {};
    const benefitsList = (offer.benefits || []).map((b, i) => `
      <div style="display:flex; gap:.4rem; align-items:center; margin-bottom:.35rem;">
        <input type="text" class="field-input benefit-input" data-index="${i}" value="${escapeHtml(b)}" style="flex:1;">
        <button class="btn-del-benefit" data-index="${i}" style="color:var(--danger); padding:.3rem;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      </div>
    `).join('');

    dynamicSection = `
      <div class="editor-section open">
        <div class="editor-section-head">
          <span>Position & Compensation Details</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="editor-section-content">
          <div class="form-row">
            <div class="field"><label>Job Title</label><input type="text" class="field-input" id="cfgPosition" value="${escapeHtml(offer.positionTitle || '')}"></div>
            <div class="field"><label>Department</label><input type="text" class="field-input" id="cfgDepartment" value="${escapeHtml(offer.department || '')}"></div>
          </div>
          <div class="form-row">
            <div class="field"><label>Reporting Manager</label><input type="text" class="field-input" id="cfgReporting" value="${escapeHtml(offer.reportingTo || '')}"></div>
            <div class="field"><label>Employment Type</label><input type="text" class="field-input" id="cfgEmpType" value="${escapeHtml(offer.employmentType || '')}"></div>
          </div>
          <div class="form-row">
            <div class="field"><label>Base Compensation</label><input type="text" class="field-input" id="cfgBaseSalary" value="${escapeHtml(offer.baseSalary || '')}"></div>
            <div class="field"><label>Target Start Date</label><input type="date" class="field-input" id="cfgStartDate" value="${offer.startDate || ''}"></div>
          </div>
          <div class="field"><label>Equity Incentive</label><input type="text" class="field-input" id="cfgEquity" value="${escapeHtml(offer.equity || '')}"></div>
          <div class="field"><label>Bonus Structure</label><input type="text" class="field-input" id="cfgBonus" value="${escapeHtml(offer.bonus || '')}"></div>
        </div>
      </div>

      <div class="editor-section">
        <div class="editor-section-head">
          <span>Benefits & Perks Package</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="editor-section-content">
          ${benefitsList}
          <button class="btn-add-item" id="btnAddBenefit"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add Benefit Perk</button>
        </div>
      </div>
    `;
  }

  // 4. EQUIPMENT & ASSET HANDOVER
  else if (currentDoc.bodyType === 'equipment') {
    const eqRows = (currentDoc.equipment || []).map((eq, i) => `
      <div style="background:#f9fafc; border:1px solid var(--border); border-radius:8px; padding:.65rem; margin-bottom:.5rem;">
        <div class="field" style="margin-bottom:.35rem;"><label>Item / Device Model</label><input type="text" class="field-input eq-item-input" data-index="${i}" value="${escapeHtml(eq.item)}"></div>
        <div class="form-row">
          <div class="field"><label>Serial Number</label><input type="text" class="field-input eq-serial-input" data-index="${i}" value="${escapeHtml(eq.serial)}"></div>
          <div class="field"><label>Asset Tag / Code</label><input type="text" class="field-input eq-tag-input" data-index="${i}" value="${escapeHtml(eq.tag)}"></div>
        </div>
        <div class="field" style="margin-top:.35rem;"><label>Condition</label><input type="text" class="field-input eq-cond-input" data-index="${i}" value="${escapeHtml(eq.condition)}"></div>
      </div>
    `).join('');

    dynamicSection = `
      <div class="editor-section open">
        <div class="editor-section-head">
          <span>Assigned Hardware & Assets</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="editor-section-content">
          ${eqRows}
          <button class="btn-add-item" id="btnAddEq"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add Hardware Asset</button>
          <div class="field" style="margin-top:.75rem;"><label>Acceptable Use & Security Policy</label><textarea class="field-textarea" id="cfgEqPolicy">${escapeHtml(currentDoc.policy || '')}</textarea></div>
        </div>
      </div>
    `;
  }

  // 5. DIRECT DEPOSIT AUTHORIZATION
  else if (currentDoc.bodyType === 'directdeposit') {
    const b = currentDoc.banking || {};
    dynamicSection = `
      <div class="editor-section open">
        <div class="editor-section-head">
          <span>Payroll Banking Information</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="editor-section-content">
          <div class="form-row">
            <div class="field"><label>Bank Name</label><input type="text" class="field-input" id="cfgDpBank" value="${escapeHtml(b.bankName || '')}"></div>
            <div class="field"><label>Account Holder Name</label><input type="text" class="field-input" id="cfgDpHolder" value="${escapeHtml(b.accountHolder || '')}"></div>
          </div>
          <div class="form-row">
            <div class="field"><label>Routing Number (9 Digits)</label><input type="text" class="field-input" id="cfgDpRouting" value="${escapeHtml(b.routingNumber || '')}"></div>
            <div class="field"><label>Account Number</label><input type="text" class="field-input" id="cfgDpAccount" value="${escapeHtml(b.accountNumber || '')}"></div>
          </div>
          <div class="form-row">
            <div class="field"><label>Account Type</label>
              <select class="field-select" id="cfgDpType">
                <option value="Checking Account" ${b.accountType === 'Checking Account' ? 'selected' : ''}>Checking Account</option>
                <option value="Savings Account" ${b.accountType === 'Savings Account' ? 'selected' : ''}>Savings Account</option>
              </select>
            </div>
            <div class="field"><label>Pay Distribution</label><input type="text" class="field-input" id="cfgDpAlloc" value="${escapeHtml(b.allocationPercent || '100% of Net Pay')}"></div>
          </div>
        </div>
      </div>
    `;
  }

  // 6. ONBOARDING CHECKLIST
  else if (currentDoc.bodyType === 'checklist') {
    const phaseBlocks = (currentDoc.phases || []).map((ph, pi) => `
      <div style="background:#f9fafc; border:1px solid var(--border); border-radius:8px; padding:.75rem; margin-bottom:.5rem;">
        <div class="field" style="margin-bottom:.4rem;"><label>Phase Title</label><input type="text" class="field-input phase-title-input" data-pindex="${pi}" value="${escapeHtml(ph.phase)}"></div>
        <div class="field"><label>Checklist Tasks (one per line)</label><textarea class="field-textarea phase-tasks-input" data-pindex="${pi}" style="min-height:75px;">${ph.items.join('\n')}</textarea></div>
      </div>
    `).join('');

    dynamicSection = `
      <div class="editor-section open">
        <div class="editor-section-head">
          <span>Onboarding Roadmap Phases</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="editor-section-content">
          <div class="field"><label>Assigned Mentor / Buddy</label><input type="text" class="field-input" id="cfgMentor" value="${escapeHtml(currentDoc.mentorName || '')}"></div>
          ${phaseBlocks}
        </div>
      </div>
    `;
  }

  configBody.innerHTML = `
    <!-- Top Preset Picker -->
    <div class="preset-bar">
      <span class="preset-label">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        Instant Preset
      </span>
      <select class="preset-select" id="quickPresetSelect">
        <option value="" disabled selected>Load sample paperwork...</option>
        ${TEMPLATES.map(t => `<option value="${t.id}" ${t.id === activeTemplate.id ? 'selected' : ''}>${t.title} (${t.tag})</option>`).join('')}
      </select>
    </div>

    <!-- Section 1: Document Meta -->
    <div class="editor-section open">
      <div class="editor-section-head">
        <span>Document Identification</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="editor-section-content">
        <div class="field">
          <label>Document Title / Type</label>
          <input type="text" class="field-input" id="cfgDocType" value="${escapeHtml(currentDoc.docType)}">
        </div>
        <div class="form-row">
          <div class="field">
            <label>Reference #</label>
            <input type="text" class="field-input" id="cfgDocNum" value="${escapeHtml(currentDoc.docNum)}">
          </div>
          <div class="field">
            <label>Currency</label>
            <select class="field-select" id="cfgCurrency">
              ${Object.entries(CURRENCIES).map(([k, v]) => `<option value="${k}" ${currentDoc.currency === k ? 'selected' : ''}>${v.code} (${v.symbol})</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="field">
            <label>Issue Date</label>
            <input type="date" class="field-input" id="cfgIssueDate" value="${currentDoc.issueDate}">
          </div>
          <div class="field">
            <label>Due / Effective Date</label>
            <input type="date" class="field-input" id="cfgDueDate" value="${currentDoc.dueDate}">
          </div>
        </div>
        <div class="field">
          <label>Status Badge</label>
          <select class="field-select" id="cfgStatus">
            <option value="pending" ${currentDoc.status === 'pending' ? 'selected' : ''}>Pending Signature / Due</option>
            <option value="paid" ${currentDoc.status === 'paid' ? 'selected' : ''}>Paid in Full</option>
            <option value="executed" ${currentDoc.status === 'executed' ? 'selected' : ''}>Signed & Executed</option>
            <option value="draft" ${currentDoc.status === 'draft' ? 'selected' : ''}>Internal Draft</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Section 2: Issuer Details -->
    <div class="editor-section">
      <div class="editor-section-head">
        <span>Issuer / Company Information</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="editor-section-content">
        <div class="field"><label>Business Name</label><input type="text" class="field-input" id="cfgCompName" value="${escapeHtml(currentDoc.company?.name || '')}"></div>
        <div class="field"><label>Tagline / Industry</label><input type="text" class="field-input" id="cfgCompSub" value="${escapeHtml(currentDoc.company?.subtitle || '')}"></div>
        <div class="field"><label>Address</label><textarea class="field-textarea" id="cfgCompAddr" style="min-height:55px;">${escapeHtml(currentDoc.company?.address || '')}</textarea></div>
        <div class="form-row">
          <div class="field"><label>Tax ID / Reg #</label><input type="text" class="field-input" id="cfgCompTax" value="${escapeHtml(currentDoc.company?.taxId || '')}"></div>
          <div class="field"><label>Email</label><input type="email" class="field-input" id="cfgCompEmail" value="${escapeHtml(currentDoc.company?.email || '')}"></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Authorized Signer</label><input type="text" class="field-input" id="cfgCompSigner" value="${escapeHtml(currentDoc.company?.signatory || '')}"></div>
          <div class="field"><label>Signer Title</label><input type="text" class="field-input" id="cfgCompSignerTitle" value="${escapeHtml(currentDoc.company?.signatoryTitle || '')}"></div>
        </div>
      </div>
    </div>

    <!-- Section 3: Recipient Details -->
    <div class="editor-section">
      <div class="editor-section-head">
        <span>Counterparty / Recipient Information</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="editor-section-content">
        <div class="form-row">
          <div class="field"><label>Recipient / Contact Name</label><input type="text" class="field-input" id="cfgRecName" value="${escapeHtml(currentDoc.recipient?.name || '')}"></div>
          <div class="field"><label>Company / Department</label><input type="text" class="field-input" id="cfgRecCompany" value="${escapeHtml(currentDoc.recipient?.company || '')}"></div>
        </div>
        <div class="field"><label>Address</label><textarea class="field-textarea" id="cfgRecAddr" style="min-height:55px;">${escapeHtml(currentDoc.recipient?.address || '')}</textarea></div>
        <div class="form-row">
          <div class="field"><label>Tax ID / Identifier</label><input type="text" class="field-input" id="cfgRecTax" value="${escapeHtml(currentDoc.recipient?.taxId || '')}"></div>
          <div class="field"><label>Email</label><input type="email" class="field-input" id="cfgRecEmail" value="${escapeHtml(currentDoc.recipient?.email || '')}"></div>
        </div>
        <div class="form-row">
          <div class="field"><label>Signatory Name</label><input type="text" class="field-input" id="cfgRecSigner" value="${escapeHtml(currentDoc.recipient?.signatory || currentDoc.recipient?.name || '')}"></div>
          <div class="field"><label>Signatory Title</label><input type="text" class="field-input" id="cfgRecSignerTitle" value="${escapeHtml(currentDoc.recipient?.signatoryTitle || 'Authorized Representative')}"></div>
        </div>
      </div>
    </div>

    <!-- Section 4: Dynamic Body Content -->
    ${dynamicSection}

    <!-- Section 5: Legal Notes & Signatures -->
    <div class="editor-section">
      <div class="editor-section-head">
        <span>Closing Notes & Signature Preferences</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="editor-section-content">
        <div class="field"><label>Closing Note / Disclaimer</label><textarea class="field-textarea" id="cfgNotes" style="min-height:60px;">${escapeHtml(currentDoc.notes || '')}</textarea></div>
      </div>
    </div>
  `;

  attachConfigEvents();
}

function attachConfigEvents() {
  // Accordion Toggles
  document.querySelectorAll('.editor-section-head').forEach(head => {
    head.addEventListener('click', () => {
      head.parentElement.classList.toggle('open');
    });
  });

  // Preset Select
  const presetSel = document.getElementById('quickPresetSelect');
  if (presetSel) {
    presetSel.addEventListener('change', (e) => {
      selectTemplate(e.target.value);
    });
  }

  // Meta inputs
  bindInput('cfgDocType', (val) => currentDoc.docType = val);
  bindInput('cfgDocNum', (val) => currentDoc.docNum = val);
  bindInput('cfgCurrency', (val) => { currentDoc.currency = val; renderConfigForm(); });
  bindInput('cfgIssueDate', (val) => currentDoc.issueDate = val);
  bindInput('cfgDueDate', (val) => currentDoc.dueDate = val);
  bindInput('cfgStatus', (val) => currentDoc.status = val);

  // Company inputs
  bindInput('cfgCompName', (val) => currentDoc.company.name = val);
  bindInput('cfgCompSub', (val) => currentDoc.company.subtitle = val);
  bindInput('cfgCompAddr', (val) => currentDoc.company.address = val);
  bindInput('cfgCompTax', (val) => currentDoc.company.taxId = val);
  bindInput('cfgCompEmail', (val) => currentDoc.company.email = val);
  bindInput('cfgCompSigner', (val) => currentDoc.company.signatory = val);
  bindInput('cfgCompSignerTitle', (val) => currentDoc.company.signatoryTitle = val);

  // Recipient inputs
  bindInput('cfgRecName', (val) => currentDoc.recipient.name = val);
  bindInput('cfgRecCompany', (val) => currentDoc.recipient.company = val);
  bindInput('cfgRecAddr', (val) => currentDoc.recipient.address = val);
  bindInput('cfgRecTax', (val) => currentDoc.recipient.taxId = val);
  bindInput('cfgRecEmail', (val) => currentDoc.recipient.email = val);
  bindInput('cfgRecSigner', (val) => currentDoc.recipient.signatory = val);
  bindInput('cfgRecSignerTitle', (val) => currentDoc.recipient.signatoryTitle = val);

  // Notes
  bindInput('cfgNotes', (val) => currentDoc.notes = val);

  // Invoice Specific
  if (currentDoc.bodyType === 'invoice') {
    bindInput('cfgTax', (val) => currentDoc.taxPercent = parseFloat(val) || 0);
    bindInput('cfgDiscount', (val) => currentDoc.discountPercent = parseFloat(val) || 0);
    bindInput('cfgBankName', (val) => currentDoc.banking.bankName = val);
    bindInput('cfgAccountNum', (val) => currentDoc.banking.accountNumber = val);
    bindInput('cfgRouting', (val) => currentDoc.banking.routingNumber = val);
    bindInput('cfgBankTerms', (val) => currentDoc.banking.terms = val);

    // Item Table events
    document.querySelectorAll('.item-desc-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = e.target.closest('tr').dataset.index;
        currentDoc.items[idx].desc = e.target.value;
        renderDocumentPaper();
      });
    });
    document.querySelectorAll('.item-qty-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = e.target.closest('tr').dataset.index;
        currentDoc.items[idx].qty = parseFloat(e.target.value) || 0;
        renderConfigForm();
        renderDocumentPaper();
      });
    });
    document.querySelectorAll('.item-rate-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = e.target.closest('tr').dataset.index;
        currentDoc.items[idx].rate = parseFloat(e.target.value) || 0;
        renderConfigForm();
        renderDocumentPaper();
      });
    });
    document.querySelectorAll('.btn-del-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = btn.dataset.index;
        if (currentDoc.items.length > 1) {
          currentDoc.items.splice(idx, 1);
          renderConfigForm();
          renderDocumentPaper();
        } else {
          showToast('Invoice must have at least one line item');
        }
      });
    });

    const btnAddItem = document.getElementById('btnAddItem');
    if (btnAddItem) {
      btnAddItem.addEventListener('click', () => {
        currentDoc.items.push({ desc: 'New Consultative Service / Deliverable', qty: 1, rate: 100 });
        renderConfigForm();
        renderDocumentPaper();
      });
    }
  }

  // Contract specific
  if (currentDoc.bodyType === 'contract') {
    bindInput('cfgScope', (val) => currentDoc.scope = val);
    document.querySelectorAll('.clause-title-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.dataset.index;
        currentDoc.clauses[i].title = e.target.value;
        renderDocumentPaper();
      });
    });
    document.querySelectorAll('.clause-body-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.dataset.index;
        currentDoc.clauses[i].body = e.target.value;
        renderDocumentPaper();
      });
    });
  }

  // Offer letter specific
  if (currentDoc.bodyType === 'offer') {
    bindInput('cfgPosition', (val) => currentDoc.offer.positionTitle = val);
    bindInput('cfgDepartment', (val) => currentDoc.offer.department = val);
    bindInput('cfgReporting', (val) => currentDoc.offer.reportingTo = val);
    bindInput('cfgEmpType', (val) => currentDoc.offer.employmentType = val);
    bindInput('cfgBaseSalary', (val) => currentDoc.offer.baseSalary = val);
    bindInput('cfgStartDate', (val) => currentDoc.offer.startDate = val);
    bindInput('cfgEquity', (val) => currentDoc.offer.equity = val);
    bindInput('cfgBonus', (val) => currentDoc.offer.bonus = val);

    document.querySelectorAll('.benefit-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.dataset.index;
        currentDoc.offer.benefits[i] = e.target.value;
        renderDocumentPaper();
      });
    });
    document.querySelectorAll('.btn-del-benefit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = btn.dataset.index;
        currentDoc.offer.benefits.splice(i, 1);
        renderConfigForm();
        renderDocumentPaper();
      });
    });
    const btnAddBenefit = document.getElementById('btnAddBenefit');
    if (btnAddBenefit) {
      btnAddBenefit.addEventListener('click', () => {
        currentDoc.offer.benefits.push('New company sponsored wellness / benefit perk');
        renderConfigForm();
        renderDocumentPaper();
      });
    }
  }

  // Equipment specific
  if (currentDoc.bodyType === 'equipment') {
    bindInput('cfgEqPolicy', (val) => currentDoc.policy = val);
    document.querySelectorAll('.eq-item-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.dataset.index;
        currentDoc.equipment[i].item = e.target.value;
        renderDocumentPaper();
      });
    });
    document.querySelectorAll('.eq-serial-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.dataset.index;
        currentDoc.equipment[i].serial = e.target.value;
        renderDocumentPaper();
      });
    });
    document.querySelectorAll('.eq-tag-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.dataset.index;
        currentDoc.equipment[i].tag = e.target.value;
        renderDocumentPaper();
      });
    });
    document.querySelectorAll('.eq-cond-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.dataset.index;
        currentDoc.equipment[i].condition = e.target.value;
        renderDocumentPaper();
      });
    });
    const btnAddEq = document.getElementById('btnAddEq');
    if (btnAddEq) {
      btnAddEq.addEventListener('click', () => {
        currentDoc.equipment.push({ item: 'Hardware Device / Peripheral', serial: 'SN-0000', condition: 'Brand New', tag: 'TAG-NEW' });
        renderConfigForm();
        renderDocumentPaper();
      });
    }
  }

  // Direct deposit
  if (currentDoc.bodyType === 'directdeposit') {
    bindInput('cfgDpBank', (val) => currentDoc.banking.bankName = val);
    bindInput('cfgDpHolder', (val) => currentDoc.banking.accountHolder = val);
    bindInput('cfgDpRouting', (val) => currentDoc.banking.routingNumber = val);
    bindInput('cfgDpAccount', (val) => currentDoc.banking.accountNumber = val);
    bindInput('cfgDpType', (val) => currentDoc.banking.accountType = val);
    bindInput('cfgDpAlloc', (val) => currentDoc.banking.allocationPercent = val);
  }

  // Checklist
  if (currentDoc.bodyType === 'checklist') {
    bindInput('cfgMentor', (val) => currentDoc.mentorName = val);
    document.querySelectorAll('.phase-title-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const pi = e.target.dataset.pindex;
        currentDoc.phases[pi].phase = e.target.value;
        renderDocumentPaper();
      });
    });
    document.querySelectorAll('.phase-tasks-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const pi = e.target.dataset.pindex;
        currentDoc.phases[pi].items = e.target.value.split('\n').filter(Boolean);
        renderDocumentPaper();
      });
    });
  }
}

function bindInput(id, callback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', (e) => {
    callback(e.target.value);
    renderDocumentPaper();
  });
  el.addEventListener('change', (e) => {
    callback(e.target.value);
    renderDocumentPaper();
  });
}

// ===================================================================
// WYSIWYG LIVE PAPER SHEET RENDERER (RIGHT COLUMN)
// ===================================================================
function renderDocumentPaper() {
  const curSymbol = CURRENCIES[currentDoc.currency]?.symbol || '$';

  // 1. Watermark update
  if (currentDoc.watermark && currentDoc.watermark !== 'none') {
    watermarkOverlay.textContent = currentDoc.watermark.toUpperCase();
    watermarkOverlay.style.display = 'block';
  } else {
    watermarkOverlay.style.display = 'none';
  }

  // 2. Status badge styling
  let statusBadgeClass = 'doc-badge-status';
  let statusText = currentDoc.status;
  if (currentDoc.status === 'paid') {
    statusBadgeClass += ' paid';
    statusText = 'PAID IN FULL';
  } else if (currentDoc.status === 'executed') {
    statusBadgeClass += ' executed';
    statusText = 'EXECUTED';
  } else if (currentDoc.status === 'draft') {
    statusText = 'DRAFT';
  } else {
    statusText = currentDoc.bodyType === 'invoice' ? 'PAYMENT DUE' : 'PENDING SIGNATURE';
  }

  // 3. Dynamic Center Body
  let bodyHtml = '';

  // --- INVOICE TABLE & TOTALS ---
  if (currentDoc.bodyType === 'invoice') {
    let subtotal = 0;
    const itemRows = (currentDoc.items || []).map(item => {
      const lineTotal = (item.qty || 0) * (item.rate || 0);
      subtotal += lineTotal;
      return `
        <tr>
          <td><div class="bold">${escapeHtml(item.desc)}</div></td>
          <td style="text-align:center;">${item.qty}</td>
          <td class="text-right">${curSymbol}${(item.rate || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td class="text-right bold">${curSymbol}${lineTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        </tr>
      `;
    }).join('');

    const discountAmount = subtotal * ((currentDoc.discountPercent || 0) / 100);
    const taxableSubtotal = Math.max(0, subtotal - discountAmount);
    const taxAmount = taxableSubtotal * ((currentDoc.taxPercent || 0) / 100);
    const grandTotal = taxableSubtotal + taxAmount;

    bodyHtml = `
      <div class="doc-body-section">
        <table class="doc-table">
          <thead>
            <tr>
              <th>Description of Services</th>
              <th style="text-align:center; width:90px;">Qty / Hrs</th>
              <th class="text-right" style="width:110px;">Unit Rate</th>
              <th class="text-right" style="width:120px;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <div class="doc-totals-box">
          <div class="totals-row"><span>Subtotal:</span><span>${curSymbol}${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
          ${currentDoc.discountPercent > 0 ? `<div class="totals-row"><span>Discount (${currentDoc.discountPercent}%):</span><span>-${curSymbol}${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>` : ''}
          ${currentDoc.taxPercent > 0 ? `<div class="totals-row"><span>Tax (${currentDoc.taxPercent}%):</span><span>${curSymbol}${taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>` : ''}
          <div class="totals-row grand"><span>Total Due:</span><span>${curSymbol}${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
        </div>
      </div>

      ${currentDoc.banking ? `
        <div class="doc-body-section" style="margin-top:.5rem;">
          <div class="doc-section-title">Payment & Electronic Transfer Instructions</div>
          <div class="doc-prose" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; font-size:.78rem; background:#f9fafc; padding:.8rem 1rem; border-radius:6px; border:1px solid var(--border);">
            <div>
              <strong>Bank:</strong> ${escapeHtml(currentDoc.banking.bankName || 'JPMorgan Chase')}<br>
              <strong>Account Name:</strong> ${escapeHtml(currentDoc.company?.name || '')}<br>
              <strong>Account Number:</strong> ${escapeHtml(currentDoc.banking.accountNumber || '**** ****')}<br>
              <strong>Routing / SWIFT:</strong> ${escapeHtml(currentDoc.banking.routingNumber || '****')}
            </div>
            <div>
              <strong>Terms:</strong> ${escapeHtml(currentDoc.banking.terms || 'Net 14 Days')}<br>
              <strong>Questions:</strong> ${escapeHtml(currentDoc.company?.email || '')}
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }

  // --- CONTRACT / MSA / SOW / NDA ---
  else if (currentDoc.bodyType === 'contract') {
    const clausesHtml = (currentDoc.clauses || []).map(c => `
      <div class="doc-clause-item">
        <div class="doc-clause-head">${escapeHtml(c.title)}</div>
        <div class="doc-clause-body">${escapeHtml(c.body)}</div>
      </div>
    `).join('');

    bodyHtml = `
      ${currentDoc.scope ? `
        <div class="doc-body-section">
          <div class="doc-section-title">Recitals & Scope of Agreement</div>
          <div class="doc-prose"><p>${escapeHtml(currentDoc.scope)}</p></div>
        </div>
      ` : ''}

      <div class="doc-body-section">
        <div class="doc-section-title">Terms & Conditions</div>
        <div class="doc-clauses-list">
          ${clausesHtml}
        </div>
      </div>
    `;
  }

  // --- EMPLOYMENT OFFER LETTER ---
  else if (currentDoc.bodyType === 'offer') {
    const o = currentDoc.offer || {};
    const benefitsHtml = (o.benefits || []).map(b => `<li style="margin-bottom:.35rem; display:flex; gap:.4rem;"><span style="color:var(--accent);">✓</span><span>${escapeHtml(b)}</span></li>`).join('');

    bodyHtml = `
      <div class="doc-body-section">
        <div class="doc-prose">
          <p>Dear <strong>${escapeHtml(currentDoc.recipient?.name || 'Candidate')}</strong>,</p>
          <p>On behalf of <strong>${escapeHtml(currentDoc.company?.name || 'Northside Studio Inc.')}</strong>, we are thrilled to formally extend this offer of employment for the position of <strong>${escapeHtml(o.positionTitle || 'Lead Engineer')}</strong>.</p>
        </div>

        <div style="background:#f9fafc; border:1px solid var(--border); border-radius:8px; padding:1rem 1.25rem; display:grid; grid-template-columns:1fr 1fr; gap:.85rem; font-size:.82rem;">
          <div><strong>Position Title:</strong> ${escapeHtml(o.positionTitle || '')}</div>
          <div><strong>Department:</strong> ${escapeHtml(o.department || '')}</div>
          <div><strong>Reporting To:</strong> ${escapeHtml(o.reportingTo || '')}</div>
          <div><strong>Classification:</strong> ${escapeHtml(o.employmentType || '')}</div>
          <div><strong>Base Compensation:</strong> <span style="font-weight:800; color:var(--accent-strong);">${escapeHtml(o.baseSalary || '')}</span></div>
          <div><strong>Target Start Date:</strong> ${formatDisplayDate(o.startDate)}</div>
          <div style="grid-column:1 / -1;"><strong>Equity Incentive:</strong> ${escapeHtml(o.equity || 'N/A')}</div>
          <div style="grid-column:1 / -1;"><strong>Performance Bonus:</strong> ${escapeHtml(o.bonus || 'N/A')}</div>
        </div>

        <div class="doc-section-title" style="margin-top:.75rem;">Company Benefits & Perks</div>
        <ul style="font-size:.8rem; line-height:1.45; padding-left:.25rem; color:var(--ink);">
          ${benefitsHtml}
        </ul>

        <div class="doc-prose" style="margin-top:.5rem;">
          <p>To accept this offer, please sign and return this document alongside the enclosed IP Agreement on or before <strong>${formatDisplayDate(currentDoc.dueDate)}</strong>.</p>
        </div>
      </div>
    `;
  }

  // --- HARDWARE & EQUIPMENT HANDOVER ---
  else if (currentDoc.bodyType === 'equipment') {
    const eqRows = (currentDoc.equipment || []).map(eq => `
      <tr>
        <td class="bold">${escapeHtml(eq.item)}</td>
        <td><code>${escapeHtml(eq.serial)}</code></td>
        <td><span style="background:var(--bg); padding:.2rem .45rem; border-radius:4px; font-weight:700; font-size:.75rem;">${escapeHtml(eq.tag)}</span></td>
        <td>${escapeHtml(eq.condition)}</td>
      </tr>
    `).join('');

    bodyHtml = `
      <div class="doc-body-section">
        <div class="doc-section-title">Schedule of Assigned IT Assets</div>
        <table class="doc-table">
          <thead>
            <tr>
              <th>Equipment / Device Description</th>
              <th style="width:140px;">Serial Number</th>
              <th style="width:110px;">Asset Tag</th>
              <th style="width:120px;">Condition</th>
            </tr>
          </thead>
          <tbody>
            ${eqRows}
          </tbody>
        </table>

        <div class="doc-section-title" style="margin-top:.75rem;">Asset Care & Acceptable Use Policy</div>
        <div class="doc-prose" style="background:#f9fafc; padding:.9rem 1.1rem; border-radius:6px; border:1px solid var(--border); font-size:.78rem;">
          <p>${escapeHtml(currentDoc.policy || '')}</p>
        </div>
      </div>
    `;
  }

  // --- DIRECT DEPOSIT ---
  else if (currentDoc.bodyType === 'directdeposit') {
    const b = currentDoc.banking || {};
    bodyHtml = `
      <div class="doc-body-section">
        <div class="doc-section-title">Designated Financial Institution</div>
        <div style="background:#f9fafc; border:1px solid var(--border); border-radius:8px; padding:1.1rem 1.25rem; display:grid; grid-template-columns:1fr 1fr; gap:1rem; font-size:.82rem;">
          <div><strong>Bank Name:</strong> ${escapeHtml(b.bankName || '')}</div>
          <div><strong>Account Holder:</strong> ${escapeHtml(b.accountHolder || '')}</div>
          <div><strong>Routing Number:</strong> <code>${escapeHtml(b.routingNumber || '')}</code></div>
          <div><strong>Account Number:</strong> <code>${escapeHtml(b.accountNumber || '')}</code></div>
          <div><strong>Account Type:</strong> ${escapeHtml(b.accountType || '')}</div>
          <div><strong>Net Pay Allocation:</strong> ${escapeHtml(b.allocationPercent || '')}</div>
        </div>

        <div class="doc-section-title" style="margin-top:1rem;">Authorization Agreement</div>
        <div class="doc-prose" style="font-size:.78rem; line-height:1.6;">
          <p>${escapeHtml(currentDoc.terms || '')}</p>
        </div>
      </div>
    `;
  }

  // --- ONBOARDING CHECKLIST ---
  else if (currentDoc.bodyType === 'checklist') {
    const phasesHtml = (currentDoc.phases || []).map(p => `
      <div style="margin-bottom:.85rem;">
        <div style="font-family:var(--font-display); font-weight:800; font-size:.88rem; color:var(--ink); margin-bottom:.35rem;">${escapeHtml(p.phase)}</div>
        <div style="background:#f9fafc; border:1px solid var(--border); border-radius:6px; padding:.75rem 1rem;">
          ${p.items.map(it => `
            <div style="display:flex; align-items:center; gap:.5rem; font-size:.78rem; margin-bottom:.35rem;">
              <span style="width:14px; height:14px; border:1.5px solid var(--ink); border-radius:3px; display:inline-block; flex-shrink:0;"></span>
              <span>${escapeHtml(it)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    bodyHtml = `
      <div class="doc-body-section">
        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--accent-soft); padding:.75rem 1rem; border-radius:8px; border:1px solid var(--accent); margin-bottom:1rem;">
          <span style="font-size:.82rem; font-weight:700; color:var(--accent-strong);">Dedicated Onboarding Mentor:</span>
          <span style="font-family:var(--font-display); font-weight:800; font-size:.9rem; color:var(--ink);">${escapeHtml(currentDoc.mentorName || 'Joseph Prince')}</span>
        </div>

        <div class="doc-section-title">Milestone Roadmap</div>
        ${phasesHtml}
      </div>
    `;
  }

  // 4. Combine Full Paper Template
  docPaper.innerHTML = `
    <div class="paper-watermark" id="watermarkOverlay" style="${currentDoc.watermark && currentDoc.watermark !== 'none' ? 'display:block;' : 'display:none;'}">
      ${(currentDoc.watermark || '').toUpperCase()}
    </div>

    <div class="doc-sheet-content">
      <!-- HEADER -->
      <div class="doc-header">
        <div class="doc-brand-group">
          <div class="doc-company-title">${escapeHtml(currentDoc.company?.name || 'Northside Studio')}</div>
          <div class="doc-company-sub">
            ${escapeHtml(currentDoc.company?.subtitle || '')}<br>
            ${escapeHtml(currentDoc.company?.address || '').replace(/\n/g, '<br>')}<br>
            ${currentDoc.company?.taxId ? `<strong>Tax ID:</strong> ${escapeHtml(currentDoc.company.taxId)} · ` : ''}
            ${escapeHtml(currentDoc.company?.email || '')}
          </div>
        </div>

        <div class="doc-meta-block">
          <span class="${statusBadgeClass}">${statusText}</span>
          <div class="doc-type-heading">${escapeHtml(currentDoc.docType)}</div>
          <div class="doc-num-date">
            <strong>Ref:</strong> ${escapeHtml(currentDoc.docNum)}<br>
            <strong>Date:</strong> ${formatDisplayDate(currentDoc.issueDate)}<br>
            <strong>Effective / Due:</strong> ${formatDisplayDate(currentDoc.dueDate)}
          </div>
        </div>
      </div>

      <!-- PARTIES -->
      <div class="doc-parties-grid">
        <div class="party-box from">
          <div class="party-label">From / Issued By</div>
          <div class="party-name">${escapeHtml(currentDoc.company?.name || '')}</div>
          <div class="party-sub">
            Attn: ${escapeHtml(currentDoc.company?.signatory || '')} (${escapeHtml(currentDoc.company?.signatoryTitle || '')})<br>
            ${escapeHtml(currentDoc.company?.email || '')}
          </div>
        </div>

        <div class="party-box to">
          <div class="party-label">Prepared For / Counterparty</div>
          <div class="party-name">${escapeHtml(currentDoc.recipient?.name || '')}</div>
          <div class="party-sub">
            ${currentDoc.recipient?.company ? `<strong>${escapeHtml(currentDoc.recipient.company)}</strong><br>` : ''}
            ${escapeHtml(currentDoc.recipient?.address || '').replace(/\n/g, '<br>')}<br>
            ${escapeHtml(currentDoc.recipient?.email || '')}
          </div>
        </div>
      </div>

      <!-- BODY CONTENT -->
      ${bodyHtml}

      <!-- SIGNATURES BLOCK -->
      <div class="doc-signatures">
        <div class="sig-block">
          <div class="sig-line">
            <span class="sig-handwritten">${escapeHtml(currentDoc.company?.signatory || 'Joseph Prince')}</span>
            <div class="digital-stamp">Verified Business OS</div>
          </div>
          <div class="sig-label">Authorized Company Signature</div>
          <div class="sig-meta">${escapeHtml(currentDoc.company?.signatory || '')} · ${escapeHtml(currentDoc.company?.signatoryTitle || '')}</div>
          <div class="sig-sub">Date: ${formatDisplayDate(currentDoc.issueDate)}</div>
        </div>

        <div class="sig-block">
          <div class="sig-line">
            ${currentDoc.status === 'executed' || currentDoc.status === 'paid' ? `
              <span class="sig-handwritten">${escapeHtml(currentDoc.recipient?.signatory || currentDoc.recipient?.name || '')}</span>
              <div class="digital-stamp" style="border-color:#10b981; color:#059669;">Digitally Signed</div>
            ` : ''}
          </div>
          <div class="sig-label">Accepted & Acknowledged By</div>
          <div class="sig-meta">${escapeHtml(currentDoc.recipient?.signatory || currentDoc.recipient?.name || 'Counterparty')} · ${escapeHtml(currentDoc.recipient?.signatoryTitle || 'Authorized Signatory')}</div>
          <div class="sig-sub">Date: ${currentDoc.status === 'executed' ? formatDisplayDate(currentDoc.dueDate) : '__________________'}</div>
        </div>
      </div>

      <!-- NOTES -->
      ${currentDoc.notes ? `
        <div style="font-size:.73rem; color:var(--ink-soft); font-style:italic; border-top:1px dashed var(--border); padding-top:.5rem; margin-top:.75rem;">
          ${escapeHtml(currentDoc.notes)}
        </div>
      ` : ''}
    </div>

    <!-- FOOTER -->
    <div class="doc-paper-footer">
      <span>${escapeHtml(currentDoc.company?.name || 'Northside Studio')} · Confidential & Legal Document</span>
      <span>Document ID: ${escapeHtml(currentDoc.docNum)} · Page 1 of 1</span>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ===================================================================
// TOOLBAR & ACTIONS (PRINT, COPY, SAVE, ZOOM, WATERMARK)
// ===================================================================
// 1. Watermark Selector
watermarkSelect.addEventListener('change', (e) => {
  currentDoc.watermark = e.target.value;
  renderDocumentPaper();
});

// 2. Zoom Controls
document.querySelectorAll('.zoom-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.zoom-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const scale = parseFloat(btn.dataset.scale);
    docPaper.style.transform = `scale(${scale})`;
  });
});

// 3. Print / Save as PDF
document.getElementById('btnPrint').addEventListener('click', () => {
  window.print();
});

// 4. Copy Document Text
document.getElementById('btnCopy').addEventListener('click', async () => {
  const plainText = generatePlainTextDocument(currentDoc);
  try {
    await navigator.clipboard.writeText(plainText);
    showToast('Document text copied to clipboard!');
  } catch (err) {
    const ta = document.createElement('textarea');
    ta.value = plainText;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast('Document copied to clipboard!');
  }
});

// 5. Save Document to History
document.getElementById('btnSave').addEventListener('click', () => {
  const newSave = {
    id: 'SAV-' + Date.now().toString().slice(-4),
    title: `${currentDoc.docType} #${currentDoc.docNum}`,
    docType: activeTemplate.tag,
    recipient: currentDoc.recipient?.name || 'Client',
    amount: currentDoc.bodyType === 'invoice' 
      ? (CURRENCIES[currentDoc.currency]?.symbol || '$') + calculateInvoiceTotal(currentDoc)
      : (currentDoc.status === 'executed' ? 'Executed' : 'Pending'),
    date: currentDoc.issueDate || formatDate(TODAY),
    status: currentDoc.status,
    tplId: currentDoc.templateId,
    docPayload: JSON.parse(JSON.stringify(currentDoc))
  };

  savedDocuments.unshift(newSave);
  try {
    localStorage.setItem('northside_documents_hub', JSON.stringify(savedDocuments));
  } catch (e) {}

  updateStats();
  showToast(`Saved "${newSave.title}" to workspace!`);
});

// 6. Reset Form
document.getElementById('btnReset').addEventListener('click', () => {
  if (confirm('Reset this document form to original template defaults?')) {
    selectTemplate(activeTemplate.id);
  }
});

// 7. History Modal Handlers
document.getElementById('btnHistory').addEventListener('click', () => openHistoryModal());
document.getElementById('closeHistoryModal').addEventListener('click', () => closeHistoryModal());
modalBackdrop.addEventListener('click', () => closeHistoryModal());

function openHistoryModal() {
  renderHistoryList();
  historyModal.classList.add('open');
  modalBackdrop.classList.add('open');
}

function closeHistoryModal() {
  historyModal.classList.remove('open');
  modalBackdrop.classList.remove('open');
}

function renderHistoryList() {
  if (!savedDocuments.length) {
    historyList.innerHTML = `
      <div class="empty-history">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <div class="empty-history-title">No Saved Documents Yet</div>
        <div class="empty-history-sub">Generate and save invoices, contracts, or onboarding paperwork to access them here anytime.</div>
      </div>
    `;
    return;
  }

  historyList.innerHTML = savedDocuments.map((item, idx) => `
    <div class="history-item">
      <div class="history-item-left">
        <div class="history-icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div>
          <div class="history-doc-title">${escapeHtml(item.title)}</div>
          <div class="history-doc-meta">${escapeHtml(item.recipient)} · ${item.date} · <strong>${item.amount}</strong></div>
        </div>
      </div>
      <div class="history-actions">
        <button class="btn-h-act" onclick="loadSavedDoc(${idx})">Load</button>
        <button class="btn-h-act danger" onclick="deleteSavedDoc(${idx})">Delete</button>
      </div>
    </div>
  `).join('');
}

window.loadSavedDoc = function(idx) {
  const item = savedDocuments[idx];
  if (!item) return;

  if (item.docPayload) {
    currentDoc = JSON.parse(JSON.stringify(item.docPayload));
    const tpl = TEMPLATES.find(t => t.id === currentDoc.templateId) || TEMPLATES[0];
    activeTemplate = tpl;
    currentDoc.bodyType = tpl.bodyType;
  } else {
    selectTemplate(item.tplId || 'inv-standard');
  }

  renderConfigForm();
  renderDocumentPaper();
  closeHistoryModal();
  showToast(`Loaded saved doc: ${item.title}`);
};

window.deleteSavedDoc = function(idx) {
  savedDocuments.splice(idx, 1);
  try {
    localStorage.setItem('northside_documents_hub', JSON.stringify(savedDocuments));
  } catch (e) {}
  renderHistoryList();
  updateStats();
  showToast('Removed document from history');
};

function calculateInvoiceTotal(doc) {
  if (doc.bodyType !== 'invoice') return '0.00';
  let subtotal = 0;
  (doc.items || []).forEach(it => subtotal += (it.qty || 0) * (it.rate || 0));
  const discount = subtotal * ((doc.discountPercent || 0) / 100);
  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * ((doc.taxPercent || 0) / 100);
  return (taxable + tax).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateStats() {
  const count = savedDocuments.length;
  savedCountBadge.textContent = count;
  statTotalDocs.textContent = count;
  statInvoicesVal.textContent = savedDocuments.filter(d => (d.docType || '').includes('Invoice') || (d.docType || '').includes('Retainer')).length;
  statContractsVal.textContent = savedDocuments.filter(d => (d.docType || '').includes('Contract') || (d.docType || '').includes('Legal') || (d.docType || '').includes('SOW')).length;
  statOnboardingVal.textContent = savedDocuments.filter(d => (d.docType || '').includes('HR') || (d.docType || '').includes('Offer') || (d.docType || '').includes('Asset') || (d.docType || '').includes('Payroll') || (d.docType || '').includes('Client')).length;
}

// Plain Text Generator for Clipboard
function generatePlainTextDocument(doc) {
  const divider = '==================================================';
  let out = `${divider}\n${doc.docType}\n${doc.docNum}\n${divider}\n\n`;
  out += `DATE: ${doc.issueDate} | DUE: ${doc.dueDate}\n`;
  out += `STATUS: ${doc.status.toUpperCase()}\n\n`;
  out += `FROM:\n${doc.company?.name}\n${doc.company?.address}\nEmail: ${doc.company?.email}\n\n`;
  out += `TO:\n${doc.recipient?.name}\n${doc.recipient?.company || ''}\n${doc.recipient?.address || ''}\nEmail: ${doc.recipient?.email || ''}\n\n`;
  out += `${divider}\n`;

  if (doc.bodyType === 'invoice') {
    out += `LINE ITEMS:\n`;
    (doc.items || []).forEach(it => {
      out += `* ${it.desc} (Qty: ${it.qty} @ ${it.rate}) = ${(it.qty * it.rate).toFixed(2)}\n`;
    });
    out += `\nTOTAL AMOUNT: ${calculateInvoiceTotal(doc)}\n`;
    if (doc.banking) {
      out += `\nPAYMENT DETAILS:\nBank: ${doc.banking.bankName}\nAccount: ${doc.banking.accountNumber}\nRouting: ${doc.banking.routingNumber}\n`;
    }
  } else if (doc.bodyType === 'contract') {
    out += `SCOPE:\n${doc.scope}\n\nCLAUSES:\n`;
    (doc.clauses || []).forEach(c => {
      out += `\n${c.title}\n${c.body}\n`;
    });
  } else if (doc.bodyType === 'offer') {
    out += `OFFER SUMMARY:\nRole: ${doc.offer?.positionTitle}\nDept: ${doc.offer?.department}\nBase Salary: ${doc.offer?.baseSalary}\nStart Date: ${doc.offer?.startDate}\n`;
  }

  out += `\n${divider}\nAUTHORIZED SIGNATURE: ${doc.company?.signatory} (${doc.company?.signatoryTitle})\n`;
  return out;
}

// ===================================================================
// MOBILE TABS TOGGLE (EDITOR vs PREVIEW)
// ===================================================================
const mTabEditor = document.getElementById('mTabEditor');
const mTabPreview = document.getElementById('mTabPreview');
const configCol = document.getElementById('configCol');
const previewCol = document.getElementById('previewCol');

if (mTabEditor && mTabPreview) {
  mTabEditor.addEventListener('click', () => {
    mTabEditor.classList.add('active');
    mTabPreview.classList.remove('active');
    configCol.classList.remove('hidden-on-mobile');
    previewCol.classList.add('hidden-on-mobile');
  });
  mTabPreview.addEventListener('click', () => {
    mTabPreview.classList.add('active');
    mTabEditor.classList.remove('active');
    configCol.classList.add('hidden-on-mobile');
    previewCol.classList.remove('hidden-on-mobile');
  });
}

// ===================================================================
// SIDEBAR & SHELL CONTROLS
// ===================================================================
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarClose = document.getElementById('sidebarClose');

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    sidebarBackdrop.classList.add('open');
  });
}
if (sidebarClose) {
  sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
  });
}
if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
  });
}

// User Menu & Notification Dropdowns
const notifBtn = document.getElementById('notifBtn');
const notifPanel = document.getElementById('notifPanel');
const userBtn = document.getElementById('userBtn');
const userPanel = document.getElementById('userPanel');

function closeAllDropdowns() {
  if (notifPanel) notifPanel.classList.remove('open');
  if (userPanel) userPanel.classList.remove('open');
}

if (notifBtn && notifPanel) {
  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = notifPanel.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) notifPanel.classList.add('open');
  });
}
if (userBtn && userPanel) {
  userBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = userPanel.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) userPanel.classList.add('open');
  });
}
document.addEventListener('click', closeAllDropdowns);

// Toast System
function showToast(message) {
  const stack = document.getElementById('toastStack');
  if (!stack) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><span>${escapeHtml(message)}</span>`;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// Ambient Mouse Parallax
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth * 100).toFixed(1);
  const y = (e.clientY / window.innerHeight * 100).toFixed(1);
  document.documentElement.style.setProperty('--mx', `${x}%`);
  document.documentElement.style.setProperty('--my', `${y}%`);
});

// Top Search filter within templates
const topSearch = document.getElementById('topSearch');
if (topSearch) {
  topSearch.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.template-pill-card').forEach(card => {
      const title = card.querySelector('.tpl-title').textContent.toLowerCase();
      const desc = card.querySelector('.tpl-desc').textContent.toLowerCase();
      const match = !q || title.includes(q) || desc.includes(q);
      card.style.display = match ? 'flex' : 'none';
    });
  });
}

// Global Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  if (e.key === 'Escape') {
    closeHistoryModal();
    closeAllDropdowns();
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('open');
    return;
  }
  if (isTyping) return;
  if (e.key === '/') {
    e.preventDefault();
    if (topSearch) topSearch.focus();
  }
  if (e.key.toLowerCase() === 'p' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    window.print();
  }
});

// ===================================================================
// INITIALIZATION
// ===================================================================
window.addEventListener('DOMContentLoaded', () => {
  renderTemplateGrid('all');
  renderConfigForm();
  renderDocumentPaper();
  updateStats();
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});

