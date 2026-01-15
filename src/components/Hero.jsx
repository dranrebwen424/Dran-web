import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Parallax layer refs
  const backgroundRef = useRef(null);
  const layer5Ref = useRef(null);
  const layer4Ref = useRef(null);
  const layer4FloatRef = useRef(null); // Separate ref for floating
  const layer3Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer2FloatRef = useRef(null); // Separate ref for floating
  const layer1Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Zoom intro animation for all layers
      gsap.fromTo([backgroundRef.current, layer5Ref.current, layer4Ref.current, layer3Ref.current, layer2Ref.current, layer1Ref.current], 
        {
          scale: 1.15,
          opacity: 0,
          transformOrigin: 'center center'
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          transformOrigin: 'center center'
        }
      );

      // Initial entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' }, delay: 0.3 });
      
      tl.from(textRef.current, {
        duration: 1.2,
        y: 60,
        opacity: 0,
      })
      .from(subtitleRef.current, {
        duration: 1,
        y: 40,
        opacity: 0,
      }, '-=0.7')
      .from(ctaRef.current, {
        duration: 0.8,
        y: 30,
        opacity: 0,
        scale: 0.9
      }, '-=0.5');

      // Parallax scroll animations - layers start lower and move UP as you scroll down
      // Using from/to to ensure proper starting positions
      gsap.fromTo(backgroundRef.current, 
        { y: 0 },
        {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(layer5Ref.current,
        { y: 0 },
        {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(layer4Ref.current,
        { y: 0 },
        {
          y: -250,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );

      // Floating animation for 4th layer (house) - uses separate ref
      gsap.to(layer4FloatRef.current, {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.fromTo(layer3Ref.current,
        { y: 0 },
        {
          y: -300,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );

      gsap.fromTo(layer2Ref.current,
        { y: 0 },
        {
          y: -350,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );

      // Floating animation for 2nd layer - uses separate ref
      gsap.to(layer2FloatRef.current, {
        y: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.fromTo(layer1Ref.current,
        { y: 0 },
        {
          y: -400,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Background layer - slowest movement, cover ensures it fills entire viewport */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ 
            backgroundImage: 'url(/assets/parallax/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            willChange: 'transform'
          }}
        />
        
        {/* 5th layer */}
        <div 
          ref={layer5Ref}
          className="absolute inset-0 w-full h-full z-10"
          style={{ 
            backgroundImage: 'url(/assets/parallax/5th%20layer.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            willChange: 'transform'
          }}
        />
        
        {/* 4th layer - outer div for parallax scroll, inner div for floating */}
        <div 
          ref={layer4Ref}
          className="absolute inset-0 w-full h-full z-20"
        >
          <div
            ref={layer4FloatRef}
            className="absolute inset-0 w-full h-full"
            style={{ 
              backgroundImage: 'url(/assets/parallax/4th%20layer.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        
        {/* 3rd layer */}
        <div 
          ref={layer3Ref}
          className="absolute inset-0 w-full h-full z-30"
          style={{ 
            backgroundImage: 'url(/assets/parallax/3rd%20layer.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            willChange: 'transform'
          }}
        />
        
        {/* 2nd layer - outer div for parallax scroll, inner div for floating */}
        <div 
          ref={layer2Ref}
          className="absolute inset-0 w-full h-full z-40"
        >
          <div
            ref={layer2FloatRef}
            className="absolute inset-0 w-full h-full"
            style={{ 
              backgroundImage: 'url(/assets/parallax/2nd%20layer.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        
        {/* 1st layer - fastest movement (front) */}
        <div 
          ref={layer1Ref}
          className="absolute inset-0 w-full h-full z-50"
          style={{ 
            backgroundImage: 'url("/assets/parallax/1st%20layer.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            willChange: 'transform',
            top: '20%'
          }}
        />
      </div>

      {/* Fade gradient at bottom for section blending */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-white/30 to-white z-[60] pointer-events-none"></div>

      {/* Content overlay - responsive positioning */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-[100] px-6 sm:px-8 md:right-[10%] md:left-auto">
        <div className="text-left max-w-lg md:max-w-xl mx-auto md:mx-0">
          <h1 
            ref={textRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 whitespace-nowrap">Dranreb Wen</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 md:mb-8 drop-shadow-md"
          >
            Creative Developer & Designer crafting beautiful digital experiences
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              onClick={scrollToPortfolio}
              className="px-6 sm:px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              View My Work
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-[100]">
        <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
