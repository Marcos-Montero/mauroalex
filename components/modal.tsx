"use client";
import { useModal } from "@/context/ModalContext";

export const Modal = () => {
  const { content } = useModal();
  if (!content) return null;
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black/70 m-0 p-0 z-50">
      <div className="flex w-full h-full items-center justify-center z-[2]">
        <div className="border border-white p-2 rounded-xl bg-gradient-to-tl from-red-900/50 to-black">
          {content}
        </div>
      </div>
    </div>
  );
};
