export interface Restaurant{
    id:string
    name:string
    category:string
    deliveryEstimate:string
    rating:number
    imagePath:string
}

export class RestaurantInstance{

    static GetEmptyRestaurant(): Restaurant{
        return {
            id: "",
            name: "",
            rating: 0,
            category: "",
            deliveryEstimate: "",
            imagePath: ""
        }
    }

} 