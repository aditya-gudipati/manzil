import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState({}); // email -> userMap

  // Load from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('manzil_users');
    if (storedUsers) setAllUsers(JSON.parse(storedUsers));

    const currentUserEmail = localStorage.getItem('manzil_current_user');
    if (currentUserEmail && storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUser(parsedUsers[currentUserEmail]);
    }
  }, []);

  // Save allUsers to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(allUsers).length > 0) {
      localStorage.setItem('manzil_users', JSON.stringify(allUsers));
    }
  }, [allUsers]);

  // Save current user email whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('manzil_current_user', user.email);
    } else {
      localStorage.removeItem('manzil_current_user');
    }
  }, [user]);

  const signUp = async (formData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (allUsers[formData.email]) {
          reject(new Error('Email already registered'));
          return;
        }

        const newUser = {
          ...formData,
          plan: 'basic', // default plan
        };

        setAllUsers((prev) => ({ ...prev, [newUser.email]: newUser }));
        setUser(newUser);
        resolve('Successfully registered');
      }, 500); // simulate network
    });
  };

  const signIn = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = allUsers[email];
        if (!foundUser) {
          reject(new Error('User not found'));
          return;
        }
        if (foundUser.password !== password) {
          reject(new Error('Incorrect password'));
          return;
        }

        setUser(foundUser);
        resolve('Successfully signed in');
      }, 500);
    });
  };

  const signOut = () => {
    setUser(null);
  };

  const updateProfile = (data) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    setAllUsers((prev) => ({ ...prev, [updatedUser.email]: updatedUser }));
  };

  const updatePlan = (plan) => {
    const updatedUser = { ...user, plan };
    setUser(updatedUser);
    setAllUsers((prev) => ({ ...prev, [updatedUser.email]: updatedUser }));
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateProfile, updatePlan }}>
      {children}
    </AuthContext.Provider>
  );
};
