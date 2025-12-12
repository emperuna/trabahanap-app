import { useState, useEffect } from 'react';

export const useJobSearch = (jobs) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    classification: [],      // NEW: Category filter
    jobTypeFilter: [],       
    workType: [],           
    salaryRange: [0, 200000],
    sortBy: 'recent',
    // ... other filters
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterJobs();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [jobs, ...Object.values(searchFilters)]);

  const updateFilter = (key, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      searchTerm: '',
      classification: [],      // NEW: Category filter
      jobTypeFilter: [],       
      workType: [],           
      salaryRange: [0, 200000],
      sortBy: 'recent',
      // ... other filters
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchFilters.searchTerm) count++;
    if (searchFilters.classification?.length > 0) count += searchFilters.classification.length;
    if (searchFilters.jobTypeFilter?.length > 0) count += searchFilters.jobTypeFilter.length;
    if (searchFilters.workType?.length > 0) count += searchFilters.workType.length;
    if (searchFilters.salaryRange[0] > 0 || searchFilters.salaryRange[1] < 200000) count++;
    return count;
  };

  const handleSearch = () => {
    filterJobs();
    // Save search to recent searches
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (searchFilters.searchTerm && !recentSearches.includes(searchFilters.searchTerm)) {
      recentSearches.unshift(searchFilters.searchTerm);
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 5)));
    }
  };

  const filterJobs = () => {
    let filtered = jobs.filter(job => {
      // Search term
      const matchesSearch = !searchFilters.searchTerm || 
        job.title?.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(searchFilters.searchTerm.toLowerCase());

      // Classification
      const matchesClassification = !searchFilters.classification?.length || 
        searchFilters.classification.some(cat => 
          job.category?.toLowerCase() === cat.toLowerCase() ||
          job.classification?.toLowerCase() === cat.toLowerCase()
        );

      // Job type
      const matchesJobType = !searchFilters.jobTypeFilter?.length || 
        searchFilters.jobTypeFilter.some(type => 
          job.type?.toLowerCase() === type.toLowerCase()
        );

      // Work type
      const matchesWorkType = !searchFilters.workType?.length || 
        searchFilters.workType.some(type => {
          if (type === 'Remote') return job.remote || job.location?.toLowerCase().includes('remote');
          if (type === 'On-site') return !job.remote && job.location && !job.location.toLowerCase().includes('remote');
          if (type === 'Hybrid') return job.location?.toLowerCase().includes('hybrid');
          return false;
        });

      // Salary range
      const matchesSalary = 
        (!job.salary?.min || job.salary.min >= searchFilters.salaryRange[0]) &&
        (!job.salary?.max || job.salary.max <= searchFilters.salaryRange[1]);

      return matchesSearch && matchesClassification && matchesJobType && 
             matchesWorkType && matchesSalary;
    });

    // Apply sorting
    filtered = sortJobs(filtered, searchFilters.sortBy);
    setFilteredJobs(filtered);
  };

  const isWithinDateRange = (jobDate, filter) => {
    if (!jobDate) return true;
    
    const now = new Date();
    const posted = new Date(jobDate);
    const diffDays = Math.ceil((now - posted) / (1000 * 60 * 60 * 24));
    
    switch (filter) {
      case '24h': return diffDays <= 1;
      case '3d': return diffDays <= 3;
      case '7d': return diffDays <= 7;
      case '30d': return diffDays <= 30;
      default: return true;
    }
  };

  const sortJobs = (jobList, sortOption) => {
    const sorted = [...jobList];
    
    switch (sortOption) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'salary-high':
        return sorted.sort((a, b) => (b.salary || 0) - (a.salary || 0));
      case 'salary-low':
        return sorted.sort((a, b) => (a.salary || 0) - (b.salary || 0));
      case 'company':
        return sorted.sort((a, b) => (a.company || '').localeCompare(b.company || ''));
      case 'relevance':
      default:
        return sorted;
    }
  };

  return {
    filteredJobs,
    searchFilters,
    updateFilter,
    clearFilters,
    getActiveFiltersCount,
    handleSearch
  };
};