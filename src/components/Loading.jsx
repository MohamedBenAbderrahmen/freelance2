import { useEffect } from 'react';
import './Loading.css';

export default function Loading() {
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // This will be handled by the router
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
    </div>
  );
}