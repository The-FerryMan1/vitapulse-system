import { useAxios } from "@/axios/useAxios";
import {defineStore} from "pinia";
import { ref } from "vue";

interface User {
    id: number,
    role: string,
    email: string,
    age: number,
    isVerified: boolean
}
export const useUserStore = defineStore('user',()=>{
    const auth = ref<User |null>(null);
    const isVerified = ref<boolean>(false);

    const getUser = async()=>{
        try {
            const { data } = await useAxios.get('/auth/user', {
                withCredentials: true
            })
            console.log(data)
            return data;
        } catch (error) {
            console.error('User not authenticated', error);
            return null;
        }
    };

    const verify = async () => {
        if(isVerified.value) return;
        try {
            const { status, data } = await useAxios.get('/verify', {
                withCredentials: true
            })
            if (status === 401) throw new Error('unauthorized');
            isVerified.value = true
            auth.value = data
            
            return isVerified.value
        } catch (error) {
            isVerified.value = false
            auth.value = null;
            
            console.error('User not authenticated', error);
            return isVerified.value;
        }
    };
    const refresh = async () => {
        if(isVerified.value) return;
        try {
            const { status, data } = await useAxios.get('/refresh', {
                withCredentials: true
            })
            if(status === 401) throw new Error('Unauthoruzed');
            isVerified.value = true
            auth.value = data
            
            return isVerified.value
        } catch (error) {
            isVerified.value = false
            auth.value = null;
            
            console.error('User not authenticated', error);
            return isVerified.value;
        }
    };

    const userLogout = async() =>{
        try {
            const {status, data} = await useAxios.post('/auth/logout', {}, {
                withCredentials: true
            })
            isVerified.value = false
            auth.value = null;
            return null
        } catch (error) {
            console.log(error);
            return null
        }
    };

    const sendVerificationCode = async(email: string)=>{
        if(!email) throw new Error('Email is required')
        try {
            const { data} = await useAxios.post('/email-verification', {email}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return
        } catch (error) {
            console.log(error);
            return null
        }
    };

    const verifyToken = async(token:string |string[])=>{
        if(!token) throw new Error('token is required')
        try {
            const { data, status} = await useAxios.get(`/email-verification/${token}`)

            if (status !== 200) throw new Error('token is required')

            return true
        } catch (error) {
            console.log(error);
            return false
        }
    };

    const sendResetCode = async (email: string) => {
        if (!email) throw new Error('Email is required')
        try {
            const { data } = await useAxios.post('/password-reset', { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return
        } catch (error) {
            console.log(error);
            return null
        }
    };

    const activiyLogs = async(activity: string)=>{
        try {
            await useAxios.post('/auth/user/logs', { activity }, {
                headers: {
                    'Content-Type':'application/json'
                }
            })
            return
        } catch (error) {
            console.log(error)
            return
        }
    };

    const getActivityLogs  = async()=>{
        try {
           const {data} = await useAxios.get('/auth/user/logs')
            return data
        } catch (error) {
            console.log(error)
            return
        }
    };

    return {
        sendResetCode,
        getActivityLogs,
        activiyLogs,
        isVerified,
        verifyToken,
        auth,
        verify,
        userLogout,
        getUser,
        sendVerificationCode,
        refresh
    };
});