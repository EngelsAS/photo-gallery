import { Basic } from "unsplash-js/dist/methods/photos/types";
import Photo from "../photo";
import { Link, useLocation } from "react-router";
import PhotoUsernameHover from "../photo-username-hover";

interface PhotoListProps {
  columns: Basic[][];
}

const PhotoList = ({ columns }: PhotoListProps) => {
  const location = useLocation();

  const content = columns.map((internArray, indexMainArray) => (
    <div
      className={`flex flex-col w-full gap-3 md:max-w-[418px]`}
      key={indexMainArray}
    >
      {internArray.map((item, internArrayIndex) => (
        <Link
          to={`/photo/${item.id}`}
          key={internArrayIndex}
          state={{ background: location }}
        >
          <Photo data={item} imageSrc={item.urls.small}>
            <PhotoUsernameHover
              profileImg={item.user.profile_image.medium}
              username={item.user.name}
            />
          </Photo>
        </Link>
      ))}
    </div>
  ));

  return <>{content}</>;
};

export default PhotoList;
