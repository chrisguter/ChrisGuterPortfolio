import { info } from "autoprefixer";
import {
  recentWorkIcon1,
  recentWorkIcon2,
  recentWorkIcon3,
  recentWorkIcon4,
  recentWorkImage1,
  recentWorkImage2,
  recentWorkImage3,
  recentWorkImage4,
  recentWorkImage5,
  recentWorkImage6,
  chromecast,
  disc02,
  discord,
  linkedInDark,
  xingDark,
  gmailDark,
  figma,
  file02,
  framer,
  homeSmile,
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
  career1,
  career2,
  career3,
  career4,
  searchMd,
  slack,
  sliders04,
  cassoftwareag,
  bioland,
  daimmlertruck,
  kit,
  dbe,
  datev,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Projects",
    url: "#projects",
  },
  {
    id: "1",
    title: "Expertise",
    url: "#expertise",
  },
  {
    id: "2",
    title: "Career",
    url: "#career",
  },
  {
    id: "3",
    title: "About",
    url: "#about",
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

export const companyLogos = [
  {
    id: "0",
    img: cassoftwareag,
    width: 64,
    height: 64,
  },
  {
    id: "1",
    img: bioland,
    width: 128,
    height: 128,
  },
  {
    id: "2",
    img: daimmlertruck,
    width: 164,
    height: 164,
  },
  {
    id: "3",
    img: dbe,
    width: 64,
    height: 64,
  },
  {
    id: "4",
    img: kit,
    width: 96,
    height: 96,
  },
  {
    id: "5",
    img: datev,
    width: 64,
    height: 64,
  },
];

export const brainwaveServices = [
  "Good girl",
  "Listens to commands",
  "Loves belly rubs",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const career = [
  {
    id: "0",
    title: "Leadership training",
    text: "Participating in a leadership training program to enhance my skills in team management and project coordination.",
    date: "May 2025",
    status: "progress",
    imageUrl: career1,
    colorful: true,
  },
  {
    id: "1",
    title: "Scrum Master",
    text: "Became the Scrum Master a newly created team, leading them in agile practices and ensuring smooth project delivery.",
    date: "May 2021",
    status: "progress",
    imageUrl: career2,
  },
  {
    id: "2",
    title: "Software Engineer",
    text: "Started my professional career as a software engineer, focusing on web development and application design.",
    date: "Oktober 2018",
    status: "done",
    imageUrl: career3,
  },
  {
    id: "3",
    title: "Bachelor of Science",
    text: "Completed my Bachelor of Science in Computer Science, at the DHBW Karlsruhe.",
    date: "September 2018",
    status: "done",
    imageUrl: career4,
  },
];

export const collabText =
  "Expirenced in using and integrating Atlassian tools like Jira, Confluence and Trello";

export const collabContent = [
  {
    id: "0",
    title: "Atlassian toolchain",
    text: collabText,
  },
  {
    id: "1",
    title: "Software Development",
    text: "Well versed in common software development tools like Git, Docker and Jenkins",
  },
  {
    id: "2",
    title: "Design and communication",
    text: "Familiar with design and communication tools like Figma, Teams and Slack",
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
      "Proficient software developer, particularly skilled in building web applications.",
    price: "0",
    features: [
      "Competent in Java and modern front-end frameworks including Angular and React.",
      "Familiar with creating distributed systems using microservices and RESTful APIs.",
      "Deep understanding of modern software engineering practices and methodologies.",
    ],
  },
  {
    id: "1",
    title: "Agile Workflows",
    description:
      "Expert in agile workflows, specializing in SCRUM methodologies.",
    price: "9.99",
    features: [
      "Hands-on experience using Scrum, Kanban, and Lean to drive project delivery.",
      "Capable to lead agile meetings and foster team collaboration.",
      "Committed to agile principles, with a clear understanding of their role in iterative development.",
    ],
  },
  {
    id: "2",
    title: "DevOps",
    description:
      "Adept at applying DevOps principles to streamline development through automated CI/CD pipelines.",
    price: null,
    features: [
      "Experience with Jenkins, Docker and Kubernetes",
      "Ability to automate critical aspects of software delivery, including deployment and testing",
      "Comfortable with Git workflows and configuration management principles in collaborative dev settings.",
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
    imageUrl: recentWorkImage1,
    infoUrl: "https://www.smartwe.de/de/referenzen/bioland/",
  },
  {
    id: "1",
    title: "Daimler Truck",
    text: "Introducing the new CPQ solution for Daimler Truck, a powerful tool that streamlines the configuration and pricing process for their trucks.",
    backgroundUrl: "./src/assets/recentWork/card-2.svg",
    iconUrl: recentWorkIcon2,
    imageUrl: recentWorkImage2,
    infoUrl: "https://www.cas-software.com/solutions/cpq/cas-merlin-cpq/",
    light: true,
  },
  {
    id: "2",
    title: "Secure Login with 2FA",
    text: "Implemented a secure login system with two-factor authentication (2FA) to enhance security and protect user data.",
    backgroundUrl: "./src/assets/recentWork/card-3.svg",
    iconUrl: recentWorkIcon3,
    imageUrl: recentWorkImage3,
    infoUrl:
      "https://play.google.com/store/apps/details?id=cas.securelogin&hl=en&pli=1",
  },
  {
    id: "3",
    title: "Deutsche Bahn Energie",
    text: "Customized the existing CRM application for Deutsche Bahn Energie, a leading energy provider in Germany.",
    backgroundUrl: "./src/assets/recentWork/card-4.svg",
    iconUrl: recentWorkIcon4,
    imageUrl: recentWorkImage4,
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
    imageUrl: recentWorkImage5,
    infoUrl: "https://appstore.smartwe.world/home",
  },
  {
    id: "5",
    title: "E-Invoice for SmartWe",
    text: "Developing an E-Invoice application for SmartWe, enabling users to easily create, store and send electronic invoices.",
    backgroundUrl: "./src/assets/recentWork/card-6.svg",
    iconUrl: recentWorkIcon2,
    imageUrl: recentWorkImage6,
    infoUrl: "https://www.smartwe.de/en/",
  },
];

export const socials = [
  {
    id: "0",
    title: "LinkedIn",
    iconUrl: linkedInDark,
    url: "https://www.linkedin.com/in/christian-gutermann-420ab6363/",
  },
  {
    id: "1",
    title: "Xing",
    iconUrl: xingDark,
    url: "https://www.xing.com/profile/Christian_Gutermann",
  },
  {
    id: "2",
    title: "Mail",
    iconUrl: gmailDark,
    url: "mailto:christian.gutermann95@gmail.com",
  },
];
