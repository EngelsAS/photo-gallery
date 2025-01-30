import { Basic } from "unsplash-js/dist/methods/photos/types";

export type PhotosResponse = {
  type: "error" | "success";
  error?: string;
  photos?: Basic[];
};
