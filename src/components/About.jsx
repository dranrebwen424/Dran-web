import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../../assets/profile/profile-1.png';
import { AnimatedList } from "@/components/ui/animated-list";

gsap.registerPlugin(ScrollTrigger);

// Custom Magic Card Component with enhanced glowing border hover effect
const MagicCard = ({ children, className = "", borderSize = "md" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Border size configurations
  const borderConfig = {
    sm: {
      container: '-inset-[1px]',
      outer: '-inset-[2px]',
      outerBlur: 'blur-md',
      middle: '-inset-[1px]',
      middleBlur: 'blur-sm',
      inner: '-inset-[0.5px]',
      opacity: { outer: 0.3, middle: 0.4, inner: 0.5 }
    },
    md: {
      container: '-inset-[1px]',
      outer: '-inset-[2px]',
      outerBlur: 'blur-md',
      middle: '-inset-[1px]',
      middleBlur: 'blur-sm',
      inner: '-inset-[0.5px]',
      opacity: { outer: 0.35, middle: 0.45, inner: 0.6 }
    }
  };

  const config = borderConfig[borderSize];

  return (
    <div
      className={`group relative rounded-3xl bg-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Multi-layer glowing border effect - positioned behind */}
      <div className={`absolute ${config.container} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
        {/* Outer glow layer with blur */}
        <div
          className={`absolute ${config.outer} rounded-3xl ${config.outerBlur} transition-all duration-300`}
          style={{
            background: isHovering 
              ? `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, ${config.opacity.outer}), rgba(147, 51, 234, ${config.opacity.outer * 0.6}), transparent 60%)`
              : 'transparent',
          }}
        />
        
        {/* Middle glow layer */}
        <div
          className={`absolute ${config.middle} rounded-3xl ${config.middleBlur} transition-all duration-300`}
          style={{
            background: isHovering 
              ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, ${config.opacity.middle}), rgba(147, 51, 234, ${config.opacity.middle * 0.65}), transparent 50%)`
              : 'transparent',
          }}
        />
        
        {/* Inner sharp border */}
        <div
          className={`absolute ${config.inner} rounded-3xl transition-all duration-300`}
          style={{
            background: isHovering 
              ? `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, ${config.opacity.inner}), rgba(147, 51, 234, ${config.opacity.inner * 0.75}), transparent 40%)`
              : 'transparent',
          }}
        />
      </div>
      
      {/* Content wrapper with border - always on top */}
      <div className={`relative h-full z-10 rounded-3xl border border-gray-200/60 group-hover:border-transparent transition-colors duration-300 shadow-sm ${className}`}>
        {/* Spotlight gradient effect on surface */}
        {isHovering && (
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 40%)`,
            }}
          />
        )}
        <div className="relative z-10 h-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

