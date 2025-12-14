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
    id: "project-8",
    title: "LekhAI",
    description: "A multi-agent system that researchs the live web, outlines, writes, and edits high-quality technical blog posts in real-time.",
    longDescription: "Sarathi is an AI chatbot inspired by Lord Krishna's wisdom in the Bhagavad Gita. It adapts emotionally to user queries—providing guidance, motivation, or advice with deep contextual understanding. Built with NLP, sentiment analysis, LLMs, and a calm, intuitive UI, Sarathi helps users reflect and find direction grounded in ancient philosophical insights.",
    technologies: ["Flask", "LLM", "Python", "DuckDuckGo"],
    image: "images/LekhAI.png",
    githubUrl: "https://github.com/Vrajesh-Sharma/Blog-Agent",
    liveUrl: "https://lekhai.onrender.com",
    featured: true,
    category: "AI Agents",
    year: 2025
  },
  {
    id: "project-7",
    title: "Sarathi",
    description: "An emotion aware chatbot inspired by Bhagavad Gita, offering personalized life or career guidance.",
  longDescription: "Sarathi is an AI chatbot inspired by Lord Krishna's wisdom in the Bhagavad Gita. It adapts emotionally to user queries—providing guidance, motivation, or advice with deep contextual understanding. Built with NLP, sentiment analysis, LLMs, and a calm, intuitive UI, Sarathi helps users reflect and find direction grounded in ancient philosophical insights.",
    technologies: ["React", "Flask", "LLM", "Python", "Tailwind CSS"],
    image: "images/Sarathi.png",
    githubUrl: "https://github.com/Vrajesh-Sharma/Sarathi",
    liveUrl: "https://sarathi-krishna.vercel.app",
    featured: true,
    category: "AI Assistant",
    year: 2025
  },
  {
    id: "project-6",
    title: "Chewzy",
    description: "A transparent food discovery platform that connects users with real-rated cafes and restaurants.",
    longDescription: "Chewzy is a food-tech platform that helps users discover cafes and restaurants based on genuine user ratings, reviews, and filters like 'trendy', 'newest', or 'highest rated'. Built with MERN stack, it enables restaurant owners to subscribe and showcase their business while promoting honest feedback and eliminating fake hype.",
    technologies: ["React", "Flask", "Tailwind CSS", "Supabase", "N8N"],
    image: "images/Chewzy.png",
    githubUrl: "https://github.com/Vrajesh-Sharma/Chewzy",
    liveUrl: "https://chewzy.vercel.app/",
    featured: true,
    category: "Web Application",
    year: 2025
  }, 
  {
    id: "project-5",
    title: "LearnFlow",
    description: "Your personalized AI tutor that transforms videos and documents into interactive, gamified learning journeys.",
    longDescription: "LearnFlow is an all-in-one AI-powered learning platform built during HackSpire 2025. It allows users to upload PDFs or paste YouTube links, and instantly transforms them into structured learning flows. Features include intelligent document parsing, adaptive quizzes, flashcards, and a conversational AI tutor that supports both text and voice input. Built with Gemini AI, Pinecone, LangChain, and enhanced with smooth UI/UX animations via Framer Motion, LearnFlow also offers a gamified experience with streaks and badges, persistent chat history, and step-by-step concept explanations — making learning engaging and personalized like never before.",
    technologies: ["React", "Flask", "Python", "Gemini AI", "Pinecone", "MongoDB"],
    image: "images/LearnFlow.png",
    githubUrl: "https://github.com/Vrajesh-Sharma/LearnFlow",
    featured: true,
    category: "AI-powered Learning Tool",
    year: 2025
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
];

export default projectsData;