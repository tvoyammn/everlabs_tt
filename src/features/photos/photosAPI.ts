import { Photo } from "../../types/photo"

export async function fetchPhotos(albumId: string): Promise<Photo[]> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  const photos = await response.json();

  return photos;
}