import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AreaState = {
  areaId?: string | null;
};

const initialState: AreaState = {
  areaId: undefined,
};

export const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    setArea: (
      state,
      action: PayloadAction<string | null | undefined>,
    ) => {
      state.areaId = action.payload;
    },
  },
});

export default areaSlice.reducer;
