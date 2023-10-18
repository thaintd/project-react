import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../service/UserService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, user, handleDeleteUserFromModal } = props;
  const confirmDelete = async () => {
    let res = await deleteUser(user.id);
    if (res && +res.statusCode === 204) {
      toast.success("delete user succeed");
      handleClose();
      handleDeleteUserFromModal(user);
    } else {
      toast.error("error");
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
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Do u want to delete this user
            <h5>email = "{user.email}"</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              confirmDelete();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
