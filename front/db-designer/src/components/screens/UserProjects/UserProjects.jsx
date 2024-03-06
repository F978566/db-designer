import React, { Suspense } from "react";
import { useQuery } from 'react-query';
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import { ProjectService } from "../../../services/Project.service";


const UserProjects = () => {
    const { data: projects } = useQuery(
        {
            queryKey: ['projects'],
            queryFn: async () => await ProjectService.getProjects(),
        }
    )

    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <ProjectList projects={projects}/>
            </Suspense>
            <AddProject />
        </div>
    )
}

export default UserProjects;