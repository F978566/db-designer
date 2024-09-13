import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { User, UserStatus } from "@/entities";
import { Form, Input, Button, LoadBar } from "@/shared/ui";


export const DeleteUserForm = observer(({ user }: { user: User }) => {
    const { register, handleSubmit } = useForm();

    const handleSub = (data: any) => {
        user.delete(data.password)
    }

    if (user.status === UserStatus.LOADING) {
        return <LoadBar />;
    } else if (!localStorage.getItem("accessToken")) {
        return <Navigate to="/login" />;
    }

    return (
        <Form onSubmit={handleSubmit(handleSub)}>
            <Input type="password" {...register("password", { required: true })}/>
            <Button>Delete</Button>
        </Form>
    )
})