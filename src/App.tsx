import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/pages/About';
import Services from './components/pages/Services';
import Projects from './components/pages/Projects';
import Contact from './components/pages/Contact';
import LoadingScreen from "./components/splash/splash";

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const minimumDuration = 3000; // Minimum duration in milliseconds
        const startTime = Date.now();

        const handleLoad = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(minimumDuration - elapsedTime, 0);
            setTimeout(() => {
                setIsLoading(false);
                setIsInitialLoad(false);
            }, remainingTime);
        };

        const handle404Error = () => {
            setIsLoading(false);
            setIsInitialLoad(false);
        };

        window.addEventListener('load', handleLoad);
        window.addEventListener('error', handle404Error);

        return () => {
            window.removeEventListener('load', handleLoad);
            window.removeEventListener('error', handle404Error);
        };
    }, []);

    return (
        <div className="app-container">
            {isLoading && isInitialLoad ? (
                <LoadingScreen />
            ) : (
                <div>
                    {isLoading && <LoadingScreen />}
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<Navigate to="/404" />} />
                        </Routes>
                    </BrowserRouter>

                </div>
            )}
        </div>
    );
};

export default App;
