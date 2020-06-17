import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import getNavItems from "../../../data/sidebar-nav-items"


class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: []
    };
  }

  componentWillMount() {
    this.setState({navItems: getNavItems()});
  }


  render() {

    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {this.state.navItems.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}


export default SidebarNavItems;
