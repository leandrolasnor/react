import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import {login, register} from "./actions"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import ListTecnologies from '../common/tecnologies/componet'
import renderSelect from '../common/inputs/select'

const InputText = props => <Form.Control size="sm" className="mb-2" autoComplete="on" {...props.input} {...props} />

let Auth = props => {
  const dispatch = useDispatch()
  const seletor = formValueSelector("authForm");

  const login_email = useSelector(state => seletor(state, "login_email"))
  const login_password = useSelector(state => seletor(state, "login_pwd"))
  
  const name = useSelector(state => seletor(state, "name"))
  const register_email = useSelector(state => seletor(state, "register_email"))
  const role = useSelector(state => seletor(state, "role"))
  const register_password = useSelector(state => seletor(state, "register_pwd"))
  const password_confirmation = useSelector(state => seletor(state, "confirm_pwd"))

	const { submitting} = props;
	return (
    <Container lg={12} md={12} sm={12} xs={12}>
        <Row className="bg-dark mt-5 pt-4 profile">
          <Col className="text-light mt-4 mb-5" lg={12}>
							<ListTecnologies />
          </Col>
        </Row>
        <Row style={{backgroundColor: 'rgba(0, 0, 0, 0.9)'}}>
          <Col className="text-light mt-4 mb-4" lg={{span:6, offset:3}}>
            <Accordion defaultActiveKey="0">
              <Card className="bg-dark">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <h3 className="text-light font-weight-light">Sign in</h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Card.Text lg={12}>
                      <Form onSubmit={e => {dispatch(login({email:login_email, password:login_password})); e.preventDefault();}}>
                        <Form.Group>
                          <Col lg={12}>
                            <Field name="login_email" component={InputText} placeholder="E-mail" type="email"/>
                          </Col>
                          <Col lg={12}>
                            <Field name="login_pwd" required component={InputText} type="password" placeholder="Password"/>
                          </Col>
                          <Col lg={6} md={12} sm={12} xs={12}>
                            <button type="submit" disabled={submitting} className="mt-2 btn btn-success btn-block pull-right font-weight-bold btn-sm">Login</button>
                          </Col>
                        </Form.Group>
                      </Form>
                    </Card.Text>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className='bg-dark'>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <h3 className="text-light font-weight-light">Sign up</h3>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <Card.Text lg={12}>
                      <Form onSubmit={e => {dispatch(register({name, email:register_email, role, password:register_password, password_confirmation})); e.preventDefault();}}>
                        <Form.Group>
                          <Col>
                            <Field name="name" required component={InputText} placeholder="Name" type="text"/>
                          </Col>
                          <Col>
                            <Field name="register_email" component={InputText} placeholder="E-mail" type="email"/>
                          </Col>
                          <Col>
                            <Field type="select" name="role" component={renderSelect} options={[{value:'user', label:'User'}, {value:'admin', label:'Admin'}]} />
                          </Col>
                          <Col>
                            <Field name="register_pwd" required component={InputText} type="password" placeholder="Password"/>
                          </Col>
                          <Col>
                            <Field name="confirm_pwd" required component={InputText} type="password" placeholder="Confirmation Password"/>
                          </Col>
                          <Col lg={6} md={12} sm={12} xs={12}>
                            <button type="submit" disabled={submitting || (password_confirmation !== register_password)} className="mt-2 btn btn-success btn-block pull-right font-weight-bold btn-sm">New user</button>
                          </Col>
                        </Form.Group>
                      </Form>
                    </Card.Text>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
    </Container>
	);
};

Auth = reduxForm({ form: "authForm", initialValues: { login_email: '', login_pwd: '', name: '', register_email: '', role: '', register_pwd: '', confirm_pwd: '' } })(Auth);
export default Auth;
