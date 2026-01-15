import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-title', {
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top 80%',
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      });

      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
        },
        duration: 0.8,
        y: 60,
        opacity: 0,
        delay: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.social-link', {
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 85%',
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { name: 'GitHub', icon: '🔗', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Email', icon: '✉️', url: '#' },
  ];

  return (
    <footer id="contact" ref={sectionRef} className="bg-gray-900 text-white">
      {/* Contact Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="contact-title text-4xl md:text-5xl font-bold text-center mb-4">
            Get In Touch
          </h2>
          <p className="contact-title text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="contact-form space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors text-white resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-green-400 text-center">Message sent successfully! ✓</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-center">Failed to send. Please try again.</p>
              )}
            </form>

            {/* Contact Info */}
            <div className="contact-form space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  I'm always open to discussing new projects, creative ideas, or opportunities 
                  to be part of your vision. Feel free to reach out through the form or connect 
                  with me on social media.
                </p>
              </div>

              {/* Social Links */}
              <div className="social-links">
                <h4 className="text-lg font-semibold mb-4">Find Me Online</h4>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map(link => (
                    <a
                      key={link.name}
                      href={link.url}
                      className="social-link flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {link.icon}
                      </span>
                      <span className="font-medium">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 DranrebWen. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with React, Tailwind CSS & GSAP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
