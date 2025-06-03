import React from 'react';

const Projects: React.FC = () => {
    const projectList = [
        {
            title: 'Project One',
            description: 'A brief description of Project One.',
            link: 'https://link-to-project-one.com',
        },
        {
            title: 'Project Two',
            description: 'A brief description of Project Two.',
            link: 'https://link-to-project-two.com',
        },
        {
            title: 'Project Three',
            description: 'A brief description of Project Three.',
            link: 'https://link-to-project-three.com',
        },
    ];

    return (
        <section id="projects">
            <h2>Projects</h2>
            <div className="project-list">
                {projectList.map((project, index) => (
                    <div key={index} className="project-item">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;