import { Modal, Button, Row, Col, Container } from "react-bootstrap"

let Component = props => {
  return (
    <Col>
      <Modal size="lg" show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <blockquote className="blockquote">
              <p className="mb-0">{props.title}</p>
              <footer className="mt-0 blockquote-footer">{props.subtitle}</footer>
            </blockquote>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={12} lg={12} className="">
                {props.content}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleClose}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </Col>
  )
}

export default Component;