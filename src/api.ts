import { Recipe as Recipe, SearchResult } from "./model";
const url = 'https://api.edamam.com/api/recipes/v2?app_id=df53c267&app_key=bd80595496a524a833554462aa41a04c&type=public';

const getHeaders = () => new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
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

export const searchRecipe = async (query: string): Promise<SearchResult> => APICall(url + "&q=" + query, 'GET', getHeaders(), undefined,
    ((response: SearchResult) => {
        return response
    }), ((err) => {
        console.log('💥 in searchRecipe() ', err);
        return []
    })
)

export const fetchNextPage = async (url: string): Promise<SearchResult> => APICall(url, 'GET', getHeaders(), undefined,
    ((response: SearchResult) => {
        console.log("🚀 ~ response:", response)
        return response
    }), ((err) => {
        console.log('💥 in fetchNextPage() ', err);
        return []
    })
)
