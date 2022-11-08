import axios from "axios";
import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner, Stack, Toast, ToastContainer } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";

export default function RegisterPage() {
  const [toast, setToast] = React.useState({
    show: false,
    title: "",
    message: "",
    variant: "success",
  });
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  function showToast(title, message, variant) {
    setToast({ show: true, title, message, variant });
  }

  async function registerAction(form) {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/register`, form);
      if (data.meta.status == "success") {
        navigate("/login", {
          state: {
            title: "Register Success",
            message: "Silahkan Masuk",
            variant: "success",
          },
        });
      }
    } catch (error) {
      console.error(error.response.data.data)
      showToast("Gagal Daftar",error.response.data.meta.message, "danger");
    } finally {
      setLoading(false);
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };
    registerAction(data);
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Col xs={7} md={6} lg={5}>
        <Form onSubmit={onSubmitHandler} className="card p-4 shadow-app">
          <h2 className="mb-4 text-center">Silahkan Daftar</h2>
          <Form.Group style={{ marginBottom: -1 }} className="" controlId="formBasicName">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              size="lg"
              type="text"
              name="name"
              placeholder="Enter your name"
              style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: -1 }} className="" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control size="lg" type="email" name="email" placeholder="Enter email" className="rounded-0" />
          </Form.Group>
          <Form.Group style={{ marginBottom: -1 }} className="" controlId="formBasicUsername">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control size="lg" type="text" name="username" placeholder="Enter username" className="rounded-0" />
          </Form.Group>
          <Form.Group className="" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              size="lg"
              type="password"
              name="password"
              placeholder="Password"
              style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            />
          </Form.Group>
          <Row className="justify-content-end my-2">
            <Link to="/login" className="btn btn-link text-decoration-none text-dark text-end">
              Masuk
            </Link>
          </Row>
          <Stack gap={2}>
            <Button type="submit" disabled={loading}>
              {loading && <Spinner as="span" size="sm" role="status" aria-hidden="true" className="me-1" />}
              Daftar
            </Button>
            <Link to={"/"} className="btn btn-outline-info">
              Kembali
            </Link>
          </Stack>
        </Form>
      </Col>
      <ToastContainer className="p-3" position={"bottom-end"}>
        <Toast
          show={toast.show}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          bg={toast.variant}
          delay={3000}
          autohide>
          <Toast.Header>
            <strong className="me-auto">{toast.title}</strong>
            <small>Sekarang</small>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}
