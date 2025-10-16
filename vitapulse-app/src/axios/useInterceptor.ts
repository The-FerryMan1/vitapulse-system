import { useAxios } from "./useAxios";

let refresh = false;
useAxios.interceptors.response.use((res)=>res, async(error)=>{
    if(error.response.status === 401 && !refresh){
        refresh = true;
        const { status, data } = await useAxios.post('refresh', {}, {
            withCredentials: true
        });

        if(status === 200){
            return useAxios(error.config);
        };
    };
    refresh = false;
    return error;
});