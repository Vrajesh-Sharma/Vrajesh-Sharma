import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import aboutData from '@/data/aboutData';
import skillsData from '@/data/skillsData';
import projectsData from '@/data/projectsData';
import blogData from '@/data/blogData';
import ProjectCard from '@/components/ProjectCard';
import BlogPostCard from '@/components/BlogPost';
import SkillItem from '@/components/SkillItem';
import ProfilePicture from '@/components/ProfilePicture';

const Home = () => {
  // Only get featured projects and blog posts
  const featuredProjects = projectsData.filter(project => project.featured).slice(0, 2);
  const featuredBlogPosts = blogData.filter(post => post.featured).slice(0, 2);
  // Get top skills (highest proficiency)
  // Priority order for levels
  const levelPriority = {
    Advanced: 3,
    Applied: 2,
    Core: 1
  };

  // Get top skills based on level priority
  const topSkills = [...skillsData]
    .sort((a, b) => levelPriority[b.level] - levelPriority[a.level])
    .slice(0, 4);

  return (
    <>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-[80vh] relative flex flex-col items-center justify-center px-4 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-flux-purple/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-flux-blue/10 blur-3xl"></div>
          <div className="max-w-4xl mx-auto text-center z-10">
            <div className="flex flex-col items-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animation-delay-200 animate-text-reveal">
                <span className="text-gradient-flux">{aboutData.name}</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-300 mb-8 animation-delay-400 animate-text-reveal">{aboutData.title}</h2>
            </div>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animation-delay-600 animate-text-reveal">{aboutData.bio}</p>
            
            <div className="flex flex-wrap justify-center gap-4 animation-delay-800 animate-fade-in">
              <Link 
                to="/about" 
                className="px-6 py-3 rounded-full bg-accent/10 border border-accent/30 text-white hover:bg-accent/30 transition-colors duration-300"
              >
                About Me
              </Link>
              <Link 
                to="/projects" 
                className="px-6 py-3 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors duration-300"
              >
                View Projects
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 rounded-full bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </section>
        
        {/* About Section Preview */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="glass-morphism p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">About Me</h2>
                  <p className="text-gray-300 mb-6">{aboutData.story[0]}</p>
                  <Link 
                    to="/about" 
                    className="text-accent hover:text-accent-foreground transition-colors duration-300"
                  >
                    Read more about me →
                  </Link>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <blockquote className="border-l-2 border-accent/50 pl-4 italic text-gray-300">
                    <p className="mb-2">"{aboutData.quote.text}"</p>
                    <footer className="text-accent">— {aboutData.quote.author}</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Skills Section Preview */}
        <section className="py-20 px-4 bg-gradient-radial from-slate-900/50 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">My Skills</h2>
              <p className="text-gray-300">A glimpse of my technical expertise</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {topSkills.map((skill) => (
                <SkillItem 
                  key={skill.name} 
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                to="/skills" 
                className="text-accent hover:text-accent-foreground transition-colors duration-300"
              >
                View all my skills →
              </Link>
            </div>
          </div>
        </section>
        
        {/* Projects Section Preview */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Projects</h2>
              <p className="text-gray-300">Showcasing some of my best work</p>
            </div>
            
            <div className="space-y-12">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/projects" 
                className="text-accent hover:text-accent-foreground transition-colors duration-300"
              >
                Explore all projects →
              </Link>
            </div>
          </div>
        </section>
        
        {/* Blog Section Preview */}
        <section className="py-20 px-4 bg-gradient-radial from-slate-900/50 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Latest from the Blog</h2>
              <p className="text-gray-300">Thoughts, insights, and tutorials</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredBlogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/blog" 
                className="text-accent hover:text-accent-foreground transition-colors duration-300"
              >
                Read more articles →
              </Link>
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in working together?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 font-medium glass-morphism rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(121,40,202,0.3)] hover:border-accent/50"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} {aboutData.name}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
