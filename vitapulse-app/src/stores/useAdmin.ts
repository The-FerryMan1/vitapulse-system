import { useAxios } from '@/axios/useAxios';
import {defineStore} from 'pinia';


export const useAdminStore = defineStore('admin', ()=>{

    const getAllUser = async()=>{
        try{
            const {data, status}= await useAxios.get('/auth/admin/users');
            if(status !== 200) throw new Error(data);

            return data
        }catch(error){
            console.log(error)
        }
    }

    const getReadings = async()=>{
        try {
            const { data, status } = await useAxios.get('/auth/admin/readings');
            if (status !== 200) throw new Error(data);

            return data
        } catch (error) {
            console.log(error)
        }
    }
    const countAbnor = async()=>{
        try {
            const { data, status } = await useAxios.get('/auth/admin/readings/countBpStat');
            if (status !== 200) throw new Error(data);

            return data
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getAllUser,
        countAbnor,
        getReadings
    }
});