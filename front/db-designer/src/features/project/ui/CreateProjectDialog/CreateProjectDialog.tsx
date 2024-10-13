import { useState } from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

import { Button, DialogWindow, ErrorList, Form, Input, LoadBar } from "@/shared/ui";
import { Project } from "@/shared/types";
import { ProjectModel, UserModel } from "@/entities";
import { ProjectStatus } from "@/entities/project/model/tpyes";
import { useNavigate } from "react-router-dom";

export const CreateProjectDialog = observer(({ projectModel, userModel }: { projectModel: ProjectModel, userModel: UserModel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm<Project>();
    const navigate = useNavigate();
    
    const handleSub = async (data: Project) => {
        await projectModel.create({...data, user: userModel.user.id});
        if (projectModel.status === ProjectStatus.FULFILLED) {
            navigate("/");
        }
    }

    if (projectModel.status === ProjectStatus.LOADING) {
        return <LoadBar />;
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Add</Button>
            <DialogWindow isOpen={isOpen} onSubmit={handleSubmit(handleSub)} onClose={() => setIsOpen(false)}>
                <Form title="Create Project">
                    <Input {...register("name", {required: true})} placeholder="Project Name" />
                    <Input {...register("description", {required: true})} placeholder="Project Description" />
                    <Button type="submit">Submit</Button>
                    {projectModel.status === ProjectStatus.ERROR && <ErrorList errors={projectModel.errors}/>}
                </Form>
            </DialogWindow>
        </>
    )
})