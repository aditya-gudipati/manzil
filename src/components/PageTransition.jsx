import React, { useState, useEffect } from 'react';

const PageTransition = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Small delay to ensure the component is mounted before triggering transition
    const timer = setTimeout(() => setIsActive(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-transition ${isActive ? 'page-enter-active' : ''}`}>
      {children}
    </div>
  );
};

export default PageTransition;
