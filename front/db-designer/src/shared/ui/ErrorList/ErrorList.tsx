import { Error } from "../Error";

import "./style.scss";


export const ErrorList = ({ errors }: { errors: string[] }) => {
    console.log(errors)
    return (
        <div className="error-list">
            {
                errors.map((error, index) => (
                    <Error key={index}>{error}</Error>
                ))
            }
        </div>
    )
}