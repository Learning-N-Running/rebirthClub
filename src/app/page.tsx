"use client";

import InstructionTitle from "@/components/common/InstructionTitle";
import BaseBanner from "@/components/banner/BaseBanner";
import { getIsLoggedInState } from "@/redux/slice/authSlice";
import colors from "@/styles/color";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <BaseBanner>
        <div style={{ width: "100%", height: "100%", display: "flex" }}>
          <BannerMessage>
            환생클럽 전용
            <br />
            NFT 발급 페이지 OPEN!
          </BannerMessage>
          <Image
            src="/images/home_banner.jpg"
            alt="rebirth club home banner"
            width={1000}
            height={1000}
            style={{ height: "100%", width: "auto" }}
          />
        </div>
      </BaseBanner>
      <Container>
        <div style={{ display: "flex", alignItems: "center" }}>
          <InstructionTitle
            isIcon={true}
            title={"환생클럽 전용 NFT를 받아보세요!"}
          />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "54px",
          }}
        >
          <BlockContainer>
            <GrayBlock onClick={() => router.push("/activities")}>
              <GrayBlockText>
                활동별
                <br />
                NFT 발급받기
              </GrayBlockText>
            </GrayBlock>
            <GrayBlock onClick={() => router.push("/certificate")}>
              <GrayBlockText>
                환생클럽
                <br />
                수료증 발급받기
              </GrayBlockText>
            </GrayBlock>
          </BlockContainer>
        </div>
      </Container>
    </>
  );
}

const BannerMessage = styled.div`
  width: 100%;
  background-color: #0aa98d;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 42px;
  font-weight: 700;
  line-height: 130%;
`;

const Container = styled.div`
  padding: 50px 110px;
`;

const BlockContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 944px;
`;

const GrayBlock = styled.div`
  position: relative;
  background-color: #f1f1f1;

  width: 365px;
  height: 365px;

  border-radius: 39px;
  cursor: pointer;
`;

const GrayBlockText = styled.div`
  position: absolute;
  color: black;

  font-weight: 700;
  font-size: 32px;

  left: 40px;
  bottom: 40px;
`;
