

import { createBrowserRouter } from "react-router";
import MainLayout from "../layout";
import Login from "../pages/login";
import Register from "../pages/register";
import NotFound from "../pages/not_found";
import Home from "../pages/home";
import AdminLayout from "../admin/layout";
import AdminHome from "../admin/page/home";
import Books from "../pages/books";
import BookDetail from "../pages/books/detail_book";
import AdminBook from "../admin/page/book";
import AddBook from "../admin/page/book/book_add";
import EditBook from "../admin/page/book/book_edit";
import AdminUsers from "../admin/page/user";
import EditUser from "../admin/page/user/edit";
import AdminBorrows from "../admin/page/borrow";
import Delivery from "../admin/page/borrow/delivery";
import Order from "../admin/page/borrow/order";
import ProfilePage from "../pages/profile";
import About from "../pages/about";

const router =createBrowserRouter([
    {
        path:"/",
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:"book",
                Component:Books
            },
            {
                path:"book/:id",
                Component:BookDetail
            },
            {
                path:"profile",
                Component:ProfilePage
            },
            {
                path:"about",
                Component:About
            },
            {
                path:"/*",
                Component:NotFound
            }
            
        ]
       
    },
    {
        path:"/login",
        Component:Login
        
    },
    {
        path:"/register",
        Component:Register
    },
    {
        path:"/admin",
        Component:AdminLayout,
        children:[
            {
                index:true,
                Component:AdminHome
            },
            {
                path:"book",
                Component:AdminBook
            },
            {
                path:"add-book",
                Component:AddBook
            },
            {
                path:"edit-book/:id",
                Component:EditBook
            },
            {
                path:"user",
                Component:AdminUsers
            },
            {
                path:"user-edit/:id",
                Component:EditUser
            },
            {
                path:"borrow",
                Component:AdminBorrows
            },
            {
                path:"borrow/:id",
                Component:Order
            },
            {
                path:"borrow-delivery/:id",
                Component:Delivery
            }
        ]
    }
])
export default router