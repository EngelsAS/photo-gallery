import { unsplash } from "./unsplash";

export const downloadImage = async (downloadUrl: string, photoId: string) => {
  const resp = await unsplash.photos.trackDownload({
    downloadLocation: downloadUrl,
  });

  if (resp.type === "success") {
    try {
      const imageResponse = await fetch(resp.response.url);
      const imageBlob = await imageResponse.blob();
      const blobUrl = URL.createObjectURL(imageBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `unsplash-${photoId}.jpg`);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  }
};
