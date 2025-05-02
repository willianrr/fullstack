import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
  
  interface AuthContextType {
	token: string | null;
	login: (token: string) => void;
	logout: () => void;
  }
  
  const AuthContext = createContext<AuthContextType | null>(null);
  
  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [token, setToken] = useState<string | null>(null);
  
	useEffect(() => {
	  const stored = localStorage.getItem('authToken');
	  if (stored) setToken(stored);
	}, []);
  
	const login = (newToken: string) => {
	  localStorage.setItem('authToken', newToken);
	  setToken(newToken);
	};
  
	const logout = () => {
	  localStorage.removeItem('authToken');
	  setToken(null);
	};
  
	return (
	  <AuthContext.Provider value={{ token, login, logout }}>
		{children}
	  </AuthContext.Provider>
	);
  };
  
  export const useAuth = (): AuthContextType => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
	return ctx;
  };
  