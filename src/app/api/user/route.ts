import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const nickname = searchParams.get("nickname");
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("nickname", nickname)
        .single();

    if (data) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
        });
    }

    return new Response(JSON.stringify({ data }), {
        status: 200,
    });
}

export async function PATCH(req: Request) {
    const supabase = await createClient();
    const { userId, nickname } = await req.json();
    const user = await supabase.auth.getUser();

    if (!user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "사용자가 존재하지 않습니다.",
            }),
            { status: 401 }
        );
    }

    const { data: data1, error: updateError } = await supabase
        .from("profiles")
        .update({ nickname })
        .eq("user_id", userId);

    if (updateError) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "업데이트를 실패하였습니다.",
            }),
            { status: 500 }
        );
    }
    return new Response(
        JSON.stringify({ success: true, data1, message: "업데이트 성공." }),
        { status: 200 }
    );
}
