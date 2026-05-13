import React, { useEffect, useState } from 'react'
import Banner from './components/banner'
import Announcements from './components/announcements'
import NewBooks from './components/news_books'
import { useAppDispatch } from '../../store/app_hook'
import { getBooks } from '../../store/features/book/book_slice'

const Home:React.FC = () => {
    const [loading, setLoading] = useState(true);
  
  const dispatch=useAppDispatch();

   useEffect(() => {
    const fetchBooks = async () => {
      try {
        dispatch(getBooks());
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  return loading ? (
        <p className="text-gray-500">Yükleniyor...</p>
      ) : (
    <div className='container mx-auto flex flex-col gap-y-5'>

      
      <Banner />
      <NewBooks />
      <Announcements />
    </div>
  )
}

export default Home
