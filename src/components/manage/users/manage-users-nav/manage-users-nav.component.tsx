import * as React from 'react';
import { Nav, NavItem } from 'reactstrap';
import Navbar from 'reactstrap/lib/Navbar';
import { Link } from 'react-router-dom';

import {FaUserPlus} from 'react-icons/fa';
import NavLink from 'reactstrap/lib/NavLink';

interface IManageUserNavComponentProps {
  updateManageUsersTable: (group: string) => void,
  toggleCreateUserModal: () => void,
  role: string
}

export class ManageUserNavComponent extends React.Component<IManageUserNavComponentProps, any> {
  constructor(props) {
    super(props);
  }

  // returns active if the role provided in the route is the routeName provided
  isActive = (routeName: string) => ((this.props.role === routeName) ? 'manage-user-nav-item-active' : 'manage-user-nav-item')

  render() {
    return (
      <Navbar className="manage-users-nav" color="faded" light>
        <Nav tabs className="align-start">
          <NavItem>
            <Link to="/manage/users/admin" 
                className={`nav-link ${this.isActive('admin')}`}
                onClick={() => this.props.updateManageUsersTable('admin')}>Admins</Link>
          </NavItem>
          <NavItem>
            <Link to="/manage/users/staging-manager" 
                className={`nav-link ${this.isActive('staging-manager')}`}
                onClick={() => this.props.updateManageUsersTable('staging-manager')}>Staging Managers</Link>
          </NavItem>
          <NavItem>
            <Link to="/manage/users/trainer" 
                className={`nav-link ${this.isActive('trainer')}`}
                onClick={() => this.props.updateManageUsersTable('trainer')}>Trainers</Link>
          </NavItem>
          <NavItem>
            <Link to="/manage/users/associate" 
                className={`nav-link ${this.isActive('associate')}`}>
                Associates
            </Link> 
          </NavItem> 
        </Nav>
        <Nav tabs>
          <NavItem>
            <NavLink className="cursor-hover" onClick={this.props.toggleCreateUserModal}><FaUserPlus className="rev-color" /></NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

