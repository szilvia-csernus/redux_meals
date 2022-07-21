import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const AvailableMeals = (props) => {
    
    let mealsList = <h2>No meals found.</h2>

    if (props.meals.length > 0) {

        mealsList = props.meals.map((meal) =>
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}>

            </MealItem >
        )
    };

    let content = mealsList

    if (props.error) {
        
        content = <div className={classes.warning}>
            <p >Something went wrong!</p>
            <button className={classes.button} onClick={props.onFetch}>Try again</button>
        </div>;
    } else if (props.loading) {
        content = <p className={classes.loading}>Loading...</p>
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{content}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;