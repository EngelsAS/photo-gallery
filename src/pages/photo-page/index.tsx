import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { getPhotoInfos } from "../../api/getPhotoInfos";
import { Full } from "unsplash-js/dist/methods/photos/types";
import Avatar from "../../components/avatar";
import Photo from "../../components/photo";
import { checkDaysSincePublication } from "../../utils/check-days-since-publication";

const PhotoPage = () => {
  const { id } = useParams();
  const [photoInfos, setPhotoInfos] = useState<Full | undefined>();
  const publicationData = photoInfos?.created_at.split("T")[0];
  const daysPassesSincePublication = checkDaysSincePublication(
    publicationData || ""
  );
  const divRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const fetchPhotos = async (id: string) => {
      const result = await getPhotoInfos(id);
      setPhotoInfos(result);
    };

    if (id) {
      fetchPhotos(id);
    }
  }, [id]);

  const generatePublicationDateText = () => {
    if (daysPassesSincePublication > 1) {
      return `Published ${daysPassesSincePublication} days ago`;
    } else if (daysPassesSincePublication === 1) {
      return "Published 1 day ago";
    } else {
      return "Published today";
    }
  };

  return (
    <div className="p-3 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar src={photoInfos?.user.profile_image.medium} />

        {photoInfos && (
          <div>
            <p className="font-semibold">{photoInfos?.user.name}</p>
            <p className="text-xs text-zinc-500">
              {generatePublicationDateText()}
            </p>
          </div>
        )}

        {!photoInfos && (
          <div className="flex flex-col gap-1">
            <div className="bg-zinc-200 animate-pulse w-15 h-2"></div>
            <div className="bg-zinc-200 animate-pulse w-10 h-2"></div>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="h-[580px] mx-auto" ref={divRef}>
          {photoInfos && (
            <div
              onClick={() => {
                setIsFullScreen(true);
              }}
              className="h-full"
            >
              <Photo
                data={photoInfos}
                imageSrc={photoInfos.urls.regular}
                imageHeight="100%"
              />
            </div>
          )}
        </div>
      </div>

      {photoInfos && (
        <div
          className={`absolute h-screen top-0 left-0 right-0 ${
            !isFullScreen ? "pointer-events-none opacity-0 overflow-hidden" : ""
          }`}
          onClick={() => setIsFullScreen(false)}
        >
          <Photo data={photoInfos} imageSrc={photoInfos?.urls.full} />
        </div>
      )}
    </div>
  );
};

export default PhotoPage;
