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
  quote: {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  }
};

export default aboutData;
