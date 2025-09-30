const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateField = (name: string, value: string) => {
  switch (name) {
    case "username":
      return value === "emilys" ? "" : "Username must be 'emilys'";
    case "email":
      return emailRegex.test(value) ? "" : "Please enter a valid email address";
    case "password":
      return value.length >= 8 ? "" : "Password must be at least 8 characters";
    default:
      return "";
  }
};