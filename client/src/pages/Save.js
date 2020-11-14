import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";


function Saved() {

  const [saved, setSaved] = useState([]);

  function deleteBooks(id) {
    API.deleteBooks(id)
      .then(res => res)
      .catch(err => console.log(err));
  }

  // get all the books from the db then put them in the array 

  useEffect(() => {
    API.savedBooks()
      .then(res => {
        setSaved(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [saved])

  return (
    <Container fluid>
      <Row>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>Google Books Search</h1>
            <h3>Search For Your Books</h3>
          </Jumbotron>
        </Col>
        <Col size="md-12 sm-12" >
          <h1>Saved Books</h1>
          <Row>
            {saved.length ? (

              saved.map(book => (
                <Col size='sm-12' key={book._id}>
                  <div className="mb-4 border  p-3 rounded shadow ">
                    <img src={book.image} alt={book.title} />
                    <DeleteBtn onClick={() => deleteBooks(book._id)} />
                    <Link to={"/books/" + book.id} />
                    <strong className="m-4">
                      Title: {book.title}
                    </strong>
                    <strong>
                      Author: {book.author}
                    </strong>
                    <p className="mt-3" >
                      Description: {book.description}
                    </p>
                    <strong>
                      <a href={book.link} target="_blank" rel="noopener noreferrer"> link to book </a>
                    </strong>
                  </div>
                </Col>
              ))

            ) : (
                <h3>No Saved Books to Display</h3>
              )}

          </Row>
        </Col>
      </Row>
    </Container>
  )
}


export default Saved;