import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { UserModel, UserStatus } from "@/entities";
import { Form, Input, Button, LoadBar } from "@/shared/ui";


export const DeleteUserForm = observer(({ userModel }: { userModel: UserModel }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const handleSub = async (data: any) => {
        await userModel.delete(data.password)
    }

    if (userModel.status === UserStatus.LOADING) {
        return <LoadBar />;
    } else if (userModel.status === UserStatus.DELETE)
        navigate("/login");

    return (
        <Form onSubmit={handleSubmit(handleSub)}>
            <Input type="password" {...register("password", { required: true })}/>
            <Button>Delete</Button>
        </Form>
    )
})