"use client";

import { useState } from "react";

import ProcessModal from "@/app/_components/process-modal";

const ProcessSection = ({ processSlides }) => {
  const [processModalOpen, setProcessModalOpen] = useState(true);

  return (
    processSlides &&
    processSlides.length > 0 && (
      <>
        <div className="hidden lg:block text-right">
          <button
            className=" py-2.5 px-5 border-[1px] border-black text-sm uppercase"
            onClick={() => setProcessModalOpen(true)}
          >
            Process
          </button>
        </div>
        <ProcessModal
          modalOpen={processModalOpen}
          setModalOpen={setProcessModalOpen}
          processSlides={processSlides}
        />
      </>
    )
  );
};

export default ProcessSection;
