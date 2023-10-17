import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ModalAddNew from "./components/ModalAddNew";
import { useState } from "react";

function App() {
  const [iShowModelAddNew, setIShowModelAddNew] = useState(false);
  const handleShow = () => {
    setIShowModelAddNew(false);
  };
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new d-flex justify-content-between">
          <h3>List Users </h3>
          <Button variant="success" onClick={() => setIShowModelAddNew(true)}>
            ADD NEW
          </Button>{" "}
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew show={iShowModelAddNew} handleClose={handleShow} />
    </div>
  );
}

export default App;
