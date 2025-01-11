import { useState, useEffect } from "react";

interface LoadingTextProps {
    loadingText: string;
}

const LoadingText: React.FC<LoadingTextProps> = ({ loadingText }) => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 500); // Change dots every 500ms

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <p className="loading-text">
            {loadingText}
            <span>{dots}</span>
        </p>
    );
};

export default LoadingText;
