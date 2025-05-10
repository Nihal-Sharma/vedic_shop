import {create} from 'zustand';

const urls = {
    // ... your urls here
    nihal : "http://192.168.29.171:5001",
    nirmanyu : "http://192.168.234.161:5001"
}


interface store{
    baseURL : string;    
}

 const mainStore = create<store>((state)=>({
    baseURL : urls.nirmanyu,
}))

export default mainStore;