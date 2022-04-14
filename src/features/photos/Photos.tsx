import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPhotos, selectPhotos } from "./photosSlice";

import { Photo } from "../../types/photo";

import './Photos.scss'

const Photos: React.FC = () => {
  const [albumId, setAlbumId] = useState('1');
  const [searchedAlbumId, setSearchedAlbumId] = useState('');
  const [photos, setPhotos] = useState<Photo[]>(useAppSelector(selectPhotos))
  const dispatch = useAppDispatch();
  const photosFromServer = useAppSelector(selectPhotos);

  useEffect(() => {
    setPhotos(photosFromServer)
  }, [photosFromServer]);

  const loadPhotos = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    setSearchedAlbumId(albumId);
    dispatch(getPhotos(albumId));
  }

  return (
    <>
      <form
        onSubmit={loadPhotos}
        className='form'
      >
        <input
          type='number'
          min={1}
          max={100}
          value={albumId}
          onChange={e => setAlbumId(e.target.value)}
          className='form__text-input'
        />
        <button
          type='submit'
          disabled={searchedAlbumId === albumId}
          className='form__button'
        >
          Get photos
        </button>
      </form>
      <ul className='photos-list'>
        {photos.map(photo => (
          <li
            key={photo.id}
            className='photos-list__item'
          >
            <p className='photos-list__item-title'>{photo.title}</p>
            <img src={photo.url} alt={photo.title} />
          </li>
          ))}
      </ul>
    </>
  )
}

export default Photos;