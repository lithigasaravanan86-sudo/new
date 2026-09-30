import api, { mockApiHandler } from "./api";

const isRealBackendConfigured = Boolean(import.meta.env.VITE_API_BASE_URL);

export const studentService = {
  /**
   * Get student dashboard data
   */
  async getDashboard() {
    if (isRealBackendConfigured) {
      try {
        const response = await api.get("/student/dashboard");
        return response.data;
      } catch (err) {
        if (!err.response) {
          return await mockApiHandler("/student/dashboard");
        }
        throw err;
      }
    }
    return await mockApiHandler("/student/dashboard");
  },

  /**
   * Get student full profile
   */
  async getProfile() {
    if (isRealBackendConfigured) {
      try {
        const response = await api.get("/student/profile");
        return response.data;
      } catch (err) {
        if (!err.response) {
          return await mockApiHandler("/student/dashboard");
        }
        throw err;
      }
    }
    return await mockApiHandler("/student/dashboard");
  },

  /**
   * Update editable student profile fields
   */
  async updateProfile(updates) {
    if (isRealBackendConfigured) {
      try {
        const response = await api.put("/student/profile", updates);
        return response.data;
      } catch (err) {
        if (!err.response) {
          return await mockApiHandler("/student/profile", { body: updates });
        }
        throw err;
      }
    }
    return await mockApiHandler("/student/profile", { body: updates });
  },
};
