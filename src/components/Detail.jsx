import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import { useParams, useNavigate } from 'react-router-dom'
import items from '../data/menu.json'

// a questo punto la rotta dove viene montato questo componente Details è parametrica
// quel parametro è fondamentale per capire QUALE pasta mostrare!
// l'ultimo passaggio sarà RECUPERARE dalla barra degli indirizzi quel parametro e utilizzarlo per
// recuperare i dettagli della pasta corretta all'interno di menu.json (se aveste un'API da contattare
// sarebbe la stessa cosa, utilizzereste quell'id come parte dell'URL)

const Details = function () {
  // Details ora recupererà il valore di :pastaId in modo da capire che pasta mostrare

  const [pastaObject, setPastaObject] = useState(null)

  const params = useParams()
  console.log('PARAMS', params)
  const navigate = useNavigate()
  // params.pastaId è il valore del parametro :pastaId nell'URL

  // utilizzare params.pastaId per recuperare dal JSON la pasta corretta

  useEffect(() => {
    // qui dentro tiro fuori dal JSON la pasta corretta
    const rightPastaToShow = items.find(
      (pasta) => pasta.id === parseInt(params.pastaId)
    )
    console.log('PASTA TROVATA', rightPastaToShow)
    if (rightPastaToShow) {
      // se il risultato del find NON è undefined, quindi ABBIAMO trovato una pasta, la salvo
      // nello stato di Details
      setTimeout(() => {
        // così almeno vediamo lo spinner per 1 sec...
        setPastaObject(rightPastaToShow)
      }, 1000)
    } else {
      // nel caso la pasta non fosse stata trovata nel JSON (...presumibilmente perchè l'utente
      // cerca una pasta che non esiste scrivendo a mano nella barra degli indirizzi...)
      navigate('/notfound')
    }
  }, [])

  return (
    <div>
      {!pastaObject && (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      )}
      {pastaObject && (
        // questo controllo monta il contenuto solo se pastaObject NON È NULL (ovvero
        // solo dopo che il find ha trovato la pasta da mostrare)
        // altrimenti la pagina crasherebbe! cercherebbe di leggere name, image e description da null...
        <div className="mt-3">
          <h2 className="text-center">Dettagli di: {pastaObject.name}</h2>
          <Card>
            <Card.Img src={pastaObject.image} alt="pasta" />
            <Card.Body className="text-center">
              <Card.Title>{pastaObject.name}</Card.Title>
              <Card.Text>{pastaObject.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Details
