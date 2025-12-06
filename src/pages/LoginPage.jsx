import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/logo.png'; // Adjust path as needed

const LoginPage = () => {
  const handleGoogleSignIn = () => {
    console.log('Google sign-in clicked');
  };

  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4">
      <div className="bg-zinc-800/50 rounded-xl shadow-xl p-8 w-full max-w-sm border border-gray-700">
        
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center mx-auto mb-4 p-2">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-400">Continue with Google</p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-gray-800 border border-gray-50/20 rounded-lg hover:bg-gray-800/30 hover:shadow-md hover:shadow-black/20 transition-all duration-200 cursor-pointer"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-gray-300 font-medium">Sign in with Google</span>
        </button>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-400">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-500 hover:text-blue-400">Terms</a> and{' '}
            <a href="#" className="text-blue-500 hover:text-blue-400">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;