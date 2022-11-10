import axios from "axios";
import React, { useEffect } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Ratio,
  Row,
  Spinner,
  Stack,
  Toast,
  ToastContainer
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl, textTruncate } from "../utils";
import { useLocalStorage } from "../utils/hooks/useLocalStorage";

export default function HomePage() {
  const [toast, setToast] = React.useState({
    show: false,
    title: "",
    message: "",
    variant: "success",
  });
  const [token, setToken] = useLocalStorage("token", null);
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [input, setInput] = React.useState({
    id: "",
    title: "",
    content: "",
    image: "",
  });
  const [isEdit, setIsEdit] = React.useState(false);
  const [error, setError] = React.useState({
    title: [],
    content: [],
    image: [],
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", {
        state: {
          title: "Login Required",
          message: "You must login first",
          variant: "warning",
        },
      });
    }
    if (location.state) {
      showToast(location.state.title, location.state.message, location.state.variant);
    }
    getPosts();
  }, [token]);

  function showToast(title, message, variant) {
    setToast({ show: true, title, message, variant });
  }

  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(data.data);
    } catch (error) {
      if (error.response.data.message === "Unauthenticated.") {
        const pesan = "Token expired, please login again";
        showToast("Unauthenticated", pesan, "danger");
        setToken(null);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        showToast("Gagal mengambil data", `${error.message}`, "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (form) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/post`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.meta.status === "success") {
        showToast("Success", data.meta.message, "success");
        resetForm();
      }
      getPosts();
    } catch (error) {
      if (error.response.data.message === "Unauthenticated.") {
        const pesan = "Token expired, please login again";
        showToast("Unauthenticated", pesan, "danger");
        setToken(null);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(error.response.data.data);
        showToast("Gagal Membuat Post", `${error.response.data.meta.message}, Mohon diisi.`, "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.meta.status === "success") {
        showToast("Success", data.meta.message, "success");
      }
      getPosts();
    } catch (error) {
      console.error(error);
      if (error.response.data.message === "Unauthenticated.") {
        const pesan = "Token expired, please login again";
        showToast("Unauthenticated", pesan, "danger");
      } else {
        showToast("Gagal Menghapus Data", `${error.message}`, "danger");
      }
    }
  };

  const editPost = async (id, form) => {
    try {
      const { data } = await axios.post(`${baseUrl}/post/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.meta.status === "success") {
        showToast("Success", data.meta.message, "success");
        resetForm();
      }
      getPosts();
    } catch (error) {
      if (error.response.data.message === "Unauthenticated.") {
        const pesan = "Token expired, please login again";
        showToast("Unauthenticated", pesan, "danger");
        setToken(null);

        setTimeout(() => {
          navigate("/login");
        }, 2000); // 2 detik
      } else {
        setError(error.response.data.data);
        showToast("Gagal Menghapus Data", `${error.message}`, "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  function handleOnSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("content", input.content);
    formData.append("image", input.image);

    if (isEdit) {
      editPost(input.id, formData);
    } else {
      createPost(formData);
    }
  }

  function setEditStatus(post) {
    setInput({
      id: post.id,
      title: post.title,
      content: post.content,
      image: post.image,
    });
    setIsEdit(true);
    window.location.href = "#heading";
  }

  function resetForm() {
    setInput({
      id: "",
      title: "",
      content: "",
      image: "",
    });
    setError({
      title: [],
      content: [],
      image: [],
    });
    setIsEdit(false);
    document.getElementById("form").reset();
  }

  return (
    <Container className="bg-white">
      <Row className="py-3 justify-content-center" xs={2}>
        <Col>
          <h1 className="text-center mb-3" id="heading">
            <i>
              Artikel Harian
              <br />
              Si Ucup
            </i>
          </h1>
          <Form onSubmit={handleOnSubmit} noValidate id="form">
            {isEdit ? (
              <Alert variant={"warning"}>
                Anda sedang dalam kondisi mengedit. <br />
                Jika ingin membuat artikel baru, silahkan klik tombol dibawah ini. <br />
                <Button variant="link" onClick={resetForm} className="p-0 m-0 mt-0">
                  Batal Edit
                </Button>
              </Alert>
            ) : null}
            <FloatingLabel controlId="floatingJudul" label="Judul Acara" className="mb-3">
              <Form.Control
                value={input.title}
                onChange={(e) => setInput((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }))}
                type="text"
                placeholder="Masukkan judul acara"
                name="title"
                isInvalid={error.title?.length >= 1}
              />
              <Form.Control.Feedback type="invalid">{error.title?.[0]}</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">Mantap Jiwa!</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingDeskripsi" label="Deskripsi" className="mb-3">
              <Form.Control
                value={input.content}
                onChange={(e) => setInput((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }))}
                as="textarea"
                placeholder="Masukkan deskripsi acara"
                style={{ height: "100px" }}
                name="content"
                isInvalid={error.content?.length >= 1}
              />
              <Form.Control.Feedback type="invalid">{error.content?.[0]}</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">Mantap Jiwa!</Form.Control.Feedback>
            </FloatingLabel>
            <Form.Group controlId="formFile" className="mb-3 text-center">
              {
                input.image instanceof File ? (
                  <Image src={URL.createObjectURL(input.image)} rounded fluid className="text-center mb-1" />
                ) : (
                  input.image && <Image src={input.image} rounded fluid className="text-center mb-1" />
                )
              }
              <Form.Control
                onChange={(e) => setInput((prevValue) => ({ ...prevValue, [e.target.name]: e.target.files[0] }))}
                type="file"
                name="image"
                accept="image/*"
                isInvalid={error.image?.length >= 1}
              />
              <Form.Control.Feedback type="invalid">{error.image?.[0]}</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">Mantap Jiwa!</Form.Control.Feedback>
            </Form.Group>
            <Stack>
              <Button type="submit" disabled={loading} variant={isEdit ? "warning" : "primary"}>
                {loading && <Spinner as="span" size="sm" role="status" aria-hidden="true" className="me-1" />}
                Submit
              </Button>
            </Stack>
          </Form>
        </Col>
      </Row>
      <hr />
      {loading ? (
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Row className="py-2 g-3" xs={2} md={3}>
          {posts.map((post) => (
            <Col key={post.id}>
              <Card className="h-100" bg="dark" border="success" text="white">
                <Ratio aspectRatio={"4x3"}>
                  <Card.Img variant="top" src={post.image} />
                </Ratio>
                <Card.Body>
                  <Card.Title className="mb-0 text-capitalize">{post.title}</Card.Title>
                  <Card.Text as="small" className="text-muted text-capitalize">
                    {post.author}
                  </Card.Text>
                  <Card.Text className="mt-3 mb-4">{textTruncate(post.content, 200)}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Row className="justify-content-between align-items-center">
                    <Col xs="auto">
                      <Card.Text as="small" className="text-muted">
                        {post.created_at}
                      </Card.Text>
                    </Col>
                    <Col xs="auto">
                      <ButtonGroup>
                        {/* <Button size="sm" variant="outline-info" >
                          <i className="bi bi-info-circle me-1"></i>
                          Detail
                        </Button> */}
                        <Button size="sm" variant="outline-warning" onClick={() => setEditStatus(post)}>
                          <i className="bi bi-pencil-square me-1"></i>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => deletePost(post.id)}>
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

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
