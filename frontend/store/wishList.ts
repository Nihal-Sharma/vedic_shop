import {create} from "zustand";

import {Product} from '../components/api/FetchProduct'

interface wishlist{
    wishlist: Product[],
    addToWishlist : (product : Product) =>void
    removeFromWishlist : (_id : string) =>void
}

const useWishlist = create<wishlist>((set,get)=>({
    wishlist : [],
    addToWishlist : (product) =>{
        set((state) =>({
            wishlist : [product , ...state.wishlist]
        }))
    },
    removeFromWishlist : (_id) =>{
        set((state) => ({
          wishlist: state.wishlist.filter((product) => product._id !== _id)
        }));
    }
}))

 export default useWishlist;  