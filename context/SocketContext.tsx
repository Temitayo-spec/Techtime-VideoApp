import React, { createContext, useState, useRef, useEffect } from 'react';

import { io } from 'socket.io-client';
import Peer from 'simple-peer';

let SocketContext = createContext(null);

const socket = io('http://localhost:5000');

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [stream, setStream] = useState<MediaStream>();
  const [me, setMe] = useState('');
  const [call, setCall] = useState({
    isReceivedCall: false,
    from: '',
    name: '',
    signal: '',
  });
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<any>();

  useEffect(() => {
    socket.on('me', (id: string) => setMe(id));
    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const initializeCamera = () =>
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        setStream(currentStream);
      });
  const initializeAudio = () =>
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((currentStream) => {
        setStream(currentStream);
      });

  const disconnectCamera = () =>
    navigator.mediaDevices
      .getUserMedia({ video: false })
      .then((currentStream) => {
        setStream(currentStream);
      });
  const disconnectAudio = () =>
    navigator.mediaDevices
      .getUserMedia({ audio: false })
      .then((currentStream) => {
        setStream(currentStream);
      });
  const anserCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call.from });
    });
    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (data) => {
      socket.emit('calluser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });
    socket.on('callaccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={
        {
          call,
          callAccepted,
          myVideo,
          userVideo,
          stream,
          name,
          setName,
          callEnded,
          me,
          callUser,
          leaveCall,
          anserCall,
          initializeCamera,
          initializeAudio,
          disconnectCamera,
          disconnectAudio,
        } as any
      }
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
