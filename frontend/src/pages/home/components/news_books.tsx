
import Card from "../../../components/card";
import {  useAppSelector } from "../../../store/app_hook";

const NewBooks = () => {

   const { books } = useAppSelector(
      (state) => state.book_slice
    );

    const sortedBooks = [...books].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
);

 

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">🆕 Yeni Eklenen Kitaplar</h2>

     
        <div className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {sortedBooks.map((book) => (
            <Card book={book} key={book._id}    />
          ))}
        </div>
    </section>
  );
};

export default NewBooks;