import { UserProfile } from "@/app/model/User";
import {
    fetchProfileByNickname,
    fetchUser,
    updateProfile,
} from "@/utils/supabase/query/UserQuery";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const nickname = searchParams.get("nickname");

    try {
        const data = await fetchProfileByNickname(nickname!);
        return new Response(JSON.stringify({ data }), {
            status: 200,
        });
    } catch {
        return new Response(JSON.stringify({ error: "에러 발생" }), {
            status: 500,
        });
    }
}

export async function PATCH(req: Request) {
    const { nickname } = await req.json();
    const user = await fetchUser();

    if (!user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "사용자가 존재하지 않습니다.",
            }),
            { status: 401 }
        );
    }
    try {
        const updatedData = updateProfile({ nickname });
        return new Response(
            JSON.stringify({ success: true, updatedData, message: "업데이트 성공." }),
            { status: 200 }
        );
    } catch {
        return new Response(
            JSON.stringify({
                success: false,
                message: "업데이트를 실패하였습니다.",
            }),
            { status: 500 }
        );
    }
}
