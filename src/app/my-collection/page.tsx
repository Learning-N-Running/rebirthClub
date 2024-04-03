"use client";
import React, { useEffect, useState } from "react";
import InstructionTitle from "@/components/common/InstructionTitle";
import { styled } from "styled-components";
import { AlchemyProvider, ethers } from "ethers";
import {
  activityNFTAddress,
  certificateNFTAddress,
} from "@/lib/contractAddresses";
import certificateNFTABI from "../../lib/CertificateNFT.json";
import activityNFTABI from "../../lib/ActivityNFT.json";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddressState,
  getIsLoggedInState,
  getNicknameState,
} from "@/redux/slice/authSlice";
import {
  SET_ACTIVITY_NFT_INDEXES,
  SET_CERTIFICATE_NFT_URI,
  getActivityNFTIndexesState,
  getCertificateNFTURIState,
} from "@/redux/slice/nftSlice";
import { useRouter } from "next/navigation";
import MessageModal from "@/components/modal/MessageModal";
import activities from "../../lib/activities.json";
import ActivityNFT from "@/components/common/activities/ActivityNFT";
import CertificateNFT from "@/components/common/certificate/CertificateNFT";
import Image from "next/image";

export default function MyCollection() {
  const userAddress: string | null = useSelector(getAddressState);
  const isLoggedIn = useSelector(getIsLoggedInState);
  const activityNFTIndexes = useSelector(getActivityNFTIndexesState);
  const certificateNFTURI: string | null = useSelector(
    getCertificateNFTURIState
  );
  const nickcname = useSelector(getNicknameState);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const provider = new AlchemyProvider(
    "maticmum",
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  );
  const signer = new ethers.Wallet( //contract 소유자가 직접 트랜잭션을 보내야함.
    process.env.NEXT_PUBLIC_PRIVATE_KEY!,
    provider
  );
  let certificateNFTContract = new ethers.Contract(
    certificateNFTAddress,
    certificateNFTABI,
    signer
  );
  let activityNFTContract = new ethers.Contract(
    activityNFTAddress,
    activityNFTABI,
    signer
  );

  async function updateIndexList() {
    const indexList = await activityNFTContract.getIndexesByAddress(
      userAddress
    );
    const newIndexList = indexList.map((item: BigInt) => Number(item));
    dispatch(SET_ACTIVITY_NFT_INDEXES({ activityNFTIndexes: newIndexList }));
  }

  async function updateURI() {
    const tokenURI = await certificateNFTContract.getTokenURIByAddress(
      userAddress
    );
    dispatch(SET_CERTIFICATE_NFT_URI({ certificateNFTURI: tokenURI }));
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (activityNFTIndexes.length === 0) {
        updateIndexList();
      }
      updateURI();
    } else {
      setShowLoginWarning(true);
      setTimeout(() => {
        setShowLoginWarning(false);
        router.push("/");
      }, 1500);
    }
  }, [, isLoggedIn]);
  return (
    <>
      {showLoginWarning && (
        <MessageModal title={"로그인 후 이용해주세요!"} isWarning={true} />
      )}
      <Container>
        <div style={{ width: "860px" }}>
          <InstructionTitle
            isIcon={true}
            title={"마이콜렉션"}
            detail="열심히 참여한 당신!/모은 NFT를 자랑해보세요 !"
          />
        </div>
        <NFTContainer>
          {activities.map(
            (activity, i) =>
              activityNFTIndexes.includes(activity.index) && (
                <NFTWrapper key={i} style={{ marginRight: "38px" }}>
                  <SmallWrapper>
                    <ActivityNFT
                      imgSrc={activity.NFTImgSrc}
                      index={activity.index}
                      name={activity.title}
                      margin="auto 0 0 0"
                    />
                  </SmallWrapper>
                  <div style={{ display: "flex" }}>
                    <Image
                      src="/images/share.svg"
                      alt="share"
                      width={36}
                      height={36}
                      style={{ marginLeft: "auto" }}
                    />
                  </div>
                </NFTWrapper>
              )
          )}
          {certificateNFTURI && (
            <NFTWrapper>
              <SmallWrapper>
                <CertificateNFT
                  imgSrc={"https://ipfs.io/ipfs/" + certificateNFTURI}
                  NFTname={"환생클럽 1st 수료증"}
                  userName={nickcname!}
                />
              </SmallWrapper>
              <div style={{ display: "flex" }}>
                <Image
                  src="/images/share.svg"
                  alt="share"
                  width={36}
                  height={36}
                  style={{ marginLeft: "auto" }}
                />
              </div>
            </NFTWrapper>
          )}
        </NFTContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 65px 0;
`;

const NFTContainer = styled.div`
  width: 100%;
  height: auto;

  overflow-x: auto;
  display: flex;
  padding: 0 22px 10px 22px;

  margin-top: 103px;
`;

const NFTWrapper = styled.div`
  height: 828px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SmallWrapper = styled.div`
  height: 766px;
  display: flex;
  align-items: center;
  flex-direction: column; /* 아래로 쌓이게끔 */
  justify-content: flex-end; /* 아래에 붙도록 설정 */
`;
