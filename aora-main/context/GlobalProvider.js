import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase"; // Import Supabase client
import { getCurrentUser } from "../lib/appwrite"; // Your existing function

// Create the context
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  // Global state
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize the state when the app loads
  useEffect(() => {
    // Checking for logged-in status from Supabase
    const checkSupabaseSession = async () => {
      const session = supabase.auth.session(); // Get current session
      if (session?.user) {
        setIsLogged(true);
        setUser(session.user);
      } else {
        setIsLogged(false);
        setUser(null);
      }
    };

    checkSupabaseSession();

    // Also checking the current user from Appwrite (if needed)
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Update user session in Supabase and Appwrite after login/logout
  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setIsLogged(true);
      setUser(data.user);

      // Optionally, you can sync with Appwrite if needed
      // Example: await appwriteLogin(data.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLogged(false);
      setUser(null);

      // Optionally, you can logout from Appwrite too
      // Example: await appwriteLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
