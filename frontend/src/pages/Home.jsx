import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Connect with top employers and discover opportunities that match your skills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="bg-white text-primary-500 hover:bg-gray-50 font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Browse Jobs
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Job Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#313335' }}>
              Start Your Job Search
            </h2>
            <p className="text-lg" style={{ color: '#86888a' }}>
              Search from thousands of job opportunities
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#313335' }}>
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    style={{ borderColor: '#caccce' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#313335' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Manila, Philippines"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    style={{ borderColor: '#caccce' }}
                  />
                </div>
                <div className="flex items-end">
                  <button 
                    className="w-full text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 hover:opacity-90"
                    style={{ backgroundColor: '#0077b5' }}
                  >
                    Search Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#313335' }}>
              Why Choose TrabaHanap?
            </h2>
            <p className="text-lg" style={{ color: '#86888a' }}>
              We make job searching and hiring easier than ever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#0077b5' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#313335' }}>Easy Job Search</h3>
              <p style={{ color: '#86888a' }}>
                Find jobs that match your skills and preferences with our advanced search filters.
              </p>
            </div>

            <div className="text-center p-6">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#0077b5' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#313335' }}>Top Companies</h3>
              <p style={{ color: '#86888a' }}>
                Connect with leading companies and startups looking for talented professionals.
              </p>
            </div>

            <div className="text-center p-6">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#0077b5' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#313335' }}>Verified Opportunities</h3>
              <p style={{ color: '#86888a' }}>
                All job postings are verified to ensure quality and legitimate opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: '#313335' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#86888a' }}>
            Join thousands of professionals who have found their dream jobs through TrabaHanap
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 hover:opacity-90"
              style={{ backgroundColor: '#0077b5' }}
            >
              Create Account
            </Link>
            <Link
              to="/jobs"
              className="border-2 border-white text-white hover:bg-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              style={{ color: '#86888a' }}
              onMouseEnter={(e) => e.target.style.color = '#313335'}
              onMouseLeave={(e) => e.target.style.color = '#86888a'}
            >
              Explore Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
