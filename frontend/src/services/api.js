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
  // Get user profile
  getProfile: async () => {
    try {
      console.log('👤 API: Getting user profile...');
      const response = await api.get('/users/profile');
      console.log('✅ API: Profile retrieved:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ API: Error getting profile:', error);
      throw new Error(`Failed to get profile: ${error.response?.data?.message || error.message}`);
    }
  },

  // ✅ Update user profile - THIS WAS MISSING
  updateProfile: async (profileData) => {
    try {
      console.log('📝 API: Updating user profile with data:', profileData);
      
      // Make sure we're sending the right data structure
      const requestData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber, // Note: backend expects 'phoneNumber'
        location: profileData.location,
        bio: profileData.bio
      };
      
      console.log('📦 API: Request data formatted as:', requestData);
      
      const response = await api.put('/users/profile', requestData);
      console.log('✅ API: Profile update response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ API: Error updating profile:', error);
      console.error('❌ API: Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      
      // Provide more specific error messages
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
      console.log('📋 Fetching employer applications...');
      const response = await api.get('/applications/employer');
      console.log('✅ Applications fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching applications:', error);
      throw new Error(error.response?.data || 'Failed to fetch applications');
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

  // Apply for job with file uploads
  applyForJobWithFiles: async (formData) => {
    try {
      console.log('📝 Applying for job with files...');
      const response = await api.post('/applications/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('✅ Application submitted:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error applying for job:', error);
      throw new Error(error.response?.data || 'Failed to apply for job');
    }
  },

  // Get PDF URL for viewing (no download)
  getPDFUrl: (applicationId, fileType) => {
    const token = localStorage.getItem('token');
    const apiUrl = window.location.origin.includes('localhost') 
      ? 'http://localhost:8080' 
      : window.location.origin;
    
    return `${apiUrl}/api/applications/view/${applicationId}/${fileType}`;
  }
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
  },

};

export const savedJobsAPI = {
  // Save a job   
  saveJob: async (jobId) => {
    try {
      console.log('💾 Saving job:', jobId);
      const response = await api.post(`/saved-jobs/save/${jobId}`);
      console.log('✅ Job saved successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Error saving job:', error);
      throw new Error(error.response?.data || 'Failed to save job');
    }
  },

  // Remove saved job
  removeSavedJob: async (jobId) => {
    try {
      console.log('🗑️ Removing saved job:', jobId);
      const response = await api.delete(`/saved-jobs/remove/${jobId}`);
      console.log('✅ Saved job removed successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Error removing saved job:', error);
      throw new Error(error.response?.data || 'Failed to remove saved job');
    }
  },

  // Get user's saved jobs
  getMySavedJobs: async () => {
    try {
      console.log('📋 Fetching saved jobs...');
      const response = await api.get('/saved-jobs/my-saved-jobs');
      console.log('✅ Saved jobs fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching saved jobs:', error);
      throw new Error(error.response?.data || 'Failed to fetch saved jobs');
    }
  },

  // Check if job is saved
  isJobSaved: async (jobId) => {
    try {
      const response = await api.get(`/saved-jobs/is-saved/${jobId}`);
      return response.data.isSaved;
    } catch (error) {
      console.error('❌ Error checking saved status:', error);
      return false;
    }
  },

  // Get saved jobs count
  getSavedJobsCount: async () => {
    try {
      const response = await api.get('/saved-jobs/count');
      return response.data.count;
    } catch (error) {
      console.error('❌ Error getting saved jobs count:', error);
      return 0;
    }
  }
};

export default api;
