import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import Web3, { Contract } from "web3";
import { AlchemyProvider, ethers } from "ethers";

interface IWeb3State {
  signer: ethers.Wallet | null;
  provider: AlchemyProvider | null;
}

const initialState: IWeb3State = {
  signer: null,
  provider: null,
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    SET_PROVIDER_SIGNER: (state, action) => {
      const { provider, signer } = action.payload;
      state.provider = provider;
      state.signer = signer;
    },
  },
});

export const { SET_PROVIDER_SIGNER } = web3Slice.actions;

export const getSignerState = (state: RootState) => state.web3.signer;
export const getProviderState = (state: RootState) => state.web3.provider;

export default web3Slice.reducer;
