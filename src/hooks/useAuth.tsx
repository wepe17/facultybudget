import React from 'react';

interface AuthContextType {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'DEAN' | 'FINANCE' | 'REVIEWER';
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState({
    id: '1',
    name: 'John Doe',
    email: 'john@university.edu',
    role: 'ADMIN'
  } as AuthContextType['user']);

  const login = async (email: string, password: string) => {
    // Implement actual login logic here
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      role: 'ADMIN'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}