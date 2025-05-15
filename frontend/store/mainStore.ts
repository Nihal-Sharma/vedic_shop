import {create} from 'zustand';
import {EcomProductProps} from '../components/HomeComponent/EcommProduct'
const urls = {
    // ... your urls here
    nihal : "http://192.168.29.36:5001",
    nirmanyu : "http://192.168.0.108:5001"
}


interface store{
    baseURL : string;
    allProducts : EcomProductProps[]
    addProducts :(products : EcomProductProps[]) => void
    getProducts : (allProducts : EcomProductProps[]) => void
}

<<<<<<< HEAD
 const mainStore = create<store>((state)=>({
    baseURL : urls.nirmanyu,
=======
 const mainStore = create<store>((set, get)=>({
    baseURL : urls.nirmanyu,
    allProducts : [],
    addProducts : (products : EcomProductProps[]) =>{set((state)=>({
        allProducts : products
    })); },
    getProducts : (allProducts) =>{console.log("From Store :" ,  allProducts)}
>>>>>>> cca703f61c506635092b7406af46f93866e506fe
}))

export default mainStore;