import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const handleFetchBooks = async () => {
    const response = await axios.get(
      "http://reading-list-lemon.vercel.app/books"
    );

    setBooks(response.data);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(
      `http://reading-list-lemon.vercel.app/books/${id}`,
      {
        title: newTitle,
      }
    );

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
    const response = await axios.post(
      "http://reading-list-lemon.vercel.app/books",
      {
        title: title,
      }
    );

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const valueToShare = {
    books: books,
    deleteBookById: deleteBookById,
    editBookById: editBookById,
    handleCreateBook: handleCreateBook,
    handleFetchBooks: handleFetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
// If u wanna import both at once use
// import BooksContext, { Provider } from "./file location"
