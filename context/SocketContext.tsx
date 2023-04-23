import React, { createContext, useState, useRef, useEffect } from 'react';

import { io } from 'socket.io-client';
import Peer from 'simple-peer';

let SocketContext = createContext({
  initializeCamera: () => {},
  initializeAudio: () => {},
  disconnectCamera: () => {},
  disconnectAudio: () => {},
  name: '',
  callAccepted: false,
  myVideo: null,
  userVideo: null,
  callEnded: false,
  stream: null,
  call: {
    isReceivedCall: false,
    from: '',
    name: '',
  },
  isVideo: false,
  toggleCam: () => {},
  leaveCall: () => {},
  callUser: (arg0: any) => {},
  me: '',
  setName: (name: any) => {},
  answerCall: () => {},
});

const socket = io('https://videoapp-backend-production.up.railway.app');

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
  const myVideo = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLVideoElement>;
  const userVideo = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLVideoElement>;
  const connectionRef = useRef<any>();
  const [isVideo, setIsVideo] = useState(false);

  const initializeCamera = async () => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }
      setStream(currentStream);
      setIsVideo(true);
    } catch (error) {
      console.error('Error starting camera', error);
    }
  };

  useEffect(() => {
    initializeCamera();
    socket.on('me', (id: string) => setMe(id));
    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeAudio = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((currentStream) => {
        setStream(currentStream);
      });
  };

  const toggleCam = async () => {
    setIsVideo(!isVideo);
    if (isVideo) {
      //set stream to stream
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }
    }
  };

  const disconnectAudio = () =>
    navigator.mediaDevices.getUserMedia({ audio: false });

  const answerCall = () => {
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
          answerCall,
          initializeCamera,
          initializeAudio,
          toggleCam,
          disconnectAudio,
          isVideo,
        } as any
      }
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
