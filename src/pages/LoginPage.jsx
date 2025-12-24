import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/logo.png';
import { supabase } from '../supabase/supabase';

const LoginPage = () => {

  async function handleLoginWithGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
        redirectTo: "http://localhost:5173"
      }
      })
      if (error) throw error;
    } catch (error) {
      console.error(error?.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4">
      <div className="relative bg-zinc-900/80 rounded-2xl p-8 w-full max-w-md border border-zinc-700/50">
        <div className="relative z-10">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="w-15 h-15 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-zinc-700/50 flex items-center justify-center mx-auto mb-6 p-3 shadow-lg">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Welcome
            </h1>
            <p className="text-gray-400 text-md">Sign in to continue to your account</p>
          </div>

          {/* Google Sign In Button */}
          <div className="space-y-6">
            <button
              onClick={handleLoginWithGoogle}
              className="w-full group relative flex items-center justify-center gap-4 px-2 py-3 border border-zinc-700 rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:bg-gray-500/10 transition-all ease-in duration-300"
            >
              <FcGoogle className="w-6 h-6 relative z-10" />
              <span className="text-gray-200 font-semibold text-lg relative z-10">
                Continue with Google
              </span>
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-zinc-700/50 text-center">
            <p className="text-sm text-gray-400">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                Privacy Policy
              </a>
            </p>

            <div className="mt-4">
              <p className="text-xs text-gray-500">
                Need help?{' '}
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;