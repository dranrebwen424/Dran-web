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
  const categories = ['All', 'Prelim', 'Midterm', 'Pre-Final', 'Final'];

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
      title: 'Final Project 3',
      description: 'Creative design and development showcase',
      image: '/assets/portfolio/Final-3.jpg',
      category: 'Final',
    },
    {
      title: 'Final Exam Project 2',
      description: 'Professional portfolio piece',
      image: '/assets/portfolio/Final-Exam(2).jpg',
      category: 'Final',
    },
    {
      title: 'Model Sheet Design',
      description: 'Design and implementation showcase',
      image: '/assets/portfolio/Final-Exam.jpg',
      category: 'Prelim',
    },
    {
      title: 'Portfolio Project 2',
      description: 'Creative development work',
      image: '/assets/portfolio/portfolio-2.jpg',
      category: 'Prelim',
    },
    {
      title: 'Portfolio Project 4',
      description: 'Portfolio showcase piece',
      image: '/assets/portfolio/portfolio-4.jpg',
      category: 'Prelim',
    },
    {
      title: 'Portfolio Project 7',
      description: 'Design project showcase',
      image: '/assets/portfolio/portfolio-7.jpg',
      category: 'Final',
    },
    {
      title: 'Pre-Lim Final Exam',
      description: 'Pre-final examination project',
      image: '/assets/portfolio/Pre-Lim-Final-Exam.jpg',
      category: 'Prelim',
    },
    {
      title: 'Pre-mid Exam',
      description: 'Mid-term examination project',
      image: '/assets/portfolio/Pre-mid-Exam.jpg',
      category: 'Midterm',
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
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] lg:h-[600px]">
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
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-12 lg:p-16">
                  <div className="max-w-3xl">
                    <div className="mb-2 md:mb-3">
                      <span className="bg-yellow-400 text-gray-900 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-lg">
                        ⭐ Featured
                      </span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl mb-4 md:mb-6 leading-relaxed drop-shadow-md line-clamp-2 md:line-clamp-none">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-8">
                      {project.tech.map(tech => (
                        <span 
                          key={tech}
                          className="px-2 py-1 md:px-4 md:py-2 bg-white/20 backdrop-blur-md text-white rounded-md md:rounded-lg text-xs md:text-sm font-semibold"
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
                      <button className="px-3 py-2 md:px-6 md:py-3 bg-gray-800/80 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-gray-700/80 transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base">
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="hidden sm:inline">More Info</span>
                        <span className="sm:hidden">Info</span>
                      </button>
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

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Card - Always Visible */}
          <div
            className="group bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            <div className="p-6 md:p-8 h-full flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Let's Work Together!
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6">
                  Have a project in mind? I'd love to hear about it. Let's create something amazing together.
                </p>
              </div>
              
              <div className="space-y-3">
                <a 
                  href="#contact"
                  className="block w-full py-3 bg-white text-blue-600 rounded-lg text-sm md:text-base font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Get In Touch
                </a>
                <div className="flex gap-3 justify-center">
                  <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              ref={el => projectsRef.current[index + 1] = el}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Project Image */}
              <div 
                className="h-40 sm:h-48 relative overflow-hidden bg-gray-200 cursor-pointer"
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
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-3xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    🔍
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex gap-2 sm:gap-3">
                  <button 
                    onClick={() => openLightbox(project)}
                    className="flex-1 py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    <span className="hidden sm:inline">View Project</span>
                    <span className="sm:hidden">View</span>
                  </button>
                  <button className="px-3 sm:px-4 py-2 border-2 border-gray-900 text-gray-900 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
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
