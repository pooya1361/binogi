import React from "react"
import Github from "../icons/github"
import Linkedin from "../icons/linkedin"
import Twitter from "../icons/twitter"
import { Employee } from "../model"
import { isNullOrUndefined, noImageUrl, openLink } from "../util"
type GridViewProps = {
    employees?: Employee[]
}

const GridView = (props: GridViewProps) => {
    return (
        <div className="employees_grid">
        {props.employees?.map((employee, i) =>
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
    )
}

export default GridView