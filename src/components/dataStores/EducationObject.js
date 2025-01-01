const educationData = {
    usiu: {
        name: "United States International University-Africa",
        degree: "BSc in Applied Computer Technology, Concentration in Software Engineering",
        link: "https://www.usiu.ac.ke/history/",
        events: [
            {
                name: "Culture Week",
                link: "https://www.usiu.ac.ke/2500/pictorial-culture-week-2022/",
            },
            {
                name: "Endowment Dinner",
                link: "https://www.usiu.ac.ke/2616/endowment-dinner-success-its-touching-impact-financially-needy-students/",
            },
            {
                name: "Career Fair",
                link: "https://www.usiu.ac.ke/2647/placement-career-services-pacs-hosts-annual-fair/",
            },
        ],
        classes: [
            "Data Structures & Algorithms",
            "Database Systems",
            "Operating Systems",
            "Discrete Mathematics",
            "Mobile Programming",
            "Applied Machine Learning",
            "Business Data Analytics",
            "Software Design & Architecture",
        ],
        achievements: [],
        activities: [],
    },
    libf: {
        name: "London Institute of Banking & Finance",
        degree: "Level 4 Diploma in Investment Bank Sales & Trading (Awarded March 2023 by AmplifyMe)",
        link: "https://www.libf.ac.uk/",
        events: [],
        classes: [
            "Investment Strategies",
            "Equities (Apple, Tesla)",
            "Commodities",
            "Currencies",
            "Fixed Income",
        ],
        achievements: [
            "Flagged as a High Potential Candidate in AmplifyMe's Finance Accelerator Experience",
            "Sponsored by AmplifyMe in partnership with Morgan Stanley",
            "Ranked first in AmplifyMe's simulation",
        ],
        activities: [],
    },
    strathmore: {
        name: "Strathmore University",
        degree: "Diploma in Business Information Technology (Graduated September 2021)",
        link: "https://strathmore.edu/about-strathmore-2/",
        events: [],
        classes: ["Accounting", "Business Finance & Economics"],
        achievements: [],
        activities: [
            "IEEE, Vice President and Member",
            "Google Developer Student Club, Social Media Manager and Member",
            "Information Technology Students Association Club, Member",
        ],
    },
};

const publications = [
    {
        title: "SPARK: Harnessing Human-Centered Workflows with Biomedical Foundation Models for Drug Discovery. ",
        description:
            "Peer-reviewed publication, Authors: Bum Chul Kwon, Simona Rabinovici-Cohen, Beldine Moturi, Ruth Mwaura, Kezia Wahome, Oliver Njeru, Miguel Shinyenyi, Catherine Wanjiru, Sekou Remy, William Ogallo, Itai Guez, Partha Suryanarayanan, Joseph Morrone, Shreyans Sethi, Seung-Gu Kang, Tien Huynh, Kenney Ng, Diwakar Mahajan, Hongyang Li, Matan Ninio , Shervin Ayati, Efrat Hexter, Wendy Cornell.",
        link: "https://www.ijcai.org/proceedings/2024/1015.pdf",
        conference: {
            name: "International Joint Conference on Artificial Intelligence",
            date: "Aug 8, 2024",
        },
    },
    {
        title: "DbAPI: A Backend-as-a-Service Platform for Rapid Deployment of Cloud Services. ",
        description:
            "Peer-reviewed publication, Authors: Paul Okanda, Ankit Chhatbar, Oliver Njeru.",
        link: "http://www.ist-africa.org/Conference2025/outbox/ISTAfrica_Paper_ref_87_13712.pdf",
        conference: {
            name: "International Science and Technology for Africa",
            date: "May 22, 2024",
        },
    },
];

export { educationData, publications };
