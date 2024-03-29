import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
// import { Form, Button } from 'react-bootstrap' <-- questo metodo anche funziona, ma non è ottimale

// questo form creerà una prenotazione in un database sfruttando delle API
// name: string <-- required
// phone: string/number <-- required
// numberOfPeople: string/number <-- required
// dateTime: string <-- required
// smoking: boolean <-- required
// specialRequests <-- NOT required

const initialReservation = {
  name: '',
  phone: '',
  numberOfPeople: 1,
  dateTime: '',
  smoking: false,
  specialRequests: '',
}

const BookingForm = function () {
  // creo un sotto-oggetto nello state di BookingForm, che rappresenterà il CONTENUTO del form di prenotazione
  // grazie ad una serie di input "controllati", ad ogni pressione di un tasto in un campo noi andremo a modificare
  // lo stato del componente in modo da mantenerli sempre "sincronizzati"
  // il nostro form sarà SEMPRE consapevole del proprio contenuto!
  // alla pressione del tasto submit ci basterà andare a leggere il contenuto dello state, che sarà
  // stato automaticamente aggiornato strada facendo

  const [reservation, setReservation] = useState(initialReservation)

  const handleSubmitThenCatch = (e) => {
    e.preventDefault() // fermiamo il comportamento di default del browser
    // facciamo la raccolta dati...
    // scherzo! l'abbiamo già fatta, è il contenuto del nostro stato!
    fetch('https://striveschool-api.herokuapp.com/api/reservation', {
      method: 'POST', // uso POST per creare una nuova risorsa
      body: JSON.stringify(reservation),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // finirete qui dentro se la Promise viene risolta!
        // la res rappresenta la Response da parte del server
        console.log('RES', res)
        if (res.ok) {
          // la prenotazione è stata salvata correttamente!
          window.alert('Prenotazione salvata! Grazie!')
          // bello, ma il form è ancora pieno! svuotiamolo:
          setReservation(initialReservation)
        } else {
          // ahia! c'è stato un problema
          window.alert('Errore, riprova più tardi!')
          throw new Error('Errore nel salvataggio della prenotazione')
          // mi auto lancio nel blocco catch
        }
      })
      .catch((err) => {
        // finirete qui dentro se la Promise viene rifiutata!
        console.log('ERRORE!', err)
      })
  }

  const handleSubmitAsyncAwait = async (e) => {
    e.preventDefault() // fermiamo il comportamento di default
    // le Promise vanno ATTESE, sia nel caso di Resolved sia nel caso di Rejected
    try {
      const res = await fetch(
        'https://striveschool-api.herokuapp.com/api/reservation',
        {
          method: 'POST', // uso POST per creare una nuova risorsa
          body: JSON.stringify(reservation),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.ok) {
        window.alert('Prenotazione salvata! Grazie!')
        // bello, ma il form è ancora pieno! svuotiamolo:
        setReservation(initialReservation)
      } else {
        // ahia! c'è stato un problema
        window.alert('Errore, riprova più tardi!')
        throw new Error('Errore nel salvataggio della prenotazione')
        // mi auto lancio nel blocco catch
      }
    } catch (err) {
      console.log('ERRORE!', err)
    }
  }

  return (
    <>
      <h2 className="text-center mt-3">Prenota un tavolo ORA!</h2>
      <Form onSubmit={handleSubmitAsyncAwait}>
        <Form.Group className="mb-3">
          <Form.Label>Il tuo nome</Form.Label>
          {/* i Form.Control si traducono in HTML in <input /> */}
          <Form.Control
            type="text"
            placeholder="Mario Rossi"
            required
            onChange={
              // qui dentro ci va una funzione che viene eseguita ad ogni cambiamento dell'input
              (e) => {
                setReservation({
                  ...reservation, // riportando qui dentro TUTTE le proprietà di reservation
                  name: e.target.value, // il carattere che ho appena scritto
                })
              }
            }
            value={reservation.name}
          />
        </Form.Group>

        {reservation.name === 'Al Bano' && (
          <Alert variant="success">FELICITÀ!</Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Numero di telefono</Form.Label>
          <Form.Control
            type="tel"
            placeholder="320xxxxxxx"
            required
            onChange={(e) => {
              setReservation({
                ...reservation,
                phone: e.target.value,
              })
            }}
            value={reservation.phone}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>In quanti siete?</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setReservation({
                ...reservation,
                numberOfPeople: e.target.value,
              })
            }}
            value={reservation.numberOfPeople}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data / Ora</Form.Label>
          <Form.Control
            type="datetime-local"
            required
            onChange={(e) => {
              setReservation({
                ...reservation,
                dateTime: e.target.value,
              })
            }}
            value={reservation.dateTime}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Tavolo fumatori?"
            onChange={(e) => {
              setReservation({
                ...reservation,
                smoking: e.target.checked,
              })
            }}
            checked={reservation.smoking}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Allergie, intolleranze, richieste speciali?</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            onChange={(e) => {
              setReservation({
                ...reservation,
                specialRequests: e.target.value,
              })
            }}
            value={reservation.specialRequests}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Prenota!
        </Button>
      </Form>
    </>
  )
}

export default BookingForm
