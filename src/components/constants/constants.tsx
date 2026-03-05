export const sharedProgress = {
    value: 0,
    target: 0,
  };


export const mySkills = [
  {
    title: 'FRONTEND',
    skills: ['React', 'React Native', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', ]
  },
  {
    title: 'BACKEND',
    skills: ['Node.js', 'Express', 'Django', 'Flask']
  },
  {
    title: 'DATABASES',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL']
  },
  {
    title: 'TOOLS & PLATFORMS',
    skills: ['Figma', 'Canvas', 'Adobe Illustrator', 'Git', 'Docker']
  }
]


export const projectsList = [
  {
    title: "SmartSaha",
    desc: "An intelligent mobile application for agricultural management. It helps farmers track activities, improve productivity, centralize operational data, and includes an integrated marketplace for trading and auctions between farmers and buyers.",
    stacks: ["React Native", "TypeScript", "NativeWind", "Django", "Supabase"],
    images: [
      "/img/projectsImg/smartSaha/1.jpg",
      "/img/projectsImg/smartSaha/2.jpg",
      "/img/projectsImg/smartSaha/3.jpg",
      "/img/projectsImg/smartSaha/4.jpg",
      "/img/projectsImg/smartSaha/5.jpg",
    ],
    category: "mobile",
  },
  {
    title: "E-Kaly",
    desc: "A restaurant order management mobile application enabling real-time synchronization between customers, kitchen staff, and cashiers. Designed to optimize order flow and improve internal communication efficiency.",
    stacks: ["React Native", "MongoDB", "Node.js"],
    images: [
      "/img/projectsImg/ekaly/1.png",
      "/img/projectsImg/ekaly/2.png",
      "/img/projectsImg/ekaly/3.png",
    ],
    category: "mobile",
  },
  {
    title: "Garazy",
    desc: "A web-based garage management system that handles appointment scheduling, repair tracking, and enhances communication between mechanics and clients through an intuitive interface.",
    stacks: ["Angular", "Express.js", "MongoDB"],
    images: [
      "/img/projectsImg/garazy/1.jpg",
      "/img/projectsImg/garazy/2.jpg",
      "/img/projectsImg/garazy/3.jpg",
    ],
    category: "web",
  },
  {
    title: "Gestionnaire de Matériels",
    desc: "An internal equipment management application developed during my internship at the Ministry of Fisheries and Blue Economy. It streamlines equipment tracking and institutional resource organization.",
    stacks: ["React", "Node.js", "MongoDB"],
    images: [
      "/img/projectsImg/logistique/1.png",
      "/img/projectsImg/logistique/2.png",
    ],
    category: "web",
  },
];

export const navLinks = [
  { label: "ABOUT ME", href: "#hero" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT ME", href: "#contact" },
];