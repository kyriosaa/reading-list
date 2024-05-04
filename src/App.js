import { useEffect, useContext } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";

function App() {
<<<<<<< HEAD
  const { handleFetchBooks } = useContext(BooksContext);
=======
  const [books, setBooks] = useState([]);

  const handleFetchBooks = async () => {
    const response = await axios.get("http://reading-list-lemon.vercel.app/books");

    setBooks(response.data);
  };
>>>>>>> fa837dd59ba93d7b83f03129066f2e52f8bdec0f

  useEffect(() => {
    handleFetchBooks();
  }, []);

<<<<<<< HEAD
=======
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

>>>>>>> fa837dd59ba93d7b83f03129066f2e52f8bdec0f
  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList />
      <BookCreate />
    </div>
  );
}

export default App;
