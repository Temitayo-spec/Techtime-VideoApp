import Image from 'next/image';
import styled from 'styled-components';
import ic_online from '/public/svgs/ic_online.svg';
type Props = {};

const VideoPlayer = (props: Props) => {
  return (
    <Wrapper>
      <Inner>
        {/* Our Own video player */}
        <VideoContainer>
          <NameCtn>
            Name
            <Image src={ic_online} alt="ic_online" />
          </NameCtn>
        </VideoContainer>
        {/*User's video player */}
      </Inner>
    </Wrapper>
  );
};

export default VideoPlayer;

export const Wrapper = styled.div``;

export const Inner = styled.div``;

export const VideoContainer = styled.div`
  width: 600px;
  height: 383px;
  background: #13161b;
  border-radius: 16px;
  position: relative;

  video {
    width: 100%;
    height: 100%;
  }
`;

export const NameCtn = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 0.5rem 1rem;
  img {
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 0.5rem;
  }
`;
