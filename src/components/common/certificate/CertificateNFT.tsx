import { styled } from "styled-components";
import Image from "next/image";

type Props = {
  imgSrc: string | undefined | null;
  NFTname: string;
  userName: string;
  margin?: string;
};

const CertificateNFT = ({ imgSrc, NFTname, userName, margin }: Props) => {
  return (
    <Container $margin={margin!}>
      <Thumbnail>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="activity NFT thumbnail"
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </Thumbnail>
      <DetailWrapper>
        <NFTName>{NFTname}</NFTName>
        <UserName>{userName}</UserName>
      </DetailWrapper>
    </Container>
  );
};

export default CertificateNFT;

const Container = styled.div<{ $margin: string }>`
  width: 840px;
  height: 766px;

  border-radius: 40px;
  overflow: hidden;

  margin: ${(props) => props.$margin};

  border: 2px solid #d1d5db;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 548px;
  background-color: gray;
  position: relative;
  overflow: hidden;
`;

const DetailWrapper = styled.div`
  width: 100%;
  height: 217px;
  padding-top: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const NFTIndex = styled.div`
//   height: 30px;
//   width: 60px;

//   text-align: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   font-size: 16px;
//   font-weight: 400;
//   color: #9ca3af;

//   border: 1px solid #9ca3af;
//   border-radius: 7px;
// `;

const NFTName = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #6b7280;
`;

const UserName = styled.div`
  font-size: 42px;
  font-weight: 700;
  color: #159075;
  margin-top: 28px;
`;
