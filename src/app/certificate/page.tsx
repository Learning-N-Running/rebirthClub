"use client";
import React, { useRef } from "react";
import CertificateNFT from "@/components/CertificateNFT";
import InstructionTitle from "@/components/InstructionTitle";
import { ChangeEvent, useState } from "react";
import { styled } from "styled-components";
import GreenGrayButton from "@/components/button/GreenGrayButton";

export default function Certificate() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleButtonClick = () => {
    // 버튼 클릭 시 파일 선택 창 열기
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Container>
      <div style={{ width: "840px" }}>
        <InstructionTitle
          isIcon={true}
          title={"환생클럽 수료증 NFT"}
          detail="2번 이상 열심히 활동한 환생자분들에 한해 발급되는 수료증입니다./여러분의 활동 모습을 담아 NFT 수료증을 발급 받아보세요 !"
        />
      </div>
      <CertificateNFT
        imgSrc={backgroundImage}
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
          <LightGreenButton onClick={handleButtonClick}>
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
              onClickHandler={() => {}}
              margin="0 0 0 22px"
            />
          )}
        </div>
      </div>
    </Container>
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
