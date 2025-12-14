// =====================
// Types
// =====================

export interface Skill {
  name: string;
  category: string;
  level: "Core" | "Applied" | "Advanced";
  color: string;
}

export interface SkillCategory {
  name: string;
  description: string;
}

// =====================
// Skill Categories
// =====================

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming",
    description: "Strong foundation in programming and problem-solving"
  },
  {
    name: "Machine Learning & AI",
    description: "End-to-end ML pipelines and classical machine learning"
  },
  {
    name: "Deep Learning & GenAI",
    description: "Neural networks, LLMs, RAG, and agentic AI systems"
  },
  {
    name: "Backend",
    description: "API development, model serving, and scalable AI backends"
  },
  {
    name: "Databases",
    description: "Relational, vector, and modern cloud databases"
  },
  {
    name: "Tools & Platforms",
    description: "Developer tools, deployment platforms, and automation"
  }
];

// =====================
// Skills Data
// =====================

const skillsData: Skill[] = [
  // Programming
  { name: "Python", category: "Programming", level: "Advanced", color: "#3776AB" },
  { name: "C", category: "Programming", level: "Applied", color: "#A8B9CC" },
  { name: "C++", category: "Programming", level: "Applied", color: "#00599C" },
  { name: "SQL", category: "Programming", level: "Applied", color: "#336791" },

  // Machine Learning & AI
  { name: "Regression", category: "Machine Learning & AI", level: "Advanced", color: "#6B7280" },
  { name: "Classification", category: "Machine Learning & AI", level: "Advanced", color: "#6B7280" },
  { name: "Feature Engineering", category: "Machine Learning & AI", level: "Applied", color: "#6B7280" },
  { name: "Model Evaluation", category: "Machine Learning & AI", level: "Advanced", color: "#6B7280" },
  { name: "Hyperparameter Tuning", category: "Machine Learning & AI", level: "Applied", color: "#6B7280" },

  // Deep Learning & GenAI
  { name: "Neural Networks", category: "Deep Learning & GenAI", level: "Applied", color: "#9333EA" },
  { name: "LLMs", category: "Deep Learning & GenAI", level: "Advanced", color: "#9333EA" },
  { name: "RAG", category: "Deep Learning & GenAI", level: "Advanced", color: "#9333EA" },
  { name: "Agentic AI", category: "Deep Learning & GenAI", level: "Advanced", color: "#9333EA" },
  { name: "Prompt Engineering", category: "Deep Learning & GenAI", level: "Advanced", color: "#9333EA" },

  // Backend
  { name: "Flask", category: "Backend", level: "Advanced", color: "#000000" },
  { name: "FastAPI", category: "Backend", level: "Advanced", color: "#009688" },

  // Databases
  { name: "PostgreSQL", category: "Databases", level: "Applied", color: "#336791" },
  { name: "MySQL", category: "Databases", level: "Applied", color: "#4479A1" },
  { name: "Pinecone", category: "Databases", level: "Advanced", color: "#0EA5E9" },
  { name: "ChromaDB", category: "Databases", level: "Applied", color: "#0EA5E9" },
  { name: "Supabase", category: "Databases", level: "Applied", color: "#3ECF8E" },

  // Tools & Platforms
  { name: "Git", category: "Tools & Platforms", level: "Advanced", color: "#F05032" },
  { name: "GitHub", category: "Tools & Platforms", level: "Advanced", color: "#181717" },
  { name: "Vercel", category: "Tools & Platforms", level: "Applied", color: "#000000" },
  { name: "Render", category: "Tools & Platforms", level: "Applied", color: "#0466C8" },
  { name: "VS Code", category: "Tools & Platforms", level: "Advanced", color: "#007ACC" },
  { name: "n8n", category: "Tools & Platforms", level: "Applied", color: "#FF6A00" }
];

export default skillsData;
