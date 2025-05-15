import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Scroll detection and attention grabber
  useEffect(() => {
    if (isOpen || hasInteracted) return;
    
    // For development/testing only
    if (process.env.NODE_ENV === 'development') {
      // Initial show after 7 seconds without needing to scroll (for testing)
      const initialTimer = setTimeout(() => {
        if (!isOpen && !hasInteracted) {
          setShowTooltip(true);
        }
      }, 7000); // 7 seconds for initial display
      
      return () => {
        clearTimeout(initialTimer);
      };
    }
    
    // Regular scroll detection for production
    const handleScroll = () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      scrollTimerRef.current = setTimeout(() => {
        if (!isOpen && !hasInteracted && !showTooltip) {
          setShowTooltip(true);
        }
      }, 10000); // 10 seconds
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [isOpen, hasInteracted, showTooltip]);

  // Mark as interacted when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasInteracted(true);
      setShowTooltip(false);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://vrajesh-sharma.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversation_history: messages,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Chat container with conditional classes based on screen size and expanded state
  const getChatContainerClasses = () => {
    if (isMobile) {
      return isExpanded
        ? "fixed inset-0 w-full h-full z-50 animate-fade-in"
        : "fixed bottom-20 left-4 right-4 h-[500px] z-50 animate-fade-in";
    }
    
    return isExpanded
      ? "fixed bottom-0 right-0 w-[450px] h-[80vh] z-50 animate-fade-in"
      : "fixed bottom-24 right-6 w-96 h-[600px] z-50 animate-fade-in";
  };

  return (
    <>
      {/* Floating Button - adjusted for mobile */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'} p-4 glass-morphism rounded-full hover:glow-border transition-all duration-300 z-50 group`}
          aria-label="Open chat"
        >
          <MessageCircle size={isMobile ? 20 : 24} className="text-flux-purple group-hover:text-flux-cyan transition-colors duration-300" />
        </button>
        
        {/* Notification Tooltip */}
        {showTooltip && (
          <div className="fixed z-50 bg-gradient-to-r from-flux-purple to-flux-cyan rounded-lg px-4 py-2 text-white font-medium text-sm chatbot-tooltip shadow-lg"
            style={{ 
              bottom: isMobile ? '5rem' : '7rem', 
              right: isMobile ? '1rem' : '1.5rem'
            }}
          >
            Chat with me
          </div>
        )}
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className={`${getChatContainerClasses()} neo-blur rounded-lg flex flex-col`}>
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-flux-purple to-flux-cyan rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot size={20} className="text-white" />
              <h3 className="font-semibold text-white flux-glow">Chat with Vrajesh</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleExpand}
                className="hover:bg-white/10 p-1 rounded-full transition-colors duration-200"
                aria-label={isExpanded ? "Minimize chat" : "Maximize chat"}
              >
                {isExpanded ? 
                  <Minimize2 size={18} className="text-white" /> : 
                  <Maximize2 size={18} className="text-white" />
                }
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1 rounded-full transition-colors duration-200"
                aria-label="Close chat"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Messages - adjusted padding for mobile */}
          <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-3' : 'p-4'} space-y-4 scrollbar-none`}>
            {messages.length === 0 && (
              <div className="flex flex-col justify-center items-center h-full space-y-3">
                <p className="text-white text-sm px-6 py-3 glass-morphism rounded-lg animate-pulse">
                  🤖 First messages are like first dates... I get a little nervous and slow 😅<br />
                  Give me 5–10 seconds to impress you!
                </p>
                <p className="text-white text-sm px-6 py-3 glass-morphism rounded-lg animate-pulse">
                  💸 P.S - I'm running on free plans so I'm a bit shy but totally worth it 😉
                </p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-slide-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-[85%] rounded-lg ${isMobile ? 'p-2' : 'p-3'} ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-flux-purple/30 to-flux-cyan/30 border border-flux-purple/30'
                      : 'glass-morphism prose-invert'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="text-white text-sm font-medium">
                      {message.content}
                    </p>
                  ) : (
                    <div className={`text-white text-sm prose prose-sm max-w-none prose-headings:text-white prose-headings:font-semibold prose-p:text-white prose-a:text-flux-cyan prose-code:text-flux-cyan prose-strong:text-flux-cyan ${isMobile ? 'prose-h3:text-base prose-h2:text-lg' : ''}`}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="glass-morphism rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-flux-purple rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-flux-cyan rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-flux-pink rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input - adjusted for mobile */}
          <form onSubmit={handleSubmit} className={`${isMobile ? 'p-3' : 'p-4'} border-t border-white/10`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 ${isMobile ? 'p-2 text-sm' : 'p-3'} bg-secondary/80 text-white placeholder-white/50 border border-flux-purple/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-flux-purple focus:border-transparent`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-gradient-to-r from-flux-purple to-flux-cyan ${isMobile ? 'p-2' : 'p-3'} rounded-lg transition-all duration-300 disabled:opacity-50 hover:glow-border`}
              >
                <Send size={isMobile ? 16 : 18} className="text-white" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
} 