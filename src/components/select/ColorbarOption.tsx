interface Props {
  colorbar: string[];
}

const ColorbarOption = ({ colorbar }: Props) => {
  return (
    <div
      className="styled-option"
      style={{
        backgroundImage: `linear-gradient(to right, ${colorbar.join(",")})`,
      }}
    >
      {" "}
    </div>
  );
};

export default ColorbarOption;
