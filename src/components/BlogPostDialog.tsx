import React from 'react';
import { BlogPost } from '@/data/blogData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostDialogProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogPostDialog: React.FC<BlogPostDialogProps> = ({ post, isOpen, onClose }) => {
  if (!post) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{post.title}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full glow-border">
                {tag}
              </span>
            ))}
          </div>
        </DialogHeader>
        
        {post.image && (
          <div className="w-full h-56 md:h-72 mb-4 overflow-hidden rounded-md">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
          <span>{post.date}</span>
          <span>{post.readTime} min read</span>
        </div>
        
        <div className="prose prose-invert prose-p:my-4 prose-li:my-1 max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({node, ...props}) => (
                <p className="my-4" {...props} />
              ),
              br: () => <br className="my-2" />,
              ul: ({node, ...props}) => (
                <ul className="my-4 space-y-2" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="my-4 space-y-2" {...props} />
              ),
              li: ({node, ...props}) => (
                <li className="ml-4" {...props} />
              ),
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <pre className="bg-gray-800/80 p-4 rounded-md overflow-auto border border-gray-700 glow-border">
                    <code className={`language-${match[1]}`} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-gray-800/80 px-1 py-0.5 rounded border border-gray-700" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostDialog;
