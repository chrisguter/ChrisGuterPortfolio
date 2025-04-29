import { info } from "autoprefixer";
import {
  recentWorkIcon1,
  recentWorkIcon2,
  recentWorkIcon3,
  recentWorkIcon4,
  recentWorkImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
  cassoftwareag,
  bioland,
  daimmlertruck,
  kit,
  dbe,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "About",
    url: "#about",
  },
  {
    id: "1",
    title: "Projects",
    url: "#projects",
  },
  {
    id: "2",
    title: "Expertise",
    url: "#expertise",
  },
  {
    id: "3",
    title: "Career",
    url: "#career",
  },
  {
    id: "4",
    title: "contact",
    url: "#contact",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [cassoftwareag, bioland, daimmlertruck, dbe, kit];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const expertise = [
  {
    id: "0",
    title: "Software Development",
    description:
      "Expert in software development, specializing in web applications.",
    price: "0",
    features: [
      "Proficient in Angular, React and Java",
      "Experience with RESTful APIs and microservices architecture",
      "Strong understanding of software development methodologies",
    ],
  },
  {
    id: "1",
    title: "Agile Workflows",
    description:
      "Expert in agile workflows, specializing in SCRUM methodologies.",
    price: "9.99",
    features: [
      "Experience with SCRUM, Kanban and Lean methodologies",
      "Ability to lead and facilitate agile ceremonies",
      "Strong understanding of agile principles and values",
    ],
  },
  {
    id: "2",
    title: "DevOps",
    description:
      "Expert in DevOps practices, specializing in CI/CD pipelines and automation.",
    price: null,
    features: [
      "Experience with Jenkins, Docker and Kubernetes",
      "Ability to automate deployment and testing processes",
      "Version control and configuration management",
    ],
  },
];

export const recentWork = [
  {
    id: "0",
    title: "Mein Bioland",
    text: "Maintaining and expanding the existing web application for Bioland, a leading organic farming association in Germany.",
    backgroundUrl: "./src/assets/recentWork/card-1.svg",
    iconUrl: recentWorkIcon1,
    imageUrl: recentWorkImage2,
    infoUrl: "https://www.smartwe.de/de/referenzen/bioland/",
  },
  {
    id: "1",
    title: "Daimler Truck",
    text: "Introducing the new CPQ solution for Daimler Truck, a powerful tool that streamlines the configuration and pricing process for their trucks.",
    backgroundUrl: "./src/assets/recentWork/card-2.svg",
    iconUrl: recentWorkIcon2,
    imageUrl: recentWorkImage2,
    infoUrl: "https://www.cas.de/loesungen/cpq/cas-merlin-cpq/",
    light: true,
  },
  {
    id: "2",
    title: "Secure Login with 2FA",
    text: "Implemented a secure login system with two-factor authentication (2FA) to enhance security and protect user data.",
    backgroundUrl: "./src/assets/recentWork/card-3.svg",
    iconUrl: recentWorkIcon3,
    imageUrl: recentWorkImage2,
    infoUrl:
      "https://play.google.com/store/apps/details?id=cas.securelogin&hl=de&pli=1",
  },
  {
    id: "3",
    title: "Deutsche Bahn Energie",
    text: "Customized the existing CRM application for Deutsche Bahn Energie, a leading energy provider in Germany.",
    backgroundUrl: "./src/assets/recentWork/card-4.svg",
    iconUrl: recentWorkIcon4,
    imageUrl: recentWorkImage2,
    infoUrl:
      "https://www.cas-crm.com/nc/references.html?tx_vdcasreferences_pi1%5Brequest%5D=reviews&tx_vdcasreferences_pi1%5Bpage%5D=5&tx_vdcasreferences_pi1%5Bpage_id%5D=21686&tx_vdcasreferences_pi1%5Bsc_id%5D=1&tx_vdcasreferences_pi1%5Bid_ref%5D=0xC83AD5091B3043CEABF6F5AE2081CF1A",
    light: true,
  },
  {
    id: "4",
    title: "SmartWe Appstore",
    text: "Main developer of the SmartWe Appstore, a cloud platform that allows users to easily find and install applications tailored for their CRM.",
    backgroundUrl: "./src/assets/recentWork/card-5.svg",
    iconUrl: recentWorkIcon1,
    imageUrl: recentWorkImage2,
    infoUrl: "https://appstore.smartwe.world/home",
  },
  {
    id: "5",
    title: "E-Invoice for SmartWe",
    text: "Developing an E-Invoice application for SmartWe, enabling users to easily create, store and send electronic invoices.",
    backgroundUrl: "./src/assets/recentWork/card-6.svg",
    iconUrl: recentWorkIcon2,
    imageUrl: recentWorkImage2,
    infoUrl: "https://www.smartwe.de/en/",
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
