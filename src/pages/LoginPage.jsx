import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/logo.png';
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("sending:", formData);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }
    console.log("LOGIN SUCCESS:", data.user);
    navigate("/");
    setFormData({email: "", password: ""});
  }


  function handleForm(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4">
      <div className="bg-zinc-800/50 rounded-xl shadow-xl p-8 w-full max-w-sm border border-gray-100/10">

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
          onClick={() => console.log("first")}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-gray-800 border border-gray-50/20 rounded-full hover:bg-gray-800/30 hover:shadow-md hover:shadow-black/20 transition-all duration-200 cursor-pointer"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-gray-300 font-medium">Sign in with Google</span>
        </button>

        <div className='border-t border-gray-700 py-2 mt-6'></div>

        {/* input fields */}
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <label
              className='text-md text-gray-50 font-light mb-1'
              htmlFor="email">Email address</label>
            <input
              onChange={handleForm}
              className='rounded-full border-gray-50/50 border py-2 px-2 text-white'
              id='email'
              name='email'
              required
              value={formData.email}
              type="email" />
          </div>
          <div className='flex flex-col mb-3'>
            <label
              className='text-md text-gray-50 font-light mb-1'
              htmlFor="password">Your Password</label>
            <input
              onChange={handleForm}
              className='rounded-full border-gray-50/50 border py-2 px-2 text-white'
              id='password'
              name='password'
              required
              value={formData.password}
              type="text" />
          </div>
          <button className='py-2 rounded-full bg-amber-700 text-md text-gray-50 cursor-pointer'>Sign in</button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
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