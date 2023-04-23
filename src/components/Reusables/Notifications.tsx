import { useContext } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import styled from 'styled-components';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <Wrapper>
          <NoficationInner>
            <h1>{call.name} is calling:</h1>
            <button onClick={answerCall}>Answer</button>
          </NoficationInner>
        </Wrapper>
      )}
    </>
  );
};

export default Notifications;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 100;
`;

const NoficationInner = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem;
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #fff;
  }
  button {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    background: #2d3440;
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }
`;

export const h1 = styled.h1``;
