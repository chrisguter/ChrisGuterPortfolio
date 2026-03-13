import { info } from "autoprefixer";
import i18n from "i18next";
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
  discord,
  linkedInDark,
  githubDark,
  xingDark,
  gmailDark,
  figma,
  docker,
  file02,
  jenkins,
  homeSmile,
  notification2,
  notification3,
  notification4,
  teams,
  plusSquare,
  atlassian,
  git,
  hearthstoneLogo,
  fortniteLogo,
  codLogo,
  apexLogo,
  lolLogo,
  career1,
  career2,
  career3,
  career4,
  career5,
  searchMd,
  slack,
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
    title: "header.navigation.projects",
    url: "#projects",
  },
  {
    id: "1",
    title: "header.navigation.expertise",
    url: "#expertise",
  },
  {
    id: "2",
    title: "header.navigation.career",
    url: "#career",
  },
  {
    id: "3",
    title: "header.navigation.about",
    url: "#about",
  },
  {
    id: "4",
    title: "header.navigation.contact",
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

export const maliSkills = [
  "about.maliSkills.skill1",
  "about.maliSkills.skill2",
  "about.maliSkills.skill3",
];

export const gamingIcons = [
  hearthstoneLogo,
  fortniteLogo,
  apexLogo,
  codLogo,
  lolLogo,
];

export const career = [
  {
    id: "0",
    title: "career.ceo.title",
    subtitle: "career.ceo.subtitle",
    text: "career.ceo.text",
    startDate: "career.ceo.startDate",
    endDate: "career.ceo.endDate",
    status: "progress",
    imageUrl: career5,
    colorful: true,
  },
  {
    id: "1",
    title: "career.scrumMaster.title",
    text: "career.scrumMaster.text",
    startDate: "career.scrumMaster.startDate",
    endDate: "career.scrumMaster.endDate",
    status: "progress",
    imageUrl: career2,
  },
  {
    id: "2",
    title: "career.leadership.title",
    text: "career.leadership.text",
    startDate: "career.leadership.startDate",
    endDate: "career.leadership.endDate",
    status: "done",
    imageUrl: career1,
  },
  {
    id: "3",
    title: "career.softwareEngineer.title",
    text: "career.softwareEngineer.text",
    startDate: "career.softwareEngineer.startDate",
    endDate: "career.softwareEngineer.endDate",
    status: "done",
    imageUrl: career3,
  },
  {
    id: "4",
    title: "career.bachelor.title",
    text: "career.bachelor.text",
    startDate: "career.bachelor.startDate",
    endDate: "career.bachelor.endDate",
    status: "done",
    imageUrl: career4,
  },
];

export const knowledgeContent = [
  {
    id: "0",
    title: "knowledge.atlassian.title",
    text: "knowledge.atlassian.text",
  },
  {
    id: "1",
    title: "knowledge.softwareDevelopment.title",
    text: "knowledge.softwareDevelopment.text",
  },
  {
    id: "2",
    title: "knowledge.design.title",
    text: "knowledge.design.text",
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
    title: "Docker",
    icon: docker,
    width: 42,
    height: 38,
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
    title: "Teams",
    icon: teams,
    width: 36,
    height: 34,
  },
  {
    id: "5",
    title: "Atlassian",
    icon: atlassian,
    width: 34,
    height: 38,
  },
  {
    id: "6",
    title: "Jenkins",
    icon: jenkins,
    width: 36,
    height: 49,
  },
  {
    id: "7",
    title: "Git",
    icon: git,
    width: 38,
    height: 38,
  },
];

export const expertiseList = [
  {
    id: "0",
    title: "expertise.softwareDevelopment.title",
    description: "expertise.softwareDevelopment.description",
    expertises: [
      "expertise.softwareDevelopment.expertise1",
      "expertise.softwareDevelopment.expertise2",
      "expertise.softwareDevelopment.expertise3",
    ],
  },
  {
    id: "1",
    title: "expertise.agileMethodologies.title",
    description: "expertise.agileMethodologies.description",
    expertises: [
      "expertise.agileMethodologies.expertise1",
      "expertise.agileMethodologies.expertise2",
      "expertise.agileMethodologies.expertise3",
    ],
  },
  {
    id: "2",
    title: "expertise.devOps.title",
    description: "expertise.devOps.description",
    expertises: [
      "expertise.devOps.expertise1",
      "expertise.devOps.expertise2",
      "expertise.devOps.expertise3",
    ],
  },
];

export const recentWork = [
  {
    id: "0",
    title: "recentWork.bioland.title",
    text: "recentWork.bioland.text",
    backgroundUrl: "/recentWork/card-1.svg",
    iconUrl: recentWorkIcon1,
    imageUrl: recentWorkImage1,
    infoUrl: "https://www.smartwe.de/de/referenzen/bioland/",
  },
  {
    id: "1",
    title: "recentWork.daimler.title",
    text: "recentWork.daimler.text",
    backgroundUrl: "/recentWork/card-2.svg",
    iconUrl: recentWorkIcon2,
    imageUrl: recentWorkImage2,
    infoUrl: "https://www.cas-software.com/solutions/cpq/cas-merlin-cpq/",
    light: true,
  },
  {
    id: "2",
    title: "recentWork.secureLogin.title",
    text: "recentWork.secureLogin.text",
    backgroundUrl: "/recentWork/card-3.svg",
    iconUrl: recentWorkIcon3,
    imageUrl: recentWorkImage3,
    infoUrl:
      "https://play.google.com/store/apps/details?id=cas.securelogin&hl=en&pli=1",
  },
  {
    id: "3",
    title: "recentWork.dropigon.title",
    text: "recentWork.dropigon.text",
    backgroundUrl: "/recentWork/card-4.svg",
    iconUrl: recentWorkIcon4,
    imageUrl: recentWorkImage4,
    infoUrl: "https://apps.apple.com/de/app/dropigon/id6755251910",
    light: true,
  },
  {
    id: "4",
    title: "recentWork.smartWeAppstore.title",
    text: "recentWork.smartWeAppstore.text",
    backgroundUrl: "/recentWork/card-5.svg",
    iconUrl: recentWorkIcon1,
    imageUrl: recentWorkImage5,
    infoUrl: "https://appstore.smartwe.world/home",
  },
  {
    id: "5",
    title: "recentWork.eInvoice.title",
    text: "recentWork.eInvoice.text",
    backgroundUrl: "/recentWork/card-6.svg",
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

export const footerLinks = [
  {
    id: "0",
    title: "footer.checkCode",
    iconUrl: githubDark,
    url: "https://github.com/chrisguter/ChrisGuterPortfolio",
  },
];
