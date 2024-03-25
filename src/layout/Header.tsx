import colors from "@/styles/color";
import { usePathname, useRouter } from "next/navigation";
import { styled } from "styled-components";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Container>
      <Logo
        src="/images/rebirth_club_logo.svg"
        alt="rebirth club logo"
        width={100}
        height={100}
        onClick={() => router.push("/")} //수정 필요
      />
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

  border: 1px solid black;
  padding: 0 110px 0 110px;
`;

const Logo = styled(Image)`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
