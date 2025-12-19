import React, { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import { supabase } from './supabase/supabase';
import ProtectedRoute from './component/ProtectedRoute';
import Loader from './component/Loader';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute session={session}>
            <Dashboard session={session} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth"
        element={session ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

