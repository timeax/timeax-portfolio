import React from "react";
import { Link } from "react-router-dom";
const NavItem: React.FC<Props> = ({ route }) => {
    return (
        <li className="navbar-item">
            <Link to={route.route}>{route.name}</Link>
        </li>
    );
};

interface Props {
    route: any;
}

export default NavItem;
