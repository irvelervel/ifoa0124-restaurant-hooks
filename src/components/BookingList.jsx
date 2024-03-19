import { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

// FLUSSO DI EVENTI IN BOOKINGLIST
// 1) Lo stato del componente viene settato ad array vuoto (this.state.reservations)
// 2) Prima invocazione di render(), automatica: verranno inserite nella pagina tutte le parti statiche
// (es. titoli, liste vuote, divs etc.) e anche viene valutato a TRUE il blocco con il messaggio "niente prenotazioni"
// 3) finito il render() iniziale, -se- presente React invocherà "componentDidMount()" (sempre DOPO il primo render())
// componentDidMount viene eseguito UNA volta per montaggio, sempre e comunque DOPO il primo render()
// 4) nel nostro componentDidMount viene eseguito il metodo fetchBookings(), che si occupa di effettuare la chiamata
// GET alle api per ottenere l'array di prenotazioni. Una volta ottenuto, fetchBookings() invoca setState(), in modo
// da salvare permanentemente l'array delle prenotazioni nello stato del componente.
// 5) ogni volta che viene lanciato this.setState() da un componente a classe, il metodo render() viene
// RE-INVOCATO! -> viene ri-disegnata tutta l'interfaccia di questo componente
// 6) grazie al Virtual DOM React non ridisegnerà tutto da capo: le parti pre-esistenti, quelle già disegnate
// al primo render(), rimangono dove sono... però ri-valuterà tutte le parti dinamiche, quindi nasconderà il messaggio
// di prenotazioni assenti e si occuperà di creare un ListGroup.Item per ognuno degli elementi dell'array
// this.state.reservations

class BookingList extends Component {
  // questo componente avrà lo scopo di RECUPERARE le prenotazioni esistenti dalle API
  // e mostrarle sotto forma di LISTA nel JSX
  // in HTML + JS le chiamate di tipo GET vengono solitamente effettuate all'avvio

  // in React i componenti sono dotati di un "lifecycle": vengono montati, perdurano nella pagina, vengono smontati
  // oggi ci interessa la fase di montaggio: il nostro componente dovrà montarsi e RECUPERARE i dati da mostrare!

  // il processo sarà questo:
  // - creare uno stato iniziale per il componente
  // - recuperare i dati dall'esterno (con una fetch() con metodo GET)
  // - salveremo questi dati nello stato del componente
  // - utilizzare questi dati per creare le parti dinamiche dell'interfaccia

  state = {
    reservations: [], // al fine di non snaturare questa fonte di dati, il tipo di questa proprietà sarà SEMPRE
    // un array; poichè però le prenotazioni all'avvio ancora non ci sono, il suo valore sarà di array -vuoto-
    isLoading: true,
    isError: false,
  }

  fetchBookings = () => {
    // questa funzione freccia si occuperà di recuperare con una fetch() le prenotazioni
    // e salvarle nello stato del componente (in this.state.reservations)
    fetch('https://striveschool-api.herokuapp.com/api/reservation')
      .then((response) => {
        if (response.ok) {
          // la chiamata è andata bene, e possiamo aspettarci di trovare l'array
          // di prenotazioni nel JSON della response
          return response.json() // questa è l'estrazione del JSON dalla Response, ovvero il nostro array di prenotazioni
        } else {
          // qualcosa è andato storto nella chiamata (400, 500, 502 etc.)
          throw new Error('Problema nella chiamata API')
          // mi lancio nel blocco catch()
        }
      })
      .then((reservationsFromAPI) => {
        console.log('RESERVATIONS', reservationsFromAPI)
        // qua tra poco le salveremo anche nello state...
        this.setState({
          reservations: reservationsFromAPI,
          isLoading: false,
        })
        // OGNI VOLTA che viene eseguito un this.setState(), il metodo render() viene invocato di nuovo!
      })
      .catch((error) => {
        console.log('ERRORE', error)
        this.setState({
          isLoading: false,
          isError: true,
        })
      })
  }

  // dove si eseguono le operazioni di fetch "iniziali" in un componente React?
  // c'è un posto ben preciso: un metodo chiamato "componentDidMount"

  componentDidMount() {
    // componentDidMount è un METODO DI LIFECYCLE
    // questo metodo viene eseguito in AUTOMATICO da React, quando? un istante dopo il PRIMO montaggio del componente
    console.log('IO SONO COMPONENTDIDMOUNT')
    // io qui dentro farò la mia fetch, recupererò le prenotazioni e riempirò lo stato
    // componentDidMount è GARANTITO essere eseguito UNA VOLTA SOLA, dopo il PRIMO render.
    this.fetchBookings()
  }

  render() {
    // NON POSSIAMO METTERE this.fetchBookings() qui!
    // perchè quel metodo dopo la fetch effettua un setState()
    // e ogni volta che viene lanciato setState() render() viene re-invocato :')
    // -> INFINITE LOOP
    console.log('IO SONO RENDER')
    return (
      <div className="text-center mt-3">
        <h2 className="mb-2">Prenotazioni correnti</h2>
        <ListGroup>
          {/* questo pezzettino di contenuto (un ListGroup.Item) verrà mostrato SOLAMENTE
            se la lunghezza dell'array reservations è esattamente ZERO */}
          {/* questo operatore && in gergo si chiama SHORT-CIRCUIT */}

          {this.state.reservations.length === 0 &&
            this.state.isLoading === false &&
            this.state.isError === false && (
              <ListGroup.Item>
                Al momento non ci sono prenotazioni 🙁
              </ListGroup.Item>
            )}

          {this.state.isLoading === true && (
            <div>
              <Spinner animation="border" variant="success" />
            </div>
          )}

          {this.state.isError === true && (
            <div>
              <Alert variant="danger">Qualcosa è andato storto 🙁</Alert>
            </div>
          )}

          {this.state.reservations.map((reservation) => {
            return (
              <ListGroup.Item key={reservation._id}>
                {reservation.name} per {reservation.numberOfPeople} il{' '}
                {/* quando vedete {' '} è semplicemente Prettier che mette un carattere di spazio separatore
                per poter mandare a capo la riga successiva */}
                {reservation.dateTime}
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

export default BookingList
