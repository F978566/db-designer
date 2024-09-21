import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { User, UserStatus } from "@/entities";
import { Form, Input, Button, LoadBar } from "@/shared/ui";


export const DeleteUserForm = observer(({ user }: { user: User }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const handleSub = async (data: any) => {
        await user.delete(data.password)

        if (user.userStatus === UserStatus.FULFILLED)
            navigate("/login");
    }

    if (user.userStatus === UserStatus.LOADING) {
        return <LoadBar />;
    }

    return (
        <Form onSubmit={handleSubmit(handleSub)}>
            <Input type="password" {...register("password", { required: true })}/>
            <Button>Delete</Button>
        </Form>
    )
})