import React, { useEffect, useState } from "react"
import "./app.scss"
import * as API from './api';
import { Employee } from "./model";
import Toolbar from "./components/toolbar";
import GridView from "./components/gridView";
import ListView from "./components/listView";

export type sortFilterType = "name" | "office"
export type gridListModeType = "grid" | "list"

const App = () => {
    const [employees, setEmployees] = useState<Array<Employee> | undefined>();
    const [sort, setSort] = useState<sortFilterType>("name");
    const [filterText, setFilterText] = useState<string>();
    const [filterBy, setFilterBy] = useState<sortFilterType>("name");
    const [gridList, setGridList] = useState<gridListModeType>("grid");

    useEffect(() => {
        API.getEmployees().then(data => setEmployees(data))
    }, [])

    useEffect(() => {
        if (employees) {
            const _employees = [...employees]
            setEmployees(_employees.sort((a, b) => String(a[sort]).toLowerCase() > String(b[sort]).toLowerCase() ? 1 : -1))
        }
    }, [sort])

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
            {employees ?
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
                        </p>
                    </div>
                )}
        </div>)
}

export default App

