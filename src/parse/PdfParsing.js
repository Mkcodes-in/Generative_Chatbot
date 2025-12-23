import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function pdfParsing(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    let pageText = "";

    for (const item of content.items) {
      pageText += item.str.trim();

      if (item.hasEOL) {
        pageText += "\n";
      } else {
        pageText += " ";
      }
    }

    fullText += `\n\n----- PAGE ${i} -----\n\n`;
    fullText += pageText;
  }

  return fullText;
}
