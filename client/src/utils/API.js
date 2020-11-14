import axios from "axios";

// Export an object containing methods we'll use for accessing the Google BooksAPIs

export default {
  searchBooks: function(query) {
    return axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
  }, 

  displayBooks: function(){
    return axios.get("API/books")
  }, 

  savedBooks: function(bookData){
    return axios.post("API/books", bookData)
  },

  deleteBooks: function(id){
    return axios.delete("API/books", id)
  }
};
