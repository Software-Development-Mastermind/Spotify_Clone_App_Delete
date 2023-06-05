import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

function LogSignIn() {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = (login) => {
    setIsLogin(login);
    setShowModal(true);
  };

  return (
    <>
      <header className="login">
        <div className="loginBtns">
          <button
            className="btn btn-black rounded-pill my-button"
            onClick={() => handleShow(true)}
          >
            Sign up
          </button>
          <button
            className="btn btn-white rounded-pill my-button"
            onClick={() => handleShow(false)}
          >
            Log in
          </button>
        </div>
      </header>

      {isLogin ? (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>Here's the login form.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>Here's the sign-up form.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default LogSignIn;
