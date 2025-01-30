import { CameraIcon } from "@heroicons/react/24/outline";

const Logo = () => {
  return (
    <div className="flex gap-1 items-center">
      <CameraIcon className="size-6 text-black" />
      <h1 className="font-semibold text-xl">Photo Gallery</h1>
    </div>
  );
};

export default Logo;
