"use client";

import { useSidebarStore } from "@/store/sidebarStore";
import React, { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
    const isCollapse = useSidebarStore((state) => state.isCollapse);

    return (
        <div className={`flex h-screen p-8 bg-[#131313] ${isCollapse ? "w-[calc(100vw-var(--sidebar-min-width))] ml-[var(--sidebar-min-width)]" : "w-[calc(100vw-var(--sidebar-max-width))] ml-[var(--sidebar-max-width)]"}`}>
            { children }
       </div>
    );
}