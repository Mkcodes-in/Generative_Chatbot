import { supabase } from "../supabase/supabase";

// uplaod file logic to upload 
export const handleUpload = async (fileToUpload, activeChatId) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!fileToUpload) return;

    const filePath = `${activeChatId}/${fileToUpload.name}`

    // Upload to storage
    const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, fileToUpload)

    if (uploadError) {
        console.error(uploadError.message)
        return;
    }

    // // insert into userchat
    // const { error } = supabase.from('messages').insert({
    //     role: 'user',
    //     message: `[pdf] ${filePath}`,
    //     chai_id: activeChatId,
    //     user_id: user.id
    // })
    // if(error){
    //     console.error(error);
    // }
}