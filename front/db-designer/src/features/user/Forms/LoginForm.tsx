import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { PostToken } from "@/shared/types";
import { User } from "@/entities";
import { Input, Form, Button, LoadBar } from "@/shared/ui";
import { UserStatus } from "@/entities/user";
import { ErrorList } from "@/shared/ui";

export const LoginForm = observer(({ user }: { user: User }) => {
    const { register, handleSubmit } = useForm<PostToken>();

    const handleSub = async (data: PostToken) => {
        await user.userLogin(data);
    }

    if (user.status === UserStatus.LOADING) {
        return <LoadBar />;
    }

    return (
        <>
            <Form
                title="Login"
                onSubmit={handleSubmit(handleSub)}
            >
                <Input
                    {...register("email", { required: true })}
                    placeholder="Email"
                    type="email"
                />
                <Input
                    {...register("password",
                        { required: true })}
                    placeholder="Password"
                    type="password"
                />
                <Button type="submit">Login</Button>
                <a href="/sign-up">Sign-up</a>
                {user.status === UserStatus.ERROR && <ErrorList errors={user.errors} />}
                {user.status === UserStatus.LOGIN && <Navigate to="/" />}
            </Form>
        </>
    )
})