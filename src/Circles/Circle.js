
import React, { useEffect, useState } from 'react';
import './Circle.css';

export default function Circle() {
  const [circles, setCircles] = useState([
    {
      id: 'left',
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      backgroundColor: 'red',
    },
    {
      id: 'right',
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      backgroundColor: 'red',
    },
  ]);

  const [circleId, setCircleId] = useState(null);

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (e) => {
    const { button } = e;
    const currentId = button === 0 ? 'left' : 'right';
    setCircleId(currentId);
    setCircles((prev) =>
      prev.map((circle) => {
        if (circle.id === currentId) {
          return {
            ...circle,
            startX: e.clientX,
            startY: e.clientY,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
          };
        }
        return circle;
      })
    );
  };

  const doelementOverlap = (leftCircle, rightCircle) => {

    const leftCircleRadius = leftCircle.width / 2;
    const rightCircleRadius = rightCircle.width / 2;
  
    const leftCenter = {
      x: leftCircle.x + leftCircleRadius,
      y: leftCircle.y + leftCircleRadius,
    }
  
    const rightCenter = {
      x: rightCircle.x + rightCircleRadius,
      y: rightCircle.y + rightCircleRadius,
    }
  
    const distanceBetweenCenters = Math.sqrt(
      Math.pow(leftCenter.x - rightCenter.x, 2) + Math.pow(leftCenter.y - rightCenter.y, 2)
    )
    return distanceBetweenCenters < leftCircleRadius + rightCircleRadius;
  
  }


  const handleMouseMove = (e) => {
    if (circleId === null) {
      return;
    }


    const upadatedCircles = circles.map((circle) => {
      if (circle.id === circleId) {
        const distanceX = e.clientX - circle.startX;
        const distanceY = e.clientY - circle.startY;

        const size = Math.max(Math.abs(distanceX), Math.abs(distanceY))


        const newX = distanceX < 0 ? circle.startX - size : circle.startX;
        const newY = distanceY < 0 ? circle.startY - size : circle.startY;
        return {
          ...circle,
          width: size,
          height: size,
          x: newX,
          y: newY
        };
      }
      return circle;
    });


    const doCirclesOverlap = doelementOverlap(upadatedCircles[0], upadatedCircles[1]);

    const newCircles = upadatedCircles.map(circle => {
      if (circle.id === circleId) {
        return {
          ...circle,
          backgroundColor: doCirclesOverlap ? 'blue' : 'red'
        }
      }
      return circle;
    })
    setCircles(newCircles)
  };

  const handleMouseUp = (e) => {
    setCircleId(null);
  };

  return (
    <>
      <h1>Circles Problem</h1>
      <div
        className="board"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {circles.map((circle) => (
          <div
            key={circle.id}
            style={{
              position: 'absolute',
              width: `${circle.width}px`,
              height: `${circle.height}px`,
              top: `${circle.y}px`,
              left: `${circle.x}px`,
              backgroundColor: `${circle.backgroundColor}`,
              borderRadius: `50%`,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
