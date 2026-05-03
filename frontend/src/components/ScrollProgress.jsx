import React, { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  const handleScroll = () => {
    // Calculate total height of the document minus the viewport height
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Get current scroll position
    const scrollPosition = document.documentElement.scrollTop;

    // Calculate percentage
    const scrollPercentage = (scrollPosition / totalHeight) * 100;

    setScrollWidth(scrollPercentage);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={{ ...styles.bar, width: `${scrollWidth}%` }} />
    </div>
  );
};

// Clean inline styles (you can move these to CSS/Tailwind if preferred)
const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px', // Thickness of the bar
    zIndex: 9999, // Ensure it stays on top of navbars
    background: 'transparent',
  },
  bar: {
    height: '100%',
    backgroundColor: '#06b6d4', // A clean, modern Cyan (Tailwind Cyan-500)
    boxShadow: '0 0 10px #06b6d4, 0 0 5px #22d3ee', // Glowing effect for "Clean" look
    transition: 'width 0.1s ease-out', // Smooths out the jitters
  }
};

export default ScrollProgress;