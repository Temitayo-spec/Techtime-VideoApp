import Image from 'next/image';
import styled from 'styled-components';
import ic_online from '/public/svgs/ic_online.svg';
import ic_video from '/public/svgs/ic_video.svg';
import ic_microphone from '/public/svgs/ic_microphone.svg';
import ic_mic_off from '/public/svgs/ic_mic_off.svg';
import ic_video_off from '/public/svgs/ic_video_off.svg';
import { SocketContext } from '../../../context/SocketContext';
import { useContext } from 'react';
import getFirstLetters from '../../../utils/helpers/getFirstLLetters';

const VideoPlayer = () => {
  const {
    initializeAudio,
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    isVideo,
    disconnectAudio,
    toggleCam,
  } = useContext(SocketContext);

  return (
    <Wrapper>
      <Inner>
        {/* Our Own video player */}
        <VideoContainer>
          <video ref={myVideo} playsInline muted autoPlay />
          {/* {!isVideo ? (
          ) : (
            <Abbreviation>{getFirstLetters(name || 'Name')}</Abbreviation>
          )} */}
          <NameCtn>
            {name || 'Name'}
            <Image src={ic_online} alt="ic_online" />
          </NameCtn>
          {/* <AccessButtonContainer>
            <AccessButton onClick={toggleCam}>
              {isVideo ? (
                <Image src={ic_video} alt="ic_video" />
              ) : (
                <Image src={ic_video_off} alt="ic_video_off" />
              )}
            </AccessButton>
            <AccessButton onClick={initializeAudio}>
              <Image src={ic_microphone} alt="ic_mic" />
            </AccessButton>
          </AccessButtonContainer> */}
        </VideoContainer>
        {/*User's video player */}
        {callAccepted && !callEnded && (
          <VideoContainer>
            <video ref={userVideo} playsInline muted autoPlay />
            {/* {!isVideo ? (
            ) : (
              <Abbreviation>{getFirstLetters(call.name || 'Name')}</Abbreviation>
            )} */}
            <NameCtn>
              {call.name || 'Name'}
              <Image src={ic_online} alt="ic_online" />
            </NameCtn>
            {/* <AccessButtonContainer>
              <AccessButton onClick={toggleCam}>
                {isVideo ? (
                  <Image src={ic_video} alt="ic_video" />
                ) : (
                  <Image src={ic_video_off} alt="ic_video_off" />
                )}
              </AccessButton>
              <AccessButton onClick={initializeAudio}>
                <Image src={ic_microphone} alt="ic_mic" />
              </AccessButton>
            </AccessButtonContainer> */}
          </VideoContainer>
        )}
      </Inner>
    </Wrapper>
  );
};

export default VideoPlayer;

export const Wrapper = styled.div``;

export const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

export const VideoContainer = styled.div`
  width: 600px;
  height: 383px;
  background: #13161b;
  border-radius: 16px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
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

export const AccessButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 48px;
    height: 48px;
    background: #2d3440;
    margin-bottom: 0.5rem;
    border: 1px solid #2d3440;
    border-radius: 12px;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const AccessButton = styled.button``;

export const Abbreviation = styled.div`
  width: 100px;
  height: 100px;
  background: #2d3440;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 500;
  color: #fff;
`;
