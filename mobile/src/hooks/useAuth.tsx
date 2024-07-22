import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

interface User {
  // Define the properties of your user object
  uid: string;
  email: string;
  // ... other user properties
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const isAuthenticated = !!user;

  return { user, isAuthenticated };
};

export default useAuth;
