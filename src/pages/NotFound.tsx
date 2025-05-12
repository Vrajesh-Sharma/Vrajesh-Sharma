import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleExplore = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,_#a855f7,_#06b6d4,_#22c55e)] text-foreground relative overflow-hidden">
      {/* Animated background sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0 animate-pulse">
        <Sparkles className="absolute left-1/4 top-1/4 text-flux-cyan opacity-30 animate-rotate-slow" size={120} />
        <Sparkles className="absolute right-1/4 bottom-1/4 text-flux-purple opacity-20 animate-rotate-slow" size={100} />
      </div>
      <div className="relative z-10 text-center p-8 glass-morphism rounded-2xl shadow-2xl border border-white/10 animate-fade-in">
        <h1 className="text-7xl md:text-8xl font-extrabold text-gradient-flux mb-4 drop-shadow-lg animate-text-reveal">404</h1>
        <p className="text-2xl md:text-3xl font-semibold text-white mb-4 animate-fade-in">Oops! Page not found</p>
        <p className="text-lg text-white/80 mb-8 animate-fade-in delay-100">The page you are looking for doesn't exist or has been moved.</p>
        <button
          onClick={handleExplore}
          className="group relative inline-flex items-center justify-center px-8 py-3 font-medium overflow-hidden glass-morphism rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(121,40,202,0.3)] hover:border-accent/50 mb-8"
        >
          <span className="relative text-white">Return to Home</span>
          <span className="absolute bg-gradient-to-r from-flux-purple to-flux-cyan rounded-full w-0 h-full transition-all duration-300 group-hover:w-full -z-10"></span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
