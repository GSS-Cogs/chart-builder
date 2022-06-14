interface Props {
  color: string;
}

const ColorOption = ({ color }: Props) => {
  return (
    <div
      className="cb-styled-option"
      style={{ backgroundColor: color }}
      tabIndex={-1}
    >
      {" "}
    </div>
  );
};

export default ColorOption;
