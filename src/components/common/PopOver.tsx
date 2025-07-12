import React, { useRef, useState } from "react";

interface PopOverProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    placement?: "top" | "bottom" | "left" | "right";
}

export default function PopOver({
    trigger,
    children,
    className,
    placement = "bottom",
}: PopOverProps) {
    const [isOpen, setOpen] = useState<Boolean>(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const handleTriggerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
    };

    const placementStyle: Record<string, string> = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <div className="relative inline-block" ref={popoverRef}>
            <div onClick={handleTriggerClick}>{trigger}</div>
            {isOpen && (
                <div
                    className={`absolute min-w-[120px] bg-[var(--background)] border border-[var(--border)] rounded shadow-lg px-3 py-2 z-50 ${placementStyle[placement]}`}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
