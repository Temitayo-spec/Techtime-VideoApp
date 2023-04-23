interface OptionsProps {
  children: React.ReactNode;
}

const Options = ({ children }: OptionsProps) => {
  return (
    <div>
      Options
      {children}
    </div>
  );
};

export default Options;
