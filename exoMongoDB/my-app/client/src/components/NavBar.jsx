import React from 'react'
import {Navbar, Nav, Container, Image} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const NavBar = () => {
  return (
    <>
    
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Container>
  <Navbar.Brand >
      <Image src ="https://img.freepik.com/vecteurs-libre/creation-logo-pizza_9845-319.jpg?w=826" alt="logo Pizza Delicious" style={{width :"20%"}}/>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ms-auto">
        <LinkContainer to='/login'>
      <Nav.Link href="#features">Login</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/panier'>
      <Nav.Link href="#features">Panier</Nav.Link>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

    </>
  )
}

export default NavBar;