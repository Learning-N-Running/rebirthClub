"use client";
import SlideBanner from "@/components/banner/SlideBanner";
import { styled } from "styled-components";
import Image from "next/image";
import React from "react";
import DAOactivity from "@/components/common/dao-intro/DAOactivity";
import activities from "../../lib/activities.json";
import BaseBanner from "@/components/banner/BaseBanner";

export default function DaoIntro() {
  const DAOintro =
    "2024년 2월 5일, 환경에 대한 관심으로 이어진 우리들은/환경을 생각하는 사람들, ‘환생클럽’을 개설하게 되었습니다./ /쉽게 실천할 수 있는 것부터/‘함께’ 실행해 보자는 생각으로 탄생한 환생클럽은/지난 2개월간 위퍼블릭을 기반으로/다양한 프로젝트를 전개했습니다./ /평소 친환경 라이프를 실천하는 사람, 그렇지 않은 사람 모두/하나가 될 수 있었던 프로젝트들을 소개합니다!/ /환생클럽의 도전은 끝나지 않았습니다./앞으로의 환생클럽을 기대해 주세요!/ / /";
  const parts = DAOintro!.split("/");
  return (
    <>
      <BaseBanner>
        <BannerBackground>
          <Image src="/images/banners/배너3.png" alt="DAO intro Banner" fill />
        </BannerBackground>
      </BaseBanner>
      <Container>
        <Text1>환경에 대한 작은 관심, 다양한 경험, 새로운 만남</Text1>
        <Text2>환경을 생각하는 사람들</Text2>
        <Text3>환생클럽</Text3>
        <Text4>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && <br />}
              {part}
            </React.Fragment>
          ))}
        </Text4>
        <div
          style={{
            width: "220px",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "56px",
          }}
        >
          <a href="https://wepublic.com/c/Rebirth?tab=feed">
            <Image
              src="/images/wepublic.svg"
              alt="rebirth club wepublic"
              width={36}
              height={36}
              style={{ cursor: "pointer" }}
            />
          </a>
          <a href="https://www.instagram.com/re_birth_club">
            <Image
              src="/images/instagram.png"
              alt="rebirth club instagram"
              width={36}
              height={36}
              style={{ cursor: "pointer" }}
            />
          </a>
          <a href="https://twitter.com/re_birth_club">
            <Image
              src="/images/xtwitter.png"
              alt="rebirth club x twitter"
              width={36}
              height={36}
              style={{ cursor: "pointer" }}
            />
          </a>
        </div>
        <Text5>환생클럽 활동내역</Text5>
        {activities.map((activity, index) => (
          <DAOactivity
            key={index}
            name={activity.name}
            date={activity.date}
            activityDescription={activity.activityDescription}
            tag={activity.tag}
            imgSrc={activity.imgSrc}
          />
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 154px 0 50px 0;
`;

const BannerBackground = styled.div`
  width: 100%;
  height: 100%;

  background-color: #12563b;

  position: relative;
  overflow: hidden;
`;

const Text1 = styled.div`
  color: #6b7280;
  font-size: 24px;
  font-weight: 400;
`;

const Text2 = styled.div`
  color: #1f2937;
  font-size: 18;
  font-weight: 700;

  margin-top: 47px;
`;

const Text3 = styled.div`
  color: #1f2937;
  font-size: 32px;
  font-weight: 700;

  margin-top: 6px;
`;

const Text4 = styled.div`
  color: #6b7280;
  font-size: 14;
  font-weight: 400;
  line-height: 150%;
  text-align: center;

  margin-top: 40px;
`;

const Text5 = styled.div`
  color: #1f2937;
  font-size: 42px;
  font-weight: 700;

  margin-top: 175px;
  margin-bottom: 8px;
`;
