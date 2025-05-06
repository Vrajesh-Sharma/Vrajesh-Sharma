import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FluxBg from '@/components/FluxBg';
import SocialIcons from '@/components/SocialIcons';

const Index = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  const handleExplore = () => {
    navigate('/home');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Flux Background */}
      <div className="absolute inset-0 z-10">
        <FluxBg 
          gradients={[
            { color: "121, 40, 202", size: "80%", animation: "moveVertical", duration: "30s" }, // Purple
            { color: "0, 223, 216", size: "70%", top: "40%", left: "60%", animation: "moveInCircle", duration: "20s" }, // Cyan
            { color: "255, 0, 128", size: "90%", top: "60%", left: "30%", animation: "moveHorizontal", duration: "40s" }, // Pink
            { color: "59, 130, 246", size: "75%", top: "45%", left: "55%", animation: "moveInCircle", duration: "25s" }, // Blue
            { color: "99, 102, 241", size: "85%", top: "55%", left: "45%", animation: "moveVertical", duration: "35s" }, // Indigo
          ]}
          backgroundColor1="rgb(15, 15, 20)"
          backgroundColor2="rgb(30, 20, 60)"
          backgroundColor3="rgb(50, 10, 70)"
          interactiveColor="121, 40, 202"
          blendingMode="hard-light"
        />
      </div>
      
      {/* Content - z-index higher than background */}
      <div 
        className={`text-center z-20 relative transition-all duration-1000 ${
          mounted ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-gradient flux-glow block mb-2">Vrajesh</span>
          <span className="text-white text-shadow">Sharma</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-md mx-auto mb-8">
          Crafting digital experiences through code
        </p>
        
        <button
          onClick={handleExplore}
          className="group relative inline-flex items-center justify-center px-8 py-3 font-medium overflow-hidden glass-morphism rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(121,40,202,0.3)] hover:border-accent/50 mb-8"
        >
          <span className="relative text-white">Enter Portfolio</span>
          <span className="absolute bg-gradient-to-r from-flux-purple to-flux-cyan rounded-full w-0 h-full transition-all duration-300 group-hover:w-full -z-10"></span>
        </button>

        {/* Social Icons */}
        <div className="mt-4">
          <SocialIcons className="justify-center" />
        </div>
      </div>
    </div>
  );
};

export default Index;
