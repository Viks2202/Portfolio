import React, { useState } from 'react';
const projects = [
  {
    id: 1,
    title: 'Modern Portfolio Website',
    description:
      'A sleek and responsive portfolio website showcasing my work, skills, and contact information. Built with React.js.',
    link: 'https://github.com/Viks2202/Portfolio',
  },
  {
    id: 2,
    title: 'E-Commerce Website',
    description:
      'A full-featured e-commerce platform with product catalogs, shopping cart, and payment integration. Built using React, Node.js and MongoDB.',
    link: 'https://github.com/vikassharma/ecommerce-website',
  },
];

const skills = [
  {
    name: 'HTML',
    topics: ['Semantic Elements', 'Forms & Inputs', 'Accessibility', 'HTML5 APIs'],
  },
  {
    name: 'CSS',
    topics: ['Flexbox', 'Grid', 'Responsive Design', 'Animations & Transitions', 'Sass/LESS'],
  },
  {
    name: 'JavaScript',
    topics: ['ES6+', 'DOM Manipulation', 'Fetch API/AJAX', 'Event Handling', 'Async Programming'],
  },
  {
    name: 'React JS',
    topics: ['Functional Components', 'Hooks (useState, useEffect)', 'React Router', 'State Mgmt', 'Context API'],
  },
  {
    name: 'SQL',
    topics: ['Joins', 'Indexes', 'Normalization', 'Stored Procedures', 'Transactions'],
  },
  {
    name: 'NodeJS',
    topics: ['Express.js', 'Middleware', 'REST APIs', 'Authentication', 'Error Handling'],
  },
  {
    name: 'MongoDB',
    topics: ['NoSQL Concepts', 'CRUD Ops', 'Aggregation', 'Indexes', 'Replication & Sharding'],
  },
  {
    name: 'Git',
    topics: ['Version Control Basics', 'Branching & Merging', 'Pull Requests', 'Rebasing', 'CI/CD'],
  },
];

