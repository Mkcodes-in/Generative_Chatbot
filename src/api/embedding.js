import { supabase } from "../supabase/supabase";

export async function question_embedding(question, activeChatId, user_id) {
    const sessionRes = await supabase.auth.getSession();

    const base_url = 'https://xmxrxqekmlwhpqbypsvm.supabase.co/functions/v1/quick-worker';
    const res = await fetch(base_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionRes.data.session.access_token}`,
        },
        body: JSON.stringify({
            question,
            chat_id: activeChatId,
            user_id,
        }),
    })

    const data = await res.json();
    console.log(data);
    return data;
}