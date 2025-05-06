import React from 'react';
import FluxBg from './FluxBg';

interface FluxBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

// This is a wrapper component that uses the new FluxBg component
// but maintains the same interface as the original FluxBackground
const FluxBackground: React.FC<FluxBackgroundProps> = ({ 
  className = '', 
  intensity = 'medium' 
}) => {
  
  // Configure based on intensity
  const intensityConfig = {
    low: { 
      opacity: 0.6, 
      blurAmount: "30px",
      gradientCount: 3
    },
    medium: { 
      opacity: 0.8, 
      blurAmount: "40px",
      gradientCount: 5
    },
    high: { 
      opacity: 1, 
      blurAmount: "50px",
      gradientCount: 7
    }
  };
  
  const config = intensityConfig[intensity];
  
  // Generate gradients based on intensity
  const gradients = [
    { color: "121, 40, 202", size: "80%", animation: "moveVertical", duration: "30s", opacity: config.opacity }, // Purple
    { color: "0, 223, 216", size: "70%", top: "40%", left: "60%", animation: "moveInCircle", duration: "20s", opacity: config.opacity }, // Cyan
    { color: "255, 0, 128", size: "90%", top: "60%", left: "30%", animation: "moveHorizontal", duration: "40s", opacity: config.opacity }, // Pink
    { color: "59, 130, 246", size: "75%", top: "45%", left: "55%", animation: "moveInCircle", duration: "25s", opacity: config.opacity }, // Blue
    { color: "99, 102, 241", size: "85%", top: "55%", left: "45%", animation: "moveVertical", duration: "35s", opacity: config.opacity }, // Indigo
  ].slice(0, config.gradientCount);
  
  return (
    <FluxBg
      className={className}
      gradients={gradients}
      backgroundColor1="rgb(10, 10, 18)"
      backgroundColor2="rgb(20, 15, 35)"
      backgroundColor3="rgb(30, 10, 50)"
      interactiveColor="121, 40, 202"
      blendingMode="hard-light"
    />
  );
};

export default FluxBackground;
