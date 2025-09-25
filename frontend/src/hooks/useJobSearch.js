import { useState, useEffect } from 'react';

export const useJobSearch = (jobs) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    locationFilter: '',
    jobTypeFilter: '',
    salaryRange: [0, 200000],
    experienceLevel: '',
    companySize: '',
    remoteWork: false,
    datePosted: '',
    selectedSkills: [],
    industryFilter: '',
    sortBy: 'relevance',
    showFilters: false
  });

  // Popular skills for filtering
  const popularSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PHP', 'MySQL',
    'MongoDB', 'AWS', 'Docker', 'Git', 'HTML/CSS', 'TypeScript', 'Vue.js',
    'Angular', 'Laravel', 'Spring Boot', 'PostgreSQL', 'Redis', 'GraphQL'
  ];

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
      locationFilter: '',
      jobTypeFilter: '',
      salaryRange: [0, 200000],
      experienceLevel: '',
      companySize: '',
      remoteWork: false,
      datePosted: '',
      selectedSkills: [],
      industryFilter: '',
      sortBy: 'relevance',
      showFilters: false
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchFilters.searchTerm) count++;
    if (searchFilters.locationFilter) count++;
    if (searchFilters.jobTypeFilter) count++;
    if (searchFilters.salaryRange[0] > 0 || searchFilters.salaryRange[1] < 200000) count++;
    if (searchFilters.experienceLevel) count++;
    if (searchFilters.companySize) count++;
    if (searchFilters.remoteWork) count++;
    if (searchFilters.datePosted) count++;
    if (searchFilters.selectedSkills.length > 0) count++;
    if (searchFilters.industryFilter) count++;
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
      // Basic search
      const matchesSearch = !searchFilters.searchTerm || 
        job.title?.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchFilters.searchTerm.toLowerCase());
      
      // Location filter
      const matchesLocation = !searchFilters.locationFilter || 
        job.location?.toLowerCase().includes(searchFilters.locationFilter.toLowerCase());
      
      // Job type filter
      const matchesJobType = !searchFilters.jobTypeFilter || job.jobType === searchFilters.jobTypeFilter;
      
      // Salary range filter
      const jobSalary = job.salary || 0;
      const matchesSalary = jobSalary >= searchFilters.salaryRange[0] && jobSalary <= searchFilters.salaryRange[1];
      
      // Experience level filter
      const matchesExperience = !searchFilters.experienceLevel || 
        job.experienceLevel === searchFilters.experienceLevel ||
        job.requirements?.toLowerCase().includes(searchFilters.experienceLevel.toLowerCase());
      
      // Remote work filter
      const matchesRemote = !searchFilters.remoteWork || 
        job.jobType?.toLowerCase().includes('remote') ||
        job.location?.toLowerCase().includes('remote');
      
      // Date posted filter
      const matchesDate = !searchFilters.datePosted || isWithinDateRange(job.createdAt, searchFilters.datePosted);
      
      // Skills filter
      const matchesSkills = searchFilters.selectedSkills.length === 0 || 
        searchFilters.selectedSkills.some(skill => 
          job.requirements?.toLowerCase().includes(skill.toLowerCase()) ||
          job.description?.toLowerCase().includes(skill.toLowerCase())
        );
      
      // Industry filter
      const matchesIndustry = !searchFilters.industryFilter ||
        job.industry === searchFilters.industryFilter ||
        job.company?.toLowerCase().includes(searchFilters.industryFilter.toLowerCase());
      
      return matchesSearch && matchesLocation && matchesJobType && 
             matchesSalary && matchesExperience && matchesRemote && 
             matchesDate && matchesSkills && matchesIndustry;
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
    popularSkills,
    updateFilter,
    clearFilters,
    getActiveFiltersCount,
    handleSearch
  };
};