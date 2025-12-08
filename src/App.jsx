import React, { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import { supabase } from './supabase/supabase';
import ProtectedRoute from './component/ProtectedRoute';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data.session);
      } catch (err) {
        console.error("Error :", err.message);
      }
    })();

    const {data: authListner} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    ); 

    return () => authListner.subscription.unsubscribe();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute session={session}>
            <Dashboard 
            session={session}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth"
        element={
          session ? <Navigate to="/" replace /> : <LoginPage />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
