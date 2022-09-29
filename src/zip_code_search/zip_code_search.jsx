import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { ButtonGroup, Col, Row, Table, Card, Form, Button } from "react-bootstrap";
import InputText from '../common/inputs/text'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {search_addreses, capture_address} from './actions'
const _ = require("lodash");
const List = props => {
  const dispatch = useDispatch();
  const {addreses} = props
  const listItems = addreses.map(
    (address, i) => (
      <tr key={i}>
        <td>{address.address}</td>
        <td>{address.district}</td>
        <td>{address.city}</td>
        <td>{address.state}</td>
        <td>{address.zip}</td>
      </tr>
    )
  )
  return listItems;
}

let ZipCodeSearch = props => {
  const dispatch = useDispatch();
  const seletor = formValueSelector("search");
  const query = useSelector(state => seletor(state, "query"))
  const zip = useSelector(state => seletor(state, "zip"))
  const zip_code_search = useSelector(state => state.zip_code_search)
  const {addreses} = zip_code_search;
  const [searching, setSearching] = useState(false);
  const [capturing, setCapturing] = useState(true);
  const { submitting, reset } = props;


  const handleSearchChanged = () => {
    setSearching(false)
  }

  const handleCaptureChanged = () => {
    setCapturing(false)
  }

  const handleReset = () => {
    reset();
    setSearching(false)
    setCapturing(false)
  }

  const handleSearchSubmit = (e) => {
    axios.defaults.headers.common['current-page'] = 1
    dispatch(search_addreses(query))
    setSearching(true)
  }

  const handleCaptureSubmit = (e) => {
    let zip_code = zip.match(/\d/g).join('')
    if(zip_code.length !== 8) return
    dispatch(capture_address(zip_code))
    setCapturing(true)
  }

  return (
    <Col className=" mb-3" lg={12}>
        <Card className="bg-dark mt-3">
          <Card.Header eventKey="0">
            <Row>
              <Col lg={{ span: 0, offset: 0 }} className='mt-1 mb-1'>
                <h3 className="text-light font-weight-light">
                  <NavLink className="darkseagreen" to="/">Home</NavLink> / Zip Code Search
                </h3>
              </Col>
              <Col lg={{ span: 0, offset: 0 }}>
                <Form onSubmit={e => {e.preventDefault(); handleCaptureSubmit(e);}}>
                  <Row>
                    <Col lg={{ span: 0, offset: 6 }}>
                      <Field component={InputText} className='mt-1 mb-1' onChange={handleCaptureChanged} valid onKeyDown={(e) => e.key === 'Escape' ? handleReset() : null} name="zip" placeholder="Zip code" type="text" />
                    </Col>
                    <Col lg={{ span: 2, offset: 0 }}>
                      <button type="submit" disabled={submitting || capturing} className="mt-1 btn btn-info btn-block font-weight-bold">{capturing ? "..." : <FontAwesomeIcon icon={["fas", "fa-download"]} />}</button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col lg={{ span: 10, offset: 0 }}>
                <Form onSubmit={e => {e.preventDefault(); handleSearchSubmit(e);}}>
                  <Row>
                    <Col lg={{ span: 7, offset: 0 }}>
                      <Field component={InputText} className='mt-1 mb-1' onChange={handleSearchChanged} onKeyDown={(e) => e.key === 'Escape' ? handleReset() : null} name="query" placeholder="Search" type="text" />
                    </Col>
                    <Col lg={{ span: 1, offset: 0 }}>
                      <button type="submit" disabled={submitting || searching} className="mt-1 btn btn-success btn-block font-weight-bold">{searching ? "..." : <FontAwesomeIcon icon={["fas", "fa-search"]} />}</button>
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
                      <th>Address</th>
                      <th>District</th>
                      <th>City</th>
                      <th>State</th>
                      <th>zip</th>
                    </tr>
                  </thead>
                  <tbody>
                    <List addreses={addreses} />
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
        </Card>
    </Col>
  )
}

ZipCodeSearch = reduxForm(
  { form: "search", initialValues: { query: '', zip: '' } },
)(ZipCodeSearch);
export default ZipCodeSearch