import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

const PhotoModal = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen top-0 fixed z-40 bg-black/45 flex flex-col py-3 items-center overflow-auto">
      <button
        className="text-white/75 hover:text-white transition-colors cursor-pointer font-bold text-center fixed left-2"
        onClick={() => navigate(-1)}
      >
        <XMarkIcon className="size-8" />
      </button>
      <div className="w-3/4">
        <div className="bg-white rounded-md">{children}</div>
      </div>
    </div>
  );
};

export default PhotoModal;
