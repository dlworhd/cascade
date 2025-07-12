"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    ChevronDown,
    ChevronsLeftRight,
    ChevronUp,
    HeartHandshake,
    LayoutDashboard,
    Smile,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store/sidebarStore";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { UserProfile } from "@/app/model/User";
import PopOver from "./common/PopOver";

interface SidebarContainerProps {
    children?: React.ReactNode;
    className?: string;
}

interface SidebarCollapseContainerProps {
    children?: React.ReactNode;
    className?: string;
}

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

interface NavLabelProps {
    label: string;
    children?: React.ReactNode;
}

interface NavItemProps {
    label: string;
    icon: React.ReactNode;
    destination: string;
}

interface SidebarProps {
    profile: Partial<UserProfile>;
}

export default function Sidebar({ profile }: SidebarProps) {
    const toggleCollapse = useSidebarStore((state) => state.toggleCollapse);
    const icon = {
        width: 15,
        height: 15,
    };

    const userProfile = useUserStore((state) => state.userProfile);
    const setProfile = useUserStore((state) => state.setProfile);

    useEffect(() => {
        setProfile(profile);
    }, [profile, setProfile]);

    const handlePopover = () => {};
    return (
        <Sidebar.Container>
            <Sidebar.Collapse>
                <Sidebar.Header>
                    <PopOver
                        trigger={
                            <div className="flex gap-2 items-center w-full">
                                <Image
                                    className="rounded-full"
                                    src={`/images/${userProfile?.nickname}-profile.png`}
                                    alt="profile"
                                    width={35}
                                    height={35}
                                />
                                <span className="text-sm font-semibold">@{userProfile?.nickname}</span>
                                <ChevronDown width={15} height={15} />
                            </div>
                        }
                    >
                        <ul>
                            <li className="hover:bg-[var(--foreground)]/80 cursor-pointer select-none p-1 rounded">메뉴1</li>
                            <li className="hover:bg-[var(--foreground)]/80 cursor-pointer select-none p-1 rounded">메뉴2</li>
                            <li className="hover:bg-[var(--foreground)]/80 cursor-pointer select-none p-1 rounded">메뉴3</li>
                        </ul>
                    </PopOver>
                </Sidebar.Header>
                <Sidebar.Content>
                    <Sidebar.Nav>
                        {/* <Sidebar.NavLabel label="Workspace"> */}
                        <Sidebar.NavItem
                            icon={
                                <LayoutDashboard
                                    width={icon.width}
                                    height={icon.height}
                                />
                            }
                            label="Dashboard"
                            destination="/dashboard"
                        />
                        <Sidebar.NavItem
                            icon={
                                <HeartHandshake
                                    width={icon.width}
                                    height={icon.height}
                                />
                            }
                            label="Relation"
                            destination="/dashboard/relation"
                        />
                        <Sidebar.NavItem
                            icon={
                                <CalendarDays
                                    width={icon.width}
                                    height={icon.height}
                                />
                            }
                            label="Schedule"
                            destination="/dashboard/schedule"
                        />
                        <Sidebar.NavItem
                            icon={
                                <Smile
                                    width={icon.width}
                                    height={icon.height}
                                />
                            }
                            label="LifeStyle"
                            destination="/dashboard/lifestyle"
                        />
                        {/* </Sidebar.NavLabel> */}
                    </Sidebar.Nav>
                </Sidebar.Content>
                <Sidebar.Footer></Sidebar.Footer>
            </Sidebar.Collapse>
            <div
                className="absolute top-0 right-0 border-r border-[var(--sidebar-border)] hover:border-r-1 hover:border-[var(--primary)] shadow-[1px_0_15px_0_rgba(0,0,0,0.)] h-full cursor-ew-resize z-50 select-none"
                onClick={toggleCollapse}
            >
                <ChevronsLeftRight
                    className="absolute top-1/2 -right-[8px]"
                    width={15}
                    height={15}
                />
            </div>
        </Sidebar.Container>
    );
}
export function SidebarContainer({ children }: SidebarContainerProps) {
    const isCollapse = useSidebarStore((state) => state.isCollapse);
    const userProfile = useUserStore((state) => state.userProfile);
    console.log(userProfile);

    if (!userProfile) {
        return (
            <Link href="/auth">
                <div className="p-4">로그인이 필요합니다.</div>
            </Link>
        );
    }

    return (
        <div
            className={`select-none fixed flex flex-col ${
                isCollapse
                    ? "w-[var(--sidebar-min-width)]"
                    : "w-[var(--sidebar-max-width)] p-4"
            } inset-0 h-screen bg-[var(--sidebar-background)] transition-all duration-200`}
        >
            {children}
        </div>
    );
}

export function SidebarCollapseContainer({
    children,
}: SidebarCollapseContainerProps) {
    const isCollapse = useSidebarStore((state) => state.isCollapse);

    return (
        <div className={`${isCollapse ? "hidden" : "flex flex-col"} h-full`}>
            {children}
        </div>
    );
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return <div className="flex-[0.5] flex items-center pb-4">{children}</div>;
}

export function SidebarContent({ children }: SidebarContentProps) {
    return <div className="flex-[8.5] py-4 overflow-hidden">{children}</div>;
}

export function SidebarFooter({ children }: SidebarFooterProps) {
    return <div className="flex-[0.5] mt-4">{children} </div>;
}

export function Nav({ children }: NavProps) {
    return <ul className="flex flex-col items-start gap-[2px]">{children}</ul>;
}

function NavLabel({ label, children }: NavLabelProps) {
    const [isFolded, setIsFolded] = useState(false);
    const handleFold = () => {
        setIsFolded((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-0.5" onClick={handleFold}>
                <span className="text-sm">{label}</span>
                {isFolded ? (
                    <ChevronUp width={15} height={15} />
                ) : (
                    <ChevronDown width={15} height={15} />
                )}
            </div>
            <ul
                className={`${
                    isFolded ? "hidden" : "flex"
                } flex-col items-start gap-[2px]`}
            >
                {children}
            </ul>
        </div>
    );
}
function NavItem({ icon, label, destination }: NavItemProps) {
    const pathName = usePathname();
    const isActive = pathName == destination;

    return (
        <Link
            className={`hover:bg-[var(--background)]/50 rounded-md w-full px-2 py-2 ${
                isActive
                    ? "bg-[var(--background)]/50"
                    : "text-[var(--sidebar-foreground)] hover:text-[var(--foreground)] "
            } cursor-pointer`}
            href={destination}
        >
            <li className="flex gap-2 items-center text-sm">
                <span>{icon}</span>
                <span>{label}</span>
            </li>
        </Link>
    );
}

Sidebar.Container = SidebarContainer;
Sidebar.Collapse = SidebarCollapseContainer;
Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;

Sidebar.NavLabel = NavLabel;
Sidebar.Nav = Nav;
Sidebar.NavItem = NavItem;
