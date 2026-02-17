# Chat2PDF: A Full-Stack AI-Powered Chatbot with PDF Parsing & Image Generation 

**Chat2PDF** is an innovative full-stack application that leverages AI to enable users to interact with PDFs in a conversational way. It includes features like PDF parsing, contextual question answering, and AI-generated images, providing an engaging multi-modal experience.

## Features

- **Full-Stack Development**: Complete end-to-end solution, from secure user authentication to AI-powered responses and PDF handling.
- **AI-Powered Chatbot**: Conversational chatbot with the ability to understand and answer questions based on PDF content.
- **PDF Parsing**: Upload and parse non-OCR PDF files into structured text for seamless interaction.
- **RAG-Based Chatbot**: Retrieval-Augmented Generation (RAG) pipeline to query the most relevant context from user-uploaded PDFs.
- **AI Image Generation**: Generate images based on user text prompts, powered by Stability AI.
- **Modern UI/UX**: Responsive and clean UI built with Tailwind CSS, ensuring a smooth user experience across devices.

## Tech Stack

- **Frontend**:  
  **React** + **Vite**  
  **Tailwind CSS**  

- **Backend**:  
  **Supabase** (Authentication, Database, API)  

- **AI Models & APIs**:  
  **Groq** (LLM for AI responses)  
  **PDF Parsing**: **pdf-parser**  
  **Embeddings**: **voyager-2**  
  **Response Generation**: **mistralai/mistral-7b-instruct**  
  **Image Generation**: **Stability AI**

## How It Works

1. **User Uploads PDF**:  
   Upload non-OCR PDFs to the platform.

2. **PDF Parsing**:  
   The uploaded PDF is parsed and converted into structured text.

3. **Embeddings Generation**:  
   Embeddings are generated from the document content for semantic search.

4. **Vector Search**:  
   User queries are processed by a vector search system to find the most relevant context from the PDF.

5. **AI Response**:  
   The AI generates a context-aware response based on the relevant content from the PDF.

6. **AI Image Generation**:  
   Users can generate images based on text prompts using Stability AI integrated into the platform.

## Demo Video

https://github.com/user-attachments/assets/28f6592e-64d1-4d8d-ba42-165b7f156070

## Screenshots

<img width="1919" height="939" alt="image" src="https://github.com/user-attachments/assets/09c7bf58-d148-4433-830d-b14a125ecc13" />
<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/fcf8e550-1a4d-45d9-98dc-bff280e484da" />
<img width="1919" height="939" alt="image" src="https://github.com/user-attachments/assets/38e61b7a-463e-4843-9b6e-bbc53a11d1e6" />
<img width="1917" height="941" alt="image" src="https://github.com/user-attachments/assets/94fb4529-c37a-4981-a65b-acff1d8aea77" />
<img width="1919" height="945" alt="image" src="https://github.com/user-attachments/assets/e5728ef9-71d5-40e8-bbe0-e18013c9a31f" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/9921d11a-3597-4229-ad85-e7f5c519ebb7" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/eb276078-0dea-423c-a55b-cc38148182bf" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/60f6cf9a-5725-4ee2-8fa4-22e281d22a45" />


## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mkcodes-in/Generative_Chatbot.git
cd Generative_Chatbot
