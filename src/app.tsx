import React, { useEffect, useState } from "react"
import "./app.scss"
import * as API from './api';
import { Recipe, SearchResult } from "./model";
import { NavBar } from "./components/navBar";



const App = () => {
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const [bookmarkedRecipes, setBookmarkedRecipes] = useState<Array<Recipe>>([]);
    const [searchInfo, setSearchInfo] = useState<SearchResult>();
    const [searchText, setSearchText] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();

    const search = () => {
        if (searchText.length > 2) {
            API.searchRecipe(searchText).then(data => setData(data))
        }
    }

    const handleNextPage = () => {
        API.fetchNextPage(searchInfo?._links.next.href!).then(data => setData(data))
    }

    const setData = (data: SearchResult) => {
        setSearchInfo(data)
        setRecipes(data.hits.map(recipe => recipe.recipe))
    }

    const toggleDetailsModal = () => {
        setSelectedRecipe(undefined)
    }

    const handleRecipeClicked = (recipe: Recipe) => {
        setSelectedRecipe(recipe)
    }

    const toggleBookmark = (recipe: Recipe) => {
        const index = bookmarkedRecipes.findIndex(bmr => bmr.url === recipe.url)
        const _bookmarkedRecipes = [...bookmarkedRecipes]
        if (index > -1) {
            _bookmarkedRecipes.splice(index, 1)
        } else {
            _bookmarkedRecipes.push(recipe)
        }
        setBookmarkedRecipes(_bookmarkedRecipes)
    }

    const isBookmarked = (recipe: Recipe) => bookmarkedRecipes.findIndex(bmr => bmr.url === recipe.url) > -1

    // useEffect(() => search(), [])

    // useEffect(() => setSelectedRecipe(recipes[0]), [recipes])

    const getNutrients = (sr: Recipe): Array<{
        label: string,
        quantity: number,
        unit: string
    }> => Object.values(sr.totalNutrients)


    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    className="rounded w-full"
                    value={searchText}
                    placeholder="Type to search ..."
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" ? search() : undefined}
                />
                <button className="flex gap-2 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 text-white disabled:text-gray-500 font-bold py-2 px-4 rounded inline-flex items-center" onClick={search} disabled={searchText.length < 4}>
                    <span>Search</span>
                    <svg fill="#FFF" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" data-darkreader-inline-fill=""><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M168.178,343.823c-9.561-9.561-18.078-19.779-25.552-30.507L0,455.94l56.06,56.059l142.605-142.605 C187.88,361.856,177.675,353.32,168.178,343.823z"></path> </g> </g> <g> <g> <path d="M457.818,54.181c-72.242-72.241-189.368-72.241-261.61,0c-72.241,72.242-72.241,189.368,0,261.61 c72.242,72.242,189.368,72.241,261.61,0S530.06,126.424,457.818,54.181z M387.743,124.256 C371.523,108.035,349.955,99.1,327.012,99.1c-22.94,0-44.509,8.934-60.731,25.156l-28.029-28.029 c23.71-23.709,55.232-36.766,88.76-36.766c33.53,0,65.052,13.057,88.76,36.766L387.743,124.256z"></path> </g> </g> </g></svg>
                </button>
            </div>

            {recipes.length > 0 ?
                <>
                    <NavBar
                        from={searchInfo?.from}
                        to={searchInfo?.to}
                        total={searchInfo?.count}
                        bookmarkedRecipes={bookmarkedRecipes}
                        handleNextPage={handleNextPage}
                        removeBookmark={toggleBookmark}
                    />

                    <div className="grid grid-cols-4 gap-6">
                        {recipes?.map((recipe, i) =>
                            <div key={i} className="flex flex-col gap-2 p-4 bg-gray-50 rounded-md hover:scale-[1.025] transition-all hover:shadow-lg cursor-pointer relative"
                                onClick={() => handleRecipeClicked(recipe)}>
                                <img src={recipe.image} alt="" />
                                <h3>{recipe.label}</h3>
                                <div>
                                    <span>{Math.round(recipe.calories / recipe.yield)} kcal</span> <span>({recipe.yield} servings)</span>
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="mb-2">Health labels:</span>
                                    <div className="flex flex-wrap gap-1">
                                        {recipe.healthLabels.map((hl, i) => <span key={i} className="label">{hl}</span>)}
                                    </div>
                                </div>
                                {recipe.dietLabels.length > 0 ?
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="mb-2">Diet labels:</span>
                                        <div className="flex flex-wrap gap-2">
                                            {recipe.dietLabels.map((dl, i) => <span key={i} className="label">{dl}</span>)}
                                        </div>
                                    </div> : undefined}

                                <svg className="absolute -top-1 right-4" fill="#3182CE" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.045 212.045" onClick={(e) => { e.stopPropagation(); toggleBookmark(recipe) }}>
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier" style={{
                                        fill: isBookmarked(recipe) ? "#3B82F6" : "#EBF8FF",
                                        stroke: "black"
                                    }}>
                                        <path d="M167.871,0H44.84C34.82,0,26.022,8.243,26.022,18v182c0,3.266,0.909,5.988,2.374,8.091c1.752,2.514,4.573,3.955,7.598,3.954 c2.86,0,5.905-1.273,8.717-3.675l55.044-46.735c1.7-1.452,4.142-2.284,6.681-2.284c2.538,0,4.975,0.832,6.68,2.288l54.86,46.724 c2.822,2.409,5.657,3.683,8.512,3.683c4.828,0,9.534-3.724,9.534-12.045V18C186.022,8.243,177.891,0,167.871,0z"></path>
                                    </g>
                                </svg>
                            </div>
                        )}
                    </div>

                    <NavBar
                        from={searchInfo?.from}
                        to={searchInfo?.to}
                        total={searchInfo?.count}
                        handleNextPage={handleNextPage}
                    />
                </>
                :
                <div>
                    <p>No recipe found!</p>
                </div>
            }

            {selectedRecipe ?
                <>
                    <div className="fixed inset-0 z-10 bg-gray-500 opacity-70"></div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                        <div className="mx-auto overflow-hidden rounded-lg bg-white shadow-xl">
                            <div className="relative p-6 w-[60vw]">
                                <button type="button" onClick={toggleDetailsModal} className="absolute top-4 right-4 rounded-lg p-1 text-center font-medium text-secondary-500 transition-all hover:bg-secondary-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                    </svg>
                                </button>
                                <h3 className="text-lg font-medium text-secondary-900 mb-3">Recipe details</h3>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="leftPanel h-[60vh]">
                                        <img
                                            className="h-full object-cover"
                                            src={selectedRecipe.images.LARGE?.url || selectedRecipe.images.REGULAR?.url} alt="" />
                                    </div>
                                    <div className="rightPanel flex flex-col gap-4 overflow-auto max-h-[60vh]">
                                        <h3>{selectedRecipe?.label}</h3>
                                        <div className="flex flex-col">
                                            <span>Ingredients</span>
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {selectedRecipe.ingredients.map(ingr =>
                                                    <>
                                                        <span className="text-right">{ingr.quantity} {ingr.measure}</span><span>{ingr.food}</span>
                                                    </>)
                                                }
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span>Nutrients</span>
                                            <div className="grid grid-cols-2">
                                                {getNutrients(selectedRecipe).map((nut) => { return <span className="text-xs">{nut.label}: {Math.round(nut.quantity)} {nut.unit} </span> })}
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span>Digest</span>
                                            <div className="grid grid-cols-2">
                                                {selectedRecipe.digest.map(digest => <span className="text-xs">{digest.label}: {Math.round(digest.total)} {digest.unit} </span>)}
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="mb-2">Health labels:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {selectedRecipe.healthLabels.map((hl, i) => <span key={i} className="label">{hl}</span>)}
                                            </div>
                                        </div>
                                        {selectedRecipe.dietLabels.length > 0 ?
                                            <div className="flex flex-col">
                                                <span className="mb-2">Diet labels:</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedRecipe.dietLabels.map((dl, i) => <span key={i} className="label">{dl}</span>)}
                                                </div>
                                            </div> : undefined}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : undefined}

        </div >
    )
}

export default App

