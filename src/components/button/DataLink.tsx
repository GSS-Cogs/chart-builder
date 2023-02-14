import React from "react";

type Props = {
  link: string;
  text: string;
};

const DataLink: React.FC<Props> = ({ link, text }) => {
  const linkStyle = {
    color: "#1D70B8",
    fontSize: "19px",
    fontWeight: "bold",
    textDecoration: "none",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginRight: "20px",
    marginLeft: "20px",
  };
  const validateLink = () => {
    if (link === "") {
      return false;
    }
    if (link === null || link === undefined) {
      return false;
    }
    return true;
  };
  const acceptableLink = validateLink();

  return (
    <div
      style={{
        width: "70%",
        alignItems: "center",
        justifyContent: "end",
        display: "flex",
      }}
    >
      {acceptableLink ? (
        <a
          style={{ ...linkStyle }}
          target="_blank"
          rel="noopener noreferrer"
          href={link}
        >
          {text} &#8594;
        </a>
      ) : (
        <div
          style={{
            textAlign: "end",
            opacity: "0.2",
            cursor: "not-allowed",
            ...linkStyle,
          }}
        >
          {text} &#8594;
        </div>
      )}
    </div>
  );
};

export default DataLink;
