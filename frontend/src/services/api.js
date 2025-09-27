import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Redirect to login if token is invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials) => {
    try {
      console.log('🌐 API: Sending login request:', credentials);
      const response = await api.post('/auth/signin', credentials);
      console.log('📨 API: Login response:', response.data);
      
      // Return the full response data
      return response.data;
    } catch (error) {
      console.error('🚨 API: Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // ✅ Make sure this method exists
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error('Token verification failed');
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      return response.data;
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  },

  logout: async () => {
    try {
      console.log('🌐 API: Sending logout request');
      const response = await api.post('/auth/logout');
      console.log('📨 API: Logout response:', response.data);
      return response.data;
    } catch (error) {
      console.error('🚨 API: Logout error:', error.response?.data || error.message);
      // Don't throw error for logout - continue with client-side logout
      return { success: false };
    }
  },
};

// Jobs API calls
export const jobsAPI = {
  createJob: async (jobData) => {
    try {
      const response = await api.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create job');
    }
  },
  
  // Add this method to fetch all jobs
  getAllJobs: async (params = {}) => {
    try {
      console.log('📡 Fetching all jobs...');
      const response = await api.get('/jobs', { params });
      console.log('📨 Jobs received:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching jobs:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
    }
  },

  // Get job by ID
  getJobById: async (id) => {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch job');
    }
  },
};

// Companies API calls
export const companiesAPI = {
  getAllCompanies: async (params = {}) => {
    try {
      const response = await api.get('/companies', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch companies');
    }
  },

  getCompanyById: async (id) => {
    try {
      const response = await api.get(`/companies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch company details');
    }
  },

  createCompany: async (companyData) => {
    try {
      const response = await api.post('/companies', companyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create company');
    }
  },

  updateCompany: async (id, companyData) => {
    try {
      const response = await api.put(`/companies/${id}`, companyData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update company');
    }
  },
};

// Users API calls
export const usersAPI = {
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  uploadResume: async (formData) => {
    try {
      const response = await api.post('/users/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload resume');
    }
  },
};

// Applications API calls
export const applicationsAPI = {
  // Apply for a job
  applyForJob: async (jobId, coverLetter) => {
    try {
      console.log('📝 Applying for job:', jobId);
      const response = await api.post('/applications/apply', {
        jobId,
        coverLetter
      });
      console.log('✅ Application submitted:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error applying for job:', error);
      throw new Error(error.response?.data || 'Failed to apply for job');
    }
  },

  // Get user's applications
  getMyApplications: async () => {
    try {
      const response = await api.get('/applications/my-applications');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch applications');
    }
  },

  // Check if user has applied for a job
  checkApplication: async (jobId) => {
    try {
      const response = await api.get(`/applications/check/${jobId}`);
      return response.data.hasApplied;
    } catch (error) {
      console.error('Error checking application:', error);
      return false;
    }
  },

  // Get applications for employer
  getEmployerApplications: async () => {
    try {
      const response = await api.get('/applications/employer/applications');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch applications');
    }
  },

  // Update application status (Employer only)
  updateApplicationStatus: async (applicationId, status) => {
    try {
      console.log(`🔄 Updating application ${applicationId} to status: ${status}`);
      const response = await api.put(`/applications/update-status/${applicationId}`, {
        status: status
      });
      console.log('✅ Application status updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating application status:', error);
      throw new Error(error.response?.data || 'Failed to update application status');
    }
  },

  // Bulk update application status (Optional)
  bulkUpdateApplicationStatus: async (applicationIds, status) => {
    try {
      console.log(`🔄 Bulk updating ${applicationIds.length} applications to status: ${status}`);
      const response = await api.put('/applications/bulk-update-status', {
        applicationIds,
        status
      });
      console.log('✅ Applications bulk updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error bulk updating applications:', error);
      throw new Error(error.response?.data || 'Failed to bulk update applications');
    }
  },
};

// Job Management API calls
export const jobManagementAPI = {
  // Get employer's jobs
  getEmployerJobs: async () => {
    try {
      console.log('📋 Fetching employer jobs...');
      const response = await api.get('/employer/jobs');
      console.log('✅ Employer jobs fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching employer jobs:', error);
      throw new Error(error.response?.data || 'Failed to fetch your jobs');
    }
  },

  // Update job
  updateJob: async (jobId, jobData) => {
    try {
      console.log(`📝 Updating job ${jobId}:`, jobData);
      const response = await api.put(`/employer/jobs/${jobId}`, jobData);
      console.log('✅ Job updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating job:', error);
      throw new Error(error.response?.data || 'Failed to update job');
    }
  },

  // Delete job
  deleteJob: async (jobId) => {
    try {
      console.log(`🗑️ Deleting job ${jobId}`);
      const response = await api.delete(`/employer/jobs/${jobId}`);
      console.log('✅ Job deleted');
      return response.data;
    } catch (error) {
      console.error('❌ Error deleting job:', error);
      throw new Error(error.response?.data || 'Failed to delete job');
    }
  },

  // Get job statistics
  getJobStats: async () => {
    try {
      console.log('📊 Fetching job stats...');
      const response = await api.get('/employer/jobs/stats');
      console.log('✅ Job stats fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching job stats:', error);
      throw new Error(error.response?.data || 'Failed to fetch job statistics');
    }
  }
};

export default api;
