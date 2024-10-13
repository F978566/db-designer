import { CreateProjectDialog } from "../CreateProjectDialog/CreateProjectDialog";
import { projectModel, userModel } from "@/entities";
import "./style.scss";

export const AdditionalActions = () => {
    return (
        <div className="additional-actions">
            <CreateProjectDialog projectModel={projectModel} userModel={userModel}/>
        </div>
    )
}