
import { Form } from 'react-bootstrap';

const SearchBox = ({ onSearch }: { onSearch: any }) => {
  return (
    <Form className="mb-3">
      <Form.Group controlId="formSearch">
        <Form.Control type="text" placeholder="Search" onChange={onSearch} />
      </Form.Group>
    </Form>
  );
};

export default SearchBox;
