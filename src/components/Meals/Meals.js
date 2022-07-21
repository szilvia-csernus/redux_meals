import { useEffect, useState } from 'react';
import useHttp from '../../hooks/useHttp';
import AvailableMeals from "./AvailableMeals"
import MealsSummary from "./MealsSummary"

const Meals = () => {
    const [meals, setMeals] = useState([]);

    const { isLoading, error, sendRequest } = useHttp();

    useEffect(() => {
        const apply = data => {
            const loadedMeals = [];

            for (const mealKey in data) {
                loadedMeals.push(
                    {
                        id: mealKey,
                        name: data[mealKey].name,
                        description: data[mealKey].description,
                        price: data[mealKey].price
                    })
            }
            setMeals(loadedMeals)
        }

        const configData = {
            url: 'https://food-order-app-b8109-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
        }

        sendRequest(configData, apply);

    }, [sendRequest])
    
    
    return (
    <>
        <MealsSummary />
        <AvailableMeals 
            meals={meals}
            loading={isLoading}
            error={error}
            onFetch={sendRequest}
        />
    </>
    )
}

export default Meals

