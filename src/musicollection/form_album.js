import { Modal, Card, Row, Col, Container, Form } from "react-bootstrap"
import { reduxForm, Field, formValueSelector, reset, isPristine} from "redux-form";
import { useDispatch, useSelector, connect } from "react-redux";
import renderSelect from '../common/inputs/select'
import InputText from '../common/inputs/text'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { update_album } from "./actions";
const _ = require("lodash");
let FormAlbum = (props) => {
  const {title, subtitle, show, list_of_artists, handleClose, album, pristine, save, submitting} = props
  const dispatch = useDispatch()
  const seletor = formValueSelector("albumForm");

  const id = useSelector(state => seletor(state, "id"))
  const name = useSelector(state => seletor(state, "name"))
  const year = useSelector(state => seletor(state, "year"))
  const artist_id = useSelector(state => seletor(state, "artist_id"))

  return (
    <Col>
      <Modal size="md" centered show={show} onHide={handleClose} onShow={() => dispatch(reset('albumForm'))}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"> 
            <blockquote className="blockquote mb-0">
              <p className="mb-0">{title}</p>
              <footer className="mt-0 blockquote-footer">{subtitle}</footer>
            </blockquote>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="bg-dark mt-3">
                  <Card.Body>
                    <Card.Text>
                      <Form onSubmit={e => {save({id:id, name:name, year:year, artist_id:artist_id}); e.preventDefault(); handleClose();}}>
                        <Form.Group>
                          <Col lg={12}>
                            <Field name="name" required component={InputText} placeholder="Name"/>
                          </Col>
                          <Col lg={12}>
                            <Field name="year" required component={InputText} placeholder="Year"/>
                          </Col>
                          <Col>
                            <Field type="select" required name="artist_id" component={renderSelect} selected_value={_.get(album, 'id')} options={list_of_artists.map((item) => ({label: item.name, value: item.id}))} />
                          </Col>
                          <Col lg={6} md={12} sm={12} xs={12}>
                            <button type="submit" disabled={pristine || submitting} className="mt-2 btn btn-success btn-block pull-right font-weight-bold btn-sm">Save</button>
                          </Col>
                        </Form.Group>
                      </Form>
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
FormAlbum = reduxForm({ form: "albumForm", enableReinitialize: true})(FormAlbum);
FormAlbum = connect(state => ({pristine: isPristine('albumForm')(state), initialValues: {id: _.get(state,'musicollection.album.id'), name: _.get(state, 'musicollection.album.name'), year: _.get(state, 'musicollection.album.year'), artist_id: _.get(state, 'musicollection.album.artist.id')}}),null)(FormAlbum)
export default FormAlbum;
