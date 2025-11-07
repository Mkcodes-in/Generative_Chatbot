import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs";
import { FaFilePdf } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import UsePDF from "../hooks/UsePDF";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function PdfParsing() {
    const { pdfText, setPdfText, loading, setLoading } = UsePDF();

    return (
        <div>
            <div className="absolute -top-14 z-0 text-white p-3 w-full rounded-t-2xl bg-[#303030] flex items-center justify-between">
                <div className='flex items-center'>
                    <FaFilePdf className="text-2xl mr-2" />
                    <div className="flex flex-col">
                        {/* <span>{file.name}</span>
                            <span>{(file.size / 1024).toFixed(2)} KB</span> */}
                    </div></div>
                <button
                    // onClick={() => setFile(null)}
                    className='cursor-pointer'><IoMdClose /></button>
            </div>
        </div>
    )
}
