import { Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mb-6 animate-float">
          <Plane className="w-12 h-12 text-white transform rotate-45" />
        </div>
        
        <h1 className="text-9xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }}>
          404
        </h1>
        
        <h2 className="text-3xl font-semibold text-white mb-4">
          Flight Not Found
        </h2>
        
        <p className="text-blue-200 mb-8 max-w-md mx-auto">
          Oops! It looks like this flight path doesn't exist. Let's get you back on course.
        </p>
        
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/50"
        >
          Return to Home
        </Link>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}