import {create} from "zustand";

import {Product} from '../components/api/FetchProduct'

interface wishlist{
    wishlist: Product[],
    addToWishlist : (product : Product) =>void,
    removeFromWishlist : (_id : string) =>void,
    wishlistCount : number
}

const useWishlist = create<wishlist>((set,get)=>({
    wishlist : [],
    wishlistCount :0,
    addToWishlist : (product) =>{
        set((state) =>({
            wishlist : [product , ...state.wishlist],
            wishlistCount : state.wishlistCount + 1
        }))
    },
    removeFromWishlist : (_id) =>{
        set((state) => ({
          wishlist: state.wishlist.filter((product) => product._id !== _id),
          wishlistCount : state.wishlistCount - 1
        }));
    }
}))

 export default useWishlist;  