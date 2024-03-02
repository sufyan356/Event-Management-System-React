import {
    Container,
    Nav,
    Navbar,
    Button,
    Form,
    NavDropdown,
  } from "react-bootstrap";
  import { NavLink } from "react-router-dom";
  import {signOut , auth} from "../../../Firebase/Firebase"

  function Header() {

    const signOutFun = async () => {
      const signOutSuccessfully = await signOut(auth)
        try{
          console.log('Sign Out Successfully!..')
        }
        catch(error){
          console.log(error.message)
    
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
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0 navLinkParent"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav className="navBar">
                  <NavLink to="/dashboard" className="text-decoration-none">
                    Home
                  </NavLink>
                </Nav>
  
                <Nav className="navBar">
                  <NavLink  to="/all-events" className="text-decoration-none">
                    Events
                  </NavLink>
                </Nav>
  
                <Nav className="navBar">
                  <NavLink  to="/event-details" className="text-decoration-none">
                    Details
                  </NavLink>
                </Nav>
  
                <Nav className="navBar">
                  <NavLink to="/login" className="text-decoration-none" onClick={() => {signOutFun() }}>
                    Logout
                  </NavLink>
                </Nav>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
  
  export default Header;
  