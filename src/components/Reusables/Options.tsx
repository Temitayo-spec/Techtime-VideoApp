interface OptionsProps {
  children: React.ReactNode;
}

import { SocketContext } from '../../../context/SocketContext';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { IoIosCopy } from 'react-icons/io';
import { AiOutlinePhone } from 'react-icons/ai';

const Options = ({ children }: OptionsProps) => {
  const {
    name,
    me,
    callAccepted,
    callEnded,
    leaveCall,
    callUser,
    call,
    setName,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  return (
    <Wrapper>
      <Form noValidate autoComplete="off">
        <FormGroup>
          <Label>Account Name</Label>
          <Input
            value={name}
            onChange={(e: { target: { value: any } }) =>
              setName(e.target.value)
            }
          />
          <Button
            onClick={async () => {
              try {
                const copied = await navigator.clipboard.writeText(me);
                setIsCopied(true);
                console.log(`Copied "${me}" to clipboard`);
              } catch (error) {
                console.error('Failed to copy text: ', error);
              }
            }}
            type="button"
          >
            {isCopied ? 'Copied' : 'Copy ID'}
            <IoIosCopy />
          </Button>
        </FormGroup>
        <FormGroup>
          <Label>Make Call</Label>
          <Input
            value={idToCall}
            onChange={(e: { target: { value: any } }) =>
              setIdToCall(e.target.value)
            }
          />
          {callAccepted && !callEnded ? (
            <HangUpButton onClick={leaveCall}>Hang Up</HangUpButton>
          ) : (
            <Button
              onClick={() => {
                callUser(idToCall);
              }}
              type="button"
            >
              Call
              <AiOutlinePhone />
            </Button>
          )}
        </FormGroup>
      </Form>
      {children}
    </Wrapper>
  );
};

export default Options;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  gap: 50px;
  align-items: center;
  width: 60%;
  margin: auto;
  justify-content: space-between;
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 34px;
  line-height: 40px;
  letter-spacing: 0.25px;
  color: rgba(245, 249, 255, 0.95);
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.98);
  padding: 8px 2em;
  height: 48px;
  background: #2672ed;
  border: 1px solid #2672ed;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const HangUpButton = styled(Button)`
  background: #e91e63;
  border: 1px solid #e91e63;
`;
