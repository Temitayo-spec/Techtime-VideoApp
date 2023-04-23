import Notifications from '@/components/Reusables/Notifications';
import Options from '@/components/Reusables/Options';
import VideoPlayer from '@/components/Reusables/VideoPlayer';
import styled from 'styled-components';

export default function Home() {
  return (
    <Wrapper>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
