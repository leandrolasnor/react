import Form from "react-bootstrap/Form";
const InputText = props => <Form.Control className="mb-2" autoComplete="on" {...props.input} {...props} />
export default InputText