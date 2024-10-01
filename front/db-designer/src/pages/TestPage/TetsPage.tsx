import { observer } from "mobx-react-lite"
import { useEffect } from "react"

import { project, user } from "@/entities"
import "./style.scss"


export const TestPage = observer(() => {
    useEffect(() => {
        project.getAll();
    }, [])

    return (
        <div className="bb">
            {user.user.first_name}
            {
                project.projects.map(pr => {
                    return <p key={pr.id}>{pr.name}</p>
                })
            }
        </div>
    )
})