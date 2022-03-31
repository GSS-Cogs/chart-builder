import crown from "../../assets/icons/crown.svg";
import "./header.css";

const Header = (): JSX.Element => {
  return (
    <div id="header">
      <div id="header-content">
        <span>
          <img src={crown} alt="gov uk crown logo" width="36" height="32" />
        </span>
        <div id="header-gov-uk">GOV.UK</div>
        <div id="header-text">Chart Builder</div>
      </div>
    </div>
  );
};
export default Header;
