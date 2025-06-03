import React from 'react';

const Experience: React.FC = () => {
    return (
        <section id="experience">
            <h2>Experience</h2>
            <div className="experience-item">
                <h3>Job Title 1</h3>
                <p>Company Name - Location</p>
                <p>Duration: Month Year - Month Year</p>
                <p>Description of responsibilities and achievements in this role.</p>
            </div>
            <div className="experience-item">
                <h3>Job Title 2</h3>
                <p>Company Name - Location</p>
                <p>Duration: Month Year - Month Year</p>
                <p>Description of responsibilities and achievements in this role.</p>
            </div>
            {/* Add more experience items as needed */}
        </section>
    );
};

export default Experience;