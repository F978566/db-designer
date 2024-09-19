import { ProjectsList } from "@/features";
import { project } from "@/entities";


export const Projects = () => {
    return (
        <>
            <ProjectsList projects={project} />
        </>
    )
}