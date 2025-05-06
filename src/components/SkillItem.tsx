import React from 'react';
import { Progress } from '@/components/ui/progress';

interface SkillItemProps {
  name: string;
  proficiency: number;
  icon?: string;
  color?: string;
}

const SkillItem: React.FC<SkillItemProps> = ({
  name,
  proficiency,
  icon,
  color = 'bg-gradient-to-r from-flux-purple to-flux-cyan',
}) => {
  return (
    <div className="glass-card p-4 rounded-xl hover:scale-105 transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <span className="font-medium">{name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{proficiency}%</span>
      </div>
      <Progress
        value={proficiency}
        className="h-2 bg-gray-700"
      />
    </div>
  );
};

export default SkillItem;
