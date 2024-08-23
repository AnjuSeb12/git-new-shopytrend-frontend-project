import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import HomeLayout from './Layouts/HomeLayout.jsx';
import AdminLayout from './Layouts/AdminLayout.jsx';
import SellerLayout from './Layouts/SellerLayout.jsx';
import UserSignupPage from './Pages/User/UserSignupPage.jsx';
import UserSignInPage from './Pages/User/UserSignInPage.jsx';
import SellerSignupPage from './Pages/Seller/SellerSignupPage.jsx';
import SellerSigninPage from './Pages/Seller/SellerSigninPage.jsx';
import UserDashboard from './Components/User/UserDashboard.jsx';
import SellerDashboard from './Components/Seller/SellerDashboard.jsx';
import ProductsAddPage from './Pages/Seller/ProductsAddPage.jsx';
import DisplayProducts from './Components/User/DisplayProducts.jsx';
import { ChakraProvider } from '@chakra-ui/react'
import ProductsViewPage from './Pages/Seller/ProductsViewPage.jsx';
import AdminDashboard from './Components/Admin/AdminDashboard.jsx';
import UsersView from './Components/Admin/UsersView.jsx';
import SellerView from './Components/Admin/SellerView.jsx';
import SellerItemView from './Components/Admin/SellerItemView.jsx';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import CartAdding from './Components/User/CartAdding.jsx';
import AddCart from './Components/User/AddCart.jsx';

import SearchResult from './Components/User/SearchResult.jsx';
import ProductDetail from './Components/User/ProductDetail.jsx';
import OrderForm from './Components/User/OrderForm.jsx';
import OrderSuccess from './Components/User/OrderSuccess.jsx';
import OrderCartForm from './Components/User/OrderCartForm.jsx';
import OrderView from './Components/User/OrderView.jsx';
import AdminOrdersView from './Components/Admin/AdminOrdersView.jsx';


import NotFoundPage from './Components/Admin/NotFoundPage.jsx';







const router = createBrowserRouter([
  {

    element: <HomeLayout />,
    children:
      [

        {
          path: "/",
          element: <UserDashboard />
        },
        {
          path: "/user/signup",
          element: <UserSignupPage />,
        },
        {
          path: "/user/signin",
          element: <UserSignInPage />
        },
        {
          path: "/user/cart",
          element:<CartAdding />

        },
        {
          path: "/user/addcart",
          element:<AddCart />

        },
        {
          path: "/search",
          element: <SearchResult />
        },
        {
          path: "/product/:id",
          element: <ProductDetail />
        },
        {
          path: "/order-form",
          element:<OrderForm />

          
         
        },

        {
          path: "/order-success",
          element: <OrderSuccess />
        },
        {
          path: "/order-cart-form",
          element: <OrderCartForm />
        },
        {
          path: "/user/orders",
          element: <OrderView />
        },
        {
          path:"/user/displayproduct",
          element: <DisplayProducts/>
        }




      ],
  },
  {
    
    element: <SellerLayout />,
  
   
    
    children: [
      {
        path: "/sellerdashboard",
        element: <SellerDashboard />

      },
      {
        path: "/seller/signup",
        element: <SellerSignupPage />
      },
      {
        path: "/seller/login",
        element: <SellerSigninPage />
      },
      {
        path: "/seller/productsadd",
        element: <ProductsAddPage />
      },
      {
        path: "/seller/productsview",
        element: <ProductsViewPage />

         
        
        
       
      },
    ]
  },
  {
    element: <AdminLayout />,

   
      
    
    children: [
      {
        path: "/admin/admindashboard",
        element: <AdminDashboard />
      },
      {
        path: "/admin/userview",
        element: <UsersView />
      },
      {
        path: "/admin/sellerview",
        element: <SellerView />
      },
      {
        path: "/admin/selleritemview",
        element: <SellerItemView />
      },{
        path:"/admin/orderview",
        element:<AdminOrdersView/>
      }
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />
  }



]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={router} />

      </ChakraProvider>


    </React.StrictMode>

  </Provider>

)
