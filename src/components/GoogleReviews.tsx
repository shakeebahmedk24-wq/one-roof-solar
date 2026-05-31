import React, { useEffect, useRef } from 'react';

export function GoogleReviews() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear the container first to prevent duplicates in strict mode
    containerRef.current.innerHTML = '';
    
    const script = document.createElement('script');
    script.src = "https://cdn.trustindex.io/loader.js?d21817a721bd565ad0161a7d45b";
    script.defer = true;
    script.async = true;
    
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full min-h-[300px]">
      <div ref={containerRef}></div>
    </div>
  );
}
