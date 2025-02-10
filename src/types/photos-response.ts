import { Basic } from "unsplash-js/dist/methods/photos/types";

export type PhotosResponse = {
  type: "error" | "success";
  error?: string;
  total?: number;
  total_pages?: number;
  photos?: Basic[];
};
