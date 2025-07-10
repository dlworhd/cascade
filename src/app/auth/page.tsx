"use client";

import Button from "@/components/common/Button";
import { supabase } from "@/utils/supabase/client";
import React, { useState } from "react";

export default function page() {
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "kakao",
            options: {
                redirectTo: "http://localhost:3000/api/auth/callback",
            }
        })

    };
    return (
        <div className="flex h-screen">
            <div className="flex-7 bg-[var(--primary)] h-full"></div>
            <div className="flex-3 flex flex-col items-center justify-center p-16 bg-[var(--foreground)] text-[var(--primary)]">
                <div className="flex flex-col gap-4 w-[360px]">
                    {/* <input className="ring-2 rounded-md p-2" type="email" placeholder="Email" />
                    <input className="ring-2 rounded-md p-2" type="password" placeholder="Password" />
                    <div>
                        <Button variant="primary" size="md" onClick={handleSignIn}>로그인</Button>
                        <hr className="my-4"/>
                        <Button variant="outline" size="md" onClick={handleSignUp}>회원가입</Button>
                    </div> */}

                    <Button variant="primary" size="md" onClick={handleSignIn}>
                        Google 계정으로 로그인
                    </Button>
                </div>
            </div>
        </div>
    );
}
