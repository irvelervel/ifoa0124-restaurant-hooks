import './App.css'

// aggiungiamo l'import del CSS di bootstrap, altrimenti i nostri componenti non verranno
// visualizzati correttamente
import 'bootstrap/dist/css/bootstrap.min.css'
import RestaurantNavbar from './components/RestaurantNavbar'
import HomeCarousel from './components/HomeCarousel'
import BookingForm from './components/BookingForm'
import Menu from './components/Menu'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BookingList from './components/BookingList'
// importiamo da react-router-dom i componenti che ci servono
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import Details from './components/Detail'

function App() {
  return (
    // BrowserRouter è un contenitore generico (che non si traduce nell'HTML in nessun tag) che abilita
    // le funzioni di routing per gli elementi al suo interno. Di conseguenza, ha senso inserirlo come
    // livello più esterno possibile, in modo da abilitare TUTTO il possibile a queste funzionalità

    // Routes invece è un blocco generalmente più piccolo che delimita una porzione di contenuto che
    // NON si mostrerà sempre, ma sarà condizionato dal valore attuale della barra degli indirizzi
    // bisognerebbe escludere dai blocchi Routes tutto il contenuto che invece deve essere SEMPRE
    // visibile in ogni momento (es. navbar, footer, aside)
    // dentro il blocco Routes ci possono SOLAMENTE essere delle individuali Route (niente div, niente Rows etc.)

    // Le Route rappresentano il contenuto del blocco Routes
    // Una Route specifica COSA deve montarsi (tramite la prop "element") e SU CHE PERCORSO (tramite la prop "path")
    // Rappresentano la fase di DICHIARAZIONE delle ROTTE

    <BrowserRouter>
      <div id="app">
        <RestaurantNavbar subtitle="Le migliori paste del web!" />
        {/* parte centrale, carosello con le pastasciutte */}

        {/* al momento non ho modo di separare le "pagine" dell'app, metto tutto in App.js */}

        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <Row className="justify-content-center">
                  <Col xs={12} md={8} lg={6}>
                    <HomeCarousel />
                    {/* montiamo il carosello principale in / */}
                  </Col>
                </Row>
              }
            />

            <Route
              path="/booking"
              element={
                <Row className="justify-content-center">
                  <Col xs={12} md={8} lg={6}>
                    <BookingForm />
                    {/* montiamo il form della singola prenotazione in /booking */}
                  </Col>
                </Row>
              }
            />

            <Route
              path="/menu"
              element={
                <Row className="justify-content-center">
                  <Col xs={12} md={8} lg={6}>
                    <Menu />
                    {/* montiamo il menu in /menu */}
                  </Col>
                </Row>
              }
            />

            <Route
              path="/details"
              element={
                <Row className="justify-content-center">
                  <Col xs={12} md={8} lg={6}>
                    <Details />
                    {/* montiamo il menu in /menu */}
                  </Col>
                </Row>
              }
            />

            <Route
              path="/admin"
              element={
                <Row className="justify-content-center">
                  <Col xs={12} md={8} lg={6}>
                    <BookingList />
                    {/* montiamo la lista delle prenotazioni in /admin */}
                  </Col>
                </Row>
              }
            />

            {/* un path di * catturerà TUTTE le rotte non gestite precedentemente */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        {/* se avessimo un footer e lo mettessimo qui, lo vedremmo in ogni pagina */}
      </div>
    </BrowserRouter>
  )
}

export default App
