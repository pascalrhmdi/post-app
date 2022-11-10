import axios from "axios";
import React, { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
  Stack,
  Toast,
  ToastContainer
} from "react-bootstrap";
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
  const [token, setToken] = useLocalStorage("token", null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    name: [],
    email: [],
    password: [],
    username: [],
  });

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
      setError(error.response.data.data);
      showToast("Gagal Daftar", error.response.data.meta.message, "danger");
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
        <Form onSubmit={onSubmitHandler} noValidate className="card p-4 shadow-app">
          <h2 className="mb-4 text-center">Silahkan Daftar</h2>
          <FloatingLabel controlId="floatingName" label="Nama Lengkap" className="mb-1">
            <Form.Control type="text" name="name" placeholder="Masukkan Nama Lengkap" isInvalid={error.name?.length >= 1 }/>
            <Form.Control.Feedback type="invalid">{error.name?.[0]}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Mantap Jiwa!</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingEmail" label="E-mail" className="mb-1">
            <Form.Control type="email" name="email" placeholder="Masukkan Email" isInvalid={error.email?.length >= 1 }/>
            <Form.Control.Feedback type="invalid">{error.email?.[0]}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Mantap Jiwa!</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingUsername" label="Username" className="mb-1">
            <Form.Control size="lg" type="text" name="username" placeholder="Enter username" isInvalid={error.username?.length >= 1 } />
            <Form.Control.Feedback type="invalid">{error.username?.[0]}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Mantap Jiwa!</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-1">
            <Form.Control size="lg" type="password" name="password" placeholder="Password" isInvalid={error.password?.length >= 1 } />
            <Form.Control.Feedback type="invalid">{error.password?.[0]}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Mantap Jiwa!</Form.Control.Feedback>
          </FloatingLabel>
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
      <ToastContainer className="p-3 position-fixed" position={"bottom-end"}>
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
