import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import blogData from '@/data/blogData';
import BlogPostCard from '@/components/BlogPost';
import BlogPostDialog from '@/components/BlogPostDialog';

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<typeof blogData[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Get all unique tags
  const allTags = Array.from(new Set(blogData.flatMap(post => post.tags)));
  
  // Filter posts by tag
  const filteredPosts = selectedTag 
    ? blogData.filter(post => post.tags.includes(selectedTag))
    : blogData;
  
  const handlePostClick = (post: typeof blogData[0]) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  
  return (
    <>
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center bg-gradient-radial from-flux-purple/10 to-background">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-flux-purple/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-flux-blue/10 blur-3xl"></div>
          
          <div className="container mx-auto px-4 py-20 z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Thoughts, tutorials, and insights on technology, design, and development.
            </p>
          </div>
        </section>
        
        {/* Tag Filter */}
        <section className="pt-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-3 min-w-max">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                    selectedTag === null
                      ? 'bg-accent text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  All Posts
                </button>
                
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                      selectedTag === tag
                        ? 'bg-accent text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Post (if not filtered) */}
        {!selectedTag && (
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
              
              <div className="glass-morphism rounded-xl overflow-hidden cursor-pointer" onClick={() => handlePostClick(blogData[0])}>
                <div className="md:flex">
                  {blogData[0].image && (
                    <div className="md:w-1/2">
                      <img 
                        src={blogData[0].image} 
                        alt={blogData[0].title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="md:w-1/2 p-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blogData[0].tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{blogData[0].title}</h3>
                    <p className="text-gray-300 mb-4">{blogData[0].excerpt}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>{blogData[0].date}</span>
                      <span>{blogData[0].readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Blog Posts */}
        <section className={`py-12 px-4 ${selectedTag ? 'pt-4' : ''}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              {selectedTag ? `Posts tagged with "${selectedTag}"` : 'All Posts'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard 
                  key={post.id} 
                  post={post} 
                  onClick={() => handlePostClick(post)}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Collaboration CTA */}
        <section className="py-20 px-4 bg-gradient-radial from-slate-900/50 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in Collaboration?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always looking for interesting projects to work on. If you have an idea or a project in mind, I'd love to hear about it.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 font-medium glass-morphism rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(121,40,202,0.3)] hover:border-accent/50"
            >
              Let's Work Together
            </a>
          </div>
        </section>
      </main>
      
      {/* Blog Post Dialog */}
      <BlogPostDialog 
        post={selectedPost} 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
      />
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Vrajesh Sharma. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Blog;
