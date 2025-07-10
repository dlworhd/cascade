import { cn } from "@/app/utils/util";
import React from "react";

interface ButtonProps {
    variant: "primary" | "secondary" | "outline";
    size: "sm" | "md" | "lg";
    disabled?: boolean;
    className?: string;
    children?: string;
    onClick?: () => void;
}

export default function Button({
    variant,
    size,
    disabled,
    className,
    children,
    onClick,
}: ButtonProps) {
    const buttonBase = `w-full p-2 ${disabled ? "" : "hover:opacity-80 cursor-pointer"}`;
    let variants = {
        primary: "bg-[var(--primary)] text-[var(--foreground)]",
        secondary: "bg-[var(--secondary)] text-[var(--foreground)]",
        outline:
            "border-2 border-[var(--primary)] hover:bg-[var(--primary)] text-[var(--background)] ",
    };

    let sizes = {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
    };
    return (
        <button
            className={cn(
                `${buttonBase} ${variants[variant]} ${sizes[size]}`,
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
