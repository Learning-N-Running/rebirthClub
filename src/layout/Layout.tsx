"use client";

import { ReactNode, useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const showGoBack = () => {
    if (pathname === "/" || pathname === "/my-collection") {
      return false;
    }
    return true;
  };

  // useEffect //
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Header />

      <BodyContainer>
        {showGoBack() && (
          <GoBack
            width={32}
            height={32}
            alt="go back"
            src="/images/leftArrow.svg"
          />
        )}

        {children}
      </BodyContainer>
    </>
  );
};

const BodyContainer = styled.div`
  width: 100vw;
  height: 100%;

  padding-top: 84px;

  overflow: auto;
`;

const GoBack = styled(Image)`
  margin: 48px 0px 38px 110px;
  cursor: pointer;
`;

export default Layout;
