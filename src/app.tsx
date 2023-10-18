import React, { useEffect, useState } from "react"
import "./app.scss"
import * as API from './api';
import { Employee } from "./model";
import Toolbar from "./components/toolbar";
import GridView from "./components/gridView";
import ListView from "./components/listView";
import { faSpinner, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type sortFilterType = "name" | "office"
export type gridListModeType = "grid" | "list"

const App = () => {
    const [employees, setEmployees] = useState<Array<Employee> | undefined>();
    const [sort, setSort] = useState<sortFilterType>("name");
    const [filterText, setFilterText] = useState<string>();
    const [filterBy, setFilterBy] = useState<sortFilterType>("name");
    const [gridList, setGridList] = useState<gridListModeType>("grid");
    const [apiKey, setApiKey] = useState<string>();
    const [apiKeyProvided, setApiKeyProvided] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Read API key from URL
        const queryParameters = new URLSearchParams(window.location.search)
        const _apiKey = queryParameters.get("apikey")
        if (_apiKey) {
            setApiKeyProvided(true)
            setApiKey(_apiKey)
        }
    }, [])

    useEffect(() => {
        if (apiKey) {
            loadEmployees()
        }
    }, [apiKeyProvided])

    useEffect(() => {
        if (employees) {
            const _employees = [...employees]
            setEmployees(_employees.sort((a, b) => String(a[sort]).toLowerCase() > String(b[sort]).toLowerCase() ? 1 : -1))
        }
    }, [sort])

    const loadEmployees = () => {
        console.log("🚀 ~ file: app.tsx:49 ~ API.getEmployees ~ apiKey:", apiKey)
        setLoading(true)
        API.getEmployees(apiKey!).then(data => setEmployees(data)).catch(err => {
            console.log("🚀 ~ file: app.tsx:27 ~ API.getEmployees ~ err:", err)
        }).finally(() => setLoading(false))
    }

    const sortEmployees = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value as sortFilterType)
    }

    const handleFilterBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterBy(event.target.value as sortFilterType)
    }

    const filterEmployees = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value)
    }

    const getFilteredEmployees = (): Employee[] | undefined => {
        if (filterText && filterText.length > 0) {
            return employees?.filter(employee =>
                String(employee[filterBy!]).toLowerCase().includes(filterText.toLowerCase())
            )
        } else {
            return employees
        }
    }

    const toggleGridList = (mode: gridListModeType) => {
        setGridList(mode)
    }

    return (
        <div className="employees_page">
            <h1>The fellowship of the tretton37</h1>
            {loading ?
                <span className="flex gap-2 mx-auto py-4">Loading <FontAwesomeIcon className="animate-spin" icon={faSpinner} /></span>
                :
                apiKeyProvided ?
                    (
                        employees ?
                            <div>
                                <Toolbar
                                    gridList={gridList}
                                    filterText={filterText}
                                    toggleGridList={toggleGridList}
                                    handleFilterBy={handleFilterBy}
                                    sortEmployees={sortEmployees}
                                    filterEmployees={filterEmployees}
                                    employees={getFilteredEmployees()}
                                />
                                {gridList === "grid" ?
                                    <GridView
                                        employees={getFilteredEmployees()}
                                    />
                                    :
                                    <ListView
                                        employees={getFilteredEmployees()}
                                    />
                                }
                            </div>
                            : (
                                <div className="flex flex-1 min-h-full min-w-full ">
                                    <p className="flex flex-col m-auto text-center text-lg font-semibold">
                                        <span>Oops! something went wrong ...</span>
                                        <span>Please contact <a className="font-bold underline text-primary" href="https://github.com/pooya1361">Pouya</a></span>
                                        <span>He knows how to fix it 😉</span>
                                        <span className="mt-4">Or set the api-key again</span>
                                        <input title="Submit" type="button" value="API key"
                                            className="mx-auto rounded-lg border border-blue-500 bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-blue-700"
                                            onClick={() => setApiKeyProvided(false)}
                                        />
                                    </p>
                                </div>
                            ))
                    :
                    <div>
                        <p className="flex flex-col gap-2">
                            <span><FontAwesomeIcon icon={faTriangleExclamation} /> Error: api-key not found</span>
                            Please add the api-key in the URL as shown below:
                            <span className="bg-gray-300 px-6 py-4 rounded-lg mr-auto">url.com<b>/?apikey=bla bla bla</b></span>
                            or enter it here:
                            <input className="p-2" autoFocus type="text" value={apiKey} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setApiKey(event.target.value)} />
                            <input title="Submit" type="button" value="Submit"
                                className="mr-auto rounded-lg border border-blue-500 bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-blue-700"
                                onClick={() => setApiKeyProvided(true)}
                            />
                        </p>
                    </div>
            }

        </div>)
}

export default App

