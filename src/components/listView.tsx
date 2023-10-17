import React from "react"
import { Employee } from "../model"
import { noImageUrl } from "../util"
type ListViewProps = {
    employees?: Employee[]
}

const ListView = (props: ListViewProps) => {
    return (
        <div className="employees_list">
            {props.employees?.map((employee, i) =>

                <div className="employee_list_item">
                    <img src={employee.imagePortraitUrl ?? noImageUrl} alt="" className="block max-w-20 w-20 h-full object-cover" />
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <div className="flex flex-col gap-2">
                            <span className="font-bold">{employee.name}</span>
                            <span><b className="font-semibold">Office:</b> {employee.office}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span><b className="font-semibold">Area:</b> {employee.area}</span>
                            <span><b className="font-semibold">Role:</b> {employee.primaryRole}</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ListView