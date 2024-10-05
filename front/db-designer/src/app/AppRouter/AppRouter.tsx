import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import {
    Layout,
    TestPage,
    Login,
    Profile,
    SignUpPage,
    Activate,
    DeleteUser,
    ResetPasswordConfirm,
    Projects,
    Project,
} from "@/pages";
import { ProtectedRoute } from "./ProtectedRoute";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<TestPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/delete-profile" element={<DeleteUser />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<Project />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/activate/:uid/:token" element={<Activate />} />
        </Route>
    )
)