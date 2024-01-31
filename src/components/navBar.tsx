import React, { useEffect, useState } from "react"
import { Recipe } from "../model"
import { Button, Popover } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

type NavBarProps = {
    from?: number,
    to?: number,
    total?: number,
    bookmarkedRecipes?: Array<Recipe>
    handleNextPage: () => void
    removeBookmark?: (bookmarkedRecipe: Recipe) => void
}

export const NavBar = (props: NavBarProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClickBookmarks = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    return (
        <div className="flex justify-between items-center ">
            <span>{props.from} - {props.to} ({props.total})</span>

            <div className="flex gap-2">
                {props.bookmarkedRecipes && props.bookmarkedRecipes.length > 0 ?
                    <>
                        <Button className="bg-white" variant="outlined" onClick={handleClickBookmarks}>
                            Bookmarks ({props.bookmarkedRecipes.length})
                        </Button>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            {props.bookmarkedRecipes?.map(bmr =>
                                <div className="flex items-center justify-between gap-4 p-2 px-3 border-b hover:bg-gray-100">
                                    <div className="flex items-center gap-2">
                                        <img className="w-9" src={bmr.images.SMALL.url} alt="" />
                                        <span>{bmr.label}</span>
                                    </div>
                                    <FontAwesomeIcon className="cursor-pointer" icon={faTrash} onClick={() => props.removeBookmark!(bmr)} />
                                </div>
                            )}
                        </Popover>
                    </>
                    : undefined}

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={props.handleNextPage}>Next page</button>
            </div>
        </div >
    )
}