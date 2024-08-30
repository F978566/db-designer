import React from "react"
import { Link, LinkProps } from 'react-router-dom';
import './style.scss'


interface LiButtonProps extends LinkProps {
    children: React.ReactNode;
}


export const LiButton = ({ children, ...props }: LiButtonProps) => {
    return (
        <li className="sidebar__link">
            <Link to={props?.to}>
                { children }
            </Link>
        </li>
    )
}