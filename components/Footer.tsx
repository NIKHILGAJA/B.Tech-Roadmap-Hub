import React from 'react';

// Icons for contact details
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-card-bg)]/50 backdrop-blur-lg border-t border-[var(--color-border)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">About B.Tech Roadmap Hub</h3>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              B.Tech Roadmap Hub is an AI-powered platform that helps students design their career journey. 
              From core subjects to projects, internships, and career paths, it provides a complete roadmap for every branch of B.Tech.
            </p>
          </div>
          
          {/* Contact Section */}
          <div className="md:justify-self-end">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <EmailIcon />
                <a href="mailto:nikhilgaja0305@gmail.com" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-colors">
                  nikhilgaja0305@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <PhoneIcon />
                <a href="tel:+919542657321" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-colors">
                  +91 9542657321
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <LinkedInIcon />
                <a href="https://www.linkedin.com/in/nikhil-gaja-aa13b3276/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary-light)] transition-colors transform hover:scale-105 inline-block">
                  Nikhil Gaja
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-8 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            © 2025 B.Tech Roadmap Hub. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
