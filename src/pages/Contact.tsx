import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://vrajesh-sharma.onrender.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Have a question or want to work together? I'd love to hear from you.
            </p>
          </div>
        </section>
        
        {/* Contact Form & Info */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              {/* Contact Form */}
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                
                <form onSubmit={handleSubmit} className="glass-morphism p-8 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input 
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input 
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      Subject
                    </label>
                    <input 
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-flux-purple to-flux-blue hover:shadow-[0_0_20px_rgba(121,40,202,0.3)]'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div className="md:w-1/3">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="glass-morphism p-6 rounded-xl mb-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Mail className="text-accent mt-1" size={20} />
                    <div>
                      <h3 className="text-lg font-medium text-white">Email</h3>
                      <a href="mailto:vrajesh.12042005@gmail.com" className="text-gray-300 hover:text-accent transition-colors">
                        vrajesh.12042005@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 mb-4">
                    <Phone className="text-accent mt-1" size={20} />
                    <div>
                      <h3 className="text-lg font-medium text-white">Phone</h3>
                      <a href="tel:+919429619257" className="text-gray-300 hover:text-accent transition-colors">
                        +919429619257
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-accent mt-1" size={20} />
                    <div>
                      <h3 className="text-lg font-medium text-white">Location</h3>
                      <p className="text-gray-300">Ahmedabad, Gujarat</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="glass-morphism p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-white mb-4">Connect With Me</h3>
                  
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/Vrajesh-Sharma" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                    >
                      <Github size={20} className="text-white" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/vrajesharma-7-dsa/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                    >
                      <Linkedin size={20} className="text-white" />
                    </a>
                    <a 
                      href="https://instagram.com/its_vrajesh_sharma" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                    >
                      <Instagram size={20} className="text-white" />
                    </a>
                  </div>
                </div>
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

export default Contact;
