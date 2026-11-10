/** @format */

import { createContext, useEffect, useState } from "react";

import supabase from "../services/supabase";

const AuthContext = createContext(null);

// Role source of truth:
// The backend RLS policies gate on a server-injected custom JWT claim
// ("user_role"), which the client cannot forge. On the client we prefer
// app_metadata.role (set server-side via auth.updateUser by service
// code that we control) and fall back to user_metadata.role, which is
// where current signups still write the role (see authService.js).
// Once signups migrate to writing app_metadata, the fallback can be
// dropped. This client-side role read is a UX gate only — it never
// replaces the database-level security boundary.
function resolveRole(user) {
  return user?.app_metadata?.role ?? user?.user_metadata?.role ?? null;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function handleLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    setUser(data.user);
    setRole(resolveRole(data.user));
    return data.user;
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        setRole(null);
        setIsLoading(false);
        return;
      }
      if (session?.user) {
        setUser(session.user);
        setRole(resolveRole(session.user));
      } else {
        setUser(null);
        setRole(null);
      }
      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setRole(resolveRole(session.user));
      }
      setIsLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        handleLogin,
        handleLogout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
