import React from 'react';
import { Project } from '@/data/projectsData';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div 
      className={`relative group overflow-hidden rounded-xl glass-morphism shadow-xl transition-all duration-500 hover:shadow-accent/20 mb-20 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex flex-col md:items-center`}
      style={{ 
        animationDelay: `${index * 0.15}s`,
        opacity: 0,
        animation: 'fade-in 0.8s ease-out forwards' 
      }}
    >
      {/* Project Image */}
      <div className="md:w-1/2 aspect-video overflow-hidden">
        {project.image ? (
          <div 
            className="w-full h-full bg-cover bg-center transform transition-all duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          ></div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/30 to-secondary/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-white/70">{project.title}</span>
          </div>
        )}
      </div>
      
      {/* Project Info */}
      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-accent/20 text-accent-foreground text-xs px-3 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-3">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-300"
              >
                <Github size={16} className="mr-1" /> Code
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-300"
              >
                <ExternalLink size={16} className="mr-1" /> Demo
              </a>
            )}
          </div>
          
          <span className="text-sm text-gray-400">{project.year}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
