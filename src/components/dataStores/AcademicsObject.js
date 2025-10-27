export const academics = [
    {
        courseCode: 'DBIT1201',
        title: 'OBJECT ORIENTED PROGRAMMING',
        img: null,
        summary:
            'Individual project: built a desktop Parking Lot Management System with end-to-end ticketing, check-in/out, receipt generation, and MySQL-backed persistence. I owned system design, database integration, and core UI flows.',
        skills: 'Java (Swing/NetBeans), JDBC, MySQL, MVC basics',
        achievements: [
            {
                name: 'End-to-End Workflow',
                description:
                    'Login → Identification → Check-in → Level/Space allocation → Ticket/Receipt → Checkout with fee computation.',
                links: [
                    {
                        label: 'Repository README',
                        href: 'https://github.com/olivernjeru/parkinglotmanagementsystem/blob/main/README.md',
                    },
                ],
            },
            {
                name: 'Database Connectivity (JDBC + MySQL)',
                description:
                    'Established persistent storage, integrated MySQL via JDBC, and handled CRUD operations for tickets and sessions.',
                links: [
                    {
                        label: 'Project root',
                        href: 'https://github.com/olivernjeru/parkinglotmanagementsystem',
                    },
                ],
            },
        ],
    },
    {
        courseCode: 'APT 3025',
        title: 'Applied Machine Learning',
        img: null,
        summary:
            'Explored ML workflows on real datasets: preprocessing, model training, and evaluation; experimented with ensembles.',
        skills: 'Python, scikit-learn, pandas, NumPy, Ensembles, Preprocessing',
        achievements: [
            {
                name: 'Diabetes Classification',
                description:
                    'Imputed missing values via NaN+median and standardized features before model training.',
                links: [
                    {
                        label: 'Assignment',
                        href: 'https://github.com/olivernjeru/apt/tree/main/major/apt3025/Diabetes',
                    },
                ],
            },
            {
                name: 'Ensemble Learning Experiments',
                description:
                    'Compared multiple learners within ensemble frameworks; analyzed performance vs. single models.',
                links: [
                    {
                        label: 'Ensemble Learning',
                        href:
                            'https://github.com/olivernjeru/apt/tree/main/major/apt3025/Ensemble%20Learning',
                    },
                    {
                        label: 'Notes',
                        href:
                            'https://github.com/olivernjeru/apt/tree/main/major/apt3025/Learning-Ensemble',
                    },
                ],
            },
        ],
    },
    {
        courseCode: 'APT 3060',
        title: 'Mobile Programming',
        summary:
            'Built Android apps covering activities, fragments, persistence (SQLite/SharedPreferences), sensors, threading, location, and UI patterns; plus VS/UWP samples. All projects were completed individually.',
        skills: 'Android (Activities, Fragments, Intents, Sensors, SQLite), UWP/Xamarin basics',
        achievements: [
            {
                name: 'Android Portfolio of Apps',
                description:
                    'Hands-on implementations: forms, menus, data persistence, sensor data, threading, WebView, and location.',
                links: [
                    {
                        label: 'Android Studio Folder',
                        href: 'https://github.com/olivernjeru/apt/tree/main/major/apt3060/android-studio',
                    },
                    {
                        label: 'VS Samples',
                        href: 'https://github.com/olivernjeru/apt/tree/main/major/apt3060/vs',
                    },
                ],
            },
            {
                name: 'Sensors and Persistence',
                description: 'Collected sensor data and persisted app state/data using SQLite and SharedPreferences.',
                links: [
                    { label: 'SensorDataApp', href: 'https://github.com/olivernjeru/apt/tree/main/major/apt3060/android-studio/SensorDataApp' },
                    { label: 'Databases', href: 'https://github.com/olivernjeru/apt/tree/main/major/apt3060/android-studio/Databases' },
                    { label: 'Databases & SQL', href: 'https://github.com/olivernjeru/apt/tree/main/major/apt3060/android-studio/DatabasesandSQL' },
                ],
            },
        ],
    },
    {
        courseCode: 'APT 2040',
        title: 'Operating Systems',
        img: null,
        summary:
            "Covered OS concepts and hands-on practice: coded in C and Bash, studied CPU scheduling (Round Robin) and deadlock avoidance (Banker's algorithm), plus practical scripting labs and a led team exercise.",
        skills: "C, Bash, Unix CLI, Scheduling (Round Robin), Deadlocks (Banker's)",
        achievements: [
            {
                name: 'Scheduling & Deadlocks (C & Bash)',
                description:
                    "Implemented or evaluated Round Robin scheduling and studied/implemented Banker's algorithm concepts for deadlock avoidance.",
                links: [
                    { label: 'Course folder', href: 'https://github.com/olivernjeru/apt/tree/main/major/apt2040' },
                ],
            },
            {
                name: 'Group Exercise (4-person team, Lead)',
                description:
                    'Led a 4-person team: planned tasks, coordinated implementation, reviewed scripts, and presented outcomes.',
                links: [
                    { label: 'week-8-group-work', href: 'https://github.com/olivernjeru/apt/tree/main/major/apt2040/shell-scripting/week-8-group-work' },
                ],
            },
        ],
    },
    {
        courseCode: 'APT 2060',
        title: 'Data Structures & Algorithms',
        img: null,
        summary:
            'Implemented core data structures and classic search algorithms with attention to time/space complexity and edge cases.',
        skills: 'C++, Arrays, Searching, Algorithm Analysis (O-notation)',
        achievements: [
            {
                name: 'Search Algorithms Suite',
                description:
                    'Built Linear, Binary, Jump, Interpolation, and Exponential search variants; documented trade-offs and optimal conditions.',
                links: [
                    { label: 'Search Notes', href: 'https://github.com/olivernjeru/apt/blob/main/major/apt3010/search_algorithms/README.md' },
                    { label: 'Binary Search Example', href: 'https://github.com/olivernjeru/apt/blob/main/major/apt2060/binary%20search.docx' },
                ],
            },
            {
                name: 'Array Operations',
                description: 'Insertion and deletion at given positions; boundary checks and shifts.',
                links: [
                    { label: 'Inserting.cpp', href: 'https://github.com/olivernjeru/apt/blob/main/major/apt2060/Inserting.cpp' },
                    { label: 'Deleting (doc)', href: 'https://github.com/olivernjeru/apt/blob/main/major/apt2060/deleting%20value%20at%20a%20given%20index%20position.docx' },
                ],
            },
        ],
    },
];

export default academics;
