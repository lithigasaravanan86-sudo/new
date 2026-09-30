import api, { mockApiHandler } from "./api";

const isRealBackendConfigured = Boolean(import.meta.env.VITE_API_BASE_URL);

export const authService = {
  /**
   * Login student with Email/Register Number and Password
   */
  async login(identifier, password) {
    if (isRealBackendConfigured) {
      try {
        const response = await api.post("/auth/login", { identifier, password });
        return response.data;
      } catch (err) {
        // If real backend failed to connect, we fall back to mock handler
        if (!err.response) {
          console.warn("Backend unavailable, falling back to mock handler");
          return await mockApiHandler("/auth/login", { body: { identifier, password } });
        }
        throw err;
      }
    }
    return await mockApiHandler("/auth/login", { body: { identifier, password } });
  },

  /**
   * Register a new student with all required fields
   */
  async register(registrationData) {
    if (isRealBackendConfigured) {
      try {
        const response = await api.post("/auth/register", registrationData);
        return response.data;
      } catch (err) {
        if (!err.response) {
          console.warn("Backend unavailable, falling back to mock handler");
          return await mockApiHandler("/auth/register", { body: registrationData });
        }
        throw err;
      }
    }
    return await mockApiHandler("/auth/register", { body: registrationData });
  },

  /**
   * Verify and fetch current authenticated student
   */
  async getCurrentUser() {
    if (isRealBackendConfigured) {
      try {
        const response = await api.get("/auth/me");
        return response.data;
      } catch (err) {
        if (!err.response) {
          return await mockApiHandler("/auth/me");
        }
        throw err;
      }
    }
    return await mockApiHandler("/auth/me");
  },

  /**
   * Request password reset instructions
   */
  async forgotPassword(email) {
    if (isRealBackendConfigured) {
      try {
        const response = await api.post("/auth/forgot-password", { email });
        return response.data;
      } catch (err) {
        if (!err.response) {
          return await mockApiHandler("/auth/forgot-password", { body: { email } });
        }
        throw err;
      }
    }
    return await mockApiHandler("/auth/forgot-password", { body: { email } });
  },
};
