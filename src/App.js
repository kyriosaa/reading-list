import { useState, useEffect } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  const handleFetchBooks = async () => {
    const response = await axios.get("http://reading-list-lemon.vercel.app/books");

    setBooks(response.data);
  };

  useEffect(() => {
    handleFetchBooks();
  }, []);

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://reading-list-lemon.vercel.app/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://reading-list-lemon.vercel.app/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const handleCreateBook = async (title) => {
    const response = await axios.post("http://reading-list-lemon.vercel.app/books", {
      title: title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onEdit={editBookById} onDelete={deleteBookById} />
      <BookCreate onCreate={handleCreateBook} />
    </div>
  );
}

export default App;
