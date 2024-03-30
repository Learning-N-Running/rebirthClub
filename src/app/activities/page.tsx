"use client";
import Activity from "@/components/common/activities/Activity";
import InstructionTitle from "@/components/common/InstructionTitle";
import Timeline from "@/components/common/TimeLine";
import { styled } from "styled-components";
import activities from "../../lib/activities.json";
import { AlchemyProvider, ethers } from "ethers";
import { activityNFTAddress } from "@/lib/contractAddresses";
import activityNFTABI from "../..//lib/ActivityNFT.json";
import { useSelector } from "react-redux";
import { getAddressState } from "@/redux/slice/authSlice";
import { useDispatch } from "react-redux";
import {
  SET_ACTIVITY_NFT_INDEX,
  getActivityNFTIndexesState,
} from "@/redux/slice/nftSlice";
import { useEffect } from "react";

export default function Activities() {
  const userAddress: string | null = useSelector(getAddressState);
  const activityNFTIndexes = useSelector(getActivityNFTIndexesState);

  const provider = new AlchemyProvider(
    "maticmum",
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  );

  const signer = new ethers.Wallet( //contract 소유자가 직접 트랜잭션을 보내야함.
    process.env.NEXT_PUBLIC_PRIVATE_KEY!,
    provider
  );

  let activityNFTContract = new ethers.Contract(
    activityNFTAddress,
    activityNFTABI,
    signer
  );

  const dispatch = useDispatch();
  async function updateIndexList() {
    const indexList = await activityNFTContract.getIndexesByAddress(
      userAddress
    );
    const newIndexList = indexList.map((item: BigInt) => Number(item));
    dispatch(SET_ACTIVITY_NFT_INDEX({ activityNFTIndexes: newIndexList }));
  }

  useEffect(() => {
    updateIndexList();
  }, []);

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
                isButtonActivated={!activityNFTIndexes.includes(activity.index)}
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
