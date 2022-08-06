import { Modal, Card, Row, Col, Container, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const _ = require("lodash");
const showAlbum = (props) => {
  const { album, show, handleClose } = props
  return (
    <Col>
      <Modal size="md" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"> 
            <blockquote className="blockquote mb-0">
              <p className="mb-0">{_.get(album, 'name') || <Skeleton width={100} enableAnimation={true} duration={1} direction="ltr" />}</p>
              <footer className="mt-0 blockquote-footer">{_.get(album, 'year', '') || <Skeleton width={100} enableAnimation={true} duration={1} direction="ltr" />}</footer>
            </blockquote>
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="bg-dark mt-3">
                  <Card.Header eventKey="0">
                    <Row>
                      <Col lg={{ span: 5, offset: 0 }} className='mt-1 mb-1'>
                        {_.get(album, 'artist.name') ? <h5 className="text-light font-weight-light">{_.get(album, 'artist.name')}</h5> :  <Skeleton baseColor="#292b2c" highlightColor="#333c3d" enableAnimation={true} duration={1} direction="ltr" />}
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Col lg={{ span: 6, offset: 0 }}>
                        <Row>
                          <Col className="text-light font-weight-light">
                            {_.get(album, 'artist.twitter') ? <><Button variant="link" onClick={() => window.open(`https://twitter.com/${_.get(album, 'artist.twitter')}`)}>
                              <FontAwesomeIcon icon={["fab", "fa-twitter"]}/>
                            </Button>{_.get(album, 'artist.twitter')}</> : <Skeleton baseColor="#292b2c" highlightColor="#333c3d" enableAnimation={true} duration={1} direction="ltr" />}
                          </Col>
                        </Row>
                      </Col>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </Col>
  )
}
export default showAlbum;