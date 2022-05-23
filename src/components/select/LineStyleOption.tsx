import "./line-style-option.css";

interface Props {
  lineStyle: string;
  color: string;
}

// Map Plotly dash styles to CSS line styles
const mapping: Record<string, string> = {
  none: "solid",
  dot: "dotted",
  dash: "dashed",
};

const LineStyleOption = ({ lineStyle, color }: Props) => {
  return (
    <div className="styled-line-option">
      <hr className={mapping[lineStyle]} style={{ color: color }} />
    </div>
  );
};

export default LineStyleOption;
