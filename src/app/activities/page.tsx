"use client";
import Activity from "@/components/common/activities/Activity";
import InstructionTitle from "@/components/common/InstructionTitle";
import Timeline from "@/components/common/TimeLine";
import { styled } from "styled-components";
import activities from "../../lib/activities.json";

export default function Activities() {
  return (
    <Container>
      <ActivitiesWrapper>
        <InstructionTitle
          isIcon={true}
          title={"활동별 NFT"}
          detail={"2개 이상 발급 시,  환생클럽 인증서 NFT 발급이 가능합니다."}
        />
        <div style={{ display: "flex", marginTop: "60px" }}>
          <Timeline events={activities} />
          <div>
            {activities.map((activity, index) => (
              <Activity
                imgSrc={activity.imgSrc}
                name={activity.name}
                date={activity.date}
                index={activity.index}
                key={index}
              />
            ))}
          </div>
        </div>
      </ActivitiesWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;

const ActivitiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
