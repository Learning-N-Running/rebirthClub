"use client";

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ActivityNFT from "@/components/common/activities/ActivityNFT";
import GreenGrayButton from "@/components/button/GreenGrayButton";
import { useRouter } from "next/navigation";
import activities from "../../../lib/activities.json";
import { useSelector } from "react-redux";
import { getActivityNFTIndexesState } from "@/redux/slice/nftSlice";

export default function SingleActivityPage({
  params,
}: {
  params: { activity: number };
}) {
  const index = params.activity;
  let date, name, title, story, NFTImgSrc;
  const activity = activities.find(
    (activity) => activity.index === Number(index)
  );
  if (activity) {
    date = activity.date;
    name = activity.name;
    title = activity.title;
    story = activity.story;
    NFTImgSrc = activity.NFTImgSrc;
  }
  const parts = story!.split("/");
  const activityNFTIndexes = useSelector(getActivityNFTIndexesState);
  const router = useRouter();
  const [isButtonActivated, setIsButtonActivated] = useState(true);

  useEffect(() => {
    for (let i = 0; i < activityNFTIndexes.length; i++) {
      if (Number(index) === activityNFTIndexes[i]) {
        setIsButtonActivated(false);
        break;
      }
    }
  }, []);

  return (
    <Container>
      <Date>{date}</Date>
      <Name>{name?.replace("/", "")}</Name>
      <Index>{`No.${index}`}</Index>
      <Title>{title}</Title>
      <Story>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {part}
          </React.Fragment>
        ))}
      </Story>
      <ActivityNFT imgSrc={NFTImgSrc!} index={index} name={title!} />
      <div style={{ width: "590px", marginTop: "46px" }}>
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            marginLeft: "auto",
          }}
        >
          {isButtonActivated ? (
            <GreenGrayButton
              isGray={false}
              title={"발급받기"}
              onClickHandler={() => {
                router.push(`/activities/${index}/authentication`);
              }}
            />
          ) : (
            <GreenGrayButton
              isGray={true}
              title={"발급완료"}
              onClickHandler={() => {}}
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

const Date = styled.div`
  color: #9ca3af;
  font-size: 16px;
  font-weight: 400;
`;

const Name = styled.div`
  color: #4b5563;
  font-size: 24px;
  font-weight: 400;

  margin-top: 16px;
`;

const Index = styled.div`
  color: #9ca3af;
  font-size: 24px;
  font-weight: 500;

  margin-top: 46px;
`;

const Title = styled.div`
  color: #1f2937;
  font-size: 42px;
  font-weight: 700;
`;

const Story = styled.div`
  color: #6b7280;
  font-size: 14px;
  font-weight: 400;
  line-height: 130%;
  text-align: center;

  margin-top: 56px;
  margin-bottom: 72px;
`;
