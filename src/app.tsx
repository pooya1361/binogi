import React, { useEffect, useState } from "react"
import "./app.scss"
import * as API from './api';
import { Employee } from "./model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Linkedin from "./icons/linkedin";
import Github from "./icons/github";
import Twitter from "./icons/twitter";
import { isNullOrUndefined } from "./util";


const noImageUrl = 'https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813'

const App = () => {
    const [employees, setEmployees] = useState<Array<Employee> | undefined>();

    useEffect(() => {
        API.getEmployees().then(data => setEmployees(data))
    }, [])

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

    return (
        <div className="employees_page">
            <h1>The fellowship of the tretton37</h1>
            {employees ?
                <div>
                    <div className="toolbar">
                        Tools go here ...
                    </div>
                    <div className="employees_list">
                        {employees?.map((employee, i) =>
                            <div className="employees_item" key={i}>
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

