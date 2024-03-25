import { Network, Alchemy, BigNumberish } from "alchemy-sdk";

//Alchemy SDK
// Configuring Alchemy SDK with your API key and network
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with the network your NFT is on.
};

// Creating an Alchemy instance to make calls to the Alchemy API
const alchemy = new Alchemy(settings);

// Function to get the metadata of an NFT: accepts the NFT contract address and the token ID to get the metadata of
export async function getNFTMetadata(
  nftContractAddress: string,
  tokenId: string
) {
  // Making a call to the Alchemy API to get the metadata
  const response = await alchemy.nft.getNftMetadata(
    nftContractAddress,
    tokenId
  );
  return response; // returning the metadata
}
