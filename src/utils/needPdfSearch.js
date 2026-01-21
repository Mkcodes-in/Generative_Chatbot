export function needsPdfSearch(message) {
  const keywords = [
    "pdf",
    "document",
    "file",
    "upload",
    "uploaded",
    "is pdf",
    "is file",
    "iss pdf",
    "isme",
    "isme kya",
    "summary",
    "summarize",
    "resume",
    "report",
    "explain this pdf",
  ];

  const msg = message.toLowerCase();
  return keywords.some(k => msg.includes(k));
}