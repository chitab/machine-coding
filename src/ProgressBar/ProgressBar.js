import './ProgressBar.css';
import { useState, useEffect } from "react";

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    return () => {
        if(intervalId) {
            return clearInterval(intervalId);
        }
    }
  }, [intervalId]);

    const progressStart = () => {
        const id = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return Math.min(prev + 1, 100); 
                } else {
                    clearInterval(id); 
                    return prev;  
                }
            });
        }, 100); 
        setIntervalId(id);
        setIsRunning(true);
    }

    const pauseButtonClick = () => {
        clearInterval(intervalId);
        setIsRunning(false);
    }
    const resetButtonClick = () => {
        clearInterval(intervalId);
        setProgress(0);
        setIsRunning(false);
    }
    return(
        <>
        <h1>Progress Bar</h1>
        <div className="progressbar-containr">
            <div className="progress-bar" style={{width: `${progress}%`}}>
            </div>
        </div>
        <div className="button-container">
                <button onClick={progressStart}  disabled={isRunning}>Start</button>
                <button onClick={pauseButtonClick} disabled={!isRunning}>Pause</button>
                <button onClick={resetButtonClick}>Reset</button>
            </div>
        </>
    )
}
export default ProgressBar;