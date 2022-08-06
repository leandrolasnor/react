import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { ButtonGroup, Col, Row, Table, Card, Form, Button } from "react-bootstrap";
import ModalConfirmation from '../common/modal_confirmation/component'
import InputText from '../common/inputs/text'
import ShowAlbum from './show_album'
import FormAlbum from './form_album'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {search_albums, delete_album, show_album, create_album, update_album, list_artists} from './actions'
const _ = require("lodash");
const List = props => {
  const dispatch = useDispatch();
  const {albums, selection_method, op_method} = props
  const listItems = albums.map(
    (album, i) => (
      <tr key={i}>
        <td>{album.id}</td>
        <td>{album.name}</td>
        <td>{album.year}</td>
        <td>
          <ButtonGroup size="sm">
            <Button size="sm" variant='danger' onClick={() => {selection_method(album); op_method("delete");}}>
              <FontAwesomeIcon icon={["fas", "fa-trash"]}/>
            </Button>
            <Button size="sm" variant='success' onClick={() => {dispatch(show_album(album.id)); op_method("show")}}>
              <FontAwesomeIcon icon={["fas", "fa-list"]}/>
            </Button>
            <Button size="sm" variant='info' onClick={() => {dispatch([show_album(album.id),list_artists()]); op_method("edit")}}>
              <FontAwesomeIcon icon={["fas", "fa-edit"]}/>
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    )
  )
  return listItems;
}

let Musicollection = props => {
  const dispatch = useDispatch();
  const seletor = formValueSelector("musicollection");
  const query = useSelector(state => seletor(state, "query"))
  const musicollection = useSelector(state => state.musicollection)
  const {albums, pagination, album, list_of_artists} = musicollection;
  const [searching, setSearching] = useState(false);	
  const [selected_album, setSelectedAlbum] = useState(null);	
  const [op, setOpAlbum] = useState(null);	
  const { submitting, reset } = props;


  const handleSearchChanged = () => {
    setSearching(false)
  }

  const handleReset = () => {
    reset();
    setSearching(false)
  }

  const paginate = page => {
    axios.defaults.headers.common['current-page'] = page
    dispatch(search_albums(query))
  }

  const handleSubmit = (e) => {
    axios.defaults.headers.common['current-page'] = 1
    dispatch(search_albums(query))
    setSearching(true)
  }

  const handleConfirmDeletion = id => {
    setSelectedAlbum(null)
    dispatch(delete_album(id))
  }

  const handleCloseModalShowAlbum = () => {
    setOpAlbum(null)
    dispatch({type: 'ALBUM_FETCHED', payload: {}});
  }

  const handleCloseModalConfirmation = () => {
    setOpAlbum(null)
    setSelectedAlbum(null)
  }

  const handleCloseModalUpdateAlbum = () => {
    setOpAlbum(null)
    dispatch({type: 'ALBUM_FETCHED', payload: {}});
  }

  const handleCloseModalCreateAlbum = () => {
    setOpAlbum(null)
  }

  const handleSubmitFormUpdateAlbum = props => {
    const {id, name, year, artist_id} = props
    dispatch(update_album({id:id, name:name, year:year, artist_id:artist_id}));
  }

  const handleSubmitFormCreateAlbum = props => {
    const {name, year, artist_id} = props
    dispatch(create_album({name:name, year:year, artist_id:artist_id}));
  }

  return (
    <Col className=" mb-3" lg={12}>
        <Card className="bg-dark mt-3">
          <Card.Header eventKey="0">
            <Row>
              <Col lg={{ span: 5, offset: 0 }} className='mt-1 mb-1'>
                <h3 className="text-light font-weight-light">
                  <NavLink className="darkseagreen" to="/">Home</NavLink> / Music Collection
                </h3>
              </Col>
              <Col lg={{ span: 6, offset: 0 }}>
                <Form onSubmit={e => {e.preventDefault(); handleSubmit(e);}}>
                  <Row>
                    <Col lg={{ span: 7, offset: 0 }}>
                      <Field component={InputText} className='mt-1 mb-1' onChange={handleSearchChanged} onKeyDown={(e) => e.key === 'Escape' ? handleReset() : null} name="query" placeholder="Search" type="text" />
                    </Col>
                    <Col lg={{ span: 3, offset: 0 }}>
                      <button type="submit" disabled={submitting || searching} className="mt-1 btn btn-success btn-block font-weight-bold">{searching ? ". . ." : "search"}</button>
                    </Col>
                    <Col>
                      <Button className="mt-1 btn btn-secondary btn-block font-weight-bold" onClick={() => {dispatch(list_artists()); setOpAlbum("create")}}>
                        <FontAwesomeIcon icon={["fas", "fa-plus"]}/>
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Header>
            <Card.Body>
              <Card.Text>
                <Table variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Year</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <List albums={albums} selection_method={setSelectedAlbum} op_method={setOpAlbum}/>
                  </tbody>
                </Table>
                {albums.length ? 
                  <Row>
                    <Col lg={{span:2, offset:3}}>
                      <Button type="button" onClick={() => paginate(_.get(pagination, 'current_page') - 1)} disabled={1 === pagination.current_page} className="btn-sm btn-light btn-block font-weight-bold">
                        <FontAwesomeIcon icon={["fas", "fa-arrow-left"]}/>
                      </Button>
                    </Col>
                    <Col lg={2}>
                      <h3 className="text-center text-light font-weight-light">
                        {`${pagination.current_page}/${pagination.pages_count}`}
                      </h3>
                    </Col>
                    <Col lg={2}>
                      <Button type="button" onClick={() => paginate(_.get(pagination, 'current_page') + 1)} disabled={pagination.current_page === pagination.pages_count} className="btn-sm btn-light btn-block font-weight-bold">
                        <FontAwesomeIcon icon={["fas", "fa-arrow-right"]}/>
                      </Button>
                    </Col>
                  </Row> : null}
              </Card.Text>
            </Card.Body>
        </Card>
        <ModalConfirmation handleClose={handleCloseModalConfirmation} show={selected_album && op === "delete"}
          title="Click em confirmar para remover o item." subtitle={_.get(selected_album, "name")}
          handleConfirm={() => handleConfirmDeletion(selected_album.id)} layout="centered"
          textBntOK="Confirmar"
        />
        <ShowAlbum handleClose={handleCloseModalShowAlbum} album={album} show={op === "show"}/>
        <FormAlbum handleClose={handleCloseModalUpdateAlbum} save={handleSubmitFormUpdateAlbum} title="Edit" subtitle="Album" album={album} show={album && op === "edit"} list_of_artists={list_of_artists} />
        <FormAlbum handleClose={handleCloseModalCreateAlbum} save={handleSubmitFormCreateAlbum} title="Create" subtitle="Album" show={op === "create"} list_of_artists={list_of_artists} />
    </Col>
  )
}

Musicollection = reduxForm({ form: "musicollection", initialValues: { query: '' } })(Musicollection);
export default Musicollection