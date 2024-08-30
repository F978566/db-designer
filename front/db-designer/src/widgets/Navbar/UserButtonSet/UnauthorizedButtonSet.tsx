import { LiButton } from "@/shared/ui";
import {
    LoginSVG
} from "@/shared/ui";

export const UnauthorizedButtonSet = () => {
    return <LiButton to="login/"><LoginSVG /></LiButton>
}