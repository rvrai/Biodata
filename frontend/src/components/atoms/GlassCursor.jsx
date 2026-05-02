import React, { useEffect, useState } from 'react';

const GlassCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <style>{`
        body { cursor: none !important; }
        a, button, input, textarea { cursor: none !important; }
      `}</style>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1px solid var(--accent-primary)',
          backgroundColor: 'rgba(0, 217, 255, 0.1)',
          backdropFilter: 'blur(2px)',
          boxShadow: '0 0 15px rgba(0, 217, 255, 0.3)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      />
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-primary)',
          pointerEvents: 'none',
          zIndex: 10000
        }}
      />
    </>
  );
};

export default GlassCursor;
