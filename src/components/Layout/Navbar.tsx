import styled from 'styled-components';
import logo from '/public/images/techtime.png';
import Image from 'next/image';

const Navbar = () => {
  return (
    <Wrapper>
      <Inner>
        <Logo>
          <Image src={logo} alt="TechTime" />
        </Logo>
      </Inner>
    </Wrapper>
  );
};

export default Navbar;

export const Wrapper = styled.nav`
  padding: 1rem 0;
  width: 100%;
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Logo = styled.div`
  cursor: pointer;
`;
