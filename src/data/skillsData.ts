export interface Skill {
  name: string;
  category: string;
  proficiency: number; // 0-100
  icon?: string;
  color: string;
}

export interface SkillCategory {
  name: string;
  description: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming",
    description: "Core concepts of programming languages"
  },
  {
    name: "Frontend",
    description: "Building beautiful, responsive user interfaces and interactive experiences"
  },
  {
    name: "Backend",
    description: "Developing robust server-side logic and API development"
  },
  {
    name: "DevOps",
    description: "Automating workflows and managing infrastructure"
  },
  {
    name: "Other",
    description: "Additional skills that complement my technical expertise"
  }
];

const skillsData: Skill[] = [
  //Programming
  { name: "C", category: "Programming", proficiency: 85, color: "#61DAFB" },
  { name: "C++", category: "Programming", proficiency: 75, color: "#3178C6" },
  { name: "Python", category: "Programming", proficiency: 90, color: "#000000" },
  { name: "Java", category: "Programming", proficiency: 70, color: "#38B2AC" },

  // Frontend
  { name: "React", category: "Frontend", proficiency: 75, color: "#61DAFB" },
  { name: "TypeScript", category: "Frontend", proficiency: 60, color: "#3178C6" },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 70, color: "#38B2AC" },
  
  // Backend
  { name: "Flask", category: "Backend", proficiency: 90, color: "#E10098" },
  { name: "FastAPI", category: "Backend", proficiency: 85, color: "#E10098" },
  { name: "Node.js", category: "Backend", proficiency: 65, color: "#339933" },
  { name: "PostgreSQL", category: "Backend", proficiency: 75, color: "#336791" },
  { name: "MongoDB", category: "Backend", proficiency: 70, color: "#47A248" },
  
  // DevOps
  { name: "Docker", category: "DevOps", proficiency: 65, color: "#2496ED" },
  
  // Other
  { name: "Git", category: "Other", proficiency: 85, color: "#F05032" }
];

export default skillsData;
