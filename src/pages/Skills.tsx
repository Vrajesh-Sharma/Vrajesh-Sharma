import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import skillsData, { skillCategories } from '@/data/skillsData';
import SkillItem from '@/components/SkillItem';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filteredSkills = activeCategory 
    ? skillsData.filter(skill => skill.category === activeCategory) 
    : skillsData;
    
  const categories = ['All', ...skillCategories.map(cat => cat.name)];
  
  return (
    <>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center bg-gradient-radial from-flux-purple/10 to-background">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-flux-purple/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-flux-blue/10 blur-3xl"></div>
          
          <div className="container mx-auto px-4 py-20 z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Skills</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              A comprehensive overview of my technical skills and proficiencies across various domains.
            </p>
          </div>
        </section>
        
        {/* Skills Categories */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category === 'All' ? null : category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    (category === 'All' && activeCategory === null) || category === activeCategory
                      ? 'bg-accent text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Skills Grid */}
            <div>
              {activeCategory !== null && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">{activeCategory}</h2>
                  <p className="text-gray-300 mb-6">
                    {skillCategories.find(cat => cat.name === activeCategory)?.description}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill) => (
                  <SkillItem 
                    key={skill.name} 
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Skills Process */}
        <section className="py-16 px-4 bg-gradient-radial from-slate-900/50 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">My Learning Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-morphism p-6 rounded-xl">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Research & Explore</h3>
                <p className="text-gray-400">Stay current with emerging technologies and best practices in the industry.</p>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Learn & Apply</h3>
                <p className="text-gray-400">Combine structured learning with practical application on real projects.</p>
              </div>
              
              <div className="glass-morphism p-6 rounded-xl">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Master & Share</h3>
                <p className="text-gray-400">Deepen expertise through teaching others and contributing to the community.</p>
              </div>
            </div>
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

export default Skills;
