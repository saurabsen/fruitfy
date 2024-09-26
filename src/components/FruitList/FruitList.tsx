import React, { useState } from "react";
import { FruitImage } from "utils/FruitImage";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { getRandomColor, groupBy } from "utils/helper";
import { Fruit, FruitListProps } from "interface/Fruits";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ChartJS.register(ArcElement, Tooltip, Legend);

const FruitList: React.FC<FruitListProps> = ({ fruits }) => {
  const [cart, setCart] = useState<Fruit[]>([]);
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const [groupByField, setGroupByField] = useState<string>("None");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );
  let groupedFruits: Record<string, Fruit[]> | null = null;

  const addToCart = (fruit: Fruit) => {
    setCart((prevCart) => [...prevCart, fruit]);
    toast.success(`Fruit added to the Jar.`, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const removeFromCart = (fruitName: string) => {
    const fruitIndex = cart.findIndex((fruit) => fruit.name === fruitName);
    if (fruitIndex !== -1) {
      const newCart = [...cart];
      newCart.splice(fruitIndex, 1);
      setCart(newCart);
    }
    toast.success(`Fruit removed from the Jar.`, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const getFruitImagePath = (fruitName: string): string | null => {
    const fruit = FruitImage.find(
      (fruit) => fruit.name.toLowerCase() === fruitName.toLowerCase()
    );
    return fruit ? fruit.imagePath : null;
  };

  const totalCalories = cart.reduce(
    (total, fruit) => total + fruit.nutritions.calories,
    0
  );

  const backgroundColor = cart.map(() => getRandomColor());
  const hoverBackgroundColor = cart.map(() => getRandomColor());

  const aggregateFruitsByCalories = (fruits: Fruit[]): Fruit[] => {
    const fruitMap: { [key: string]: Fruit } = {};
    fruits.forEach((fruit) => {
      const { name, nutritions } = fruit;
      if (fruitMap[name]) {
        fruitMap[name] = {
          ...fruitMap[name],
          nutritions: {
            ...fruitMap[name].nutritions,
            calories: fruitMap[name].nutritions.calories + nutritions.calories,
          },
        };
      } else {
        fruitMap[name] = { ...fruit };
      }
    });

    return Object.values(fruitMap);
  };

  const pieData = {
    labels: aggregateFruitsByCalories(cart).map((fruit) => fruit.name),
    datasets: [
      {
        label: "Calories",
        data: aggregateFruitsByCalories(cart).map(
          (fruit) => fruit.nutritions.calories
        ),
        backgroundColor,
        hoverBackgroundColor,
      },
    ],
  };

  const handleGroupByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupByField(event.target.value);
    setExpandedGroups({});
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  if (groupByField !== "None") {
    groupedFruits = groupBy(fruits, groupByField.toLowerCase() as keyof Fruit);
  }

  const addGroupToJar = (groupFruits: Fruit[]) => {
    setCart((prevJar) => [...prevJar, ...groupFruits]);
  };

  return (
    <div id="fruit">
      <ToastContainer position="top-center" autoClose={3000} />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Fruits
          </h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <ul className="flex mb-3 flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="me-2">
                  <div
                    onClick={(e) => setActiveTab(true)}
                    className={`inline-block p-3 px-8 rounded-t-lg ${
                      activeTab
                        ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
                        : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    }`}
                  >
                    List
                  </div>
                </li>
                <li className="me-2">
                  <div
                    onClick={(e) => setActiveTab(false)}
                    className={`inline-block p-3 px-8 rounded-t-lg ${
                      !activeTab
                        ? "text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500"
                        : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    }`}
                  >
                    Table
                  </div>
                </li>
              </ul>

              {activeTab ? (
                <>
                  <div className="space-y-6 list-scroll">
                    {Array.isArray(fruits) && fruits.length > 0 ? (
                      fruits.map((fruit) => (
                        <div
                          key={fruit.name}
                          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                        >
                          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                              {fruit.name && getFruitImagePath(fruit.name) ? (
                                <img
                                  className="h-29 w-20"
                                  src={getFruitImagePath(fruit.name)!}
                                  alt={fruit.name}
                                />
                              ) : null}
                              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                <div className="text-base font-bold text-gray-900 dark:text-white">
                                  {fruit.name}
                                </div>
                                <div>Calories:{fruit.nutritions.calories}</div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                              <div className="flex items-center">
                                <button
                                  onClick={() => addToCart(fruit)}
                                  type="button"
                                  id="decrement-button"
                                  data-input-counter-decrement="counter-input"
                                  className="inline-flex p-2 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <li>No fruits available.</li>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="relative overflow-x-auto">
                    <div className="max-w-sm py-4">
                      <label
                        htmlFor="groupBy"
                        className="mr-2 font-medium text-gray-700 dark:text-gray-300"
                      >
                        Group by:
                      </label>
                      <select
                        id="groupBy"
                        value={groupByField}
                        onChange={handleGroupByChange}
                        className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="None">None</option>
                        <option value="Family">Family</option>
                        <option value="Order">Order</option>
                        <option value="Genus">Genus</option>
                      </select>
                    </div>

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Family
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Order
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Genus
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Calories
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupByField !== "None" && groupedFruits !== null
                          ? Object.keys(groupedFruits).map((group) => (
                              <React.Fragment key={group}>
                                <tr
                                  className="cursor-pointer border"
                                  onClick={() => toggleGroup(group)}
                                >
                                  <td
                                    colSpan={6}
                                    className="px-6 py-3 w-full flex justify-between align-middle font-bold text-gray-900 dark:text-white"
                                  >
                                    <span className="flex align-middle mt-2 text-blue-600">
                                      {group}{" "}
                                      {expandedGroups[group] ? (
                                        <ChevronDown />
                                      ) : (
                                        <ChevronRight />
                                      )}
                                    </span>
                                    <button
                                      className="ml-4 bg-primary-700 hover:bg-primary-800 text-white px-2 py-1 rounded"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addGroupToJar(groupedFruits![group]);
                                      }}
                                    >
                                      Add All
                                    </button>
                                  </td>
                                </tr>

                                {expandedGroups[group] &&
                                  groupedFruits !== null &&
                                  groupedFruits[group].map((fruit, index) => (
                                    <tr
                                      key={index}
                                      className="bg-white border dark:bg-gray-800 dark:border-gray-700"
                                    >
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {fruit.name}
                                      </td>
                                      <td className="px-6 py-4">
                                        {fruit.family}
                                      </td>
                                      <td className="px-6 py-4">
                                        {fruit.order}
                                      </td>
                                      <td className="px-6 py-4">
                                        {fruit.genus}
                                      </td>
                                      <td className="px-6 py-4">
                                        {fruit.nutritions.calories}
                                      </td>
                                    </tr>
                                  ))}
                              </React.Fragment>
                            ))
                          : fruits.map((fruit, index) => (
                              <tr
                                key={index}
                                className="bg-white border dark:bg-gray-800 dark:border-gray-700"
                              >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {fruit.name}
                                </td>
                                <td className="px-6 py-4">{fruit.family}</td>
                                <td className="px-6 py-4">{fruit.order}</td>
                                <td className="px-6 py-4">{fruit.genus}</td>
                                <td className="px-6 py-4">
                                  {fruit.nutritions.calories}
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg bg-white px-4 dark:border-gray-700 dark:bg-gray-800 sm:px-4 sm:py-2">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Jar
                </p>

                {cart.length > 0 ? (
                  <>
                    <ul className="jar-height space-y-4 rounded-lg border-solid border-8 border-t-0 border-gray-400 bg-white p-4 mt-16 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                      {cart.map((fruit) => (
                        <li
                          key={fruit.name}
                          className="mb-4 flex align-middle justify-between"
                        >
                          <span>
                            {fruit.name} - Calories: {fruit.nutritions.calories}
                          </span>

                          <button onClick={() => removeFromCart(fruit.name)}>
                            <Trash2 />
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-4">
                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                          Total calories
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                          {totalCalories}
                        </dd>
                      </dl>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Calories Distribution by Fruits
                      </h3>
                      <Pie data={pieData} />
                    </div>
                  </>
                ) : (
                  <li className="jar-height space-y-4 rounded-lg border-solid border-8 border-t-0 border-gray-400 bg-white p-4 mt-16 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                    No fruits in Jar.
                  </li>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FruitList;
