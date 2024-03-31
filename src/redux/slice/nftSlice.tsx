import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface INftState {
  activityNFTIndexes: number[];
  certificateNFTURI: string | null;
}

const initialState: INftState = {
  activityNFTIndexes: [],
  certificateNFTURI: null,
};

const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    SET_ACTIVITY_NFT_INDEXES: (
      state,
      action: PayloadAction<{
        activityNFTIndexes: number[];
      }>
    ) => {
      const { activityNFTIndexes } = action.payload;

      state.activityNFTIndexes = activityNFTIndexes;
    },
    SET_CERTIFICATE_NFT_URI: (
      state,
      action: PayloadAction<{
        certificateNFTURI: string;
      }>
    ) => {
      const { certificateNFTURI } = action.payload;

      state.certificateNFTURI = certificateNFTURI;
    },
    INITIALIZE_NFT_STATE: (state) => {
      state.activityNFTIndexes = [];
      state.certificateNFTURI = null;
    },
  },
});

export const {
  SET_ACTIVITY_NFT_INDEXES,
  SET_CERTIFICATE_NFT_URI,
  INITIALIZE_NFT_STATE,
} = nftSlice.actions;

export const getActivityNFTIndexesState = (state: RootState) =>
  state.nft.activityNFTIndexes;

export const getCertificateNFTURIState = (state: RootState) =>
  state.nft.certificateNFTURI;

export default nftSlice.reducer;
