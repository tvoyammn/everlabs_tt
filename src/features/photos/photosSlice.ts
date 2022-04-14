import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../../app/store'

import { fetchPhotos } from './photosAPI'

import { Photo } from '../../types/photo'

export interface PhotosState {
  photos: Photo[]
}

const initialState: PhotosState = {
  photos: []
}

export const getPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (albumId: string) => {
    const photosFromServer = await fetchPhotos(albumId);
    return photosFromServer;
  }
)

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.photos = action.payload;
      })
  },
})

export const selectPhotos = (state: RootState) => state.photos.photos;

export default photosSlice.reducer;