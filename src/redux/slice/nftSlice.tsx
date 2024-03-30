import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface INftState {
  activityNFTIndexes: number[];
}

const initialState: INftState = {
  activityNFTIndexes: [],
};

const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    SET_ACTIVITY_NFT_INDEX: (
      state,
      action: PayloadAction<{
        activityNFTIndexes: number[];
      }>
    ) => {
      const { activityNFTIndexes } = action.payload;

      state.activityNFTIndexes = activityNFTIndexes;
    },
  },
});

export const { SET_ACTIVITY_NFT_INDEX } = nftSlice.actions;

export const getActivityNFTIndexesState = (state: RootState) =>
  state.nft.activityNFTIndexes;

export default nftSlice.reducer;
