import React from "react";
import Card from "react-bootstrap/Card";
import Skeleton from "react-loading-skeleton";
import Col from "react-bootstrap/Col";

const ArticleCard = ({ value }) => {
  const {
      title,
      link,
      thumbnail,
      categories,
  } = value;

  const array = [];
  let total_count = 0;
  for (let index in categories) {
    array.push(categories);
    total_count +=1;
  }
  return (
    <Col md={5}>
      <Card className="card shadow-lg mb-5 text-center bg-white rounded">
        <Card.Body>
          <Card.Title as="h5">{title || <Skeleton />} </Card.Title>
          <div className="embed-responsive">
          <a href={link}>
            <img
                className="shadow-lg rounded"
                height="160"
                src={thumbnail}
              />
              </a>
            </div>
          <hr />
          {link ? <CardButtons link={link} /> : <Skeleton count={2} />}
        </Card.Body>
      </Card>
      </Col>
  );
};

const CardButtons = ({ link }) => {
  return (
    <>
      <a href={link} target=" _blank" className="btn btn-outline-secondary">
        <i className="fab fa-medium" /> Article
      </a>
    </>
  );
};

export default ArticleCard;