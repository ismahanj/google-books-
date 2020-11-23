import React, { useState, useEffect } from "react";
import API from "../utils/API";
import {Container} from "../components/Grid";
import {Col} from "../components/Grid";
import {Row} from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Button from 'react-bootstrap/Button'

function Search() {
  const [books, setBooks] = useState("");
  const [formObject, setFormObject] = useState("");
  

  useEffect(() => {
    displayBooks()
    }, [])
//displaying book to the page 
   function displayBooks(){
     API.searchBooks("Harry Potter")
      .then(res => {
        console.log(res)
        setBooks(res.data.items)
        })
        
      .catch(err => {
        console.log(err);
      })
  }; 

//updating states with user input 
  function handleInputChange (event) {
    const {name, value} = event.target; 
    setFormObject({...formObject, [name]: value })
  };

//function to save books to db
  function savedBooks (book) {
    API.savedBooks({
      _id: book.id, 
      title: book.title, 
      author: book.author, 
      description: book.des, 
      image: book.imageLinks.smallThumbnail, 
      link: book.infoLink 
    })
    .then(res => displayBooks())
    .catch(err => {console.log(err)})
  }

  //on click the book will be saved to the db using the savebooks function 
  function handleFormSubmit(event){
    event.preventDefault(); 
    if(formObject.search){
      API.searchBooks(formObject.search)
      .then(res => {
        console.log(res.data)
        setBooks(res.data.items)
      })
      .catch(err => {console.log(err)})
    }
  }; 

  return (

    <Container fluid >
      <Row>
        <Col size="md-6" >
          <Jumbotron>
            <h1>Google Books Search</h1>
            <h3>Search and Save Books</h3>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="search"
              placeholder="Search book title ..."
            />
            <FormBtn
              disabled={!(formObject.search)}
              onClick={handleFormSubmit}
            >
              Search
              </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <h1>Results</h1>
          <Row>
            {books.length >0 ? (
              <List>
                {books.map(book => (
                  <ListItem key={book.id}>
                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title} />
                    <Link to={"/books/" + book.id} />
                    <Button onClick={() => savedBooks(book.volumeInfo)} variant="outline-success" className='ml-3' >Save</Button>
                    <strong>
                      <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer"> link to book </a><br></br>
                    </strong>
                    <strong className="m-4">
                      Title: {book.volumeInfo.title}
                    </strong>
                    <strong>
                      Author: {book.volumeInfo.authors}
                    </strong>
                    <p className="mt-3" >
                      Description: {book.volumeInfo.description}
                    </p>

                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Books Found</h3>
              )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;