import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,VCenter} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapsed: true,
      dropdownOpen: false
    };  
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed     
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">PoC.Ansible.AWX</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/redis-1click">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">VM & Storage</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/redis-database">Redis Database</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/redis-cluster">Redis Cluster</NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/vcenter">VCenter</NavLink>
                </NavItem>
                {/* <NavItem>  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          tag="span"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          Redis
        </DropdownToggle>
        <DropdownMenu>
          <div onClick={this.toggle} >Redis 1 Click</div>
          <div onClick={this.toggle}>Redis Database</div>
          <div onClick={this.toggle}>Redis Cluster</div>         
        </DropdownMenu>
      </Dropdown>  </NavItem> */}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
