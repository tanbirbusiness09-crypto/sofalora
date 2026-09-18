import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'bottom' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  distance?: number; // in px (default 24)
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'bottom',
  delay = 0,
  duration = 600,
  distance = 24,
  className = '',
  threshold = 0.12,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'bottom':
        return `translate3d(0, ${distance}px, 0)`;
      case 'left':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(${distance}px, 0, 0)`;
      case 'scale':
        return 'scale(0.96)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const style: React.CSSProperties = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    willChange: isVisible ? 'auto' : 'opacity, transform'
  };

  return (
    <div ref={elementRef} style={style} className={className}>
      {children}
    </div>
  );
};