function App() {
  const [expandedSkillIndex, setExpandedSkillIndex] = useState(null);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('about'); // default visible

  const toggleSkill = (index) => {
    setExpandedSkillIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setExpandedSkillIndex(null); // reset skill expanded if leaving skills section
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(true);
    e.target.reset();
    setTimeout(() => setContactSuccess(false), 3000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          background-color: #1e1e2f;
          color: #e1e8f0;
          font-family: 'Montserrat', sans-serif;
          scroll-behavior: smooth;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a {
          color: #8fb8d4;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.3s ease;
          position: relative;
          user-select: text;
          cursor: pointer;
        }
        a:hover {
          color: #a1c1e8;
          text-shadow: 0 0 6px #a1c1e8;
        }
        a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #8fb8d4;
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        a:hover::after {
          width: 100%;
        }
        header {
          background: #2c2b3c;
          text-align: center;
          padding: 2.5rem 1rem 2.5rem;
          box-shadow: 0 5px 15px rgba(143, 184, 212, 0.22);
          position: sticky;
          top: 0;
          z-index: 1000;
          animation: fadeSlideDown 1s ease forwards;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        header h1 {
          font-size: 3rem;
          margin: 0;
          font-weight: 900;
          color: #aec9e9;
          filter: drop-shadow(0 0 5px rgba(174,201,233,0.5));
          user-select: none;
          cursor: default;
          animation: swaySubtle 7s ease-in-out infinite;
        }
        header p {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 0.25rem;
          color: #c3cee4;
          user-select: none;
        }
        .nav-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.2rem;
          flex-wrap: wrap;
        }
        .nav-links a {
          font-weight: 700;
          font-size: 1.1rem;
          padding: 0.3rem 0.9rem;
          border-radius: 0.5rem;
          transition: background-color 0.3s ease;
          user-select: none;
        }
        .nav-links a[aria-current="page"] {
          background-color: #5362ab;
          color: white;
          cursor: default;
        }
        .nav-links a:hover:not([aria-current="page"]), .nav-links a:focus:not([aria-current="page"]) {
          background-color: #3e3d57;
          outline: none;
          color: #a1c1e8;
        }
        .social-icons {
          margin: 1rem auto 3rem;
          max-width: 850px;
          display: flex;
          justify-content: center;
          gap: 2.4rem;
          z-index: 1001;
        }
        .social-link {
          display: inline-flex;
          color: #8fb8d4;
          font-size: 2rem;
          transition: color 0.3s ease, transform 0.3s ease;
          cursor: pointer;
          animation: floatSlowAlt 5s ease-in-out infinite;
        }
        .social-link:hover,
        .social-link:focus {
          color: #a1c1e8;
          transform: translateY(-6px) scale(1.1);
          outline: none;
        }
        main {
          max-width: 850px;
          margin: 1rem auto 4rem;
          padding: 0 1.2rem;
        }
        section {
          background: #2f2e40;
          margin-bottom: 2.6rem;
          padding: 2rem 2.5rem 2.4rem;
          box-shadow: 0 6px 20px rgba(143, 184, 212, 0.13);
          border-radius: 1.8rem 1.1rem 1.8rem 1.1rem;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          user-select: text;
          opacity: 0;
          transform: translateY(40px);
          animation-fill-mode: forwards;
          animation-duration: 0.8s;
          animation-timing-function: ease;
          animation-name: fadeSlideUp;
          display: none;
        }
        section.active {
          opacity: 1;
          transform: translateY(0);
          display: block;
        }
        section:hover,
        section:focus-within {
          box-shadow: 0 16px 38px rgba(143, 184, 212, 0.35);
          outline: none;
          transform: translateY(-5px);
        }
        section h2 {
          font-weight: 900;
          color: #a3bae5;
          font-size: 2rem;
          margin-top: 0;
          margin-bottom: 1.3rem;
          border-left: 7px solid #6899d7;
          padding-left: 1rem;
          letter-spacing: 0.04em;
          user-select: none;
        }
        #about p {
          font-size: 1.15rem;
          color: #cadaec;
          max-width: 720px;
          margin: 0 auto;
          line-height: 1.6;
        }
        #projects .project-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.9rem;
        }
        .project-card {
          background: #3d4161;
          border-radius: 1.4rem 1rem 1.4rem 1rem;
          box-shadow: 0 4px 12px rgba(104, 143, 193, 0.25);
          padding: 1.5rem 2rem 2rem;
          cursor: default;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: floatSlow 6s ease-in-out infinite;
          position: relative;
          color: #c8d4f0;
        }
        .project-card:hover,
        .project-card:focus-within {
          transform: translateY(-10px) scale(1.035);
          box-shadow: 0 20px 45px rgba(104, 143, 193, 0.5);
          outline: none;
          animation-play-state: paused;
        }
        .project-card h3 {
          font-weight: 900;
          color: #b2c7f0;
          font-size: 1.45rem;
          margin-bottom: 0.5rem;
          user-select: none;
        }
        .project-card p {
          color: #bfcaf3;
          font-size: 1rem;
          line-height: 1.44;
          margin: 0 0 1rem 0;
          user-select: text;
        }
        .project-card a {
          font-weight: 700;
          font-size: 1rem;
          color: #2e3e64;
          background-color: #9bb9f1;
          padding: 0.55rem 1.1rem;
          border-radius: 0.65rem;
          display: inline-block;
          box-shadow: 0 8px 20px rgba(155, 185, 241, 0.5);
          transition: background-color 0.3s ease, transform 0.25s ease;
          user-select: none;
          text-align: center;
        }
        .project-card a:hover {
          background-color: #6591d1;
          color: #f3f7ff;
          transform: scale(1.07);
        }
        #skills ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          max-width: 720px;
          justify-content: center;
        }
        .skill-item {
          cursor: pointer;
          padding: 0.6rem 1.6rem;
          border-radius: 2.7rem 0.7rem 2.7rem 0.7rem;
          font-weight: 700;
          user-select: none;
          position: relative;
          background-color: #859ddf;
          color: #1f2e4f;
          box-shadow: 0 3px 10px rgba(104, 136, 207, 0.35);
          transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
          animation: floatSlowAlt 5s ease-in-out infinite;
        }
        .skill-item:hover {
          background-color: #aac3ff;
          color: #172344;
          box-shadow: 0 12px 30px rgba(170, 195, 255, 0.6);
          transform: scale(1.09);
          z-index: 10;
        }
        .skill-item.active {
          background-color: #172344;
          color: #aec7ff;
          box-shadow: 0 20px 44px rgba(23, 35, 68, 0.8);
          transform: scale(1.2);
          z-index: 20;
          animation-play-state: paused;
        }
        .topics-list {
          margin-top: 0.8rem;
          margin-left: 1.8rem;
          margin-bottom: 1rem;
          padding: 1rem 1.2rem;
          background: #405d9a;
          color: #d6e2ff;
          font-size: 0.96rem;
          border-radius: 1rem 1rem 1rem 0.7rem;
          box-shadow: inset 0 1px 4px rgba(25, 50, 95, 0.5);
          max-width: 720px;
          line-height: 1.45;
          user-select: text;
          animation: fadeSlideUp 0.5s ease forwards;
        }
        .topics-list li {
          margin-bottom: 0.33rem;
          list-style: disc;
          margin-left: 1.25rem;
        }
        #contact {
          position: relative;
        }
        #contact form {
          max-width: 520px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          padding: 0 0.6rem 0.4rem;
          border-radius: 1.7rem 0 1.7rem 0;
          background: #405d9a;
          box-shadow: 0 14px 32px rgba(104, 136, 207, 0.45);
          animation: floatSlow 7s ease-in-out infinite;
          transition: box-shadow 0.3s ease;
          color: #d6e2ff;
        }
        #contact form:focus-within {
          box-shadow: 0 20px 48px rgba(104, 136, 207, 0.7);
          outline: none;
        }
        #contact label {
          font-weight: 700;
          color: #becffb;
        }
        #contact input,
        #contact textarea {
          padding: 0.9rem 1.1rem;
          border-radius: 1.1rem;
          border: 2px solid #7b8fdd;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          color: #e1e9ff;
          background: #d7e2f9;
          box-shadow: inset 0 0 8px rgba(183, 197, 251, 0.6);
        }
        #contact input::placeholder,
        #contact textarea::placeholder {
          color: #a3b2e0;
        }
        #contact input:focus,
        #contact textarea:focus {
          outline: none;
          border-color: #aac0ff;
          box-shadow: 0 0 12px rgba(170, 192, 255, 0.8);
          background: #f0f4ff;
          color: #223764;
        }
        #contact button {
          background: #92a9ff;
          color: #223764;
          padding: 1rem 1.6rem;
          font-weight: 900;
          border: none;
          border-radius: 2rem 0.9rem 2rem 0.9rem;
          cursor: pointer;
          box-shadow: 0 6px 12px rgba(146, 169, 255, 0.35);
          font-size: 1.15rem;
          user-select: none;
          transition: background-color 0.4s ease, box-shadow 0.4s ease, transform 0.25s ease;
          animation-fill-mode: forwards;
          animation-duration: 0.8s;
          animation-name: none;
        }
        #contact button:disabled {
          background-color: #647aac;
          cursor: default;
          box-shadow: none;
          color: #ccd4f6;
        }
        #contact button:hover:not(:disabled) {
          background-color: #576ecc;
          box-shadow: 0 8px 18px rgba(87, 110, 204, 0.5);
          transform: scale(1.05);
        }
        footer {
          background: #2c2b3c;
          border-top: 5px solid #405d9a;
          padding: 1.7rem 1rem;
          color: #b5c5e7;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
          user-select: none;
          box-shadow: 0 -3px 8px rgba(64, 93, 154, 0.22);
          animation: fadeSlideUp 1.2s ease forwards;
          opacity: 0;
          transform: translateY(40px);
          animation-delay: 0.6s;
          animation-fill-mode: forwards;
        }
        @keyframes fadeSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        @keyframes swaySubtle {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
        }
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes floatSlowAlt {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>

      <header>
        <h1 tabIndex="0" aria-label="Site Owner Name">Vikas Sharma</h1>
        <p tabIndex="0">Frontend Developer | React.js & Full-Stack Enthusiast</p>
        <nav className="nav-links" aria-label="Main navigation links">
          {['about', 'skills', 'projects', 'contact'].map((sec) => (
            <a
              href="#!"
              key={sec}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(sec);
              }}
              aria-current={activeSection === sec ? 'page' : undefined}
              tabIndex="0"
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </a>
          ))}
        </nav>
        <div className="social-icons" aria-label="Social media links">
          <a
            href="mailto:viksr2202@gmail.com"
            className="social-link"
            aria-label="Send email to Vikas Sharma"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Email SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2.5L12 13 4 6.5V6h16v.5z"/>
            </svg>
          </a>
          <a
            href="http://www.linkedin.com/in/vikas2103"
            className="social-link"
            aria-label="LinkedIn profile of Vikas Sharma"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* LinkedIn SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="M20 0H4a4 4 0 00-4 4v16a4 4 0 004 4h16a4 4 0 004-4V4a4 4 0 00-4-4zm-11.338 20H5v-9h3.662v9zm-1.831-10.29a2.122 2.122 0 112.122-2.121 2.122 2.122 0 01-2.122 2.121zm13.17 10.29h-3.666v-4.528c0-1.08-.02-2.466-1.504-2.466-1.507 0-1.737 1.176-1.737 2.392v4.602H9V11.5h3.52v1.182h.048a3.87 3.87 0 013.484-1.912c3.727 0 4.408 2.455 4.408 5.645v5.585z"/>
            </svg>
          </a>
          <a
            href="https://github.com/Viks2202"
            className="social-link"
            aria-label="GitHub profile of Vikas Sharma"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* GitHub SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.207 11.385c.6.11.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.723-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 1.205.087 1.84 1.237 1.84 1.237 1.07 1.833 2.807 1.303 3.492.996.108-.776.418-1.304.76-1.604-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.467-2.382 1.235-3.22-.124-.304-.535-1.523.117-3.177 0 0 1.007-.322 3.3 1.23a11.5 11.5 0 013.003-.405c1.02.005 2.045.14 3.003.405 2.29-1.553 3.29-1.23 3.29-1.23.653 1.654.242 2.874.118 3.177.77.838 1.233 1.91 1.233 3.22 0 4.606-2.807 5.625-5.48 5.92.43.372.823 1.1.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.192.694.8.576A12 12 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </header>

      <main>
        <section
          id="about"
          aria-label="About me section"
          tabIndex="0"
          className={activeSection === 'about' ? 'active' : ''}
        >
          <h2>About Me</h2>
          <p>
            Hello! I'm Vikas Sharma, a dedicated frontend and full-stack developer proficient in building modern, responsive web applications.
            I am familiar with React.js along with backend technologies like Node.js and MongoDB. Passionate about elegant UI, seamless UX, and clean code.
          </p>
        </section>

        <section
          id="skills"
          aria-label="Skills section"
          tabIndex="0"
          className={activeSection === 'skills' ? 'active' : ''}
        >
          <h2>Skills</h2>
          <ul>
            {skills.map(({ name, topics }, idx) => (
              <li
                key={name}
                className={`skill-item ${expandedSkillIndex === idx ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => toggleSkill(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSkill(idx);
                  }
                }}
                aria-expanded={expandedSkillIndex === idx}
                aria-controls={`topics-list-${idx}`}
                aria-label={`Toggle topics for ${name}`}
              >
                {name}
                {expandedSkillIndex === idx && (
                  <ul id={`topics-list-${idx}`} className="topics-list">
                    {topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="projects"
          aria-label="Projects section"
          tabIndex="0"
          className={activeSection === 'projects' ? 'active' : ''}
        >
          <h2>Projects</h2>
          <div className="project-list">
            {projects.map(({ id, title, description, link }) => (
              <article
                key={id}
                className="project-card"
                tabIndex="0"
                aria-label={`Project titled ${title}`}
              >
                <h3>{title}</h3>
                <p>{description}</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code of ${title}`}
                >
                  View Source
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          aria-label="Contact me section"
          tabIndex="0"
          className={activeSection === 'contact' ? 'active' : ''}
        >
          <h2>Contact Me</h2>
          <form onSubmit={handleContactSubmit} aria-label="Contact form" noValidate>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              name="name"
              required
              aria-required="true"
              autoComplete="name"
            />

            <label htmlFor="email-input">Email</label>
            <input
              id="email-input"
              type="email"
              placeholder="you@example.com"
              name="email"
              required
              aria-required="true"
              autoComplete="email"
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Your message here..."
              name="message"
              required
              aria-required="true"
            ></textarea>

            <button type="submit" aria-label="Send message button" disabled={contactSuccess}>
              {contactSuccess ? 'Sent! Thank you.' : 'Send'}
            </button>
          </form>
        </section>
      </main>

      <footer aria-label="Footer">
        <p>
          “Code is like humor. When you have to explain it, it’s bad.” – Cory House
        </p>
      </footer>
    </>
  );
}

export default App;

