import {create} from 'zustand';

const urls = {
    // ... your urls here
    nihal : "http://192.168.29.36:5001",
    nirmanyu : "http://192.168.0.111:5001"
}


interface store{
    baseURL : string;    
}

 const mainStore = create<store>((state)=>({
    baseURL : urls.nirmanyu,
}))

export default mainStore;