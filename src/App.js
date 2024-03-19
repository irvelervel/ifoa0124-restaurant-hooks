import './App.css'

// aggiungiamo l'import del CSS di bootstrap, altrimenti i nostri componenti non verranno
// visualizzati correttamente
import 'bootstrap/dist/css/bootstrap.min.css'
import RestaurantNavbar from './components/RestaurantNavbar'
import HomeCarousel from './components/HomeCarousel'
import BookingForm from './components/BookingForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BookingList from './components/BookingList'

function App() {
  return (
    <div id="app">
      <RestaurantNavbar subtitle="Le migliori paste del web!" />
      {/* parte centrale, carosello con le pastasciutte */}

      {/* al momento non ho modo di separare le "pagine" dell'app, metto tutto in App.js */}

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <BookingList />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <BookingForm />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <HomeCarousel />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
