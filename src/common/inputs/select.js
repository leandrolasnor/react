import Form from "react-bootstrap/Form";

let Select = ({
  selected_value,
  input,
  options,
  label,
  type,
  meta: { touched, error }
}) => (
  <span>
    <Form.Control size="sm" className="mb-2" {...input} as="select">
      <option value="">Select a item...</option>
      {options.map((option,index) => 
        option.value === selected_value ? <option selected value={option.value} key={index}>{option.label}</option> : <option value={option.value} key={index}>{option.label}</option>    
      )}
    </Form.Control>
    {touched && error && <span>{error}</span>}
  </span>
);

export default Select;