import axios from "axios";
import { Auth } from "./Auth";

export class Http {

    static async request(url: string = import.meta.env.VITE_API_HOST, method:string = 'GET', options: any = {}, header:any = false) {
        
        var params = Object();

        var token = localStorage.getItem("TOKEN") ? localStorage.getItem("TOKEN") : null;

        params = {
            url: url,
            method: method == 'UPLOAD' ? 'POST' : method,
            withCredentials: false,
            crossDomain: true,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        if (method == 'GET') url += '?' + Object.entries(options).map(([key, val]) => `${key}=${val}`).join('&');
        else if(method == 'UPLOAD') params.data = options
        else params.data = JSON.stringify(options);

        var response = null;
        try {response = await axios.request(params)} catch(error) {
            console.error("By Developer",error);
            if(error.response.status == 401) Auth.Logout(false);
            return {result:[]};
        }
        
        return response.data;
        
    }

    static get = async (route:string='',opts:any = {})=> await this.request(import.meta.env.VITE_API_HOST + `${route}`, 'GET', opts);
    static post = async (route:string='',opts:any = {})=> await this.request(import.meta.env.VITE_API_HOST + `${route}`, 'POST', opts);
    static put = async (route:string='',opts:any = {})=> await this.request(import.meta.env.VITE_API_HOST + `${route}`, 'POST', opts);
    static delete = async (route:string='',opts:any = {})=> await this.request(import.meta.env.VITE_API_HOST + `${route}`, 'POST', opts);
    
    static create = async (route:string='',opts:any = {})=> await this.request(import.meta.env.VITE_API_HOST + `${route}/Create`, 'POST', opts);
    static show = async (route:string='', e:string, opts:any = {})=> await this.request(import.meta.env.VITE_API_HOST + `${route}/Show/${e}`, 'GET', opts);
    static update = async (route:string='', e:string,opts:any = {})=> await this.request(import.meta.env.VITE_API_HOST + `${route}/Update/${e}`, 'POST', opts);
    static remove = async (route:string='', e:string,opts:any = {})=> await this.request(import.meta.env.VITE_API_HOST + `${route}/Delete/${e}`, 'POST', opts);

    static fileUpload = async (file, route = 'Upload') => {
        const formData = new FormData();
        formData.append('file',file);
        var response = null;
        
        try {
            response = await axios.post(
                import.meta.env.VITE_API_HOST + route,
                formData,// @ts-ignore
                {'content-type': 'application/octet-stream'}
            )
        } catch(error) {
            console.error("By Developer",error);
            return {result:[]};
        }

        return response;
    }
}