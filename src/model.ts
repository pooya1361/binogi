export interface Recipe {
  uri: string,
  label: string,
  image: string,
  images: {
    THUMBNAIL: {
      url: string,
      width: number,
      height: number
    },
    SMALL: {
      url: string,
      width: number,
      height: number
    },
    REGULAR: {
      url: string,
      width: number,
      height: number
    },
    LARGE: {
      url: string,
      width: number,
      height: number
    }
  },
  source: string,
  url: string,
  shareAs: string,
  yield: number,
  dietLabels: [
    string
  ],
  healthLabels: [
    string
  ],
  cautions: [
    string
  ],
  ingredientLines: [
    string
  ],
  ingredients: [
    {
      text: string,
      quantity: number,
      measure: string,
      food: string,
      weight: number,
      foodId: string
    }
  ],
  calories: number,
  glycemicIndex: number,
  inflammatoryIndex: number,
  totalCO2Emissions: number,
  co2EmissionsClass: string,
  totalWeight: number,
  cuisineType: [
    string
  ],
  mealType: [
    string
  ],
  dishType: [
    string
  ],
  instructions: [
    string
  ],
  tags: [
    string
  ],
  externalId: string,
  totalNutrients: {},
  totalDaily: {},
  digest: [
    {
      label: string,
      tag: string,
      schemaOrgTag: string,
      total: number,
      hasRDI: true,
      daily: number,
      unit: string,
      sub: {}
    }
  ]
}

export interface SearchResult {
  from: number,
  to: number,
  count: number,
  _links: {
    next: {
      href: string,
      title: string
    }
  },
  hits: Array<{
    recipe: Recipe,
  }>
}