import { CameraIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex gap-1 items-center">
        <CameraIcon className="size-6 text-black hidden sm:block" />

        <h1 className="font-semibold text-xl hidden sm:block">Photo Gallery</h1>
        <h1 className="font-semibold text-xl block sm:hidden">PG</h1>
      </div>
    </Link>
  );
};

export default Logo;
