import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Welcome to My Portfolio</h1>
                <p>I am a passionate developer with a knack for creating beautiful and functional web applications.</p>
                <a href="#projects" className="btn">View My Work</a>
            </div>
        </section>
    );
};

export default Hero;