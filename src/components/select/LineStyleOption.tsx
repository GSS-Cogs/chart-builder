import "./line-style-option.css";

interface Props {
  lineStyle: string;
  color: string;
}

// Map Plotly dash styles to CSS line styles
const mapping: Record<string, string> = {
  none: "cb-solid",
  dot: "cb-dotted",
  dash: "cb-dashed",
};

const LineStyleOption = ({ lineStyle, color }: Props) => {
  return (
    <div className="cb-styled-line-option">
      <hr className={mapping[lineStyle]} style={{ color: color }} />
    </div>
  );
};

export default LineStyleOption;
