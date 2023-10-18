import { Employee } from "./model";
const url = 'https://api.1337co.de/v3/';

const getHeaders = (authorizationToken: string) => new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Authorization': authorizationToken
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

export const getEmployees = async (apiKey: string): Promise<Array<Employee>> => APICall(url + "employees", 'GET', getHeaders(apiKey), undefined,
    (response => {
        return Array<Employee>(response)
    }), ((err) => {
        console.log('💥 in getEmployees() ', err);
        return []
    })
)
