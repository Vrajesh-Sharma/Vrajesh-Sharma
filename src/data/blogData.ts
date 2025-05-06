export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  featured: boolean;
  readTime: number;
}

const blogData: BlogPost[] = [
  {
    id: "blog-5",
    title: "Getting Started with Git: Essential Commands for Beginners",
    excerpt: "Learn the fundamental Git commands that every developer should know to effectively manage version control.",
    content: `
# Getting Started with Git: Essential Commands for Beginners

Version control is an essential part of modern software development, and Git has become the industry standard. In this guide, I'll walk you through the most important Git commands that every beginner should know.

## What is Git?
Git is a distributed version control system designed to track changes in source code during software development. It allows multiple developers to work on a project simultaneously without stepping on each other's toes.

## Setting Up Git
Before you can use Git, you need to set it up with your information:

\`\`\`bash
# Set your username
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"
\`\`\`

## Creating a New Repository

To start tracking a project with Git:

\`\`\`bash
# Navigate to your project directory
cd my-project

# Initialize a new Git repository
git init
\`\`\`

## Basic Git Workflow

The typical Git workflow involves the following steps:

### 1. Checking Status

Always start by checking the status of your repository:

\`\`\`bash
git status
\`\`\`

This shows which files have been modified, staged, or are untracked.

### 2. Staging Changes

When you've made changes to your files, you need to stage them before committing:

\`\`\`bash
# Stage a specific file
git add filename.txt

# Stage all changes
git add .
\`\`\`

### 3. Committing Changes

Once your changes are staged, you can commit them:

\`\`\`bash
git commit -m "Add a descriptive message about your changes"
\`\`\`

### 4. Viewing History

To see the history of commits:

\`\`\`bash
# View commit history
git log

# View a condensed history
git log --oneline
\`\`\`

## Working with Remote Repositories

Most Git projects involve collaboration with others using remote repositories:

### Connecting to a Remote Repository

\`\`\`bash
# Add a remote repository
git remote add origin https://github.com/username/repository.git
\`\`\`

### Pushing and Pulling

\`\`\`bash
# Push your changes to the remote repository
git push origin main

# Pull changes from the remote repository
git pull origin main
\`\`\`

## Branching and Merging

Branches allow you to develop features or fix bugs without affecting the main codebase:

\`\`\`bash
# Create a new branch
git branch feature-branch

# Switch to the new branch
git checkout feature-branch

# Create and switch to a new branch (shorthand)
git checkout -b feature-branch

# Merge a branch into the current branch
git merge feature-branch
\`\`\`

## Help! I Made a Mistake

Git also provides ways to fix mistakes:

\`\`\`bash
# Discard changes in a file
git checkout -- filename.txt

# Unstage a file
git reset HEAD filename.txt

# Amend the last commit
git commit --amend -m "New commit message"
\`\`\`

## Conclusion

These commands cover the essential Git operations that you'll use daily. As you become more comfortable with Git, you'll discover more advanced features that can streamline your workflow.

Remember, practice is key when learning Git. Don't be afraid to experiment in a test repository until you feel confident with these commands.

Happy coding!
    `,
    author: "Vrajesh Sharma",
    date: "15-1-2024",
    category: "Development",
    tags: ["Git", "Version Control", "Programming", "Tutorial"],
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=3888&auto=format&fit=crop",
    featured: true,
    readTime: 8
  },
  
  {
    id: "blog-1",
    title: "Understanding Agentic AI: From Tools to Intelligent Agents",
    excerpt: "Explore how Agentic AI represents a shift from passive tools to autonomous, goal-driven agents capable of complex reasoning and decision-making.",
    content: `
  # Understanding Agentic AI: From Tools to Intelligent Agents
  
  Artificial Intelligence has evolved rapidly — from narrow models that perform specific tasks to broader systems that can adapt, plan, and act. The next major leap in this journey is **Agentic AI**.
  
  ---
  
  ## What is Agentic AI?
  
  **Agentic AI** refers to AI systems that behave like *agents* — entities capable of setting goals, making decisions, taking actions, and adapting based on feedback. Unlike traditional AI models, which are reactive and passive, agentic systems are *proactive*, context-aware, and capable of reasoning over time.
  
  ---
  
  ## Key Features of Agentic AI
  
  **1. Goal-Oriented Behavior**  
  Agentic AI doesn’t just respond to queries — it pursues objectives. For example, an AI travel agent might plan an entire itinerary based on preferences and budget, making adjustments as needed.
  
    
  **2. Autonomy & Planning**  
  These systems break down large tasks into smaller subtasks, plan their actions, and make decisions without constant human input. They often use **task decomposition**, **search**, and **reflection**.
  
    
  **3. Tool Use and Environment Interaction**  
  Agentic AIs can use APIs, web tools, and even trigger code execution. Think of them like intelligent bots that can browse the web, schedule meetings, write code, and optimize results — all in one loop.
  
    
  **4. Memory and Context Awareness**  
  Through long-term memory (vector databases or in-context learning), they remember past interactions and adapt their strategies.
  
  ---
  
  ## Agentic Architectures
  
  **- LangChain Agents**  
  Enable LLMs to decide which tools to call and in what order.
  
    
  **- Auto-GPT & BabyAGI**  
  These agents take a single input goal and iteratively generate tasks, execute them, and learn.
  
    
  **- ReAct (Reason + Act)**  
  A framework where LLMs reason through problems and decide on actions using toolkits.
  
  ---
  
  ## Use Cases
  
  **- AI Personal Assistants**  
  Handle tasks like inbox management, trip planning, and bookings.
  
    
  **- Financial Advisors**  
  Analyze portfolios, make investment decisions, and adapt to market changes.
  
    
  **- Customer Support Agents**  
  Solve queries, generate tickets, and escalate when needed.
  
    
  **- Research Agents**  
  Summarize papers, extract insights, and generate literature reviews.
  
  ---
  
  ## Challenges and Limitations
  
  **- Safety and Control**  
  Autonomy brings unpredictability. Guardrails and human-in-the-loop designs are essential.
  
    
  **- Cost and Latency**  
  Multi-step reasoning and external tool use can increase compute cost and response times.
  
    
  **- Evaluation**  
  Measuring the success of agentic systems is non-trivial, especially for open-ended goals.
  
  ---
  
  ## Final Thoughts
  
  Agentic AI is more than a buzzword — it's the direction in which intelligent systems are evolving. As we equip models with memory, planning, and autonomy, we're moving closer to AI that doesn't just *answer* but also *acts*.
  
  Whether you're building task bots, autonomous assistants, or research agents — understanding the principles of Agentic AI will be crucial in the coming years.
  
  > **Stay curious. The era of intelligent agents is just beginning.**
    `,
    author: "Vrajesh Sharma",
    date: "10-3-2025",
    category: "AI/ML",
    tags: ["Agentic AI", "LLMs", "LangChain", "AutoGPT", "AI Agents"],
    image: "https://images.unsplash.com/photo-1631175294825-d0fccc9f87a5?q=80&w=2832&auto=format&fit=crop",
    featured: true,
    readTime: 7
  },
  
  
  {
    id: "blog-2",
    title: "State Management Patterns in React",
    excerpt: "An exploration of different state management approaches in React applications.",
    content: `
# State Management Patterns in React

Managing state effectively is one of the most challenging aspects of building React applications. In this article, we'll compare different state management patterns and when to use them.

## Local Component State

React's \`useState\` hook is perfect for component-specific state that doesn't need to be shared. It's simple and requires minimal boilerplate.

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## Context API for Shared State

When multiple components need access to the same state, the Context API provides a way to share state without prop drilling.

\`\`\`jsx
const ThemeContext = React.createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedButton onClick={() => setTheme('dark')} />
    </ThemeContext.Provider>
  );
}
\`\`\`

## External State Management Libraries

For complex applications, libraries like Redux, MobX, or Zustand can provide more structured state management with features like time-travel debugging and middleware.

## The Future: React Query and Server State

Modern applications often deal with server state. Libraries like React Query and SWR help manage this specialized form of state with features like caching, refetching, and optimistic updates.

Choose the right state management pattern based on your application's needs rather than following trends. The simplest solution that meets your requirements is often the best choice.
    `,
    author: "John Doe",
    date: "2023-11-20",
    category: "React",
    tags: ["React", "JavaScript", "State Management", "Frontend"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=3870&auto=format&fit=crop",
    featured: true,
    readTime: 8
  },
  {
    id: "blog-3",
    title: "Demystifying TypeScript Generics",
    excerpt: "A deep dive into TypeScript generics and how they can make your code more flexible and type-safe.",
    content: `
# Demystifying TypeScript Generics

TypeScript generics might seem intimidating at first, but they're one of the most powerful features for creating flexible, reusable, and type-safe code. Let's explore how generics work and when to use them.

## What Are Generics?

Generics allow you to create reusable components that can work with a variety of types rather than a single one. They act as type variables that allow you to capture the type provided by the user.

## Basic Generic Functions

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const num = identity<number>(5); // Type of num is number
const str = identity("hello");   // Type inference: Type of str is string
\`\`\`

## Generic Interfaces and Classes

\`\`\`typescript
interface Box<T> {
  contents: T;
}

const box: Box<string> = { contents: "hello" };
\`\`\`

## Constraints on Generics

Sometimes you want to restrict the types that can be used with your generic. You can do this with the \`extends\` keyword.

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

## Real-World Use Cases

Generics are particularly useful for:
- Creating reusable components
- Building type-safe collections
- Writing utilities that work with different data types
- Implementing patterns like factories or repositories

By mastering generics, you'll be able to write more elegant, flexible, and maintainable TypeScript code.
    `,
    author: "John Doe",
    date: "2023-10-05",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Programming", "Web Development"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3870&auto=format&fit=crop",
    featured: false,
    readTime: 10
  },
  {
    id: "blog-4",
    title: "Designing Effective Component APIs",
    excerpt: "Learn how to design component APIs that are intuitive, flexible, and maintainable.",
    content: `
# Designing Effective Component APIs

The way you design your component APIs can significantly impact how easy they are to use, maintain, and extend. In this article, we'll explore principles and patterns for creating effective component interfaces.

## The Principle of Least Surprise

Components should behave predictably and match users' expectations. Follow platform conventions and common patterns to reduce the learning curve.

## Props Design

### Boolean Props

When designing boolean props, use positive naming to make the intent clear:

\`\`\`jsx
// Good
<Button disabled={true} />

// Avoid
<Button enabled={false} />
\`\`\`

### Callback Naming

For event callbacks, use the 'on' prefix followed by the event name:

\`\`\`jsx
<Button onClick={handleClick} onHover={handleHover} />
\`\`\`

### Default Props

Provide sensible defaults to make components easy to use out of the box.

## Component Composition

Rather than creating complex props APIs, lean on React's composition model:

\`\`\`jsx
// Instead of
<Card title="Hello" content="World" footer={<Button>Click me</Button>} />

// Consider
<Card>
  <CardTitle>Hello</CardTitle>
  <CardContent>World</CardContent>
  <CardFooter>
    <Button>Click me</Button>
  </CardFooter>
</Card>
\`\`\`

## Controlled vs. Uncontrolled Components

Decide whether a component should be controlled (state managed by parent) or uncontrolled (internal state) based on its use cases.

By following these principles, you'll create component APIs that are a joy to use and extend.
    `,
    author: "John Doe",
    date: "2023-09-12",
    category: "Design",
    tags: ["React", "Component Design", "API Design", "User Experience"],
    image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=3870&auto=format&fit=crop",
    featured: false,
    readTime: 6
  }
];

export default blogData;
