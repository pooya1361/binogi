import { faGrip, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { gridListModeType } from "../app"
import { Employee } from "../model"
import "./toolbar.scss"

type ToolbarProps = {
    gridList: gridListModeType
    filterText?: string
    toggleGridList: (mode: gridListModeType) => void
    handleFilterBy: (event: React.ChangeEvent<HTMLSelectElement>) => void
    sortEmployees: (event: React.ChangeEvent<HTMLSelectElement>) => void
    filterEmployees: (event: React.ChangeEvent<HTMLInputElement>) => void
    employees?: Employee[]
}

const Toolbar = (props: ToolbarProps) => {

    return (
        <div className="toolbar">
            <div className="inline-flex space-x-0.5 rounded-lg border border-gray-300 shadow-sm">
                <button className={`rounded-md px-2 py-1 w-10 ${props.gridList === "grid" ? "bg-primary text-white rounded-tr-none rounded-br-none" : ""}`} onClick={() => props.toggleGridList("grid")}>
                    <FontAwesomeIcon icon={faGrip} />
                </button>
                <button className={`rounded-md px-2 py-1 w-10 ${props.gridList === "list" ? "bg-primary text-white rounded-tl-none rounded-bl-none" : ""}`} onClick={() => props.toggleGridList("list")}>
                    <FontAwesomeIcon icon={faList} />
                </button>
            </div>
            <div className="flex grow w-full">
                <div className="flex grow gap-2">
                    <label htmlFor="filterInput" className="whitespace-nowrap text-right leading-8">Filter by:</label>
                    <select id="filterInput" name="sort"
                        className="block rounded-md w-36 border border-gray-300 shadow-sm focus:ring-primary-200 focus:ring-opacity-50"
                        onChange={props.handleFilterBy}
                        defaultValue={"name"}
                    >
                        <option value={"name"}>Name</option>
                        <option value={"office"}>Office</option>
                    </select>
                    <input className="flex grow w-full w-36 rounded-md border-gray-300 shadow-sm border focus:border-primary-200"
                        type="text" value={props.filterText} onChange={props.filterEmployees} />
                    <span className="whitespace-nowrap leading-8 hidden md:block">{Number(props.filterText?.length) > 0 ? props.employees?.length + " employee(s) found" : undefined}</span>
                </div>
            </div>
            <div className="flex align gap-2 justify-normal md:justify-end w-full">
                <label htmlFor="employees_sort" className="whitespace-nowrap leading-8">Sort by:</label>
                <select id="employees_sort" name="sort"
                    className="block w-36 rounded-md border border-gray-300 shadow-sm focus:ring-primary-200 focus:ring-opacity-50"
                    onChange={props.sortEmployees}
                    defaultValue={"name"}
                >
                    <option value={"name"}>Name</option>
                    <option value={"office"}>Office</option>
                </select>
            </div>
        </div>
    )
}

export default Toolbar