import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const ADMIN_EMAIL = "admin@bambika.com";
const ADMIN_PASSWORD = "admin123";
const SESSION_KEY = "bambika_admin_auth";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
