import { Modal, Button, Row, Col, Container } from "react-bootstrap"
const modalConfirmation = (props) => {
  const {handleConfirm, phrase, show, handleClose, title, subtitle, textBntOK} = props
  return (
    <Col>
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <blockquote className="blockquote">
              <p className="mb-0">{title}</p>
              <footer className="mt-0 blockquote-footer">{subtitle}</footer>
            </blockquote>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col lg={12}>
                {phrase}
              </Col>
              <Col>
                <Button variant="danger" size="sm" block onClick={handleConfirm}>{textBntOK}</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={handleClose}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </Col>
  )
}
export default modalConfirmation;