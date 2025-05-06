import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import projectsData from '@/data/projectsData';
import ProjectCard from '@/components/ProjectCard';

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  // Get unique categories
  const categories = ['All', ...new Set(projectsData.map(project => project.category))];
  
  // Filter projects
  const filteredProjects = filter 
    ? projectsData.filter(project => project.category === filter)
    : projectsData;
  
  return (
    <>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center bg-gradient-radial from-flux-purple/10 to-background">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-flux-purple/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-flux-blue/10 blur-3xl"></div>
          
          <div className="container mx-auto px-4 py-20 z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              A showcase of my work, side projects, and open source contributions.
            </p>
          </div>
        </section>
        
        {/* Project Filters */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category === 'All' ? null : category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    (category === 'All' && filter === null) || category === filter
                      ? 'bg-accent text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Projects Grid */}
            <div className="space-y-16">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Collaboration CTA */}
        <section className="py-20 px-4 bg-gradient-radial from-slate-900/50 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in Collaboration?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always looking for interesting projects to work on. If you have an idea or a project in mind, I'd love to hear about it.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 font-medium glass-morphism rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(121,40,202,0.3)] hover:border-accent/50"
            >
              Let's Work Together
            </a>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Vrajesh Sharma. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Projects;
