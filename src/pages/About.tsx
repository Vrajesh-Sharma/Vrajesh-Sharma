import React from 'react';
import Navigation from '@/components/Navigation';
import aboutData from '@/data/aboutData';
import SocialIcons from '@/components/SocialIcons';

const About = () => {
  return (
    <>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center bg-gradient-radial from-flux-purple/10 to-background">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-flux-purple/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-flux-blue/10 blur-3xl"></div>
          
          <div className="container mx-auto px-4 py-20 z-10">
            <div className="flex flex-col md:flex-row items-center gap-40">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
                <p className="text-xl text-gray-300 max-w-2xl">{aboutData.bio}</p>
                <div className="mt-4">
                  <SocialIcons showLabels={true} />
                </div>
              </div>
              <div className="relative w-full md:w-1/2 max-w-xs aspect-[3/3.5] overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="/images/Vrajesh.jpg" 
                  alt={aboutData.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              {/* Left Column - Story */}
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-6">My Journey</h2>
                <div className="space-y-6">
                  {aboutData.story.map((paragraph, index) => (
                    <p key={index} className="text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Education */}
                <h2 className="text-2xl font-bold mt-16 mb-6">Education</h2>
                <div className="space-y-8">
                  {aboutData.education.map((edu, index) => (
                    <div key={index} className="glass-morphism p-6 rounded-xl">
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <div className="flex justify-between items-center mt-2 mb-3">
                        <span className="text-gray-300">{edu.institution}</span>
                        <span className="text-accent text-sm">{edu.year}</span>
                      </div>
                      <p className="text-gray-400">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Column - Sidebar */}
              <div className="md:w-1/3">
                <div className="glass-morphism p-6 rounded-xl mb-8">
                  <h3 className="text-xl font-bold mb-4">Personal Interests</h3>
                  <ul className="space-y-2">
                    {aboutData.interests.map((interest, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        <span className="text-gray-300">{interest}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Quote */}
                <div className="glass-morphism p-6 rounded-xl">
                  <blockquote className="border-l-4 border-accent/50 pl-4">
                    <p className="italic text-gray-300 mb-2">"{aboutData.quote.text}"</p>
                    <footer className="text-accent">— {aboutData.quote.author}</footer>
                  </blockquote>
                </div>
              </div>
            </div>
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

export default About;
