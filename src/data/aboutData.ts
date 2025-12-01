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
      id: "ml-head",
      title: "Machine Learning Head",
      role: "Lead & Mentor",
      organization: "ASPDC (Adani University)",
      period: "2023 - Present",
      description: "Leading the charge in AI research and student development. Designed curriculum and spearheaded major campus hackathons.",
      // PLACEHOLDER IMAGES - Replace these with your actual file paths
      images: [
        "public/images/Sarathi.png",
      ],
      stats: [
        { label: "Students Mentored", value: "80+" },
        { label: "Workshops", value: "12+" }
      ],
      skills: ["Leadership", "Curriculum Design", "Public Speaking"]
    },
    {
      id: "gsa",
      title: "Google Student Ambassador",
      role: "Community Lead",
      organization: "Google Community",
      period: "2024",
      description: "Bridging the gap between industry tech and campus culture. Facilitated tech literacy drives and cloud study jams.",
      images: [
        "public/images/Sarathi.png",
        "public/images/Sarathi.png",
        "public/images/Sarathi.png"
      ],
      stats: [
        { label: "Performance", value: "Top 5%" },
        { label: "Events", value: "5+" }
      ],
      skills: ["Google Cloud", "Community Building", "Management"]
    },
    {
      id: "ml-month",
      title: "ML in One Month Challenge",
      role: "Solo Researcher",
      organization: "Self-Initiated",
      period: "2023",
      description: "Intensive deep-dive into Neural Networks. Built and deployed 5 End-to-End ML projects in 30 days.",
      images: [
        "public/images/Sarathi.png",
        "public/images/Sarathi.png",
        "public/images/LearnFlow.png",
        "public/images/Sarathi.png",
        "public/images/Sarathi.png",
      ],
      stats: [
        { label: "Projects Shipped", value: "5" },
        { label: "Blog Views", value: "1k+" }
      ],
      skills: ["TensorFlow", "FastAPI", "Documentation", "Rapid Prototyping"]
    }
  ]
};

export default aboutData;