// dobbiamo aggiungere gli IMPORT degli elementi di react bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

const RestaurantNavbar = function (props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Link to="/">
          <div className="navbar-brand">IFOA Restaurant - {props.subtitle}</div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/admin">
              <div className="nav-link">Admin</div>
            </Link>
            <Link to="/booking">
              <div className="nav-link">Prenotazioni</div>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default RestaurantNavbar
