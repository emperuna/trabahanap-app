import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo/TrabaHanap-Brandname.svg';
import "./styles/Hero.css";
import "../components/styles/Home.css";

const Hero = () => {
  return (
    <section style={{ backgroundColor: "var(--background-dark)", position: "relative", overflow: "hidden" }} className="text-white py-16 lg:py-24">
      {/* Bouncing Light Circles */}
      <div className="bouncing-circle circle-1"></div>
      <div className="bouncing-circle circle-2"></div>
      <div className="bouncing-circle circle-3"></div>
      <div className="bouncing-circle circle-4"></div>
      <div className="bouncing-circle circle-5"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: "relative", zIndex: 1 }}>
        <div className="text-center">
          {/* TrabaHanap Logo replacing Powered by AI Badge */}
          <div className="mb-4 mt-8">
            <img 
              src={logo} 
              alt="TrabaHanap" 
              style={{
                height: '20px',
                width: 'auto',
                margin: '0 auto',
                display: 'block'
              }}
            />
          </div>

          {/* Main Headline */}
          <h1 
            className="font-bold mb-6"
            style={{ 
              fontSize: "4rem", 
              lineHeight: "1.1"
            }}
          >
            <span style={{ color: "white" }}>Find Your </span>
            <span style={{
              background: "linear-gradient(135deg, #a855f7, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Dream Job</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{ color: "#9ca3af", lineHeight: "1.6" }}
          >
            Connect with top employers and discover opportunities that match your skills. The future of job hunting is here.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              className="breathing-button"
              style={{
                color: "#fff",
                fontWeight: "600",
                padding: "16px 32px",
                borderRadius: "12px",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "center"
              }}
            >
              <span>Start Job Search</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            
            <button
              style={{
                background: "transparent",
                color: "#fff",
                fontWeight: "600",
                padding: "16px 32px",
                borderRadius: "12px",
                fontSize: "1rem",
                border: "2px solid #374151",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "center"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21"/>
              </svg>
              Post Jobs
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 
                style={{ 
                  fontSize: "3rem", 
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                10K+
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "1.1rem" }}>Active Jobs</p>
            </div>
            
            <div className="text-center">
              <h3 
                style={{ 
                  fontSize: "3rem", 
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                5K+
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "1.1rem" }}>Companies</p>
            </div>
            
            <div className="text-center">
              <h3 
                style={{ 
                  fontSize: "3rem", 
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                98%
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "1.1rem" }}>Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;