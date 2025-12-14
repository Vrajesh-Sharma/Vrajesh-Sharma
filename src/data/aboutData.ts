export interface Achievement {
  id: string;
  title: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  images: string[]; // Array of image paths
  stats: { label: string; value: string }[];
  skills: string[];
}

export interface AboutData {
  name: string;
  title: string;
  bio: string;
  story: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
    description: string;
  }[];
  interests: string[];
  quote: {
    text: string;
    author: string;
  };
  achievements: Achievement[]; // Added this
}

const aboutData: AboutData = {
  name: "Vrajesh Sharma",
  title: "Machine Learning Lead and Full Stack Developer",
  bio: "I am a Machine Learning Enthusiast and Full Stack Developer pursuing B.Tech in Computer Science Engineering at Adani University",
  story: [
    "I’m a Machine Learning Enthusiast and Full Stack Developer pursuing a B.Tech in Computer Science Engineering at Adani University. As the Machine Learning Lead at ASPDC, I mentor peers and explore the fascinating world of AI, backed by certifications from Google, ISRO, and Skill India in Python, Machine Learning, and Deep Learning.",
    "Beyond academics, I actively engage in hackathons, research, and workshops, sharing knowledge on advanced topics like neural networks. My passion lies in leveraging technology to solve complex problems and drive innovation.",
    ""
  ],
  education: [
    {
      degree: "B.Tech Computer Science Engineering",
      institution: "Adani University",
      year: "2023-2027",
      description: "Focused on software engineering, web development, and artificial intelligence."
    },
    {
      degree: "Higher Secondary",
      institution: "Muktajivan English School",
      year: "2023",
      description: "83%"
    },
    {
      degree: "Secondary",
      institution: "Nelson's English School",
      year: "2021",
      description: "78%"
    }
  ],
  interests: [
    "Open-source contribution",
    "Tech blogging",
    "AI and Machine Learning",
    "Football",
    "Bike Riding",
    "Guitarist"
  ],
  achievements: [
  {
    id: "research-paper",
    title: "Research Paper Author",
    role: "First Author",
    organization: "Academic Research",
    period: "16th August 2025",
    description:
      "Authored and published a research paper titled 'Empowering Text Classification with Agentic AI: A Systematic Review', focusing on applying Agentic AI workflows for text classification techniques.",
    images: [
      "/images/paper1.png",
      "/images/paper3.png",
      "/images/paper4.png",
    ],
    stats: [
      { label: "Domain", value: "Agentic AI" },
      { label: "Field", value: "Classification" }
    ],
    skills: ["Agentic AI", "NLP", "Research Writing", "Literature Review"]
  },
  {
    id: "ml-head",
    title: "Machine Learning Head",
    role: "Lead & Mentor",
    organization: "ASPDC (Adani University)",
    period: "August 2025 - Present",
    description:
      "Leading 'ML in One Month', a structured hands-on program covering core ML concepts, practical implementations, and real-world use cases for students across departments.",
    images: [
      "/images/ML_stage.JPG",
      "/images/ML_Reward.JPG",
      "/images/ML_StageCertificate.JPG",
      "/images/ML1.JPG",
    ],
    stats: [
      { label: "Students Trained", value: "100+" },
      { label: "Duration", value: "4 Sessions" }
    ],
    skills: ["Leadership", "Curriculum Design", "Teaching", "Mentorship", "Machine Learning"]
  },
  {
    id: "ml101",
    title: "ML Lead",
    role: "Instructor",
    organization: "ASPDC (Adani University)",
    period: "August 2024 - August 2025",
    description:
      "Conducted ML101 sessions with a strong focus on Linear Regression, covering data exploration, mathematical intuition, model training, and real-world interpretation.",
    images: [
      "/images/ML101.jpeg",
    ],
    stats: [
      { label: "Core Topic", value: "Linear Regression" },
      { label: "Sessions", value: "Hands-on" }
    ],
    skills: ["Linear Regression", "Teaching", "Data Analysis", "Model Evaluation"]
  },
  // {
  //   id: "hackathon",
  //   title: "Hackathon Experience",
  //   role: "AI/ML Developer",
  //   organization: "Multiple National Hackathons",
  //   period: "2024",
  //   description:
  //     "Participated in national-level hackathons including DotSlash 8.0 (ACM SVNIT). Built AI-powered solutions under tight deadlines, collaborating in cross-functional teams.",
  //   images: [
  //     "public/images/hackathon.png",
  //   ],
  //   stats: [
  //     { label: "Hackathons", value: "3+" },
  //     { label: "Final Rounds", value: "Yes" }
  //   ],
  //   skills: ["Problem Solving", "Rapid Prototyping", "Team Collaboration", "Applied AI"]
  // }
],
  quote: {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  }
};

export default aboutData;