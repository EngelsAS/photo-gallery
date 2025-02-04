import { Basic } from "unsplash-js/dist/methods/photos/types";
import Photo from "../photo";

interface PhotoListProps {
  columns: Basic[][];
}

const PhotoList = ({ columns }: PhotoListProps) => {
  if (columns.length === 0) {
    return <div>...</div>;
  }

  const content = columns.map((internArray, indexMainArray) => (
    <div
      className={`flex flex-col grow gap-3 max-w-[418px]`}
      key={indexMainArray}
    >
      {internArray.map((item, internArrayIndex) => (
        <Photo key={internArrayIndex} data={item} />
      ))}
    </div>
  ));

  return <>{content}</>;
};

export default PhotoList;
