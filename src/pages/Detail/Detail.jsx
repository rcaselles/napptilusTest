import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { fetchOoompaLoompaDetail } from "../../slices/oompaLoompasDetailsSlice";
import { hasExpired } from "../../utils/date";
import parse from "html-react-parser";

function Detail() {
  const { id } = useParams();
  const data = useSelector((state) => state.details.oompaLoompasDetailedList);
  const loading = useSelector((state) => state.details.loading);
  const [oompaLoompa, setOompaLoompa] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (data[id] && !hasExpired(new Date(data[id].expirationDate))) {
      setOompaLoompa(data[id]);
    } else {
      dispatch(fetchOoompaLoompaDetail(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id]);

  if (loading) {
    return <div className="spinner" />;
  }

  return (
    <div className="detail-container">
      <div className="box">
        <img
          className="detail-image"
          src={oompaLoompa.image}
          alt="Profile Oompa Loompa"
        />
      </div>
      <div className="box">
        <b>
          {oompaLoompa.first_name} {oompaLoompa.last_name}
        </b>
        <p className="text-muted">
          {oompaLoompa.gender === "F" ? "Female" : "Male"}
        </p>
        <i className="text-muted">{oompaLoompa.profession}</i>
        <span>{parse(oompaLoompa.description ?? "")}</span>
      </div>
    </div>
  );
}

export default Detail;
