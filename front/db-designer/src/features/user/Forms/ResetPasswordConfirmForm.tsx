import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

import { User, UserStatus } from "@/entities";
import { Button, Form, Input, LoadBar } from "@/shared/ui";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const ResetPasswordConfirmForm = observer(({ user, uid, token }: { user: User, uid: string, token: string }) => {
    const { register, handleSubmit } = useForm<{ new_password: string }>();
    const [ submited, setSubmited ] = useState(false);

    const handleSub = (data: { new_password: string }) => {
        user.resetPasswordConfirm({ ...data, uid, token });
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
            <Input type="password" placeholder="New Password" {...register("new_password", { required: true })}/>
            <Button type="submit">Reset Password</Button>
        </Form>
    )
})