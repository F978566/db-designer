import { useState } from "react";
import { useForm } from "react-hook-form";

import { TableModel, TableStatus } from "@/entities";
import { Button, DialogWindow, ErrorList, Form, Input } from "@/shared/ui";
import { TableType } from "@/shared/types";

export const CreateTableDialog = ({ tableModel, projectId }: { tableModel: TableModel, projectId: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm<TableType>();


    const handleSub = async (data: TableType) => {
        await tableModel.create({...data, project: projectId});
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Add Table</Button>
            <DialogWindow isOpen={isOpen} onSubmit={handleSubmit(handleSub)} onClose={() => setIsOpen(false)}>
                <Form title="Create Project">
                    <Input {...register("name", { required: true })} placeholder="Project Name" />
                    <Input {...register("description")} placeholder="Project Description" />
                    <Button type="submit">Submit</Button>
                    {tableModel.status === TableStatus.ERROR && <ErrorList errors={tableModel.errors} />}
                </Form>
            </DialogWindow>
        </>
    )
}