import { useState, useCallback } from 'react';


const useDragble = () => {
    const [position, setPosition] = useState({ x: 50, y: 50 });

    const handleMouseDown = useCallback((e, isMovable) => {
        let offsetX = e.nativeEvent.offsetX;
        let offsetY = e.nativeEvent.offsetY;
    
        const handleMouseMove = (e) => {
          if (isMovable.current) {
            setPosition({
              x: e.clientX - offsetX,
              y: e.clientY - offsetY,
            });
          }
        };
    
        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }, []);
    

    return { position, handleMouseDown };
};


export default useDragble;