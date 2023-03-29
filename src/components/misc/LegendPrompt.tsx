const PromptImage = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.6586 11C14.8797 10.3744 15 9.70127 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 9.70127 3.12031 10.3744 3.34141 11\"
      stroke="#505A5F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M7 21V12C7 10.8954 7.89543 10 9 10C10.1046 10 11 10.8954 11 12V15H14C16.2091 15 18 16.7909 18 19V21\"
      stroke="#505A5F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LegendPrompt = () => {
  return (
    <div className="prompt-wrapper non-content">
      <PromptImage />
      <div className="prompt-text">
        Click or tap on legend items to toggle visibility
      </div>
    </div>
  );
};

export default LegendPrompt;
