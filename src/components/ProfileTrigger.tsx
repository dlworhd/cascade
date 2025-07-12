"use client";

import React, { useEffect, useState } from "react";
import Button from "./common/Button";
import { fetchUser } from "@/utils/supabase/query/UserQuery";
import Modal from "./common/Modal";

export default function ProfileModalTrigger({
    needsProfile,
}: {
    needsProfile: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [nickname, setNickname] = useState<string>("");
    const [isDuplicated, setDuplicated] = useState<boolean>();

    useEffect(() => {
        if (needsProfile) {
            setOpen(true);
        }
    }, [needsProfile]);

    if (!open) return null;

    const handleDuplicatedNickname = async () => {
        const result = await fetch(`/api/user?nickname=${nickname}`).then(
            (res) => res.json()
        );
        if (result.data) {
            setDuplicated(true);
        } else {
            setDuplicated(false);
        }
    };

    const handleChangeNickname = async () => {
        const result = await fetch("/api/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nickname }),
        }).then((res) => res.json());

        if (!result.success) {
            alert("업데이트 실패");
        } else {
            alert("업데이트 완료");
            setOpen(false);
        }
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="flex flex-col gap-2 w-[300px] h-[700px] bg-[--background] border border-[var(--border)] rounded-xl p-4">
                <label className="text-md text-[var(--foreground)]">
                    닉네임
                </label>
                <input
                    className="ring-1 rounded-sm px-2 py-1"
                    onChange={(e) => setNickname(e.target.value)}
                    onBlur={handleDuplicatedNickname}
                />
                <span className={`${isDuplicated ? "block" : "hidden"}`}>
                    {" "}
                    {isDuplicated
                        ? "중복되는 닉네임입니다."
                        : "사용 가능한 닉네임입니다."}
                </span>
                <Button
                    className="w-full"
                    variant="secondary"
                    size="md"
                    disabled={isDuplicated}
                    onClick={handleChangeNickname}
                >
                    등록{" "}
                </Button>
            </div>
        </Modal>
    );
}
