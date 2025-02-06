import { useState } from "react";
import Avatar from "../avatar";

interface PhotoUsernameHoverProps {
  profileImg: string;
  username: string;
}

const PhotoUsernameHover = ({
  profileImg,
  username,
}: PhotoUsernameHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`z-10 absolute top-0 w-full h-full bg-stone-950 transition-opacity ${
          isHovered ? "opacity-35" : "opacity-0"
        }`}
      ></div>
      <div
        className={`z-20 absolute flex bottom-0 p-3 items-center gap-3 transition-opacity cursor-pointer ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Avatar src={profileImg} />
        <p className="font-semibold text-white opacity-75 hover:opacity-100 transition-opacity">
          {username}
        </p>
      </div>
    </div>
  );
};

export default PhotoUsernameHover;
