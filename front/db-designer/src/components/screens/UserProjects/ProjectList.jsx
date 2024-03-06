import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ projects }) => {
    return (
        <ol className="list-group list-group-numbered">
            {
                projects?.length ? projects.map(project => (
                    <ProjectItem project={project} key={project.id} />
                )) : <p>Not found</p>
            }
        </ol>
    )
}

export default ProjectList;