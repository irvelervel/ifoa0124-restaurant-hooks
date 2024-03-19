// dobbiamo aggiungere gli IMPORT degli elementi di react bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const RestaurantNavbar = function (props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          IFOA Restaurant - {props.subtitle}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#menu">Menu</Nav.Link>
            <Nav.Link href="#booking">Prenotazioni</Nav.Link>
            <Nav.Link href="#contacts">Contatti</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default RestaurantNavbar
