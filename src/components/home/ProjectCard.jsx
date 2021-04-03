import React, { useState, useEffect, useCallback } from "react";
import Card from "react-bootstrap/Card";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProjectCard = ({ value }) => {
  const {
    name,
    description,
    svn_url,
    stargazers_count,
    languages_url,
    pushed_at,
  } = value;
  return (
    <Col md={6}>
      <Card className="card p-2">
        <Card.Body>
          <Card.Title as="h5" style={{color: '#02aab0'}}>{name || <Skeleton />} </Card.Title>
          <Card.Text>{(description)?description:"" || <Skeleton count={3} />} </Card.Text>
          <hr />
          <Row>
          <Col md={3}>
          {svn_url ? <CardButtons svn_url={svn_url} /> : <Skeleton count={2} />}
          </Col>
          <Col md={9}>
          {languages_url ? (
            <Language languages_url={languages_url} repo_url={svn_url} />
          ) : (
            <Skeleton count={3} />
          )}
          </Col>
          </Row>
          {value ? (
            <CardFooter star_count={stargazers_count} repo_url={svn_url} pushed_at={pushed_at} />
          ) : (
            <Skeleton />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

const CardButtons = ({ svn_url }) => {
  return (
    <>
      <a href={svn_url} target=" _blank" style={{color: '#00cdac'}} className="btn btn-outline-dark">
        <i className="fab fa-github"/> Repo
      </a>
    </>
  );
};

const Language = ({ languages_url, repo_url }) => {
  const [data, setData] = useState([]);

  const handleRequest = useCallback(async () => {
    try {
      const response = await axios.get(languages_url);
      return setData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }, [languages_url]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  const array = [];
  let total_count = 0;
  for (let index in data) {
    array.push(index);
    total_count += data[index];
  }

  return (
    <div className="pb-3" style={{color: '#ed4264'}}>
      Languages:{" "}
      {array.length
        ? array.map((language) => (
            <a
              key={language} 
              className="badge badge-light card-link"
              href={repo_url + `/search?l=${language}`}
              target=" _blank"
            >
              {language}:{" "}
              {Math.trunc((data[language] / total_count) * 1000) / 10} %
            </a>
          ))
        : "code yet to be deployed."}
    </div>
  );
};

const CardFooter = ({repo_url }) => {

  return (
    <p className="card-text">
      <a
        href={repo_url + "/stargazers"}
        target=" _blank"
        className="text-light text-decoration-none"
      >
      </a>
    </p>
  );
};

export default ProjectCard;
