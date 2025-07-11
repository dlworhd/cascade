import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/dashboard.css";
import { fetchProfile } from "@/utils/supabase/query/UserQuery";
import { ThemeProvider } from "next-themes";
import ProfileModalTrigger from "@/components/ProfileTrigger";
import Sidebar from "@/components/Sidebar";
import Container from "@/components/Container";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let needsProfile = false;

    // 1. 대시보드 진입 시 프로필 정보를 읽기 위해 처리
    const profile = await fetchProfile();

    // 2. 프로필 존재하지 않거나 Nickname이 유효하지 않는 경우 NeedsProfile 지정 후 처리
    if (profile && profile.nickname == "NULL") {
        needsProfile = true;
    }

    return (
        <html lang="ko" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider>
                    <ProfileModalTrigger needsProfile={needsProfile} />
                    <Sidebar profile={ profile } />
                    <Container>
                        {children}
                    </Container>
                </ThemeProvider>
            </body>
        </html>
    );
}
