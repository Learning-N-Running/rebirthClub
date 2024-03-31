"use client";
import GreenGrayButton from "@/components/button/GreenGrayButton";
import { styled } from "styled-components";
import activities from "../../../../lib/activities.json";
import { ChangeEvent, useState } from "react";
import MessageModal from "@/components/modal/MessageModal";
import { useRouter } from "next/navigation";
import { AlchemyProvider, ethers } from "ethers";
import { activityNFTAddress } from "@/lib/contractAddresses";
import activityNFTABI from "../../../../lib/ActivityNFT.json";
import { useSelector } from "react-redux";
import { getAddressState } from "@/redux/slice/authSlice";

type nftT = "beforePwEnter" | "pwWrong" | "nftPending" | "nftComplete";

export default function Authentication({
  params,
}: {
  params: { activity: number };
}) {
  const index = params.activity;
  let name, title, pw: string;
  const activity = activities.find(
    (activity) => activity.index === Number(index)
  );
  if (activity) {
    name = activity.name;
    title = activity.title;
    pw = activity.pw;
  }

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [nftState, setNftState] = useState<nftT>("beforePwEnter");
  const userAddress: string | null = useSelector(getAddressState);

  const handleInputChange: any = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleButtonClick = async () => {
    if (password === pw) {
      console.log("성공");
      setNftState("nftPending");
      await mintActivityNFT(activity?.NFTURI!);
      setNftState("nftComplete");
      setTimeout(() => {
        router.push(`/activities`);
      }, 1500);
    } else {
      setNftState("pwWrong");
    }
  };

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

  async function mintActivityNFT(URI: string) {
    const mintActivityNft = await activityNFTContract.safeMint(
      userAddress,
      index,
      URI
    );
    const receiptMintActivityNft = await mintActivityNft.wait();
    console.log(receiptMintActivityNft);
  }

  return (
    <>
      {nftState === "nftComplete" && <MessageModal title={"발급 완료!"} />}
      {nftState === "nftPending" && <MessageModal title={"발급 중"} />}
      <Container>
        <Wrapper>
          <Name>{name}</Name>
          <Title style={{ marginTop: "12px" }}>{title}</Title>
          <Guide>
            인증번호 <span style={{ color: "#159075" }}>4자리</span>를
            입력해주세요.
          </Guide>
          <GuideDetail>
            위퍼블릭 커뮤니티 ‘공지사항’ 에서 확인하실 수 있습니다.
          </GuideDetail>
          <div
            style={{
              width: "100%",
              marginTop: "34px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <AuthInput
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handleInputChange}
              $isTrue={nftState}
            />
            <GreenGrayButton
              isGray={false}
              title={"확인"}
              onClickHandler={handleButtonClick}
            />
          </div>
          {nftState == "pwWrong" && (
            <AuthWarning>번호가 일치하지 않습니다.</AuthWarning>
          )}
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;

const Wrapper = styled.div`
  width: 513px;
`;

const Name = styled.div`
  width: 100%;
  color: #9ca3af;
  font-size: 16px;
  font-weight: 400;
`;

const Title = styled.div`
  color: #4b5563;
  font-size: 24px;
  font-weight: 400;

  margin-top: 16px;
`;

const Guide = styled.div`
  color: #4b5563;
  font-size: 32px;
  font-weight: 700;

  margin-top: 158px;
`;

const GuideDetail = styled.div`
  color: black;
  font-size: 16px; /* 단위 추가 */
  font-weight: 400;

  margin-top: 12px;
`;

const AuthInput = styled.input<{ $isTrue: nftT }>`
  width: 206px;
  height: 60px;
  background-color: #f3f4f6;

  border: ${(props) =>
    props.$isTrue !== "pwWrong" ? "2px solid #0aa98d" : "2px solid #EF4444"};
  border-radius: 12px;

  padding: 20px 18px;

  color: #9ca3af;
  font-size: 14px;
  font-weight: 400;
`;

const AuthWarning = styled.div`
  color: #ef4444;
  font-size: 14px;
  font-weight: 400;
  margin-top: 4px;
`;
