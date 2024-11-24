import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../supabase";  // Import your supabase client

const AuthContext = createContext();

export const useGlobalContext = () => useContext(AuthContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for session when the app starts
    const session = supabase.auth.session();
    if (session) {
      setIsLoggedIn(true);
    }
    setLoading(false);

    // Listen to auth state changes (optional)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
