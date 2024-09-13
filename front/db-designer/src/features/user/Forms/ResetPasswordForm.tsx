import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

import { User, UserStatus } from "@/entities";
import { Button, Form, Input, LoadBar } from "@/shared/ui";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const ResetPasswordForm = observer(({ user }: { user: User }) => {
    const { register, handleSubmit } = useForm<{ email: string }>();
    const [ submited, setSubmited ] = useState(false);

    const handleSub = (data: { email: string }) => {
        user.resetPassword(data.email);
        if (user.status === UserStatus.FULFILLED) {
            setSubmited(true);
        }
    }

    if (user.status === UserStatus.LOADING) {
        return <LoadBar />;
    } else if (submited) {
        return <Navigate to="/login" />;
    }

    return (
        <Form onSubmit={handleSubmit(handleSub)}>
            <Input type="email" {...register("email", { required: true })}/>
            <Button type="submit">Reset Password</Button>
        </Form>
    )
})