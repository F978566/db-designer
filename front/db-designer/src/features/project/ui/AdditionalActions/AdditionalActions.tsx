import { CreateProjectDialog } from "../CreateProjectDialog/CreateProjectDialog";
import { projectModel, userModel } from "@/entities";
import "./style.scss";

export const AdditionalActions = () => {
    return (
        <div className="additional-actions">
            <CreateProjectDialog project={projectModel} userModel={userModel}/>
        </div>
    )
}