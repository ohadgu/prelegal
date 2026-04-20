"use client";

import { useRef, useState } from "react";
import NDAForm from "@/components/NDAForm";
import NDAPreview from "@/components/NDAPreview";
import { defaultFormData, NDAFormData } from "@/lib/nda";

export default function Home() {
  const [formData, setFormData] = useState<NDAFormData>(defaultFormData);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0.01) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const p1 = formData.party1Company || "Party1";
      const p2 = formData.party2Company || "Party2";
      const filename = `mutual-nda-${p1}-${p2}`
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .concat(".pdf");
      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3.5 bg-navy-800 text-white shadow-lg z-10 shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="flex items-center justify-center w-8 h-8 rounded bg-amber-400">
            <svg className="w-5 h-5 text-navy-900" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="font-bold text-base tracking-tight">PreLegal</span>
            <span className="ml-2.5 text-blue-300 text-sm font-normal">
              Mutual NDA Creator
            </span>
          </div>
        </div>

        <button
          onClick={downloadPDF}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-navy-900 font-semibold text-sm px-5 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating PDF…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </>
          )}
        </button>
      </header>

      {/* Main split layout */}
      <main className="flex flex-1 overflow-hidden">
        {/* Form panel */}
        <aside className="w-[400px] shrink-0 flex flex-col bg-white border-r border-gray-200 shadow-md overflow-hidden">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 shrink-0">
            <p className="text-sm font-semibold text-gray-700">Fill in details</p>
            <p className="text-xs text-gray-400 mt-0.5">Preview updates in real time</p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll">
            <NDAForm data={formData} onChange={setFormData} />
          </div>
        </aside>

        {/* Document preview panel */}
        <div className="flex-1 overflow-y-auto custom-scroll bg-slate-100 py-10 px-8">
          <div className="shadow-2xl rounded-sm overflow-hidden max-w-[816px] mx-auto">
            <NDAPreview ref={previewRef} data={formData} />
          </div>
        </div>
      </main>
    </div>
  );
}
