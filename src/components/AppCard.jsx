import React from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppCard({ img = "", alt = "alt", title = "Judul Default", description = "", types = [], id = null }) {
  return (
    <div className="card">
      <img className="card-img-top" style={{ backgroundColor: "#A3C8CF" }} src={img} alt={alt} />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{title}</h5>
        <p className="card-text mb-4">{description}</p>
        <div className="d-flex align-items-center  gap-col-1">
          {Array.isArray(types) && types.length
            ? types.map((type, index) => (
                <Badge
                  key={index}
                  pill
                  bg="primary"
                  style={{ fontSize: ".9rem" }}
                  className={"py-2 px-3 fw-normal text-capitalize " + type}>
                  {type}
                </Badge>
              ))
            : null}
        </div>
        <Link to={`detail/${id}`} className="stretched-link"></Link>
      </div>
    </div>
  );
}
