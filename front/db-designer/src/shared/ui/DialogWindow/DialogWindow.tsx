import { PropsWithChildren, DialogHTMLAttributes, useEffect, useRef, useState } from "react";

import { CrossSvg } from "../SVGs/SVGs";
import "./style.scss";


type DialogWindowProps = PropsWithChildren & DialogHTMLAttributes<HTMLDialogElement> & {
    isOpen: boolean;
    onClose?: () => void;
};


export const DialogWindow = ({ isOpen, children, onClose, ...props }: DialogWindowProps) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [isModalOpen, setModalOpen] = useState(isOpen);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    };
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);


    useEffect(() => {
        const modalElement = dialogRef.current;

        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    return (
        <dialog ref={dialogRef} onKeyDown={handleKeyDown} className="dialog-window" {...props}>
            {children}
            <button className="close-dialog-button" onClick={handleCloseModal}><CrossSvg /></button>
        </dialog>
    )
}