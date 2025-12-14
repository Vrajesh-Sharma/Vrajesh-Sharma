import React from 'react';

interface SkillItemProps {
  name: string;
  level: "Core" | "Applied" | "Advanced";
  icon?: string;
}

const levelTextColor = {
  Core: "text-gray-400",
  Applied: "text-yellow-400",
  Advanced: "text-green-400"
};

const SkillItem: React.FC<SkillItemProps> = ({
  name,
  level,
  icon
}) => {
  return (
    <div className="glass-card p-4 rounded-xl hover:scale-105 transition-all duration-300">
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <span className="font-medium">{name}</span>
        </div>

        <span className={`text-xs font-semibold ${levelTextColor[level]}`}>
          {level}
        </span>
      </div>

    </div>
  );
};

export default SkillItem;
