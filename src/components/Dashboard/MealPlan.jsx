import React, { useState } from 'react';
import axios from 'axios';

const MealPlan = () => {
  // State to store meal plan data and the query string
  const [mealPlan, setMealPlan] = useState([]);
  const [mealQuery, setMealQuery] = useState('');

  // Function to fetch meal plans from the Spoonacular API
  const fetchMealPlan = async (query) => {
    if (!query) return; // Do not make request if the query is empty
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: { 
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY, // API key from environment variables
          query, 
          number: 4 // Limit results to 4 meals
        },
      });
      setMealPlan(response.data.results); // Update state with meal data
    } catch (err) {
      console.error('Error fetching meal plan:', err); // Handle errors
    }
  };

  // Handle search when "Enter" is pressed in the input field
  const handleSearch = (e) => {
    if (e.key === 'Enter') fetchMealPlan(mealQuery); // Trigger search on Enter key
  };

  return (
    <div className="meal-plan-section">
      <h3>Search for Meals</h3>
      {/* Input and Button for searching meals */}
      <div>
        <input
          type="text"
          placeholder="Enter meal: e.g., Chicken"
          value={mealQuery}
          onChange={(e) => setMealQuery(e.target.value)} // Update query as user types
          onKeyDown={handleSearch} // Trigger search on 'Enter' key press
        />
        <button onClick={() => fetchMealPlan(mealQuery)}>Search</button>
      </div>

      {/* Displaying meal plans or a message if none are available */}
      <div>
        {mealPlan.length ? (
          mealPlan.map((meal, index) => (
            <div key={index} className="meal-item">
              <h4>{meal.title}</h4>
              <div>
                {/* Displaying meal image if available */}
                {meal.image && (
                  <img src={meal.image} alt={meal.title} width="200" height="200" />
                )}
              </div>
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(meal.title)} recipe`} 
                target="_blank" 
                rel="noopener noreferrer">
                View Recipe
              </a>
            </div>
          ))
        ) : (
          <p>No meal plan available. Try again later!</p> // Message when no meals are found
        )}
      </div>
    </div>
  );
};

export default MealPlan;
