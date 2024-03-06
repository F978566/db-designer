const ProjectItem = ({ project }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    <a href={`/project-tables/${project.id}`} className="nav-link">{project.name}</a>
                </div>
                {project.description}
            </div>
        </li>
    )
}

export default ProjectItem;