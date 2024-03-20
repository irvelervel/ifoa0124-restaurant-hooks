import Card from 'react-bootstrap/Card'

const Details = function () {
  return (
    <div>
      <h2 className="text-center">Dettagli di: nome-pasta</h2>
      <Card>
        <Card.Img src="https://placedog.net/500" alt="pasta" />
        <Card.Body className="text-center">
          <Card.Title>Nome della pasta</Card.Title>
          <Card.Text>Descrizione della pasta</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Details
