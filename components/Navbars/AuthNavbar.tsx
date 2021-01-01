import React from 'react';
import Link from 'next/link';
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';

const AuthNavbar: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = pathname => router.pathname === pathname;

  const [session] = useSession();

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <Link href="/">
            <span>
              <NavbarBrand href="#roman">
                <h2 className="text-white">KALOREE</h2>
              </NavbarBrand>
            </span>
          </Link>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link href="/">KALOREE</Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link href="/">
                  <NavLink href="#roman" className="nav-link-icon">
                    <i className="ni ni-planet" />
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </Link>
              </NavItem>
              {session && (
                <NavItem>
                  <NavLink className="nav-link-icon logout-button" onClick={() => signOut()}>
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Log out</span>
                  </NavLink>
                </NavItem>
              )}
              {!session && (
                <NavItem>
                  <Link href="/login">
                    <NavLink href="#roman" className="nav-link-icon">
                      <i className="ni ni-key-25" />
                      <span className="nav-link-inner--text">Login</span>
                    </NavLink>
                  </Link>
                </NavItem>
              )}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthNavbar;
