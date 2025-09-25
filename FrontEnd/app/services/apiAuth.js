import api from "./axiosInstance";
export const login = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data?.message ||
          error.response.data?.error?.message ||
          "Login failed"
      );
    }
    throw new Error(error.message || "Login failed");
  }
};

export const register = async (data) => {
  console.log("Registering with data:", data);
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error.message || "Registration failed"
      );
    }
    throw new Error(error.message || "Registration failed");
  }
};

// Get user data from /me endpoint
export const getMe = async () => {
  try {
    const response = await api.get("/me");
    // If response.data is falsy, return null
    if (!response.data) return null;
    // If response.data.message includes specific auth/user errors, return null
    if (
      response.data.message &&
      (response.data.message.includes("Authentication required") ||
        response.data.message.includes("User no longer exists"))
    ) {
      return null;
    }
    return response.data;
  } catch (error) {
    // If unauthorized or no user, return null
    if (
      error.response &&
      (error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status === 404)
    ) {
      return null;
    }
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.message || "Failed to fetch user data"
      );
    }
    throw new Error(error.message || "Failed to fetch user data");
  }
};
