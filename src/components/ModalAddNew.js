import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postUser } from "../service/UserService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTables } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleSave = async () => {
    let res = await postUser(name, job);
    console.log(res);
    if (res && res.id) {
      setName("");
      setJob("");
      toast.success("A user is created succeed!");
      handleClose();
      props.handleUpdateTables({ first_name: name, id: res.id });
    } else {
      toast.error("An error");
    }
  };

  return (
    <div className="modal show">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job</label>
            <input
              type="text"
              className="form-control"
              value={job}
              onChange={(e) => {
                setJob(e.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSave();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddNew;
