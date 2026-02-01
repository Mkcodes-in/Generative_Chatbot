export async function donwloadImg(url) {
    try {
        const res = await fetch(url);
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "image.png"; 
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
        console.error("Download failed", err);
    }
}