import { Experience, Project, Skill } from "./types";

export const EXPERIENCES: Experience[] = [
  {
    company: "Veyseloglu Group",
    role: "Senior Mobile Developer",
    period: "09/2024 - 10/2025",
    description: [
      "Developed a cross-platform mobile app using React Native with Expo, deploying to both iOS and Android.",
      "Built responsive and interactive components using Expo's libraries to enhance the user experience.",
      "Integrated Firebase for real-time data synchronization, authentication, and push notifications.",
      "Leveraged Redux for complex state management and optimized app components for better performance.",
      "Collaborated in agile sprints, handling the full development cycle from concept to deployment.",
    ],
    isCurrent: true,
  },
  {
    company: "AIR GROUP",
    role: "Senior Mobile Developer / Team Leader",
    period: "09/2024 - 10/2025",
    description: [
      "Developed a cross-platform mobile app using React Native with Expo, deploying to both iOS and Android.",
      "Built responsive and interactive components using Expo's libraries to enhance the user experience.",
      "Integrated Firebase for real-time data synchronization, authentication, and push notifications.",
      "Leveraged Redux for complex state management and optimized app components for better performance.",
      "Collaborated in agile sprints, handling the full development cycle from concept to deployment.",
    ],
  },
  {
    company: "TUNEL Ads",
    role: "Software Developer / Team Leader",
    period: "01/2023 - 09/2024",
    description: [
      "Developed and deployed a cross-platform mobile app using React Native for both iOS and Android.",
      "Integrated Firebase for real-time data syncing and push notifications.",
      "Built and maintained responsive web applications using ReactJS, enhancing user experience.",
      "Integrated APIs to display real-time data and manage complex state with Redux.",
      "Optimized components for faster load times and better performance.",
    ],
  },
  {
    company: "WARDRAPP",
    role: "Software Developer",
    period: "09/2022 - 01/2024",
    description: [
      "Developed and deployed a cross-platform mobile app using React Native for both iOS and Android.",
      "Integrated Firebase for real-time data syncing and push notifications.",
      "Designed and implemented RESTful APIs using NestJS to support the mobile application.",
      "Applied authentication strategies (JWT, OAuth) for secure user access.",
      "Worked with MongoDB for efficient data storage, retrieval, and management.",
    ],
  },
  {
    company: "BAZARI.AZ",
    role: "Front-end and Mobile Developer",
    period: "01/2023 - 01/2024",
    description: [
      "E-commerce web and mobile application development using ReactJs and React Native.",
      "Implemented responsive design and mobile-first development approach.",
      "Ensured cross-browser compatibility and web accessibility standards.",
    ],
  },
  {
    company: "EPAM UPSKILL",
    role: "Mentor Front-end Developer",
    period: "06/2022 - 01/2023",
    description: [
      "Mentored 25 students in React.js, TypeScript, JavaScript, HTML5, and CSS.",
      "Provided hands-on instruction in Git version control and best practices.",
      "Taught advanced topics: Redux Toolkit, react-hook-form, Ant Design, MUI, Chakra UI.",
    ],
  },
  {
    company: "JUGAAD DIGITAL SOLUTIONS",
    role: "Front-end Developer",
    period: "10/2020 - 06/2022",
    description: [
      "Developed and maintained user-facing webpages using Javascript, ReactJs, HTML, CSS, SCSS.",
      "Tested cross-browser compatibility and optimized web applications.",
      "Worked with Redux, RESTful APIs, ChakraUI, and MUI frameworks.",
    ],
  },
  {
    company: "MINISTRY OF SCIENCE AND EDUCATION",
    role: "Team Lead Manager",
    period: "09/2018 - 10/2020",
    description: [
      "Planned, organized and coordinated team activities to accomplish organizational goals.",
      "Managed multiple projects and ensured timely delivery.",
    ],
  },
];

export const SKILLS: Skill[] = [
  { name: "React Native", icon: "fa-mobile-screen-button", level: 98 },
  { name: "Expo", icon: "fa-rocket", level: 98 },
  { name: "TypeScript", icon: "fa-code", level: 95 },
  { name: "JavaScript", icon: "fa-square-js", level: 96 },
  { name: "ReactJS", icon: "fa-react", level: 94 },
  { name: "NextJS", icon: "fa-code", level: 92 },
  { name: "NodeJS / NestJS", icon: "fa-server", level: 88 },
  { name: "ExpressJS", icon: "fa-server", level: 90 },
  { name: "Firebase", icon: "fa-fire", level: 92 },
  { name: "Redux", icon: "fa-layer-group", level: 95 },
  { name: "MongoDB", icon: "fa-leaf", level: 90 },
  { name: "PostgreSQL", icon: "fa-database", level: 88 },
  { name: "Tailwind CSS", icon: "fa-palette", level: 94 },
  { name: "GraphQL", icon: "fa-diagram-project", level: 85 },
  { name: "Angular", icon: "fa-code", level: 85 },
  { name: "Vue.js", icon: "fa-code", level: 82 },
  { name: "HTML5", icon: "fa-code", level: 96 },
  { name: "CSS/SASS", icon: "fa-palette", level: 94 },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Enterprise Logistics App",
    description:
      "A comprehensive fleet and order management system for AIR Group. Features real-time GPS tracking and offline data synchronization.",
    tags: ["React Native", "Expo", "Maps"],
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    iosUrl: "https://apps.apple.com/app/air-group",
    androidUrl: "https://play.google.com/store/apps/details?id=com.airgroup",
    webUrl:
      "https://www.upwork.com/freelancers/~014c4ca7017e65bbf4?s=996364627857502209&p=1965715737616076800",
  },
  {
    id: "2",
    title: "Bazari.az Marketplace",
    description:
      "A large-scale Azeri marketplace enabling thousands of vendors. Integrated complex filtering and secure payments.",
    tags: ["React Native", "Redux", "Stripe"],
    imageUrl:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    androidUrl: "https://play.google.com/store/apps/details?id=az.bazari",
    webUrl: "https://bazari.az",
  },
  {
    id: "3",
    title: "Veyseloglu Distribution SFA",
    description:
      "Sales Force Automation tool used by hundreds of sales agents to manage orders across Azerbaijan.",
    tags: ["React Native", "Enterprise API", "High Perf"],
    imageUrl:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800",
    iosUrl: "#",
  },
  {
    id: "4",
    title: "Wardrapp - AI Closet",
    description:
      "AI-powered fashion assistant for closet management and outfit suggestions.",
    tags: ["React Native", "Animated API", "AI"],
    imageUrl:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
    iosUrl: "https://apps.apple.com/app/wardrapp",
    webUrl: "https://wardrapp.com",
  },
];
