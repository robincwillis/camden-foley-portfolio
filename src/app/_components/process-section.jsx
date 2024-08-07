"use client";

import { useContext } from "react";

import AppContext from "@/app/_context/app-context";

import ProcessModal from "@/app/_components/process-modal";

const ProcessSection = ({ processSlides }) => {
  const { processModalOpen, setProcessModalOpen } = useContext(AppContext);

  return (
    processSlides &&
    processSlides.length > 0 && (
      <>
        <div className="hidden lg:block text-right">
          <button
            className="transition-colors py-2.5 px-5 border-[1px] border-black text-sm uppercase hover:text-white hover:bg-black"
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
