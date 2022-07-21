import classes from './MealsSummary.module.css';

const MealsSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>Delicious Food... Delivered.</h2>
            <p>
                Choose your favorite meal from our selection
                and enjoy a delicious dinner at home.
            </p>
            <p>
                All meals are prepared with fresh &amp; high-quality ingredients 
                by the best chefs in town!
            </p>
        </section>
    );
};

export default MealsSummary;