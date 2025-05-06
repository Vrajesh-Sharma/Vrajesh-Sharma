import React from 'react';

interface ProfilePictureProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
  className = '', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  return (
    <div className={`${className} ${sizeClasses[size]} relative`}>
      <img 
        src="/images/profile.jpg" 
        alt="Vrajesh Sharma" 
        className="profile-picture object-cover w-full h-full"
        onError={(e) => {
          // Fallback if the image doesn't exist
          e.currentTarget.src = `https://ui-avatars.com/api/?name=Vrajesh+Sharma&background=7928ca&color=fff&size=256`;
        }}
      />
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-flux-purple to-flux-cyan opacity-30 blur-sm -z-10"></div>
    </div>
  );
};

export default ProfilePicture; 