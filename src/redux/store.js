import { configureStore } from "@reduxjs/toolkit";
import userAuthentication from "./userAuthentication";
import sellerAuthentication from "./sellerAuthentication";

import themeSlice from "./themeSlice.js";








const store=configureStore({
    reducer:{
        auth:userAuthentication,
        sellerAuth:sellerAuthentication,
      
        theme: themeSlice,
       

      
      
       

    }
});
export default store;