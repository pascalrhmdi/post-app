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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";

export default function LoginPage() {
  const [toast, setToast] = React.useState({
    show: false,
    title: "",
    message: "",
    variant: "success",
  });
  const [token, setToken] = useLocalStorage("token", null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
    email: [],
    password: [],
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
    if (location.state) {
      showToast(location.state.title, location.state.message, location.state.variant);
    }
  }, [token]);

  function showToast(title, message, variant) {
    setToast({ show: true, title, message, variant });
  }

  const filterJsonForUserStorage = (json) => {
    const { id, name, email, username } = json;
    return { id, name, email, username };
  };

  async function loginAction(form) {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/login`, form);
      if (data.meta.code === 200) {
        const user = filterJsonForUserStorage(data.data.user);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(data.data.token);
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.data);
      showToast("Masuk Gagal", `${error.response.data.meta.message} `, "danger");
    } finally {
      setLoading(false);
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    loginAction(data);
    // setValidated(true);
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Col xs={6} md={5} lg={4}>
        <Form onSubmit={onSubmitHandler}  noValidate  className="card px-5 py-4 shadow-app">
          <h2 className="mb-4 text-center">Silahkan Masuk</h2>
          <FloatingLabel controlId="floatingUsername" label="Username" className="mb-2">
            <Form.Control type="text" name="username" placeholder="Enter username" required isInvalid={error.username?.length >= 1 }
            />
            <Form.Control.Feedback type="invalid">{error.username?.[0]}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Mantap Jiwa!</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
            <Form.Control type="password" name="password" placeholder="Password" required isInvalid={error.password?.length >= 1 }  />
            <Form.Control.Feedback type="invalid">{error.password?.[0]}</Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Mantap Jiwa!</Form.Control.Feedback>
          </FloatingLabel>
          <Row className="justify-content-end my-2">
            <Link to="/register" className="btn btn-link btn-block text-decoration-none text-dark text-end">
              Daftar
            </Link>
          </Row>
          <Stack gap={2}>
            <Button type="submit" disabled={loading}>
              {loading && <Spinner as="span" size="sm" role="status" aria-hidden="true" className="me-1" />}
              Masuk
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
