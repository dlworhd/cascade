"use client";

import React from "react";

interface ModalProps {
    open: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    className?: string;
}

export default function Modal({ open, onClose, children, className }: ModalProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex justify-center items-center bg-[var(--background)]/90 z-50"
            onClick={onClose}
        >
            <div
                className={`relative ${className || ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                {onClose && (
                    <button
                        className="absolute top-2 right-2 text-xl"
                        onClick={onClose}
                        aria-label="닫기"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}
