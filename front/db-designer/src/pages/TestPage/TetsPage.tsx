import { observer } from "mobx-react-lite"
import { useEffect } from "react"

import { projectModel, userModel } from "@/entities"
import "./style.scss"


export const TestPage = observer(() => {
    useEffect(() => {
        projectModel.getAll();
    }, [])

    return (
        <div className="bb">
            {userModel.user.first_name}
            {
                projectModel.projects.map(pr => {
                    return <p key={pr.id}>{pr.name}</p>
                })
            }
        </div>
    )
})