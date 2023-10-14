import { Employee } from "./model";
const url = 'https://api.1337co.de/v3/';

const getHeaders = (authorizationToken?: string) => new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36 PostmanRuntime/7.33.0',
    // 'Vary': 'Origin,Access-Control-Request-Method,Access-Control-Request-Headers',
    'Authorization': 'api-key 14:2023-10-13:sara.askeback@tretton37.com ad148c4ac45af8402620e5d1ac1d91746191b4849412f90a6dea749f2d42ab6f'
})


const APICall = async (url: string, method: "POST" | "GET" | "DELETE" | "PUT", headers: Headers, body?: BodyInit, success?: (response: any) => void, failure?: (err: any) => void) => fetch(url, {
    method,
    headers,
    body,
}).then(response => {
    if (response.ok) {
        if (method !== "DELETE") {
            const res_json = response.json();
            return res_json.then(response => {
                if (response) {
                    success && success(response);
                }
                return response;
            })
        } else {
            if (response) {
                success && success(response);
            }
        }
    } else {
        if (method !== "DELETE") {
            const res_json = response.json();
            res_json.then(err => {
                failure && failure(err);
                console.log(`💥 in APICall(${url}) `, err)
            });
        } else {
            //failure && failure(err);
        }
        return Promise.reject();
    }
})

export const getEmployees = async (): Promise<Array<Employee>> => APICall(url + "employees", 'GET', getHeaders(), undefined,
    (response => {
        return Array<Employee>(response)
    }), ((err) => {
        console.log('💥 in getEmployees() ', err);
        return []
    })
)
