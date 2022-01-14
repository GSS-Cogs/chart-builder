import crown from "../../assets/icons/crown.svg"
import "./header.css";

const Header = (): JSX.Element => {
    return (
        <div id="header">
            <div id="header-content">
                <span>
                    <img src={crown}/>
                </span>
                <div id="header-gov-uk">GOV.UK</div>
                <div id="header-text">Integrated Data Service</div>
            </div>
        </div>
    )
}
export default Header