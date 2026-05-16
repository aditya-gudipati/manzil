export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push("at least 8 characters");
  }
  
  if (!/[a-zA-Z]/.test(password)) {
    errors.push("at least one letter");
  }
  
  if (!/\d/.test(password)) {
    errors.push("at least one number");
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^\d{10}$/.test(phone);
};
