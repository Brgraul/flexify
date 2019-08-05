import React, {Fragment} from 'react';
import {Grid} from "@material-ui/core";
import styled  from "styled-components";
import Calendar from "@material-ui/icons/CalendarToday";
import Build from "@material-ui/icons/Build";
import Search from "@material-ui/icons/Search";
import Settings from "@material-ui/icons/Settings";

const SidebarItem = styled(Grid)`
    &&{
        padding: 8%;
    }
`
const SidebarText = styled.h4`
    margin: 0px;
    font-weight: 400;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
`;

export default props => {
    return(
        <Fragment>
            <SidebarItem container item xs={12} style={{backgroundColor:"#dcdde1"}}>
                <Calendar/> <SidebarText> Occupation Overview</SidebarText>
            </SidebarItem>
            <SidebarItem container item xs={12}>
                <Build/> <SidebarText> Maintenance</SidebarText>
            </SidebarItem>
            <SidebarItem container item xs={12}>
                <Search/> <SidebarText> Lost & Found</SidebarText>
            </SidebarItem>
            <SidebarItem container item xs={12}>
                <Settings/> <SidebarText> Settings</SidebarText>
            </SidebarItem>
        </Fragment>
    );
}