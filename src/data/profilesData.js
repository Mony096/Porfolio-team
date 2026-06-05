export const profilesData = {
  mony: {
    id: 'mony',
    name: 'Reaksmey Kunmony',
    title: 'Full Stack Developer',
    tagline: 'Bridging complex SAP backend architectures with modern frontend experiences. Specializing in UI5, ReactJS, Flutter, and high-performance Node JS automation services.',
    avatar: '/mony1.png',
    availability: 'Available for New Opportunities',
    metrics: [
      { value: '4+', label: 'Years Experience' },
      { value: 'SAP', label: 'Architecture' },
      { value: 'UI5', label: 'Frontend Eng' }
    ],
    terminal: {
      title: 'node index.js',
      snippets: [
        "const dev = new Developer('Kunmony');",
        "dev.skills = ['React', 'Flutter', 'Node.js', 'SAP'];",
        "await dev.build('WMS_App', { offline: true });",
        "await dev.sync('SAP_Database', { cron: '1m' });",
        "console.log('System status: 100% ONLINE');"
      ]
    },
    about: {
      intro: 'Bridging complex backend schemas with modern, client-first interfaces.',
      bio: 'A dedicated Full Stack Developer with a unique foundation in stock operations and retail sales, enabling me to build highly practical, business-driven software. I specialize in bridging complex SAP backend architectures with modern frontend experiences (UI5, ReactJS, and Flutter). My track record ranges from architecting gas station management systems and logistics apps to building high-performance automation services like Node JS Cron Jobs and File Synchronization systems.',
      skillsConsole: {
        react: {
          name: 'React JS / UI5',
          type: 'Frontend Web',
          color: 'hsl(195, 100%, 50%)',
          level: 90,
          description: 'Building premium, high-performance web applications and responsive user interfaces. Expert in custom React hooks, local/global state management, UI5 system components, and rendering optimizations for complex corporate portals.',
          capabilities: [
            'Advanced React custom hooks and lifecycle orchestration.',
            'Responsive layout engineering and state-driven styling.',
            'Enterprise SAP web service integrations & UI5 wrappers.',
            'High-performance client-side data filtering & dashboard telemetry.'
          ]
        },
        flutter: {
          name: 'Flutter (Mobile)',
          type: 'Mobile Development',
          color: 'hsl(200, 100%, 60%)',
          level: 85,
          description: 'Architecting cross-platform native applications for Android and iOS. Specializing in offline-first data caching systems, dynamic document generation (invoice PDFs), touch signature inputs, and back-ground syncing with SAP.',
          capabilities: [
            'Robust State Management (Bloc / Provider) structures.',
            'Local relational/document caching databases (Hive / SQLite).',
            'Device Hardware Interfaces: Cameras, GPS, Signature boards.',
            'Real-time automated data migrations with background synchronization.'
          ]
        },
        node: {
          name: 'Node JS / Backend',
          type: 'Backend & Middleware',
          color: 'hsl(120, 80%, 45%)',
          level: 88,
          description: 'Developing heavy scheduling systems, automated data sync engines, and REST endpoints. Specialized in creating long-running file watchdogs, cron jobs, automated FTP/SFTP pipelines, and database middleware bindings.',
          capabilities: [
            'High-reliability background task schedulers and cron runner loops.',
            'Secure HTTP/REST/Express API design & SAP connector integrations.',
            'Automated file synchronization pipelines and server watchdogs.',
            'Multi-format parser engines (JSON, XML, CSV, Binary file conversions).'
          ]
        }
      },
      secondarySkills: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'SAP Integration', 'REST APIs', 'Git & GitHub', 'File Sync Systems'],
      education: [
        { school: 'National Polytechnic Techo Sen Institute', degree: 'Undergraduate Program', period: '2019 – 2025' },
        { school: 'Hunsen Serey Pheap', degree: 'High School Diploma', period: '2013 – 2019' }
      ],
      languages: ['Khmer — Native', 'English — Proficient']
    },
    experiences: [
      {
        date: '2023 – Present',
        role: 'Developer (Full Stack & Mobile)',
        company: 'BizDimension co., ltd',
        highlights: [
          {
            text: 'Architected the Tela Web App system integrating SAP backend services with a dynamic React JS dashboard interface, powered by high-performance Node JS background microservices.',
            tags: ['React JS', 'Node JS', 'SAP']
          },
          {
            text: 'Designed and engineered the Technician Service Flutter application for onsite field technicians, supporting local SQL storage schemas and responsive signature writing pads.',
            tags: ['Flutter', 'SAP']
          },
          {
            text: 'Developed the Delivery Tracking Flutter application for shipment operations, integrating GPS coordinates mapping, device camera uploads, and digital Proof-of-Delivery flows.',
            tags: ['Flutter', 'SAP']
          },
          {
            text: 'Built the WMS Mobile Application using Flutter, integrating with SAP Inventory Control and implementing robust offline-first synchronization logic for warehouse inventory operations.',
            tags: ['Flutter', 'SAP']
          },
          {
            text: 'Optimized operational workflows by automating document pipelines (JSON, XML, CSV) between local directories and SAP database models.',
            tags: ['Node JS', 'SAP']
          }
        ],
        tech: ['React JS', 'Flutter', 'Node JS', 'SAP'],
      },
      {
        date: '2019 – 2023',
        role: 'Stock Controller & Sales Consultant',
        company: 'Baby Care Shop (Takhmao)',
        highlights: [
          {
            text: 'Managed day-to-day warehouse inventory accuracy, tracking product balances, and coordinating shipment intakes.',
            tags: ['Logistics', 'Operations']
          },
          {
            text: 'Established core business principles of stock flows, sales consulting metrics, and user workflows that drive software design.',
            tags: ['Operations']
          }
        ],
        tech: ['Retail', 'Logistics', 'Operations'],
      }
    ],
    projects: [
      {
        title: 'Tela Web App',
        description: 'An enterprise web application automating sales workflows and gas station metrics. Integrates SAP OData services with a React JS frontend, powered by a Node JS Express backend handling heavy payload distributions.',
        tech: ['React JS', 'Node JS', 'SAP Integration', 'REST APIs'],
        color: 'linear-gradient(135deg, hsl(263, 90%, 65%) 0%, hsl(280, 80%, 60%) 100%)',
        icon: '⚡'
      },
      {
        title: 'Technician Mobile Service',
        description: 'A cross-platform Flutter mobile application designed for onsite equipment maintenance. Implements local SQLite data mapping, touch signature drawing pads, local invoice PDF compilation, and background synchronizations.',
        tech: ['Flutter', 'SQLite', 'SAP Integration', 'PDF Engine'],
        color: 'linear-gradient(135deg, hsl(190, 95%, 50%) 0%, hsl(210, 90%, 60%) 100%)',
        icon: '🔧'
      },
      {
        title: 'WMS Mobile App',
        description: 'A Warehouse Management System (WMS) built using Flutter. Integrates with SAP Inventory Control, featuring a robust offline-first synchronization mode that allows stock movements, barcode scanning, and bin audits in remote zones.',
        tech: ['Flutter', 'SAP Inventory', 'Offline Caching', 'Barcode Sync'],
        color: 'linear-gradient(135deg, hsl(35, 90%, 55%) 0%, hsl(15, 85%, 50%) 100%)',
        icon: '📦'
      },
      {
        title: 'Delivery Tracking System',
        description: 'A logistics tracking solution for field drivers. Built with Flutter, supporting real-time delivery state flows, digital Proof of Delivery (POD) signature captures, camera photo uploads, and REST syncing to main databases.',
        tech: ['Flutter', 'Device Camera', 'Geolocation', 'REST APIs'],
        color: 'linear-gradient(135deg, hsl(325, 90%, 60%) 0%, hsl(280, 80%, 60%) 100%)',
        icon: '🚚'
      },
      {
        title: 'SAP Automated Sync Engine',
        description: 'A backend synchronization service managing enterprise data flows. Written in Node JS, utilizing directory watchdogs, automated SFTP transmissions, and cron scheduling loops to synchronize local file buffers with SAP schemas.',
        tech: ['Node JS', 'Cron Schedulers', 'SFTP Pipelines', 'JSON/XML Parsers'],
        color: 'linear-gradient(135deg, hsl(120, 75%, 35%) 0%, hsl(140, 80%, 45%) 100%)',
        icon: '⚙️'
      }
    ],
    contact: {
      email: 'kunmony.reaksmey@bizdimension.com',
      phone: '(+855) 96 58 09 395',
      location: 'Phnom Penh, Cambodia'
    }
  },
  kimchan: {
    id: 'kimchan',
    name: 'Keo KimChan',
    title: 'Junior Instructor',
    tagline: 'Teaching beginner students HTML, CSS, Microsoft Office (Word, Excel, PowerPoint), and UI design layouts with Adobe XD.',
    avatar: '/kimchan.png',
    availability: 'Available for Training Classes',
    metrics: [
      { value: '2+', label: 'Years Teaching' },
      { value: '150+', label: 'Students Taught' },
      { value: 'UI/UX', label: 'Adobe XD & CSS' }
    ],
    terminal: {
      title: 'classroom_session --start',
      snippets: [
        "const lesson = new LessonPlan('Web & UI Foundations');",
        "lesson.addTopic('HTML5 Semantics', 'CSS Flexbox');",
        "lesson.addTopic('Excel Formulas', 'Adobe XD Grids');",
        "await lesson.conductClass({ studentsCount: 25 });",
        "console.log('Classroom dispatch log: SUCCESS');"
      ]
    },
    about: {
      intro: 'Empowering beginners with core digital literacy, CSS layouts, and UI/UX design.',
      bio: 'A passionate Junior Instructor dedicated to introducing beginners to the foundations of web design (HTML & CSS), office productivity tools (Microsoft Word, Excel, PowerPoint), and UI design concepts using Adobe XD. I focus on creating hands-on classroom templates and modular exercise sets.',
      skillsConsole: {
        react: {
          name: 'HTML5 / CSS3',
          type: 'Web Foundations',
          color: 'hsl(20, 90%, 55%)',
          level: 85,
          description: 'Teaching basic tags, responsive layouts, flexbox grids, and CSS positioning schemas to entry-level design students.',
          capabilities: [
            'Structuring clean HTML5 semantics.',
            'Styling document sheets with Flexbox/Grid.',
            'Introducing media-query viewport adaptation.',
            'Creating responsive layout exercises.'
          ]
        },
        flutter: {
          name: 'Word / Excel / PPT',
          type: 'Office Productivity',
          color: 'hsl(200, 100%, 60%)',
          level: 90,
          description: 'Instructing students on advanced spreadsheets (VLOOKUP, pivot tables), word processing layouts, and visual presentations.',
          capabilities: [
            'Formulating Excel logic & data tables.',
            'Designing structured document formats.',
            'Building professional presentation decks.',
            'Automating office sheet logs.'
          ]
        },
        node: {
          name: 'Adobe XD Design',
          type: 'UI/UX Prototyping',
          color: 'hsl(325, 90%, 60%)',
          level: 80,
          description: 'Guiding students through low-fidelity wireframing, interactive prototypes, screen states, and export options in Adobe XD.',
          capabilities: [
            'Vector drawing and UI layout structuring.',
            'Interactive prototype linking and micro-states.',
            'Asset grid management & styling variables.',
            'Responsive grid guides & export workflows.'
          ]
        }
      },
      secondarySkills: ['HTML5', 'CSS3', 'MS Word', 'MS Excel', 'MS PowerPoint', 'Adobe XD', 'UI Design', 'Teaching & Pedagogy'],
      education: [
        { school: 'National Polytechnic Techo Sen Institute', degree: 'Undergraduate Computer Program', period: '2022 – Present' },
        { school: 'Hunsen Prek Russey', degree: 'High School Diploma', period: '2016 – 2022' }
      ],
      languages: ['Khmer — Native', 'English — Intermediate']
    },
    experiences: [
      {
        date: '2025 – Present',
        role: 'Intern',
        company: 'Paññāsāstra International School',
        highlights: [
          {
            text: 'Assisted instructors in managing IT classroom activities, tracking student progress, and setting up lab coursework materials.',
            tags: ['Classroom Support']
          },
          {
            text: 'Configured local classroom desktop environments, projector displays, and lab software setups for daily student operations.',
            tags: ['IT Lab Ops']
          },
          {
            text: 'Helped prepare foundational templates and exercise materials for entry-level digital literacy classes.',
            tags: ['Office Tools']
          }
        ],
        tech: ['Classroom Ops', 'IT Support', 'Office Tools'],
      },
      {
        date: '2023 – 2024',
        role: 'Teacher',
        company: 'CITO',
        highlights: [
          {
            text: 'Instructed foundational HTML5 and CSS3 styling concepts, introducing beginner students to responsive flex layouts.',
            tags: ['HTML5 & CSS3']
          },
          {
            text: 'Conducted comprehensive training sessions in Microsoft Word formatting, Excel calculation formulas, and PowerPoint slides.',
            tags: ['Office Tools']
          },
          {
            text: 'Guided beginner design classes on wireframing, component grid alignment, and screen layout configurations inside Adobe XD.',
            tags: ['Adobe XD']
          }
        ],
        tech: ['HTML5', 'CSS3', 'Excel', 'Adobe XD'],
      }
    ],
    projects: [
      {
        title: 'Beginner Web Curriculum',
        description: 'A structured 12-week course layout and practical exercises repository teaching HTML5 document layouts and core CSS styling concepts.',
        tech: ['HTML5', 'CSS3', 'Responsive Design'],
        color: 'linear-gradient(135deg, hsl(20, 90%, 55%) 0%, hsl(35, 90%, 50%) 100%)',
        icon: '📚'
      },
      {
        title: 'Interactive Office Templates',
        description: 'A bundle of pre-formatted Excel accounting ledgers, advanced formula exercises, and template designs used in student workshop training.',
        tech: ['Word', 'Excel', 'PowerPoint'],
        color: 'linear-gradient(135deg, hsl(200, 100%, 60%) 0%, hsl(220, 90%, 55%) 100%)',
        icon: '📁'
      },
      {
        title: 'UI/UX Adobe XD Course Book',
        description: 'A comprehensive guidebook demonstrating design wireframe principles, responsive grid alignments, and interactive state prototyping.',
        tech: ['Adobe XD', 'UI Design'],
        color: 'linear-gradient(135deg, hsl(325, 90%, 60%) 0%, hsl(280, 80%, 60%) 100%)',
        icon: '🎨'
      }
    ],
    contact: {
      email: 'kimchan.keo@bizdimension.com',
      phone: '(+855) 87 23 45 678',
      location: 'Phnom Penh, Cambodia'
    }
  },
  nida: {
    id: 'nida',
    name: 'Thong Nida',
    title: 'Medical Office Sales & Consultant',
    tagline: 'Managing pharmaceutical sales and logistics while exploring web design. Created static projects like Skin Care Shop using HTML, CSS, and basic JavaScript.',
    avatar: '/nida.png',
    availability: 'Available for Consultation',
    metrics: [
      { value: '4+', label: 'Years Sales' },
      { value: 'HTML/CSS', label: 'Beginner Dev' },
      { value: 'Pharma', label: 'Office Mgmt' }
    ],
    terminal: {
      title: 'apothecary_ledger --run',
      snippets: [
        "const order = new PrescriptionOrder();",
        "order.addItem('Amoxicillin', { qty: 25 });",
        "// Learning frontend web development in spare hours",
        "const shop = new StaticWebStore('Skin Care Shop');",
        "await shop.render({ tech: ['HTML5', 'CSS3', 'JS'] });",
        "console.log('Medicine dispatch log: SUCCESS');"
      ]
    },
    about: {
      intro: 'Optimizing medical inventories, client billing, and crafting layout layouts.',
      bio: 'A skilled Medical Office Administrator and Sales Consultant with extensive experience in the pharmaceutical retail and wholesale sectors. Alongside keeping precise medicine ledger books and auditing cold-chain requirements, I have a strong interest in technology and have started learning web design foundations. I have successfully built static web storefronts, including a Skin Care Shop prototype, using HTML, CSS, and basic JavaScript for page actions.',
      skillsConsole: {
        react: {
          name: 'Medicine Sales',
          type: 'Client Consulting',
          color: 'hsl(35, 90%, 55%)',
          level: 95,
          description: 'Directing wholesale supplier coordination, patient script consultation, retail sales, and corporate invoicing flows. Expertise in client ledger tracking.',
          capabilities: [
            'Prescription script validation and inventory check.',
            'Wholesale distribution logs and supply pipeline audits.',
            'Patient dosage consultation support and receipting.',
            'Long-term client account ledger management.'
          ]
        },
        flutter: {
          name: 'Inventory Control',
          type: 'Pharma Logistics',
          color: 'hsl(200, 100%, 60%)',
          level: 90,
          description: 'Auditing medical supply batches, monitoring cold-chain requirements, tracking shelf-life margins, and organizing store structures for quick item retrieval.',
          capabilities: [
            'Shelf organization and stock layout design.',
            'Batch expiration tracking and quarantine protocols.',
            'Cold-chain temperature logs and compliance controls.',
            'Incoming supply intake checks and quantity verification.'
          ]
        },
        node: {
          name: 'HTML / CSS / JS',
          type: 'Frontend Beginner',
          color: 'hsl(20, 90%, 55%)',
          level: 60,
          description: 'Learning foundational HTML5 markup, CSS layout flow (Flexbox, Grid), and basic JavaScript click triggers. Designed dynamic layouts for class assignments.',
          capabilities: [
            'Drafting semantic HTML structures.',
            'Styling document sheets with CSS parameters.',
            'Writing introductory JavaScript triggers.',
            'Building static shop storefronts.'
          ]
        }
      },
      secondarySkills: ['Prescription Billing', 'Apothecary Systems', 'HTML5 & CSS3', 'JavaScript Beginner', 'Microsoft Excel', 'Inventory Audit'],
      education: [
        { school: 'National University of Management', degree: 'Associate Degree in Business Admin', period: '2018 – 2021' },
        { school: 'Hunsen Prek Russey', degree: 'High School Diploma', period: '2012 – 2018' }
      ],
      languages: ['Khmer — Native', 'English — Proficient']
    },
    experiences: [
      {
        date: '2025 – Present',
        role: 'Sales Consultant & Office Controller',
        company: 'PharmaCare Depot / Medical Office',
        highlights: [
          {
            text: 'Coordinated wholesale medicine dispatches to community pharmacies, auditing quantity logs and prescription compliance standards.',
            tags: ['Medicine Sales']
          },
          {
            text: 'Maintained batch records for critical temperature-sensitive items, eliminating waste through shelf rotation schedules.',
            tags: ['Inventory Control']
          },
          {
            text: 'Managed customer checkout desks, compiling tax records and dispatch receipts in billing systems.',
            tags: ['Office Tools']
          }
        ],
        tech: ['Prescription Sales', 'Apothecary Portal', 'Excel Ledgers', 'Supply Chain'],
      },
      {
        date: '2023 – 2024',
        role: 'Intern',
        company: 'Paññāsāstra International School',
        highlights: [
          {
            text: 'Assisted in administrative office operations, managing student enrollment databases, and preparing report sheets.',
            tags: ['Administration']
          },
          {
            text: 'Organized and maintained physical and digital school records using Microsoft Excel.',
            tags: ['Excel Ledgers']
          },
          {
            text: 'Supported general operations and coordinated front-desk parent/student inquiries.',
            tags: ['Office Support']
          }
        ],
        tech: ['Excel', 'Office Admin', 'Customer Service'],
      }
    ],
    projects: [
      {
        title: 'Pharma Inventory Audit System',
        description: 'An offline ledger system tracking shelf balances, batch codes, and expiration limits for over 500+ prescription pharmaceutical items.',
        tech: ['Ledger Audit', 'Pharma Logistics'],
        color: 'linear-gradient(135deg, hsl(35, 90%, 55%) 0%, hsl(15, 85%, 50%) 100%)',
        icon: '💊'
      },
      {
        title: 'Client Prescription Tracker',
        description: 'A client order index logging repeating patient prescriptions, dosage balances, and fulfillment timetables for regional pharmacies.',
        tech: ['Prescription Tracking', 'Customer Account'],
        color: 'linear-gradient(135deg, hsl(200, 100%, 60%) 0%, hsl(210, 90%, 60%) 100%)',
        icon: '📋'
      },
      {
        title: 'Skin Care Shop Storefront',
        description: 'A static frontend web layout designed for a training assignment. Showcases multiple cosmetic items with clean responsive grids, styling configurations, and filter interactions.',
        tech: ['HTML5', 'CSS3', 'JavaScript (Beginner)', 'Static Layout'],
        color: 'linear-gradient(135deg, hsl(325, 90%, 65%) 0%, hsl(280, 80%, 60%) 100%)',
        icon: '🧴'
      }
    ],
    contact: {
      email: 'nida.thong@pharmacare.com',
      phone: '(+855) 99 77 66 555',
      location: 'Phnom Penh, Cambodia'
    }
  }
};
