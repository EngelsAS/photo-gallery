import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

const PhotoModal = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen top-0 fixed z-40 flex flex-col py-3 items-center overflow-auto">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="fixed inset-0 bg-black/45"
      ></div>
      <button
        className="text-white z-40 md:text-white/75 hover:text-white transition-colors cursor-pointer w-full md:fixed md:w-auto left-2"
        onClick={() => navigate(-1)}
      >
        <XMarkIcon className="size-8" />
      </button>
      <div className="w-full md:w-3/4 z-50 lg:h-full">
        <div className="bg-white rounded-md h-full">{children}</div>
      </div>
    </div>
  );
};

export default PhotoModal;
