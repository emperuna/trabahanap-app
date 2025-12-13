import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
// Append /api only if not already included in the URL
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_BASE_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
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
      const response = await api.post('/auth/signin', credentials);
      return response.data;
    } catch (error) {
      console.error('API: Login error:', error.response?.data || error.message);
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

  // Verify token
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
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('API: Logout error:', error.response?.data || error.message);
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
  
  // Fetch all jobs
  getAllJobs: async (params = {}) => {
    try {
      const response = await api.get('/jobs', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
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
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw new Error(`Failed to get profile: ${error.response?.data?.message || error.message}`);
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const requestData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        location: profileData.location,
        bio: profileData.bio
      };
      
      const response = await api.put('/users/profile', requestData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please login again.');
      } else if (error.response?.status === 404) {
        throw new Error('Profile update endpoint not found. Backend may not be ready.');
      } else if (error.response?.status === 500) {
        throw new Error(`Server error: ${error.response?.data?.message || 'Internal server error'}`);
      } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        throw new Error('Cannot connect to server. Please check if backend is running.');
      }
      
      throw new Error(`Failed to update profile: ${error.response?.data?.message || error.message}`);
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
      const response = await api.post('/applications/apply', {
        jobId,
        coverLetter
      });
      return response.data;
    } catch (error) {
      console.error('Error applying for job:', error);
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
      const response = await api.get('/applications/employer');
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw new Error(error.response?.data || 'Failed to fetch applications');
    }
  },

  // Update application status (Employer only)
  updateApplicationStatus: async (applicationId, status) => {
    try {
      const response = await api.put(`/applications/update-status/${applicationId}`, {
        status: status
      });
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw new Error(error.response?.data || 'Failed to update application status');
    }
  },

  // Bulk update application status
  bulkUpdateApplicationStatus: async (applicationIds, status) => {
    try {
      const response = await api.put('/applications/bulk-update-status', {
        applicationIds,
        status
      });
      return response.data;
    } catch (error) {
      console.error('Error bulk updating applications:', error);
      throw new Error(error.response?.data || 'Failed to bulk update applications');
    }
  },

  // Apply for job with file uploads
  applyForJobWithFiles: async (formData) => {
    try {
      const response = await api.post('/applications/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error applying for job:', error);
      throw new Error(error.response?.data || 'Failed to apply for job');
    }
  },

  // Get PDF URL for viewing (no download)
  getPDFUrl: (applicationId, fileType) => {
    const token = localStorage.getItem('token');
    return `${API_BASE_URL}/api/applications/view/${applicationId}/${fileType}`;
  }
};

// Job Management API calls
export const jobManagementAPI = {
  // Get employer's jobs
  getEmployerJobs: async () => {
    try {
      const response = await api.get('/employer/jobs');
      return response.data;
    } catch (error) {
      console.error('Error fetching employer jobs:', error);
      throw new Error(error.response?.data || 'Failed to fetch your jobs');
    }
  },

  // Update job
  updateJob: async (jobId, jobData) => {
    try {
      const response = await api.put(`/employer/jobs/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      console.error('Error updating job:', error);
      throw new Error(error.response?.data || 'Failed to update job');
    }
  },

  // Delete job
  deleteJob: async (jobId) => {
    try {
      const response = await api.delete(`/employer/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw new Error(error.response?.data || 'Failed to delete job');
    }
  },

  // Get job statistics
  getJobStats: async () => {
    try {
      const response = await api.get('/employer/jobs/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching job stats:', error);
      throw new Error(error.response?.data || 'Failed to fetch job statistics');
    }
  },

  getRecentEmployerJobs: async () => {
    try {
      const response = await api.get('/employer/jobs/recent');
      return response.data;
    } catch (error) {
      console.error('Error fetching recent employer jobs:', error);
      throw new Error(error.response?.data || 'Failed to fetch recent jobs');
    }
  }

};

export const savedJobsAPI = {
  // Save a job
  saveJob: async (jobId) => {
    try {
      const response = await api.post(`/saved-jobs/save/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error saving job:', error);
      throw new Error(error.response?.data || 'Failed to save job');
    }
  },

  // Remove saved job
  removeSavedJob: async (jobId) => {
    try {
      const response = await api.delete(`/saved-jobs/remove/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing saved job:', error);
      throw new Error(error.response?.data || 'Failed to remove saved job');
    }
  },

  // Get user's saved jobs
  getMySavedJobs: async () => {
    try {
      const response = await api.get('/saved-jobs/my-saved-jobs');
      return response.data;
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      throw new Error(error.response?.data || 'Failed to fetch saved jobs');
    }
  },

  // Check if job is saved
  isJobSaved: async (jobId) => {
    try {
      const response = await api.get(`/saved-jobs/is-saved/${jobId}`);
      return response.data.isSaved;
    } catch (error) {
      console.error('Error checking saved status:', error);
      return false;
    }
  },

  // Get saved jobs count
  getSavedJobsCount: async () => {
    try {
      const response = await api.get('/saved-jobs/count');
      return response.data.count;
    } catch (error) {
      console.error('Error getting saved jobs count:', error);
      return 0;
    }
  }

};

export default api;
