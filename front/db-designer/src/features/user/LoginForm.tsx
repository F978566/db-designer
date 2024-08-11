import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { PostToken } from "@/shared/types";
import { User } from "@/entities";
import { Input, Form, Button, LoadBar } from "@/shared/ui";


export const LoginForm= observer(({user}: {user: User}) => {
    const { register, handleSubmit } = useForm<PostToken>();

    const handleSub = (data: PostToken) => {
        user.userLogin(data);
    }
    
    if (user.isLoading) {
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
                    type="text" 
                />
                <Input
                    {...register("password",
                    { required: true })}
                    placeholder="Password"
                    type="password"
                />
                <Button type="submit">Login</Button>
                {user.isAuth && <Navigate to={'/'}/>}
            </Form>
        </>
    )
})