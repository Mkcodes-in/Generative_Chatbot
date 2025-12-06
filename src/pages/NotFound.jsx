import { Link } from 'react-router-dom';
import '../App.css' 
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className='notfound min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center p-6'>
      <div className="text-center">
        {/* Error Code */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* bg Color */}
            <div className="w-64 h-64 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-full blur-3xl"></div>
          </div>
          <h1 className="relative text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300">
            404
          </h1>
        </div>
        
        {/* Message */}
        <div className="space-y-4 mb-10">
          <h2 className="text-3xl font-bold text-gray-200">Page Not Found</h2>
        </div>
        
        {/* Navigation */}
        <div className="space-y-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 group transition-all duration-300"
          >
            <FiArrowLeft className="w-3 h-3 transition-all duration-300 group-hover:-translate-x-1" />
            <span className="text-xs font-medium">Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}