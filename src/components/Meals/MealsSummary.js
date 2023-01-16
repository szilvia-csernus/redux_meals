import classes from './MealsSummary.module.css';

const MealsSummary = () => {
    return (
			<section className={classes.summary}>
				<h2>Your Dinner... &nbsp;&nbsp;&nbsp;Delivered.</h2>
				<p>
					select your favorite meals and enjoy a delicious dinner at home
				</p>
			</section>
		);
};

export default MealsSummary;