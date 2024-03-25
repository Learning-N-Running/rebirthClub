import colors from "@/styles/color";
import { usePathname, useRouter } from "next/navigation";
import { styled } from "styled-components";
import Image from "next/image";
import { useState } from "react";
import ProfileModal from "@/components/modal/ProfileModal";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogIn, setIsLogin] = useState(true); // redux로 관리할 필요 있음
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <Container>
      <Logo
        src="/images/rebirth_club_logo.svg"
        alt="rebirth club logo"
        width={100}
        height={100}
        onClick={() => router.push("/")} //수정 필요
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <WhiteButton>DAO 소개</WhiteButton>
        {isLogIn ? (
          <>
            <ProfileImage
              src="/images/header_profile.png"
              alt="header profile"
              width={36}
              height={36}
              style={{ marginLeft: "28px" }}
              onClick={() => {
                setIsProfileModalOpen(!isProfileModalOpen);
                console.log(isProfileModalOpen);
              }}
            />
            <ProfileModal show={isProfileModalOpen} />
          </>
        ) : (
          <GreenButton style={{ marginLeft: "28px" }}>로그인</GreenButton>
        )}
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100vw;
  height: 84px;

  position: fixed;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 110px 0 110px;

  background-color: white;

  border: 1px solid black;
`;

const Logo = styled(Image)`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const WhiteButton = styled.button`
  height: 48px;
  padding: 0px;

  font-weight: 500;
  font-size: 24px;

  background-color: white;
  color: black;

  border: none;
  cursor: pointer;
`;

const GreenButton = styled.button`
  height: 48px;
  padding: 0 22px 0 22px;

  background-color: #b2e898;
  color: #108168;

  font-weight: 700;
  font-size: 18px;

  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const ProfileImage = styled(Image)`
  width: 36px;
  height: 36px;
  cursor: pointer;
`;
