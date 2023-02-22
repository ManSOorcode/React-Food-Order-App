import { useContext, useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import CartContext from "../../store/cart-context";

// const DUMMY_MEALS = [
//   {
//     id: "m1",

//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

// const context = useContext(CartContext);

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    // setIsLoading(false);
    const fetchTasks = async () => {
      const mealsResponse = await fetch(
        "https://mansoor-food-order-app-default-rtdb.firebaseio.com/meals.json"
      );

      if (!mealsResponse.ok) {
        throw new Error("Something Went Wrong take look in fetch!");
      }

      const mealsData = await mealsResponse.json();

      const dummyData = [];

      for (let key in mealsData) {
        dummyData.push({
          id: key,
          name: mealsData[key].name,
          description: mealsData[key].description,
          price: mealsData[key].price,
          amount: 0,
        });
      }
      // console.log(data.m2);
      // console.log(data.m1);

      // console.log(dummyData);
      // return context.reAddDummyMeal(dummyData);
      setMeals(dummyData);
      setIsLoading(false);
    };

    fetchTasks().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="centerd">
        <p>Loading Data...</p>
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="centerd">
        <p>{httpError}</p>
      </div>
    );
  }

  // const ctx = useContext(CartContext);
  const mealsList = meals.map((meal) => (
    // const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
