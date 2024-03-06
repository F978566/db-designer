import React, { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import TablesList from "./Tables/TablesList";
import AddTable from "./Tables/AddTable/AddTable";
import { useDispatch } from 'react-redux';
import { selectedProject } from "../../../reducers/project";


const ProjectTables = () => {
    const dispatch = useDispatch();
    const { project_id } = useParams();

    useEffect(() => {
        dispatch(selectedProject(project_id));
    }, [project_id]);

    return (
        <div className="contanier">
            <Suspense fallback={<p>Loading...</p>}>
                <TablesList />
            </Suspense>
            <AddTable />
        </div>
    )
}

export default ProjectTables;