import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import items from '../data/menu.json'

const Menu = function () {
  return (
    <Row className="justify-content-center mt-3">
      {items.map((pasta) => {
        return (
          <Col xs={8} key={pasta.id} className="my-4">
            <div>
              <img src={pasta.image} alt="single pasta" className="w-100" />
            </div>
            <h4 className="text-center mt-1">
              <span className="me-2">{pasta.name}</span>
              <Badge bg="warning">{pasta.price}</Badge>
            </h4>
          </Col>
        )
      })}
    </Row>
  )
}

export default Menu