// Custom Bento Grid Component
const BentoGrid = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ${className}`}>
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
      // Title animation with more dramatic effect
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
      });

      // Animate each card individually as they come into view
      const cards = gridRef.current?.querySelectorAll('.bento-card');
      if (cards && cards.length > 0) {
        cards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
            duration: 0.6,
            y: 50,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
          });
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

  // Activities data for animated list
  const activities = [
    { text: "Coding", icon: "💻", color: "#3b82f6" },
    { text: "Learning", icon: "📚", color: "#10b981" },
    { text: "Coffee Break", icon: "☕", color: "#f59e0b" },
    { text: "Problem Solving", icon: "🧩", color: "#8b5cf6" },
    { text: "Building Projects", icon: "🏗️", color: "#ec4899" },
  ];

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="px-6 md:px-12 lg:mx-[13%]">
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">About Me</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Crafting digital experiences with passion and precision
          </p>
        </div>

        {/* Bento Grid Layout */}
        <BentoGrid className="lg:grid-rows-2">
        <div ref={gridRef} className="contents">
          
          {/* Profile Card - Large Bento Item (2x2) */}
          <BentoCard className="lg:col-span-2 lg:row-span-2 bento-card">
            <MagicCard className="h-[500px] md:h-[520px] lg:h-[540px]">
              <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Enhanced Abstract Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-96 h-96 text-blue-200/30">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="50" r="40" fill="currentColor" opacity="0.4" />
                      <rect x="120" y="80" width="60" height="60" fill="currentColor" opacity="0.3" transform="rotate(15 150 110)" />
                      <polygon points="80,150 120,180 40,180" fill="currentColor" opacity="0.35" />
                      <circle cx="160" cy="160" r="30" fill="currentColor" opacity="0.3" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 text-purple-200/25">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="150" r="50" fill="currentColor" opacity="0.4" />
                      <rect x="20" y="120" width="40" height="40" fill="currentColor" opacity="0.3" transform="rotate(-15 40 140)" />
                    </svg>
                  </div>
                </div>
                
                {/* Profile Image with better positioning */}
                <div className="relative md:absolute w-full h-[270px] md:h-full flex items-center justify-center md:block overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="relative md:absolute scale-[1.3] md:scale-[1.8] lg:scale-[1.5] md:left-auto md:right-[-1rem] lg:right-[10rem] md:top-[-1rem] lg:top-[5rem] h-full md:h-full w-auto object-contain z-10 drop-shadow-2xl transition-all duration-500 group-hover:scale-[1.35] md:group-hover:scale-[1.85] lg:group-hover:scale-[1.55]"
                  />
                </div>
                
                {/* Enhanced Content Box */}
                <div className="relative md:absolute bottom-0 md:bottom-3 left-0 md:left-3 right-0 md:right-auto p-4 md:p-5 lg:p-6 z-20 w-full md:w-auto md:max-w-sm lg:max-w-md bg-white/95 md:bg-gradient-to-r md:from-white/98 md:via-white/95 md:to-transparent backdrop-blur-md rounded-b-3xl md:rounded-3xl border-t md:border md:border-t-0 md:border-r border-gray-200/60 shadow-xl md:shadow-2xl">
                  <div className="space-y-0.5 md:space-y-1 mb-2 md:mb-3">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="inline-block px-2 py-0.5 md:px-2.5 md:py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] md:text-xs font-bold rounded-full shadow-lg">Full-Stack Developer</span>
                      <span className="inline-block px-2 py-0.5 md:px-2.5 md:py-1 bg-gray-100 text-gray-700 text-[10px] md:text-xs font-semibold rounded-full">Designer</span>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-0.5 leading-tight">
                      <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Who I Am?</span>
                    </h3>
                    <p className="text-xs md:text-sm lg:text-base text-gray-600 font-semibold leading-snug">
                      Dranreb Wen A. Balangbang
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
            <MagicCard borderSize="sm" className="h-[320px] md:h-[330px] lg:h-[280px] p-5 md:p-6 lg:p-7 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <h3 className="text-base md:text-lg font-bold tracking-tight text-gray-900">
                  Quick Facts
                </h3>
              </div>
              <div className="space-y-2">
                {facts.map((fact, index) => (
                  <div key={index} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group cursor-pointer">
                    <div className="mt-0.5 text-blue-600 bg-blue-100 p-2 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {fact.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs md:text-sm font-bold text-gray-900 leading-tight mb-0.5">
                        {fact.label}
                      </div>
                      <div className="text-xs text-gray-600 leading-tight">
                        {fact.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MagicCard>
          </BentoCard>

          {/* Daily Routine Card */}
          <BentoCard className="lg:col-span-1 bento-card overflow-hidden rounded-3xl">
            <MagicCard borderSize="sm" className="h-[280px] md:h-[330px] lg:h-[280px] min-h-[280px] md:min-h-[330px] lg:min-h-[280px] max-h-[280px] md:max-h-[330px] lg:max-h-[280px] overflow-hidden rounded-3xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-pink-50"></div>
              <div className="relative h-full w-full rounded-3xl p-5 md:p-6 lg:p-7 flex flex-col overflow-hidden">
                <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                  <div className="w-1.5 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  <h3 className="text-base md:text-lg font-bold tracking-tight text-gray-900">
                    Daily Routine
                  </h3>
                </div>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <AnimatedList delay={2000}>
                    {activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div 
                          className="text-base p-1.5 rounded-lg flex-shrink-0"
                          style={{ backgroundColor: `${activity.color}20` }}
                        >
                          {activity.icon}
                        </div>
                        <span className="text-xs md:text-sm font-semibold text-gray-700">
                          {activity.text}
                        </span>
                      </div>
                    ))}
                  </AnimatedList>
                </div>
              </div>
            </MagicCard>
          </BentoCard>

          {/* Individual Tech Stack Cards at Bottom */}
          {skills.map((skill, index) => {
            const gradients = [
              'from-blue-50 to-cyan-50',
              'from-green-50 to-emerald-50',
              'from-orange-50 to-amber-50'
            ];
            const iconBgs = [
              'bg-gradient-to-br from-blue-100 to-cyan-100',
              'bg-gradient-to-br from-green-100 to-emerald-100',
              'bg-gradient-to-br from-orange-100 to-amber-100'
            ];
            return (
              <BentoCard key={index} className="lg:col-span-1 bento-card">
                <MagicCard borderSize="sm" className={`h-[180px] md:h-[190px] lg:h-[200px] p-4 md:p-5 lg:p-6 bg-gradient-to-br ${gradients[index]}`}>
                  <div className="flex flex-col items-center justify-center h-full group-hover:scale-110 transition-all duration-300">
                    <div className={`text-3xl md:text-4xl mb-2.5 p-3 ${iconBgs[index]} rounded-2xl group-hover:shadow-xl transition-all duration-300 group-hover:rotate-6`}>{skill.icon}</div>
                    <div className="text-sm md:text-base font-bold text-gray-900 mb-0.5 leading-tight">
                      {skill.name}
                    </div>
                    <div className="text-xs text-gray-600 font-semibold leading-tight">Development</div>
                  </div>
                </MagicCard>
              </BentoCard>
            );
          })}
        </div>

        </BentoGrid>
      </div>
    </section>
  );
};

export default About;
