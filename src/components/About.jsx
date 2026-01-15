import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-title', {
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      });

      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          duration: 0.6,
          y: 60,
          opacity: 0,
          delay: index * 0.15,
          ease: 'power3.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { name: 'Frontend', items: ['React', 'JavaScript', 'Tailwind CSS', 'GSAP'], icon: '💻' },
    { name: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST API'], icon: '⚙️' },
    { name: 'Tools', items: ['Git', 'Vite', 'VS Code', 'Figma'], icon: '🛠️' },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="about-title text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div ref={el => cardsRef.current[0] = el} className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Who I Am</h3>
            <p className="text-gray-600 leading-relaxed">
              I'm a passionate full-stack developer with a keen eye for design and a love for creating 
              seamless user experiences. With expertise in modern web technologies, I bring ideas to life 
              through clean code and elegant solutions.
            </p>
            <p className="text-gray-600 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or sharing knowledge with the developer community.
            </p>
          </div>

          <div ref={el => cardsRef.current[1] = el} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span className="text-gray-700">Based in Your Location</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎓</span>
                <span className="text-gray-700">Computer Science Graduate</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <span className="text-gray-700">Open for Opportunities</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">☕</span>
                <span className="text-gray-700">Coffee Enthusiast</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={el => cardsRef.current[index + 2] = el}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition-all duration-300 hover:shadow-xl"
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{skill.name}</h4>
              <div className="flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <span 
                    key={item}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
