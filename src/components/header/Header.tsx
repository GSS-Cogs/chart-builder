import React from "react";
import { TopNav } from "govuk-react";
import Crown from "@govuk-react/icon-crown";

const Header = (): JSX.Element => {
    return (
        <TopNav 
        company={<TopNav.Anchor href="https://example.com" target="new"><TopNav.IconTitle icon={<Crown width="36" height="32" />}>GOV.UK</TopNav.IconTitle></TopNav.Anchor>}
        serviceTitle={<TopNav.NavLink href="https://example.com" target="new">Integrated Data Service</TopNav.NavLink>}
        >
        </TopNav>
    )
}
export default Header