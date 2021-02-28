/*eslint-disable*/
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// nodejs library to set properties for components

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { useSession } from 'next-auth/client';

var ps;

const Sidebar: React.FC = props => {
  // used for checking current route
  const router = useRouter();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return router.route.indexOf(routeName) > -1;
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  const [session] = useSession();
  // @ts-ignore
  const { logo } = props;
  let navbarBrand = (
    <NavbarBrand href="#roman" className="pt-0">
      {/*<img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />*/}
      <h1>KALOREE</h1>
    </NavbarBrand>
  );
  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo && logo.innerLink ? (
          <Link href={logo.innerLink}>
            <span>{navbarBrand}</span>
          </Link>
        ) : null}
        {logo && logo.outterLink ? (
          <a href={logo.innerLink} target="_blank">
            {navbarBrand}
          </a>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img alt="..." src={require('assets/img/theme/team-1-800x800.jpg')} />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <Link href="/profile">
                <DropdownItem>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
              </Link>
              <Link href="/profile">
                <DropdownItem>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
              </Link>
              <Link href="/profile">
                <DropdownItem>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
              </Link>
              <Link href="/profile">
                <DropdownItem>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
              </Link>
              <DropdownItem divider />
              <DropdownItem href="#roman" onClick={e => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link href={logo.innerLink}>
                      <span>KALOREE</span>
                      {/*<img alt={logo.imgAlt} src={logo.imgSrc} />*/}
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <span>KALOREE</span>
                      {/*<img alt={logo.imgAlt} src={logo.imgSrc} />*/}
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>
            <NavItem active={activeRoute('/')}>
              <Link href="/">
                <NavLink
                  active={activeRoute('/')}
                  onClick={closeCollapse}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="ni ni-tv-2 text-primary" />
                  Dashboard
                </NavLink>
              </Link>
            </NavItem>
            <NavItem active={activeRoute('/summary')}>
              <Link href={`/summary`}>
                <NavLink
                  active={activeRoute('/summary')}
                  onClick={closeCollapse}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="ni ni-planet text-orange" />
                  Summary
                </NavLink>
              </Link>
            </NavItem>
            <NavItem active={activeRoute('/profile')}>
              <Link href={`/profile`}>
                <NavLink
                  active={activeRoute('/profile')}
                  onClick={closeCollapse}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="ni ni-circle-08 text-cyan" />
                  Profile
                </NavLink>
              </Link>
            </NavItem>
            <NavItem active={activeRoute('/friends')}>
              <Link href={`/friends`}>
                <NavLink
                  active={activeRoute('/friends')}
                  onClick={closeCollapse}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="ni ni-satisfied text-indigo" />
                  Friends
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
