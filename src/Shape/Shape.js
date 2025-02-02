import React, { useState, useEffect } from 'react';
import './Shape.css';

const shapeArray = [
    [1, 1, 1, 1],
    [0, 0, 1, 1],
    [1, 1, 1, 1]
];

const Shape = () => {
    const [color, setColor] = useState(
        shapeArray.map((row) => row.map(() => null)) 
    );
    const [selectedBoxes, setSelectedBoxes] = useState([]);
    const totalFillableBoxes = shapeArray.flat().filter(value => value === 1).length;

    useEffect(() => {
        if (selectedBoxes.length === totalFillableBoxes) {
            setTimeout(() => {
                deselectNextBox(0);
            }, 500);
        }
    }, [selectedBoxes]);

    const boxClick = (e, rowIndex, colIndex) => {
        e.stopPropagation();
        const newColors = [...color];
        const currentColor = newColors[rowIndex][colIndex];

        if (shapeArray[rowIndex][colIndex] === 1) {
            newColors[rowIndex][colIndex] = currentColor ? null : 'green';
            if (!currentColor) {
                setSelectedBoxes(prev => [...prev, { rowIndex, colIndex }]);
            }
            setColor(newColors);
        }
    };

    const deselectNextBox = (index) => {
        if (index < selectedBoxes.length) {
            const { rowIndex, colIndex } = selectedBoxes[index];
            const newColors = [...color];
            newColors[rowIndex][colIndex] = null;
            setColor(newColors);
            setTimeout(() => deselectNextBox(index + 1), 500);
        } else {
            setSelectedBoxes([]);
        }
    };

    return (
        <>
            <h1>Shape Box</h1>
            <div className='container'>
            {shapeArray.map((row, rowIndex) => (
                <div key={rowIndex} className='row'>
                    {row.map((col, colIndex) => {
                        return shapeArray[rowIndex][colIndex] === 1 ? (
                            <div
                                key={colIndex}
                                className='box'
                                onClick={(e) => boxClick(e, rowIndex, colIndex)}
                                style={{ backgroundColor: color[rowIndex][colIndex] }}
                            >
                            </div>
                        ) : null;
                    })}
                </div>
            ))}
            </div>
        </>
    );
};

export default Shape;
