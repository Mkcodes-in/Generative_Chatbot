import React, { useState } from 'react'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';

export default function App() {
  const [user, setUser] = useState(null);
  return (
   <Routes>
      <Route path='/' element={<Dashboard />}/>
      <Route path='/auth' element={<LoginPage />}/>
      <Route path='*' element={<NotFound />}/>
   </Routes>
  )
}
