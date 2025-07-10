"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    HeartHandshake,
    LayoutDashboard,
    Smile,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store/sidebarStore";
import { useTheme } from "next-themes";

interface SidebarHeaderProps {
    children?: React.ReactNode;
    className?: string;
}

interface SidebarContentProps {
    children: React.ReactNode;
    className?: string;
}

interface SidebarFooterProps {
    children?: React.ReactNode;
    className?: string;
}

interface NavProps {
    children: React.ReactNode;
}

interface NavItemProps {
    label: string;
    icon: React.ReactNode;
    destination: string;
}

export default function Sidebar() {
    const isCollapse = useSidebarStore((state) => state.isCollapse);
    const width = useSidebarStore((state) => state.width);
    const setWidth = useSidebarStore((state) => state.setWidth);
    const toggleCollapse = useSidebarStore((state) => state.toggleCollapse);
    // const [dragging, setDragging] = useState<boolean>(false);

    // useEffect(() => {
    //     function onMouseMove(e: MouseEvent) {
    //         if (!dragging) return;
    //         const newWidth = Math.max(80, Math.min(240, e.clientX));
    //         setWidth(newWidth);
    //     }

    //     function onMouseUp() {
    //         setDragging(false);
    //     }

    //     // dragging 상태에서만 위의 함수들이 동작
    //     if (dragging) {
    //         window.addEventListener("mousemove", onMouseMove);
    //         window.addEventListener("mouseup", onMouseUp);
    //     }

    //     // dragging 상태가 아닌 경우에는 위의 함수들을 제거
    //     return () => {
    //         window.removeEventListener("mousemove", onMouseMove);
    //         window.removeEventListener("mouseup", onMouseUp);
    //     };
    // }, [dragging, setWidth]);

    return (
        <>
            <div
                className={`fixed flex flex-col ${isCollapse ? "w-[80px]" : "w-[var(--sidebar-width)]"} inset-0 h-screen p-4 bg-[var(--sidebar-background)] transition-all duration-200`}
            >
                <Sidebar.Header></Sidebar.Header>
                <Sidebar.Content>
                    <div>
                        {/* <Columns3
                            width={16}
                            height={16}
                            className="absolute top-4 -right-[41px] hover:opacity-80"
                            onClick={toggleCollpase}
                        /> */}
                    </div>
                    <Sidebar.Nav>
                        <Sidebar.NavItem
                            icon={<LayoutDashboard width={16} height={16} />}
                            label="Dashboard"
                            destination="/dashboard"
                        />
                        <Sidebar.NavItem
                            icon={<HeartHandshake width={16} height={16} />}
                            label="Relation"
                            destination="/dashboard/relation"
                        />
                        <Sidebar.NavItem
                            icon={<CalendarDays width={16} height={16} />}
                            label="Schedule"
                            destination="/dashboard/schedule"
                        />
                        <Sidebar.NavItem
                            icon={<Smile width={16} height={16} />}
                            label="LifeStyle"
                            destination="/dashboard/lifestyle"
                        />
                    </Sidebar.Nav>
                </Sidebar.Content>
                <Sidebar.Footer className="flex-1"></Sidebar.Footer>
                <div
                    style={{ userSelect: "none" }}
                    className="absolute top-0 right-0 border-r border-[var(--sidebar-border)] hover:border-r-2 hover:border-[var(--primary)] shadow-[1px_0_15px_0_rgba(0,0,0,0.)] h-full cursor-ew-resize z-50"
                    onClick={toggleCollapse}
                ></div>
            </div>
        </>
    );
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const width = useSidebarStore((state) => state.width);
    const isCollapse = useSidebarStore((state) => state.isCollapse);
    const logo = `/images/logo-${resolvedTheme == "dark" ? "dark" : "light"}${
        isCollapse ? "-small" : ""
    }.png`;

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className={`flex-1 flex ${isCollapse ? "justify-center" : "justify-center"} items-center mb-4 border-b border-[var(--border)]`}>
            
        </div>
    );
}

export function SidebarContent({ children }: SidebarContentProps) {
    const isCollapse = useSidebarStore((state) => state.isCollapse);

    return <div className="flex-8 py-4 overflow-hidden">{children}</div>;
}

export function SidebarFooter({ children }: SidebarFooterProps) {
    return (
        <div className="flex-1 mt-4 border-t border-[var(--border)]">
            {children}{" "}
        </div>
    );
}

export function Nav({ children }: NavProps) {
    const isCollapse = useSidebarStore((state) => state.isCollapse);

    return (
        <ul
            className={`flex flex-col items-start gap-1 ${
                isCollapse ? "items-center" : ""
            }`}
        >
            {children}
        </ul>
    );
}

function NavItem({ icon, label, destination }: NavItemProps) {
    const pathName = usePathname();
    const isActive = pathName == destination;
    const width = useSidebarStore((state) => state.width);
    const isCollapse = useSidebarStore((state) => state.isCollapse);

    return (
        <Link
            className={`hover:bg-[white]/10 rounded-md w-full px-4 py-4 ${
                isActive
                    ? "font-bold"
                    : "text-[var(--sidebar-foreground)] hover:text-[var(--foreground)]"
            } cursor-pointer`}
            href={destination}
        >
            <li className="h-4 flex gap-3 items-center text-sm">
                <span>{icon}</span>
                <span className={`${isCollapse ? "hidden" : "block"}`}>
                    {label}
                </span>
            </li>
        </Link>
    );
}

Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;

Sidebar.Nav = Nav;
Sidebar.NavItem = NavItem;
