import { UserProfile } from "@/app/model/User";
import { supabase } from "../client";
import { createClient } from "../server";

export async function fetchUser() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}

export async function createProfile(params: Partial<UserProfile>): Promise<any> {
    const user = await fetchUser();
    const { data, error } = await supabase
        .from("profiles")
        .insert(params);

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchProfile(): Promise<any> {
    const user = await fetchUser();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .limit(1)
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchProfileByNickname(nickname: string): Promise<any> {
    if (nickname == "NULL") throw new Error("사용할 수 없는 닉네임 입니다.");

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("nickname", nickname)
        .neq("nickname", "NULL")
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function updateProfile(
    params: Partial<UserProfile>
): Promise<any> {
    const user = await fetchUser();
    const { data, error } = await supabase
        .from("profiles")
        .update(params)
        .eq("user_id", user?.id)
        .select();

    if (error) throw new Error(error.message);
    return data;
}
