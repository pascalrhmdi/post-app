// import axios from "axios";
// import React, { useEffect } from "react";
// import {
//   Button,
//   Col,
//   Container,
//   Dropdown,
//   Form,
//   Image,
//   Pagination,
//   Row,
//   Spinner,
//   Stack,
//   Toast,
//   ToastContainer
// } from "react-bootstrap";
// import { pokemonLogo } from "../assets";
// import { AppCard } from "../components";
// import { baseUrlPokemon, baseUrlTypes } from "../utils";

// export default function HomePage() {
//   const [loading, setLoading] = React.useState(true);
//   const [toast, setToast] = React.useState(false);
//   // const [filteredTypes, setFilteredTypes] = React.useState([]);

//   const [offset, setOffset] = React.useState(40);

//   async function getPokemon() {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(`${baseUrlPokemon}/?limit=20&offset=${offset}`);
//       await getAdditionalPokemonData(data.results);
//     } catch (error) {
//       setToast(true);
//     }
//   }

//   async function getAdditionalPokemonData(data = []) {
//     try {
//       data.forEach(async (pokemon) => {
//         const { data } = await axios.get(`${baseUrlPokemon}/${pokemon.name}`);
//         setPokemon((prev) => [...prev, data]);
//       });
//     } catch (error) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function getPokemonByName(pokemonName) {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${baseUrlPokemon}/${pokemonName}`);
//       setPokemon([response.data]);
//     } catch (error) {
//       setToast(true);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function getPokemonTypes() {
//     try {
//       const response = await axios.get(`${baseUrlTypes}`);
//       setTypes(response.data.results);
//     } catch (error) {
//       setToast(true);
//     }
//   }

//   async function getPokemonByType(type) {
//     console.log(type);
//     setLoading(true);
//     try {
//       const { data } = await axios.get(`${baseUrlTypes}/${type}`);
//       // setFilteredTypes(data.pokemon);
//       await getAdditionalPokemonData(data.pokemon);
//     } catch (error) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getPokemon();
//   }, [offset]);

//   useEffect(() => {
//     getPokemonTypes();
//   }, []);

//   function handleSearchPokemon(e) {
//     e.preventDefault();
//     const pokemonName = e.target.elements.pokemonName.value;
//     console.log(pokemonName);
//     if (pokemonName == "") {
//       setPokemon([]);
//       getPokemon();
//     } else {
//       getPokemonByName(pokemonName);
//     }
//   }

//   function offsetHandler(value) {
//     setLoading(true);
//     setPokemon([]);
//     setOffset((prev) => prev + value);
//   }

//   function resetHandler() {
//     setLoading(true);
//     setPokemon([]);
//     getPokemon();
//   }

//   return (
//     <Container className="bg-white pb-3">
//       {loading ? (
//         <>
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//           <span>SENGAJA LOADINGNYA DITAMBAH SATU DETIK HIHI...</span>
//         </>
//       ) : (
//         <>
//           <Row className="justify-content-center">
//             <Col xs={10} md={7}>
//               <Image fluid src={pokemonLogo} className="mt-3 p-4" alt="Logo Pokemon" />
//               <Form onSubmit={handleSearchPokemon}>
//                 <Stack direction="horizontal" gap={3}>
//                   <Form.Control size="lg" type="text" placeholder="Cari Pokemon (id/nama)" name="pokemonName" />
//                   <Button size="lg" variant="primary" type="submit">
//                     Cari
//                   </Button>
//                   <Button size="lg" variant="outline-danger" type="reset" onClick={resetHandler}>
//                     Reset
//                   </Button>
//                 </Stack>
//               </Form>
//             </Col>
//           </Row>
//           <Row className="g-2 mt-3">
//             <Stack direction="horizontal" className="mt-5 mb-3">
//               <div>
//                 <h5 className="mb-0">Hasil Pencarian</h5>
//               </div>
//               <Dropdown className="mx-auto">
//                 <Dropdown.Toggle variant="success" id="dropdown-kategori">
//                   Kategori
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   {types.map((type, index) => (
//                     <Dropdown.Item key={index} className="text-capitalize" onClick={() => getPokemonByType(type.name)}>
//                       {type.name}
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//               <Pagination className="mb-0">
//                 <Pagination.Item onClick={() => offsetHandler(-20)}>
//                   <i className="bi bi-chevron-left"></i>
//                   Geser Kiri
//                 </Pagination.Item>
//                 <Pagination.Item onClick={() => offsetHandler(20)}>
//                   Geser Kanan
//                   <i className="bi bi-chevron-right"></i>
//                 </Pagination.Item>
//               </Pagination>
//             </Stack>
//             {filteredTypes.length !== 0
//               ? filteredTypes.map((item, index) => (
//                   <Col key={index} xs={4} md={3}>
//                     <AppCard
//                       title={item.name}
//                       img={item.sprites?.other["official-artwork"].front_default}
//                       types={item.types.map((type) => type.type.name)}
//                       alt={item.name}
//                       id={item.id}
//                     />
//                   </Col>
//                 ))
//               : pokemon.map((item, index) => (
//                   <Col key={index} xs={4} md={3}>
//                     <AppCard
//                       title={item.name}
//                       img={item.sprites?.other["official-artwork"].front_default}
//                       types={item.types.map((type) => type.type.name)}
//                       alt={item.name}
//                       id={item.id}
//                     />
//                   </Col>
//                 ))}
//           </Row>
//         </>
//       )}
//       <ToastContainer className="p-4" position={"bottom-end"}>
//         <Toast bg="danger" onClose={() => setToast(false)} show={toast} delay={3000} autohide>
//           <Toast.Header className="p-2">
//             <strong className="me-auto">Permintaan Gagal</strong>
//             <small>Sekarang</small>
//           </Toast.Header>
//           <Toast.Body className="text-white p-3">Pokemon Tidak ditemukan</Toast.Body>
//         </Toast>
//       </ToastContainer>
//     </Container>
//   );
// }
