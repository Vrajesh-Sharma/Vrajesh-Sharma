
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
  year: number;
}

const projectsData: Project[] = [
  {
    id: "project-1",
    title: "SarvaBhasha",
    description: "A language detection web app built using Flask and machine learning to identify languages.",
    longDescription: "SarvaBhasha is a web app that identifies languages from user-input text with 94.90% classification accuracy across 22 languages. It combines NLP techniques and machine learning models with a clean, dark-themed interface for user-friendly interaction.",
    technologies: ["Python", "Flask", "ML", "NLP"],
    image: "images/SarvaBhasha.jpeg",
    githubUrl: "https://github.com/vrajesh-sharma/SarvaBhasha",
    liveUrl: "https://sarvabhasha.onrender.com/",
    featured: true,
    category: "Web Application",
    year: 2023
  },
  {
    id: "project-2",
    title: "Bicep Curl Counter",
    description: "A Flask-based web app using OpenCV and MediaPipe to count bicep curls.",
    longDescription: "Bicep Curl Counter is a Flask-based web application that uses OpenCV and MediaPipe to track elbow angles and count bicep curls during workouts. It features real-time webcam input and allows users to reset the counter for multiple sets.",
    technologies: ["Python", "Flask", "OpenCV"],
    image: "images/BicepCurl.png",
    githubUrl: "https://github.com/Vrajesh-Sharma/Bicep-Curl-Counter",
    liveUrl: "",
    featured: false,
    category: "Computer Vision",
    year: 2024
  },
  {
    id: "project-3",
    title: "Gift Assistant",
    description: "An AI-powered chatbot that suggests personalized gifts based on user preferences.",
    longDescription: "Gift Assistant is an intelligent chatbot built using Flask, NLP, and Gemini API to recommend gift ideas tailored to the user's preferences, occasion, and budget. It streamlines the gifting process with contextual and creative suggestions.",
    technologies: ["Python", "Flask", "NLP", "Gemini API"],
    image: "images/GiftAssistant.png",
    githubUrl: "https://github.com/Vrajesh-Sharma/GiftGPT",
    liveUrl: "",
    featured: false,
    category: "AI/ML",
    year: 2024
  },
  {
    id: "project-4",
    title: "Balance Hub",
    description: "A platform that promotes healthy work-life balance using AI-driven tools.",
    longDescription: "Balance Hub is a web platform that empowers users to manage their time and well-being effectively. It offers AI-driven suggestions for productivity, relaxation strategies, and actionable insights to promote a better work-life balance.",
    technologies: ["React-Vite", "Tailwind CSS"],
    image: "images/BalanceHub.jpeg",
    githubUrl: "https://github.com/vrajesh-sharma/Balance-Hub",
    liveUrl: "https://balance-hub.vercel.app/",
    featured: true,
    category: "Web Application",
    year: 2025
  },
];

export default projectsData;