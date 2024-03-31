"use client";
import React, { useEffect, useRef } from "react";
import CertificateNFT from "@/components/common/certificate/CertificateNFT";
import InstructionTitle from "@/components/common/InstructionTitle";
import { ChangeEvent, useState } from "react";
import { styled } from "styled-components";
import GreenGrayButton from "@/components/button/GreenGrayButton";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVITY_NFT_INDEXES,
  SET_CERTIFICATE_NFT_URI,
  getActivityNFTIndexesState,
  getCertificateNFTURIState,
} from "@/redux/slice/nftSlice";
import { AlchemyProvider, ethers } from "ethers";
import { getAddressState, getIsLoggedInState } from "@/redux/slice/authSlice";
import {
  activityNFTAddress,
  certificateNFTAddress,
} from "@/lib/contractAddresses";

import uploadFileToIPFS from "@/lib/uploadFileToIPFS";
import { useRouter } from "next/navigation";
import MessageModal from "@/components/modal/MessageModal";
import certificateNFTABI from "../../lib/CertificateNFT.json";
import activityNFTABI from "../../lib/ActivityNFT.json";

type nftT = "beforeMint" | "cannotMint" | "nftPending" | "nftComplete";

export default function Certificate() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoggedIn = useSelector(getIsLoggedInState);
  const activityNFTIndexes = useSelector(getActivityNFTIndexesState);
  const certificateNFTURI: string | null = useSelector(
    getCertificateNFTURIState
  );
  const [nftState, setNftState] = useState<nftT>("beforeMint");
  const userAddress: string | null = useSelector(getAddressState);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const tokenMintedABI = certificateNFTABI.find(
    (item) => item.name === "TokenMinted" && item.type === "event"
  );
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

  const handleImageButtonClick = () => {
    // 버튼 클릭 시 파일 선택 창 열기
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setBackgroundImage(imageUrl);

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
    }
  };

  const handleIssueButtonClick = async () => {
    if (activityNFTIndexes.length > 2) {
      setNftState("nftPending");
      // Mint Certificate NFT
      const mintClothing = await certificateNFTContract.safeMint(userAddress);
      const receiptMintClothing = await mintClothing.wait();
      const ITokenMinted = new ethers.Interface([tokenMintedABI!]);
      const tokenId = Number(
        ITokenMinted.parseLog(receiptMintClothing.logs[1])?.args[1]
      );
      // Certificate NFT URI IPFS 등록
      const ipfsHash = await uploadFileToIPFS(backgroundImage!);
      console.log(ipfsHash);
      // Certificate NFT URI 등록
      const setCertificateURI = await certificateNFTContract.setTokenURI(
        userAddress,
        tokenId,
        ipfsHash
      );
      const receiptSetCertificateURI = await setCertificateURI.wait();
      console.log(receiptSetCertificateURI);
      setNftState("nftComplete");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      setNftState("cannotMint");
      setTimeout(() => {
        router.push("/activities");
      }, 1500);
    }
  };

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
      if (certificateNFTURI === null) {
        updateURI();
      }
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
      {nftState === "cannotMint" && (
        <MessageModal title={"2개 이상의 NFT가 필요해요."} isWarning={true} />
      )}
      {nftState === "nftComplete" && <MessageModal title={"발급 완료!"} />}
      {nftState === "nftPending" && <MessageModal title={"발급 중..."} />}
      <Container>
        <div style={{ width: "840px" }}>
          <InstructionTitle
            isIcon={true}
            title={"환생클럽 수료증 NFT"}
            detail="2번 이상 열심히 활동한 환생자분들에 한해 발급되는 수료증입니다./여러분의 활동 모습을 담아 NFT 수료증을 발급 받아보세요 !"
          />
        </div>
        <CertificateNFT
          imgSrc={
            certificateNFTURI
              ? "https://ipfs.io/ipfs/" + certificateNFTURI
              : backgroundImage
          }
          NFTname={"환생클럽 1ST 수료증"}
          userName="채채"
          margin="110px 0 47px 0"
        />
        <div style={{ width: "840px" }}>
          <div
            style={{
              width: "fit-content",
              height: "fit-content",
              marginLeft: "auto",
            }}
          >
            {certificateNFTURI ? (
              <GreenGrayButton
                isGray={true}
                title={"발급완료"}
                onClickHandler={() => {}}
              />
            ) : (
              <>
                <LightGreenButton onClick={handleImageButtonClick}>
                  이미지 첨부
                </LightGreenButton>
                <HiddenInput
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {backgroundImage && (
                  <GreenGrayButton
                    isGray={false}
                    title={"발급 받기"}
                    onClickHandler={handleIssueButtonClick}
                    margin="0 0 0 22px"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

const LightGreenButton = styled.button`
  background-color: #9dd781;
  color: white;

  font-size: 18px;
  font-weight: 600;

  height: 46px;
  padding: 12.5px 23px;

  border: none;
  border-radius: 10px;

  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;
