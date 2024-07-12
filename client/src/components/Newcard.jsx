import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Newcard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="../assets/need" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the content.
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button variant="primary">EDIT</Button>
          <Button variant="primary">DELETE</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Newcard;