// import React from 'react';
// import Navigation from '@/components/Navigation';
// import aboutData from '@/data/aboutData';
// import SocialIcons from '@/components/SocialIcons';

// const About = () => {
//   return (
//     <>
//       <Navigation />
      
//       <main className="pt-16">
//         {/* Hero Section */}
//         <section className="relative min-h-[40vh] flex items-center bg-gradient-radial from-flux-purple/10 to-background">
//           <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-flux-purple/10 blur-3xl"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-flux-blue/10 blur-3xl"></div>
          
//           <div className="container mx-auto px-4 py-20 z-10">
//             <div className="flex flex-col md:flex-row items-center gap-40">
//               <div className="md:w-1/2">
//                 <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
//                 <p className="text-xl text-gray-300 max-w-2xl">{aboutData.bio}</p>
//                 <div className="mt-4">
//                   <SocialIcons showLabels={true} />
//                 </div>
//               </div>
//               <div className="relative w-full md:w-1/2 max-w-xs aspect-[3/3.5] overflow-hidden rounded-xl shadow-xl">
//                 <img 
//                   src="/images/Vrajesh.jpg" 
//                   alt={aboutData.name} 
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* Main Content */}
//         <section className="py-16 px-4">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex flex-col md:flex-row gap-12">
//               {/* Left Column - Story */}
//               <div className="md:w-2/3">
//                 <h2 className="text-2xl font-bold mb-6">My Journey</h2>
//                 <div className="space-y-6">
//                   {aboutData.story.map((paragraph, index) => (
//                     <p key={index} className="text-gray-300 leading-relaxed">
//                       {paragraph}
//                     </p>
//                   ))}
//                 </div>
                
//                 {/* Education */}
//                 <h2 className="text-2xl font-bold mt-16 mb-6">Education</h2>
//                 <div className="space-y-8">
//                   {aboutData.education.map((edu, index) => (
//                     <div key={index} className="glass-morphism p-6 rounded-xl">
//                       <h3 className="text-xl font-semibold">{edu.degree}</h3>
//                       <div className="flex justify-between items-center mt-2 mb-3">
//                         <span className="text-gray-300">{edu.institution}</span>
//                         <span className="text-accent text-sm">{edu.year}</span>
//                       </div>
//                       <p className="text-gray-400">{edu.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Right Column - Sidebar */}
//               <div className="md:w-1/3">
//                 <div className="glass-morphism p-6 rounded-xl mb-8">
//                   <h3 className="text-xl font-bold mb-4">Personal Interests</h3>
//                   <ul className="space-y-2">
//                     {aboutData.interests.map((interest, index) => (
//                       <li key={index} className="flex items-center">
//                         <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
//                         <span className="text-gray-300">{interest}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 {/* Quote */}
//                 <div className="glass-morphism p-6 rounded-xl">
//                   <blockquote className="border-l-4 border-accent/50 pl-4">
//                     <p className="italic text-gray-300 mb-2">"{aboutData.quote.text}"</p>
//                     <footer className="text-accent">— {aboutData.quote.author}</footer>
//                   </blockquote>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
      
//       {/* Footer */}
//       <footer className="py-8 px-4 border-t border-white/10">
//         <div className="max-w-6xl mx-auto text-center">
//           <p className="text-gray-400">© {new Date().getFullYear()} {aboutData.name}. All rights reserved.</p>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default About;

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import aboutData, { Achievement } from '@/data/aboutData';
import SocialIcons from '@/components/SocialIcons';
import { Download, Eye, Users, Zap, Briefcase, GraduationCap, Code } from 'lucide-react';

