'use client'
import React, {useEffect} from 'react';
import {Modal, ModalProps} from "@nextui-org/modal";
import useLenisStore from "@/store/lenisStore";

interface ModalCustom extends ModalProps {
    children: React.ReactNode
}

const ModalCustom = ({children, ...other}: ModalCustom) => {

    const startLenis = useLenisStore((state) => state.resumeLenis);
    const stopLenis = useLenisStore((state) => state.pauseLenis);

    useEffect(() => {
        if (other.isOpen) {
            stopLenis()
        } else {
            startLenis()
        }
    }, [other.isOpen])

    return (
        <Modal {...other}>
            {children}
        </Modal>
    );
};

export default ModalCustom;