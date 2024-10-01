import { CreateProjectDialog } from "../CreateProjectDialog/CreateProjectDialog";
import { project, user } from "@/entities";
import "./style.scss";

export const AdditionalActions = () => {
    return (
        <div className="additional-actions">
            <CreateProjectDialog project={project} user={user}/>
        </div>
    )
}