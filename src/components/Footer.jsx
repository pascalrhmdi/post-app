import React from 'react'
import { locationJS, logoJabarSejahtera } from '../assets'

export default function Footer() {
  return (
    <div className="container-lg">
      <div className="row justify-content-between align-items-start gap-5">
        <div className="col-3">
          <img className="img-fluid mb-3 img-footer" src={logoJabarSejahtera} alt="Logo Jabar Sejahtera" />
          <p>Jabarsejahtera.org adalah website untuk berzakat dan menggalang dana secara online terpopuler di Indonesia.
          </p>
        </div>
        <div className="col">
          <h6>Hubungi Kami</h6>
          <div className="d-flex flex-row align-items-center gap-2">
            <i className="bi bi-whatsapp"></i>
            <address className="m-0">08986866875</address>
          </div>
          <div className="d-flex flex-row align-items-center gap-2">
            <i className="bi bi-instagram"></i>
            <address className="m-0">@JabarSejahtera</address>
          </div>
          <div className="d-flex flex-row align-items-center gap-2">
            <i className="bi bi-envelope-fill"></i>
            <address className="m-0">jabarsejahtera@gmail.com</address>
          </div>
          <div className="d-flex flex-row gap-2">
            <i className="bi bi-geo-alt-fill"></i>
            <address className="m-0">
              Jl. Gelap Nyawang No.4, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132
            </address>
          </div>
        </div>
        <div className="col-3">
          <img className="img-fluid" src={locationJS} alt="Map Jabar Sejahtera"/>
        </div>
      </div>
      <hr className="m-0"/>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <small className="text-msecondary">Jabar Digital Services</small>
        <small className="text-msecondary">Copyright &copy; 2022. All Right Reserved</small>
      </div>
    </div>
)
}
