import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom Magic Card Component with spotlight hover effect
const MagicCard = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden bg-white border border-gray-200/60 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Spotlight gradient effect */}
      {isHovering && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-3xl"
          style={{
            background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(156, 163, 175, 0.15), transparent 40%)`,
          }}
        />
      )}
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-[-2px] rounded-3xl"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(156, 163, 175, 0.4), transparent 50%)`,
          }}
        />
      </div>
      
      <div className="relative h-full z-10">
        {children}
      </div>
    </div>
  );
};

// Custom Bento Grid Component
const BentoGrid = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto ${className}`}>
      {children}
    </div>
  );
};

// Custom Bento Card Component
const BentoCard = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

// Main About Component
const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade-in animation
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out'
      });

      // Staggered card animations
      const cards = gridRef.current?.querySelectorAll('.bento-card');
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: 0.3,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Facts data
  const facts = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      label: '☕ Coffee',
      value: 'Enthusiast'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Camarines Norte',
      value: 'Based in Philippines'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Available',
      value: 'Open for Work'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: 'B.S. in CS',
      value: 'Computer Science'
    }
  ];

  // Skills data
  const skills = [
    { name: 'Frontend', icon: '💻' },
    { name: 'Backend', icon: '⚙️' },
    { name: 'Tools', icon: '🛠️' }
  ];

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="px-6 md:px-12 lg:mx-[20%]">
        <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-8 md:mb-12">
          About Me
        </h2>

        {/* Bento Grid Layout */}
        <BentoGrid className="lg:grid-rows-2">
        <div ref={gridRef} className="contents">
          
          {/* Profile Card - Large Bento Item (2x2) */}
          <BentoCard className="lg:col-span-2 lg:row-span-2 bento-card">
            <MagicCard className="h-full min-h-[350px] md:min-h-[400px]">
              <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 via-white to-gray-100">
                {/* Abstract SVG Background Pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-96 h-96 text-gray-200/40">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="50" r="40" fill="currentColor" opacity="0.3" />
                      <rect x="120" y="80" width="60" height="60" fill="currentColor" opacity="0.25" transform="rotate(15 150 110)" />
                      <polygon points="80,150 120,180 40,180" fill="currentColor" opacity="0.3" />
                      <circle cx="160" cy="160" r="30" fill="currentColor" opacity="0.25" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 text-gray-300/20">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="150" r="50" fill="currentColor" opacity="0.3" />
                    </svg>
                  </div>
                </div>
                
                {/* Profile Image */}
                <img
                  src="/assets/profile/profile-1.png"
                  alt="Profile"
                  className="absolute scale-[1.4] md:scale-[1.65] right-[-1rem] md:right-[-2rem] top-[3rem] md:top-[5rem] h-full w-auto object-contain object-right z-10 drop-shadow-2xl transition-all duration-500 group-hover:scale-[1.5] md:group-hover:scale-[1.7] group-hover:blur-[2px]"
                />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-4 md:p-6 lg:p-8 z-20 max-w-md bg-gradient-to-r from-white/95 to-transparent backdrop-blur-sm rounded-tr-3xl">
                  <div className="space-y-1 mb-2 md:mb-3">
                    <div className="inline-block px-2 md:px-3 py-1 bg-gray-100 text-gray-700 text-xs md:text-sm font-semibold rounded-full mb-1 md:mb-2">Full-Stack Developer</div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-1">
                      Who I Am?
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 font-medium">
                      Designer & Creative Technologist
                    </p>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless user experiences. With expertise in modern web technologies, I bring ideas to life through clean code and elegant solutions.
                  </p>
                </div>
              </div>
            </MagicCard>
          </BentoCard>

          {/* Quick Facts Card - Regular Bento Item */}
          <BentoCard className="lg:col-span-1 bento-card">
            <MagicCard className="h-full p-4 md:p-6 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center gap-2 mb-4 md:mb-5">
                <div className="w-1 h-4 md:h-5 bg-gray-900 rounded-full"></div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                  Quick Facts
                </h3>
              </div>
              <div className="space-y-4">
                {facts.map((fact, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                    <div className="mt-0.5 text-gray-700 bg-gray-100 p-2 rounded-lg">
                      {fact.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {fact.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {fact.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MagicCard>
          </BentoCard>

          {/* Empty Container - Preserving grid structure */}
          <BentoCard className="lg:col-span-1 bento-card">
            <MagicCard className="h-full p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="h-full flex items-center justify-center">
                <div className="text-4xl md:text-5xl opacity-10">✨</div>
              </div>
            </MagicCard>
          </BentoCard>

          {/* Individual Tech Stack Cards at Bottom */}
          {skills.map((skill, index) => (
            <BentoCard key={index} className="lg:col-span-1 bento-card">
              <MagicCard className="h-full p-4 md:p-6 bg-gradient-to-br from-white to-gray-50">
                <div className="flex flex-col items-center justify-center h-full group-hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl md:text-5xl mb-2 md:mb-3 p-2 md:p-3 bg-gray-100 rounded-xl group-hover:shadow-md transition-shadow duration-300">{skill.icon}</div>
                  <div className="text-base md:text-lg font-bold text-gray-900 mb-1">
                    {skill.name}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">Development</div>
                </div>
              </MagicCard>
            </BentoCard>
          ))}
        </div>

        </BentoGrid>
      </div>
    </section>
  );
};

export default About;
