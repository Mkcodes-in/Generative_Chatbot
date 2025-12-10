import { supabase } from "../supabase/supabase";

export async function uploadFile(file) {
  // Upload file to Supabase
  const filePath = `files/${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("pdfs")
    .upload(filePath, file);

  if (error) {
    console.error(error);
    return;
  }

  // Call ingestPdf Edge Function
  await fetch("https://xmxrxqekmlwhpqbypsvm.supabase.co/functions/v1/ingestPdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filePath: data.path }), 
  });

  console.log("PDF processed & embedded successfully!");
}
