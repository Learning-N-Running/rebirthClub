"use client";
import React from "react";
import InstructionTitle from "@/components/common/InstructionTitle";
import { styled } from "styled-components";

export default function MyCollection() {
  return (
    <Container>
      <div style={{ maxWidth: "860px" }}>
        <InstructionTitle
          isIcon={true}
          title={"마이콜렉션"}
          detail="열심히 참여한 당신!/모은 NFT를 자랑해보세요 !"
        />
      </div>
      <NFTContainer>
        <NFTWrapper></NFTWrapper>
        <NFTWrapper></NFTWrapper>
        <NFTWrapper></NFTWrapper>
        <NFTWrapper></NFTWrapper>
        <NFTWrapper></NFTWrapper>
        <NFTWrapper></NFTWrapper>
      </NFTContainer>
    </Container>
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

  border: 1px solid green;
`;

const NFTWrapper = styled.div`
  height: 828px;
  width: 800px;
  margin-right: 30px;
  flex-shrink: 0;
  border: 1px solid red;
`;
