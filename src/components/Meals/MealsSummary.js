import { useContext } from "react";

import classes from "./MealsSummary.module.css";
import CartContext from "../../store/cart-context";

const MealsSummary = () => {
  const context = useContext(CartContext);
  const fetchTasks = async () => {
    const meals = await fetch(
      "https://food-order-app-1cb35-default-rtdb.firebaseio.com/meals.json"
    );
    const data = await meals.json();

    const dummyData = [];

    for (let key in data) {
      dummyData.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    console.log(data.m2);
    console.log(data.m1);

    console.log(dummyData);
    return context.reAddDummyMeal(dummyData);
  };
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>

      <button onClick={fetchTasks}>click</button>
    </section>
  );
};

export default MealsSummary;
