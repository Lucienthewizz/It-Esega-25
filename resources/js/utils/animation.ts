// Detect if device is mobile
export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Detect if user prefers reduced motion
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation settings based on device and user preferences
export const getAnimationSettings = () => {
    const shouldReduceMotion = isMobile() || prefersReducedMotion();
    
    return {
        enabled: !shouldReduceMotion,
        duration: shouldReduceMotion ? 0 : 800,
        once: true,
        easing: 'ease-out-cubic',
        offset: 100,
        delay: 0,
        mirror: false,
        anchorPlacement: 'top-bottom' as const
    };
};

// CSS class for optimized animations
export const optimizedAnimation = {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden' as const,
    perspective: '1000px',
    transform: 'translateZ(0)'
}; 