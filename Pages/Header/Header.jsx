import {
  Container,
  Nav,
  Navbar,
  Button,
  Form,
  NavDropdown,
} from "react-bootstrap";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { signOut, auth } from "../../Firebase/Firebase";
import { RxHamburgerMenu } from "react-icons/rx";
function Header() {
  let userName = null;
  const latestUserData = JSON.parse(localStorage.getItem("latestUser"));
  if (latestUserData && latestUserData.name) {
    userName = latestUserData.name;
  }

  const signOutFun = async () => {
    const signOutSuccessfully = await signOut(auth);
    try {
      console.log("Sign Out Successfully!..");
      localStorage.clear();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Navbar expand="lg" bg="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#">
            <img
              src="https://templatebundle.net/templates/eventwings-html-template/images/logo.png"
              alt="logo"
            />
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
          <Navbar.Toggle aria-controls="navbarScroll" ><RxHamburgerMenu /></Navbar.Toggle>
          
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 navLinkParent"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav className="navBar">
                {/* <NavLink to="/#home" className="text-decoration-none">
                  Home
                </NavLink> */}
                <HashLink to="#home" className="text-decoration-none">
                  Home
                </HashLink>
              </Nav>

              <Nav className="navBar">
                {/* <NavLink  to="#all-events-section" className="text-decoration-none">
                  All Events
                </NavLink> */}
                <HashLink
                  to="#all-events-section"
                  className="text-decoration-none"
                >
                  All Events
                </HashLink>
              </Nav>

              <Nav className="navBar">
                {/* <NavLink  to="#all-events-section" className="text-decoration-none">
                  All Events
                </NavLink> */}
                <HashLink
                  to="#upcoming-events"
                  className="text-decoration-none"
                >
                  Upcoming Events
                </HashLink>
              </Nav>

              <Nav className="navBar">
                <HashLink to="#contact-us" className="text-decoration-none">
                  Contact Us
                </HashLink>
              </Nav>

              {localStorage.getItem("latestUser") ? (
                <Nav className="navBar">
                  <NavLink
                    to="/"
                    className="text-decoration-none"
                    onClick={() => {
                      signOutFun();
                    }}
                  >
                    Logout
                  </NavLink>
                  {/* <Button
                    variant="outline-success"
                    onClick={() => {
                      signOutFun();
                    }}
                  >
                    Logout
                  </Button> */}
                </Nav>
              ) : (
                <Nav className="navBar">
                  <NavLink to="/login" className="text-decoration-none">
                    Login
                  </NavLink>
                </Nav>
              )}
              {userName && 
              <Nav className="navBar" style={{cursor:"pointer" , padding: "0.1rem" , borderRadius:"2px" , border:"1px dotted white"}}>{userName}</Nav>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
