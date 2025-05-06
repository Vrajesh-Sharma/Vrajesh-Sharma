import React from 'react';
import { BlogPost as BlogPostType } from '@/data/blogData';

interface BlogPostCardProps {
  post: BlogPostType;
  compact?: boolean;
  onClick?: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, compact = false, onClick }) => {
  return (
    <div 
      className={`glass-morphism rounded-xl overflow-hidden transition-all duration-300 hover:shadow-accent/20 cursor-pointer ${
        compact ? 'h-full' : ''
      }`}
      onClick={onClick}
    >
      {/* Post Image */}
      {post.image && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      {/* Post Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {compact 
            ? <span className="text-xs text-accent">{post.category}</span> 
            : post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">
                  {tag}
                </span>
              ))
          }
        </div>
        
        {/* Title */}
        <h3 className={`font-bold text-white mb-2 ${compact ? 'text-lg' : 'text-xl'}`}>
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
        
        {/* Meta */}
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>{post.date}</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
