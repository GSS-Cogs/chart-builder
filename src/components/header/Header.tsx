import React from "react";
import { TopNav } from "govuk-react";
import Crown from "@govuk-react/icon-crown";

const Header = (): JSX.Element => {
    return (
        <TopNav company={<TopNav.Anchor><TopNav.IconTitle icon={<Crown width="36" height="32" />}>GOV.UK</TopNav.IconTitle></TopNav.Anchor>}>
        </TopNav>
    )
}
export default Header