// --- SUB-COMPONENT: Experience Gallery Card ---
const ExperienceCard = ({ item }: { item: Achievement }) => {
  // State to handle which image is currently showing in the "Big View"
  const [activeImage, setActiveImage] = useState(item.images[0]);

  return (
    <div className="glass-morphism rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition-all duration-500 flex flex-col xl:flex-row min-h-[400px]">
      
      {/* LEFT: Content Side */}
      <div className="p-8 xl:w-5/12 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded-full border border-accent/20">
               {item.period}
             </span>
             <span className="text-gray-400 text-sm flex items-center gap-1">
               <Briefcase size={14} /> {item.organization}
             </span>
          </div>
          
          <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
          <p className="text-lg text-gray-300 font-medium mb-4">{item.role}</p>
          <p className="text-gray-400 leading-relaxed mb-6">{item.description}</p>
          
          {/* THE SLAP: Impact Metrics */}
          <div className="flex flex-wrap gap-4 mb-8">
            {item.stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg flex flex-col">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {item.skills.map((skill, idx) => (
            <span key={idx} className="text-xs font-medium text-gray-400 px-2 py-1 bg-black/20 rounded">
              #{skill}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT: Interactive Image Gallery */}
      <div className="xl:w-7/12 bg-black/20 p-4 flex flex-col gap-4 relative">
        {/* Main Big Image */}
        <div className="relative flex-grow h-64 xl:h-auto rounded-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Fallback if no image, otherwise the image */}
          {activeImage ? (
            <img 
              src={activeImage} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* Thumbnail Strip - Only shows if there are multiple images */}
        {item.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {item.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                onMouseEnter={() => setActiveImage(img)}
                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  activeImage === img 
                    ? 'border-accent opacity-100 scale-105' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const About = () => {
  const [showResumePreview, setShowResumePreview] = useState(false);
  const resumeUrl = "Vrajesh_Resume.pdf";

  return (
    <>
      <Navigation />
      
      {/* Resume Preview Overlay (Same as before) */}
      {showResumePreview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl h-[85vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-white/20 flex flex-col">
            <button onClick={() => setShowResumePreview(false)} className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full hover:bg-white/20 text-white">X</button>
            <iframe src={`${resumeUrl}#toolbar=0`} className="w-full h-full" title="Resume Preview" />
          </div>
        </div>
      )}

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center bg-gradient-radial from-flux-purple/10 to-background overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-flux-purple/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-flux-blue/10 blur-3xl"></div>
          
          <div className="container mx-auto px-4 py-20 z-10">
            <div className="flex flex-col md:flex-row items-center gap-16 md:gap-40">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
                <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">{aboutData.bio}</p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <a 
                    href={resumeUrl}
                    download="Vrajesh_Sharma_Resume.pdf"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-flux-purple to-flux-blue rounded-full text-white font-medium hover:shadow-[0_0_20px_rgba(121,40,202,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Download size={18} />
                    <span>Download CV</span>
                  </a>
                  
                  <button 
                    onClick={() => setShowResumePreview(true)}
                    className="flex items-center gap-2 px-6 py-3 glass-morphism border border-white/20 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Eye size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                    <span>Preview</span>
                  </button>
                </div>
                <SocialIcons showLabels={true} />
              </div>
              
              <div className="relative w-full md:w-1/2 max-w-xs aspect-[3/3.5] overflow-hidden rounded-xl shadow-2xl group">
                <img 
                  src="/images/Vrajesh.jpg" 
                  alt={aboutData.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Split Layout: Story & Education */}
            <div className="flex flex-col lg:flex-row gap-12 mb-24">
              {/* Left: Journey */}
              <div className="lg:w-7/12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Users className="text-accent" /> My Journey
                </h2>
                <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                  {aboutData.story.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Right: Education & Interests */}
              <div className="lg:w-5/12 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <GraduationCap className="text-accent" /> Education
                  </h2>
                  <div className="space-y-4">
                    {aboutData.education.map((edu, index) => (
                      <div key={index} className="glass-morphism p-5 rounded-xl border-l-2 border-accent hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-white">{edu.degree}</h3>
                          <span className="text-xs font-bold bg-accent/20 text-accent px-2 py-1 rounded">{edu.year}</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                   <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Code className="text-accent" /> Interests
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {aboutData.interests.map((interest, index) => (
                      <span key={index} className="px-3 py-2 glass-morphism rounded-lg text-sm text-gray-300 hover:text-white hover:border-accent/50 transition-colors cursor-default">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FULL WIDTH: The "Sexy" Experience Section */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-white/10 flex-grow"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gradient-flux">
                   Professional Milestones
                </h2>
                <div className="h-px bg-white/10 flex-grow"></div>
              </div>

              <div className="flex flex-col gap-12">
                {aboutData.achievements.map((item) => (
                  <ExperienceCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} {aboutData.name}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default About;