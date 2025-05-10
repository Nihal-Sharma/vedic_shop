import {create} from "zustand";

import {Product} from '../components/api/FetchProduct'

export interface Eproduct extends Product{
    quantity : number;
}

interface Cart {
    cartProducts : Eproduct[]; 
    globalQuantity : number; 

    incGlobalQuantity : ()=> void;
    decGlobalQuantity : ()=> void;
    addToCart : (product : Product) => void;
    removeFromCart: (_id: string) => void;
    incProductQuantity : (_id : string) => void;
    decProductQuantity : (_id : string) => void;
    clearCart : ()=> void;
}

 const useCart = create<Cart>((set, get) => ({
    cartProducts: [],
    globalQuantity: 0,

    //Function to Increase the allover Cart Item Counts
    incGlobalQuantity: () => {
      set((state) => ({ globalQuantity: state.globalQuantity + 1 }));
    },

    //Function to Decrease the allover Cart Item Counts
    decGlobalQuantity: () => {
      set((state) => ({ globalQuantity: state.globalQuantity - 1 }));
    },

    //Function to Add a New Product to the Cart
    addToCart: (product) => {
      const finalProduct = { ...product, quantity: 1 };
      set((state) => ({
        cartProducts: [finalProduct , ...state.cartProducts],
      }));
    },

    //Function to remove a Product from the Cart (Accepts _id)
    removeFromCart: (_id) => {
        set((state) => ({
          cartProducts: state.cartProducts.filter((product) => product._id !== _id)
        }));
      },
    
    //Function to Increase the Quantity of a Product in the Cart (Accepts _id)
    incProductQuantity: (_id) => {
        set((state) => ({
          cartProducts: state.cartProducts.map((product) =>
            product._id === _id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        }));},
    
    //Function to decrease the Quantity of a Product in the Cart (Accepts _id)
    decProductQuantity: (_id) => {
        set((state) => ({
          cartProducts: state.cartProducts.map((product) =>
            product._id === _id
              ? { ...product, quantity: product.quantity - 1 }
              : product
          ),
        }));},
    
    //Function to clear the Cart
    clearCart : () => {set((state)=>({
        cartProducts : [],
        globalQuantity : 0
    }))}

  }));

  export default useCart;       