'use client';

import { useEffect, useRef, useCallback } from 'react';

interface ScrollIntelligenceData {
  scrollDepth: number;
  timeOnPage: number;
  sectionsViewed: Set<string>;
  hasClickedCTA: boolean;
}

type ScrollCallback = (data: ScrollIntelligenceData) => void;

export function useScrollIntelligence(onUpdate?: ScrollCallback) {
  const dataRef = useRef<ScrollIntelligenceData>({
    scrollDepth: 0,
    timeOnPage: 0,
    sectionsViewed: new Set(),
    hasClickedCTA: false,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const data = dataRef.current;
    const startTime = Date.now();

    // Track time on page
    const timeInterval = setInterval(() => {
      data.timeOnPage = Math.floor((Date.now() - startTime) / 1000);
    }, 100);

    // Track scroll depth
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      data.scrollDepth = scrollHeight > 0 ? Math.round((scrolled / scrollHeight) * 100) : 0;
      onUpdate?.(data);
    };

    // Track section views with IntersectionObserver
    const sections = document.querySelectorAll('[data-section]');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              data.sectionsViewed.add(sectionId);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    // Track CTA clicks
    const handleCTAClick = () => {
      data.hasClickedCTA = true;
      sessionStorage.setItem('cta_clicked', 'true');
    };

    const ctaButtons = document.querySelectorAll('[data-cta]');
    ctaButtons.forEach((btn) => btn.addEventListener('click', handleCTAClick));

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
      ctaButtons.forEach((btn) => btn.removeEventListener('click', handleCTAClick));
      observerRef.current?.disconnect();
    };
  }, [onUpdate]);

  return dataRef.current;
}
