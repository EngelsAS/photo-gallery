import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { getPhotoInfos } from "../../api/getPhotoInfos";
import { Full } from "unsplash-js/dist/methods/photos/types";
import Avatar from "../../components/avatar";
import Photo from "../../components/photo";
import { checkDaysSincePublication } from "../../utils/check-days-since-publication";
import {
  ArrowDownTrayIcon,
  HeartIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { downloadImage } from "../../api/downloadImage";
import LoadingButton from "../../components/loading-button";
import StyledLink from "../../components/styled-link";
import ShareButton from "../../components/share-button";

const PhotoPage = () => {
  const { id } = useParams();
  const [photoInfos, setPhotoInfos] = useState<Full | undefined>();
  const [imageWidth, setImageWidth] = useState(0);
  const publicationData = photoInfos?.created_at.split("T")[0];
  const daysPassesSincePublication = checkDaysSincePublication(
    publicationData || ""
  );
  const divRef = useRef<HTMLDivElement>(null);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
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
      return `Publicada há ${daysPassesSincePublication} dias`;
    } else if (daysPassesSincePublication === 1) {
      return "Publicada há 1 dia";
    } else {
      return "Publicada hoje";
    }
  };

  useEffect(() => {
    if (photoInfos && divRef.current) {
      const divMaxWidth = divRef.current.offsetWidth;
      const height = divRef.current.offsetHeight;
      const newWidth = (photoInfos.width / photoInfos.height) * height;
      setImageWidth(newWidth <= divMaxWidth ? newWidth : divMaxWidth);
    }
  }, [photoInfos]);

  const handleDownload = async () => {
    if (!photoInfos) return;

    setIsLoadingDownload(true);
    try {
      await downloadImage(photoInfos.links.download_location, photoInfos.id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDownload(false);
    }
  };

  return (
    <div className="h-full">
      <div className="p-3 flex flex-col gap-3 lg:h-full">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Avatar src={photoInfos?.user.profile_image.medium} />

            {photoInfos && (
              <div>
                <p className="font-semibold">{photoInfos?.user.name}</p>

                <p className="text-xs text-zinc-500">
                  {generatePublicationDateText()} no{" "}
                  <StyledLink href="https://unsplash.com/">Unplash</StyledLink>
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

          <div className="flex gap-3">
            <div>
              <ShareButton url={window.location.href}>
                <div className="flex gap-2 items-center px-2">
                  <LinkIcon className="size-7" />

                  <p className="font-semibold">Compartilhar</p>
                </div>
              </ShareButton>
            </div>

            <LoadingButton
              onClick={handleDownload}
              isLoading={isLoadingDownload}
            >
              <ArrowDownTrayIcon className="size-7" />
            </LoadingButton>
          </div>
        </div>

        <div className="w-full h-full flex overflow-hidden" ref={divRef}>
          <div className="mx-auto max-w-full">
            {photoInfos && (
              <div
                onClick={() => {
                  setIsFullScreen(true);
                }}
                className="h-full w-full pointer-events-none md:pointer-events-auto"
              >
                <Photo
                  data={photoInfos}
                  imageSrc={photoInfos.urls.regular}
                  imageHeight="100%"
                  imageWidth={imageWidth}
                  expandable
                />
              </div>
            )}
          </div>
        </div>

        {photoInfos && isFullScreen && (
          <div
            className={`absolute h-screen flex items-center lg:items-start top-0 left-0 right-0 cursor-zoom-out`}
            onClick={() => setIsFullScreen(false)}
          >
            <div className="fixed h-screen bg-black/45 w-screen"></div>

            <Photo
              data={photoInfos}
              imageSrc={photoInfos.urls.full}
              gradualLoading={true}
              isFullScreen={isFullScreen}
              expandable
            />
          </div>
        )}

        <div className="flex items-center text-zinc-500">
          <HeartIcon className="size-6" />
          <p>{photoInfos?.likes}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;
