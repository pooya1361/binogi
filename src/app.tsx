import React, { ChangeEventHandler, useEffect, useState } from "react"
import "./app.scss"
import * as API from './api';
import { Employee } from "./model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Linkedin from "./icons/linkedin";
import Github from "./icons/github";
import Twitter from "./icons/twitter";
import { isNullOrUndefined } from "./util";
import { faBorderAll, faGrip, faList } from "@fortawesome/free-solid-svg-icons";


const noImageUrl = 'https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813'

type sortFilterType = "name" | "office"

const App = () => {
    const [employees, setEmployees] = useState<Array<Employee> | undefined>();
    const [sort, setSort] = useState<sortFilterType>("name");
    const [filterText, setFilterText] = useState<string>();
    const [filterBy, setFilterBy] = useState<sortFilterType>("name");
    const [gridList, setGridList] = useState<"grid" | "list">("list");



    useEffect(() => {
        API.getEmployees().then(data => setEmployees(data))
    }, [])

    useEffect(() => {
        if (employees) {
            const _employees = [...employees]
            setEmployees(_employees.sort((a, b) => String(a[sort]).toLowerCase() > String(b[sort]).toLowerCase() ? 1 : -1))
        }
    }, [sort])

    const openLink = (media: "linkedIn" | "gitHub" | "twitter", accountName: string) => {
        if (!isNullOrUndefined(accountName)) {
            switch (media) {
                case "linkedIn":
                    window.open("https://linkedin.com/" + accountName, "_blank")
                    break;

                case "gitHub":
                    window.open("https://github.com/" + accountName, "_blank")
                    break;

                case "twitter":
                    window.open("https://twitter.com/" + accountName, "_blank")
                    break;

                default:
                    break;
            }
        }
    }

    const sortEmployees = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value as sortFilterType)
    }

    const filterByHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterBy(event.target.value as sortFilterType)
    }

    const filterEmployees = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value)
    }

    const getFilteredEmployees = (): Employee[] | undefined => {
        if (filterText && filterText.length > 0) {
            return employees?.filter(employee => String(employee[filterBy!]).toLowerCase().includes(filterText.toLowerCase()))
        } else {
            return employees
        }
    }

    const toggleGridList = () => {
        setGridList(gridList === "grid" ? "list" : "grid")
    }

    return (
        <div className="employees_page">
            <h1>The fellowship of the tretton37</h1>
            {employees ?
                <div>
                    <div className="toolbar">
                        <button className="border rounded-md px-2 py-1 mr-2 bg-gray-100 w-8" onClick={toggleGridList}>
                            <FontAwesomeIcon icon={gridList === "grid" ? faGrip : faList} />
                        </button>
                        <div className="flex grow w-full">
                            <div className="flex grow gap-2">
                                <label htmlFor="filterInput" className="whitespace-nowrap text-right leading-8">Filter by:</label>
                                <select id="filterInput" name="sort"
                                    className="block rounded-md w-36 border border-gray-300 shadow-sm focus:ring-primary-200 focus:ring-opacity-50"
                                    onChange={filterByHandle}
                                >
                                    <option selected value={"name"}>Name</option>
                                    <option value={"office"}>Office</option>
                                </select>
                                <input className="flex grow w-full w-36 rounded-md border-gray-300 shadow-sm border focus:border-primary-200"
                                    type="text" value={filterText} onChange={filterEmployees} />
                                <span className="whitespace-nowrap leading-8 hidden md:block">{Number(filterText?.length) > 0 ? getFilteredEmployees()?.length + " employee(s) found" : undefined}</span>
                            </div>
                        </div>
                        <div className="flex align gap-2 justify-normal md:justify-end w-full">
                            <label htmlFor="employees_sort" className="whitespace-nowrap leading-8">Sort by:</label>
                            <select id="employees_sort" name="sort"
                                className="block w-36 rounded-md border border-gray-300 shadow-sm focus:ring-primary-200 focus:ring-opacity-50"
                                onChange={sortEmployees}
                            >
                                <option selected value={"name"}>Name</option>
                                <option value={"office"}>Office</option>
                            </select>
                        </div>
                    </div>
                    {gridList === "grid" ?
                        <div className="employees_grid">
                            {getFilteredEmployees()?.map((employee, i) =>
                                <div className="employees_grid_item" key={i}>
                                    <img src={employee.imagePortraitUrl ?? noImageUrl} alt="" className="block max-h-96 h-full object-cover" />
                                    <div className="flex">
                                        <div className="flex flex-col">
                                            <span>{employee.name}</span>
                                            <span>Office: {employee.office}</span>
                                        </div>
                                        <div className="flex flex-1 justify-end items-baseline gap-1">
                                            <Linkedin
                                                className={`w-6 ${!isNullOrUndefined(employee.linkedIn) ? "cursor-pointer" : ""}`}
                                                fill={isNullOrUndefined(employee.linkedIn) ? "gray" : "black"}
                                                disabled={isNullOrUndefined(employee.linkedIn)}
                                                onClick={() => openLink("linkedIn", employee.linkedIn)} />
                                            <Github
                                                className={`w-6 ${!isNullOrUndefined(employee.gitHub) ? "cursor-pointer" : ""}`}
                                                fill={isNullOrUndefined(employee.gitHub) ? "gray" : "black"}
                                                disabled={isNullOrUndefined(employee.gitHub)}
                                                onClick={() => openLink("gitHub", employee.gitHub)} />
                                            <Twitter
                                                className={`w-6 ${!isNullOrUndefined(employee.twitter) ? "cursor-pointer" : ""}`}
                                                fill={isNullOrUndefined(employee.twitter) ? "gray" : "black"}
                                                disabled={isNullOrUndefined(employee.twitter)}
                                                onClick={() => openLink("twitter", employee.twitter)} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        :
                        <div className="employees_list">
                            {getFilteredEmployees()?.map((employee, i) =>

                                <div className="employee_list_item">
                                    <img src={employee.imagePortraitUrl ?? noImageUrl} alt="" className="block max-w-20 w-20 h-full object-cover" />
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        <div className="flex flex-col gap-2">
                                            <span>{employee.name}</span>
                                            <span>Office: {employee.office}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span>Area: {employee.area}</span>
                                            <span>Role: {employee.primaryRole}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
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

