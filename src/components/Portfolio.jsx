import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef(null);
  const projectsRef = useRef([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);
  const carouselIntervalRef = useRef(null);

  const openLightbox = (item) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedItem(null);
  };

  // Handle body overflow when lightbox opens/closes
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  // Categories
  const categories = ['All', 'Animation', 'Branding', 'Design', 'Social Media'];

  // Featured video carousel
  const featuredVideos = [
    {
      title: 'Bouncing Ball Animation',
      description: 'Interactive physics-based animation showcasing smooth motion, collision detection, and realistic ball dynamics.',
      tech: ['Animation', 'Physics', 'JavaScript'],
      video: '/assets/portfolio/Bouncing-Ball.mp4',
    },
    {
      title: 'Walking Animation',
      description: 'Smooth character walking cycle with natural movement and fluid transitions.',
      tech: ['Animation', 'Character Design', 'Motion'],
      video: '/assets/portfolio/Walking Animation.mp4',
    },
    {
      title: 'Running Animation',
      description: 'Dynamic running animation with proper weight distribution and momentum.',
      tech: ['Animation', '2D', 'Motion Graphics'],
      video: '/assets/portfolio/Running Animation.mp4',
    },
    {
      title: 'Jumping Animation',
      description: 'Energetic jumping animation with realistic physics and timing.',
      tech: ['Animation', 'Physics', '2D'],
      video: '/assets/portfolio/Jumping Animation.mp4',
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    carouselIntervalRef.current = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % featuredVideos.length);
    }, 8000); // Change every 8 seconds

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [featuredVideos.length]);

  // Navigate to specific video
  const goToVideo = (index) => {
    setCurrentVideoIndex(index);
    // Reset interval when manually changing
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    carouselIntervalRef.current = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % featuredVideos.length);
    }, 8000);
  };

  // Navigate to previous video
  const goToPrevious = () => {
    const newIndex = currentVideoIndex === 0 ? featuredVideos.length - 1 : currentVideoIndex - 1;
    goToVideo(newIndex);
  };

  // Navigate to next video
  const goToNext = () => {
    const newIndex = (currentVideoIndex + 1) % featuredVideos.length;
    goToVideo(newIndex);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-title', {
        scrollTrigger: {
          trigger: '.portfolio-title',
          start: 'top 90%',
        },
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
      });

      gsap.from('.featured-carousel', {
        scrollTrigger: {
          trigger: '.featured-carousel',
          start: 'top 90%',
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
      });

      gsap.from('.category-filters', {
        scrollTrigger: {
          trigger: '.category-filters',
          start: 'top 90%',
        },
        duration: 0.5,
        y: 20,
        opacity: 0,
        ease: 'power2.out'
      });

      projectsRef.current.forEach((project, index) => {
        if (project) {
          gsap.from(project, {
            scrollTrigger: {
              trigger: project,
              start: 'top 90%',
            },
            duration: 0.6,
            y: 50,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power2.out'
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'Promotional Banner',
      description: 'Eye-catching promotional banner design with vibrant colors and modern layout',
      image: '/assets/portfolio/banner1.jpg',
      category: 'Design',
      height: 'tall', // for masonry
    },
    {
      title: 'Logo Branding',
      description: 'Professional logo and branding identity design',
      image: '/assets/portfolio/branding logo.jpg',
      category: 'Branding',
      height: 'medium',
    },
    {
      title: 'Event Invitation Design',
      description: 'Elegant invitation design for special events',
      image: '/assets/portfolio/Invitation.jpg',
      category: 'Design',
      height: 'tall',
    },
    {
      title: 'Modern Invitation',
      description: 'Contemporary invitation design with clean aesthetics',
      image: '/assets/portfolio/invitation1.jpg',
      category: 'Design',
      height: 'medium',
    },
    {
      title: 'Kasama Logo Branding',
      description: 'Complete brand identity and logo design for Kasama',
      image: '/assets/portfolio/kasama logo branding.jpg',
      category: 'Branding',
      height: 'short',
    },
    {
      title: 'Laicha Logo Branding',
      description: 'Brand identity design featuring unique logo concepts',
      image: '/assets/portfolio/logobranding-laicha.jpg',
      category: 'Branding',
      height: 'medium',
    },
    {
      title: 'Pieces of Me',
      description: 'Creative visual storytelling and artistic composition',
      image: '/assets/portfolio/peaces of me.jpg',
      category: 'Design',
      height: 'tall',
    },
    {
      title: 'Social Media Graphics',
      description: 'Engaging social media post designs and graphics',
      image: '/assets/portfolio/sociial media.png',
      category: 'Social Media',
      height: 'medium',
    },
    {
      title: 'T-Shirt Branding',
      description: 'Custom apparel design and branding for merchandise',
      image: '/assets/portfolio/tshirt branding.jpg',
      category: 'Branding',
      height: 'short',
    },
    {
      title: 'Wenn Branding',
      description: 'Brand identity and visual design system',
      image: '/assets/portfolio/wenn branding.jpg',
      category: 'Branding',
      height: 'medium',
    },
  ];

  // Filter projects by category
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="min-h-screen py-20 pb-70 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="portfolio-title text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          My Work
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and passion for web development
        </p>

        {/* Featured Video Carousel - Netflix Style */}
        <div className="mb-12 featured-carousel">
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            {/* Video Backgrounds with Blur Transition */}
            {featuredVideos.map((project, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  currentVideoIndex === index 
                    ? 'opacity-100 blur-0 scale-100' 
                    : 'opacity-0 blur-sm scale-105 pointer-events-none'
                }`}
              >
                <video 
                  ref={el => videoRefs.current[index] = el}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={project.video} type="video/mp4" />
                </video>
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-12 lg:p-16">
                  <div className="max-w-3xl">
                    <div className="mb-1.5 sm:mb-2 md:mb-3">
                      <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-lg">
                        ⭐ Featured
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1.5 sm:mb-2 md:mb-4 drop-shadow-lg line-clamp-2 sm:line-clamp-none">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-200 text-xs sm:text-sm md:text-lg lg:text-xl mb-2 sm:mb-4 md:mb-6 leading-relaxed drop-shadow-md line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-4 md:mb-8">
                      {project.tech.map(tech => (
                        <span 
                          key={tech}
                          className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-2 bg-white/20 backdrop-blur-md text-white rounded md:rounded-lg text-[10px] sm:text-xs md:text-sm font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 md:gap-4">
                      <button 
                        onClick={() => openLightbox(project)}
                        className="px-4 py-2 md:px-8 md:py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl flex items-center gap-1 md:gap-2 text-sm md:text-base"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="hidden sm:inline">View Project</span>
                        <span className="sm:hidden">View</span>
                      </button>
                      {/* More Info button removed */}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Previous video"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Next video"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider Indicators */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 md:gap-2 z-20">
              {featuredVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToVideo(index)}
                  className={`
                    h-0.5 md:h-1 rounded-full transition-all duration-300
                    ${currentVideoIndex === index 
                      ? 'w-8 md:w-12 bg-white' 
                      : 'w-6 md:w-8 bg-white/50 hover:bg-white/70'
                    }
                  `}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Category Filters - Modern Minimalist Design */}
        <div className="category-filters flex justify-center mb-12 overflow-x-auto px-4 sm:px-0">
          <div className="inline-flex gap-1.5 md:gap-2 p-1 md:p-1.5 bg-gray-100 rounded-full shadow-sm min-w-min">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-3 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${activeCategory === category 
                    ? 'bg-white text-gray-900 shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Let's Work Together Card - Asymmetrical Rectangle */}
        <div className="mb-12">
          <div 
            className="relative bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 max-w-6xl mx-auto group cursor-pointer"
            style={{ 
              borderRadius: '30px 10px 30px 10px',
              minHeight: '200px'
            }}
          >
            {/* 3D Marquee Background - Right Side with Enhanced Perspective */}
            <div 
              className="hidden sm:block absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden opacity-40"
              style={{ perspective: '400px' }}
            >
              <div 
                className="h-full flex gap-6 px-4"
                style={{
                  transform: 'translateX(-50px) translateY(0px) translateZ(-80px) rotateX(15deg) rotateY(-20deg) rotateZ(10deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Column 1 - scrolling up */}
                <div className="flex flex-col gap-8 animate-marquee-up" style={{ transformStyle: 'preserve-3d' }}>
                  {[...projects, ...projects].map((project, i) => (
                    <div 
                      key={`col1-${i}`} 
                      className="flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl transition-all group-hover:scale-110 duration-300 border border-white/20"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(20px)'
                      }}
                    >
                      <img src={project.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Column 2 - scrolling down */}
                <div className="flex flex-col gap-8 animate-marquee-down" style={{ transformStyle: 'preserve-3d' }}>
                  {[...projects, ...projects].reverse().map((project, i) => (
                    <div 
                      key={`col2-${i}`} 
                      className="flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl transition-all group-hover:scale-110 duration-300 border border-white/20"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(40px)'
                      }}
                    >
                      <img src={project.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Column 3 - scrolling up */}
                <div className="flex flex-col gap-8 animate-marquee-up" style={{ transformStyle: 'preserve-3d' }}>
                  {[...projects, ...projects].map((project, i) => (
                    <div 
                      key={`col3-${i}`} 
                      className="flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl transition-all group-hover:scale-110 duration-300 border border-white/20"
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(60px)'
                      }}
                    >
                      <img src={project.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Content Overlay - Left Side */}
            <div className="relative z-10 h-full flex items-center py-6 sm:py-0">
              <div className="w-full sm:w-1/2 px-4 sm:pl-8 md:pl-12 lg:pl-16 sm:pr-4">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6 text-center sm:text-left">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-2xl">
                      Let's Work Together!
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-lg">
                      Have a project in mind? Let's create something amazing.
                    </p>
                  </div>

                  <a 
                    href="#contact"
                    className="px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 bg-white text-blue-600 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-100 transition-all text-center shadow-2xl hover:scale-105 transform duration-300 whitespace-nowrap flex-shrink-0 text-sm sm:text-base"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            </div>

            {/* Custom CSS for 3D marquee animations */}
            <style jsx>{`
              @keyframes marquee-up {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
              @keyframes marquee-down {
                0% { transform: translateY(-50%); }
                100% { transform: translateY(0); }
              }
              .animate-marquee-up {
                animation: marquee-up 25s linear infinite;
              }
              .animate-marquee-down {
                animation: marquee-down 25s linear infinite;
              }
            `}</style>
          </div>
        </div>

        {/* Masonry Projects Grid */}
        <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 md:gap-8 space-y-4 sm:space-y-6 md:space-y-8">
          {filteredProjects.map((project, index) => {
            // Dynamic height classes for masonry effect
            const heightClass = project.height === 'tall' ? 'h-[300px] sm:h-[380px]' : 
                               project.height === 'short' ? 'h-[200px] sm:h-[240px]' : 
                               'h-[250px] sm:h-[300px]';
            
            return (
              <div
                key={project.title}
                ref={el => projectsRef.current[index + 1] = el}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer break-inside-avoid mb-6 md:mb-8"
              >
                {/* Project Image */}
                <div 
                  className={`${heightClass} relative overflow-hidden bg-gray-200 cursor-pointer`}
                  onClick={() => openLightbox(project)}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('bg-gradient-to-br', 'from-gray-300', 'to-gray-400');
                    }}
                  />
                  {/* Category Badge and Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* View Button */}
                  <button 
                    onClick={() => openLightbox(project)}
                    className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Project</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && selectedItem && (
          <div 
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div 
              className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image or Video */}
              <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl mb-4 max-h-[75vh]">
                {selectedItem.video ? (
                  <video 
                    className="max-w-full max-h-[75vh] w-auto h-auto"
                    autoPlay
                    loop
                    controls
                    playsInline
                  >
                    <source src={selectedItem.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    className="max-w-full max-h-[75vh] w-auto h-auto object-contain"
                  />
                )}
              </div>

              {/* Title and Description */}
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="text-gray-300">{selectedItem.description}</p>
                {selectedItem.tech && (
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {selectedItem.tech.map(tech => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm font-medium backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation hint */}
              <p className="text-gray-400 text-sm mt-4">Click anywhere outside to close</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
