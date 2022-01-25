import "./App.css";
import Header from "./components/header/Header";
import PageIntro from "./components/page-intro/PageIntro";
import ChartContextProvider from "./context/ChartContextProvider";
import ChartBuilder from "./components/chart-builder/ChartBuilder";

function App() {
  return (
    <div id="app">
      <Header />
      <div id="main-content">
        {/* <PageIntro /> */}
        <ChartContextProvider>
          <ChartBuilder />
        </ChartContextProvider>
      </div>
    </div>
  );
}

export default App;
