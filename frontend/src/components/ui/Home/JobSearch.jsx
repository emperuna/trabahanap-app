import React from "react";

const JobSearch = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#313335" }}>
            Start Your Job Search
          </h2>
          <p className="text-lg" style={{ color: "#86888a" }}>
            Search from thousands of job opportunities
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#313335" }}
                >
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  style={{ borderColor: "#caccce" }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#313335" }}
                >
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Manila, Philippines"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  style={{ borderColor: "#caccce" }}
                />
              </div>
              <div className="flex items-end">
                <button
                  className="w-full text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 hover:opacity-90"
                  style={{ backgroundColor: "#0077b5" }}
                >
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSearch;