interface Props {
  lineStyle: string;
}

const LineStyleOption = ({ lineStyle }: Props) => {
  return (
    <div className="styled-line-option">
      <hr className={lineStyle} />
    </div>
  );
};

export default LineStyleOption;
