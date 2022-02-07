import "./chart-demo.css";

// Component for demo purposes / prototyping and does not play a functional role in chart builder.

const source = "Met Office";
const url =
  "https://beta.gss-data.org.uk/cube/about?uri=http%3A%2F%2Fgss-data.org.uk%2Fdata%2Fgss_data%2Fclimate-change%2Fmet-office-annual-mean-temp-with-trends-actual-catalog-entry";

const Source = () => {
  return (
    <>
      <div id="chart-bottom-border" />
      <p id="source">
        Source: &nbsp;
        <a
          id="source-link"
          target="_blank"
          rel="noopener noreferrer"
          href={url}
        >
          {source}
        </a>
      </p>
    </>
  );
};

export default Source;
