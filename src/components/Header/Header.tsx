import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiHealthPotion } from "react-icons/gi";
const SStrong = styled.strong`
  text-transform: capitalize;
`;
const StyledLinked = styled(Link)`
  padding: 15px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.indianRed};
`;

const SHeaderP = styled.p`
  font-size: 3rem;
  font-family: Lato;
  font-weight: 700;
  padding-left: 1rem;
`;
const SHeaderH1 = styled.h1`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
`;
const SHeaderIcons = styled(GiHealthPotion)<{ $homepage: boolean }>`
  color: ${({ theme }) => theme.colors.indianRed};
  @media (min-width: 768px) {
    font-size: flex-direction: ${(props) =>
      props.$homepage === true ? "10rem" : "5rem"};;
  } ;
`;
const SHPContainer = styled.div`
  display: flex;
  @media (min-width: 768px) {
    flex-direction: column;
  } ;
`;
const SHeader = styled.header<{ $homepage: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props.$homepage === true ? "space-between" : ""};
  @media (min-width: 500px) {
    justify-content: space-around;
  }
  @media (min-width: 768px) {
    flex-direction: ${(props) => (props.$homepage === true ? "column" : "row")};
  } ;
`;
const Header = ({
  to,
  toDescription,
  homepage,
}: {
  homepage: boolean;
  to: string;
  toDescription: string;
}) => {
  return (
    <SHeader $homepage={homepage}>
      <SHeaderH1>
        <Link to="/">
          <SHeaderIcons $homepage={homepage} />
          {""}
        </Link>
        <SHPContainer>
          <SHeaderP>
            <SStrong>H</SStrong>ealth
          </SHeaderP>
          <SHeaderP>
            <SStrong>W</SStrong>ealth
          </SHeaderP>
        </SHPContainer>
      </SHeaderH1>
      <StyledLinked to={to}>{toDescription}</StyledLinked>
    </SHeader>
  );
};

export default Header;
