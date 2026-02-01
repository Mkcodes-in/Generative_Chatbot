import { supabase } from "../supabase/supabase";

const BASE_URL = 'https://xmxrxqekmlwhpqbypsvm.supabase.co/functions/v1/image-generator';

export async function generate_Image(prompt, chat_id) {
    try {
        const session = await supabase.auth.getSession();
        const { data: { user } } = await supabase.auth.getUser();

        const imageRes = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.data.session.access_token}`
            },
            body: JSON.stringify({
                prompt,
                chat_id,
                user_id: user.id
            })
        });

        const data = await imageRes.json();
        console.log('image response', data);
        return data;
    } catch (error) {
        console.error("Image generation failed:", err);
    }
};