import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NotFound = function () {
  // 1) hooks sempre dentro solo a componenti a funzione
  // 2) hooks sempre prima del return fuori da if/loops/funzioni

  const navigate = useNavigate()
  // l'invocazione di useNavigate() torna una funzione, che per nomenclatura classica si chiama "navigate"

  return (
    <div className="text-center mt-5">
      <h2>404 - Not Found</h2>
      <h4>
        Ti sei perso?{' '}
        <Button
          variant="primary"
          onClick={() => {
            // qui vorrei portare l'utente in "/"
            // window.location.assign('/') <-- metodo JS classico, purtroppo aggiorna il browser
            navigate('/') // questo ci porta in homepage ("/") utilizzando la navigazione "frontend"
          }}
        >
          Torna in Home
        </Button>
      </h4>
    </div>
  )
}

export default NotFound
