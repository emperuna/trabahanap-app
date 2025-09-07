import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16" style={{ backgroundColor: "#313335" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Find Your Next Opportunity?
        </h2>
        <p className="text-xl mb-8" style={{ color: "#86888a" }}>
          Join thousands of professionals who have found their dream jobs through TrabaHanap
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: "#0077b5" }}
          >
            Create Account
          </Link>
          <Link
            to="/jobs"
            className="border-2 border-white text-white hover:bg-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            style={{ color: "#86888a" }}
            onMouseEnter={(e) => (e.target.style.color = "#313335")}
            onMouseLeave={(e) => (e.target.style.color = "#86888a")}
          >
            Explore Jobs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;