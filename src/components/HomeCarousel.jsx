import Carousel from 'react-bootstrap/Carousel'
import ListGroup from 'react-bootstrap/ListGroup'
// recupero l'array delle pastasciutte con un import
import items from '../data/menu.json'
import { useState } from 'react'

// ora vorremmo generare un Carousel.Item (una slide) per OGNI elemento di items (per ogni pastasciutta)

// ora vorremmo che il componente fosse sempre in grado di capire qual è la pasta correntemente visualizzata
// in modo da poterne mappare le reviews nella lista sotto il carosello
// vorremmo inserire nel nostro componente un concetto di "pasta attiva (selezionata, visualizzata)"

// per raggiungere questo scopo inseriremo nel nostro componente il concetto di STATE (stato)
// uno stato è una "memoria" del componente, in grado di ricordarsi cose durante il suo ciclo vitale

// lo STATE sarà un OGGETTO
// l'oggetto STATE è una prerogativa dei componenti a CLASSE

// convertiamo HomeCarousel in un componente a CLASSE

const HomeCarousel = function () {
  // adesso che abbiamo un class component possiamo creare un oggetto di stato

  // questo è lo stato INIZIALE, quello che viene assegnato al componente in fase di montaggio

  const [selectedPasta, setSelectedPasta] = useState(items[0])

  // lo stato in un componente React è READ-ONLY (vuol dire che non può essere modificato direttamente)
  // l'unico modo per modificare lo stato è utilizzare un metodo che si chiama setState( { //nuovo stato } )

  return (
    <>
      <h2 className="my-3 text-center">Ecco il nostro menù!</h2>
      <Carousel
        onSlide={(newSlideIndex) => {
          // console.log('SLIDE CAMBIATA!', newSlideIndex)
          // questo è un event listener che ascolta i cambi di slide e riporta il nuovo indice corrente
          // ora devo cambiare la selectedPasta
          setSelectedPasta(items[newSlideIndex])
        }}
      >
        {
          // con queste graffe dichiaro un "blocco logico" in JSX, una "parte dinamica"
          // con .map() andiamo a mappare un array e a generare dinamicamente del contenuto,
          // ritornando in questo caso un Carousel.Item per ogni pasta nell'array items (menu.json)
          items.map((pasta, i) => {
            return (
              // la key è una prop univoca che dev'essere assegnata ad ogni elemento che ritornate da un .map()
              // serve a React per mantenere ottimali le performance durante le sua interne manipolazioni del DOM
              <Carousel.Item key={pasta.id}>
                <img
                  src={pasta.image}
                  alt="a pasta from the menu"
                  className="w-100"
                />
                <Carousel.Caption>
                  <h3>{pasta.name}</h3>
                  <p>{pasta.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
      <ListGroup className="text-center">
        {selectedPasta.comments.map((review) => {
          return (
            <ListGroup.Item key={review.id}>
              {review.rating} | {review.comment}
            </ListGroup.Item>
          )
        })}
        {/* per aggiornare la sezione commenti, dobbiamo semplicemente cambiare la selectedPasta */}
      </ListGroup>
    </>
  )
}

export default HomeCarousel
