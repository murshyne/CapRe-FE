import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exercise = () => {
  const [exerciseRecommendations, setExerciseRecommendations] = useState([]);
  const [selectedExerciseGif, setSelectedExerciseGif] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Filter options
  const bodyParts = ['chest', 'back', 'lower legs', 'upper legs', 'lower arms', 'upper arms', 'shoulders', 'neck', 'waist', 'core', 'cardio'];
  const equipment = ["assisted", "band", "barbell", "body weight", "bosu ball", "cable", "dumbbell", "elliptical machine", "ez barbell", "hammer"];
  const targets = ["abductors", "abs", "adductors", "biceps", "calves", "cardiovascular system", "delts", "forearms", "glutes"];
  const difficulties = ["easy", "medium", "hard"]; // Difficulty levels

  // Fetch exercises based on selected filters
  const fetchExerciseRecommendations = async () => {
    const params = {};
    if (selectedBodyPart) params.bodyPart = selectedBodyPart;
    if (selectedEquipment) params.equipment = selectedEquipment;
    if (selectedTarget) params.target = selectedTarget;
    if (selectedDifficulty) params.difficulty = selectedDifficulty;

    try {
      const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
        headers: { 'X-RapidAPI-Key': import.meta.env.VITE_EXERCISEDB_API_KEY },
        params,
      });
      let exercises = response.data.slice(0, 5); // Limit to 5 recommendations
      setExerciseRecommendations(exercises);
    } catch (err) {
      setErrorMessage('Error fetching exercises. Please try again later.');
      console.error(err);
    }
  };

  // Handle the "Go" button click to apply filters
  const handleSortApply = () => {
    fetchExerciseRecommendations();
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bodyPart') setSelectedBodyPart(value);
    if (name === 'equipment') setSelectedEquipment(value);
    if (name === 'target') setSelectedTarget(value);
    if (name === 'difficulty') setSelectedDifficulty(value);
  };

  return (
    <div className="exercise-section">
      <h3>Exercise Recommendations</h3>

      {/* Filter Dropdowns */}
      <div>
        <label>Select Body Part:</label>
        <select onChange={handleFilterChange} value={selectedBodyPart} name="bodyPart">
          <option value="">-- Select Body Part --</option>
          {bodyParts.map((part, index) => (
            <option key={index} value={part}>{part}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Equipment:</label>
        <select onChange={handleFilterChange} value={selectedEquipment} name="equipment">
          <option value="">-- Select Equipment --</option>
          {equipment.map((eq, index) => (
            <option key={index} value={eq}>{eq}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Target:</label>
        <select onChange={handleFilterChange} value={selectedTarget} name="target">
          <option value="">-- Select Target --</option>
          {targets.map((target, index) => (
            <option key={index} value={target}>{target}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Difficulty:</label>
        <select onChange={handleFilterChange} value={selectedDifficulty} name="difficulty">
          <option value="">-- Select Difficulty --</option>
          {difficulties.map((level, index) => (
            <option key={index} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Apply Filters Button */}
      <button onClick={handleSortApply}>Go</button>

      {/* Exercise Recommendations */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <ul>
        {exerciseRecommendations.length ? (
          exerciseRecommendations.map((exercise, index) => (
            <li key={index} className="exercise-item">
              <h4>{exercise.name}</h4>
              {/* Display exercise image if available */}
              {exercise.image_url && (
                <div>
                  <img 
                    src={`https://exercisedb-api.vercel.app/api/v1/images/${exercise.image_url}`} 
                    alt={exercise.name} 
                    width="400" 
                    height="300" 
                  />
                </div>
              )}
              <p><strong>Target: </strong>{exercise.target}</p>
              <p><strong>Body Part: </strong>{exercise.bodyPart}</p>
              <a href="#!" onClick={() => setSelectedExerciseGif(exercise.gifUrl)}>View Exercise Animation</a>
            </li>
          ))
        ) : (
          <p>No exercises found. Try adjusting the filters.</p>
        )}
      </ul>

      {/* Display selected exercise GIF */}
      {selectedExerciseGif && (
        <div>
          <h4>How to Do This Exercise:</h4>
          <iframe 
            src={selectedExerciseGif} 
            width="400" 
            height="300" 
            title="Exercise GIF" 
            frameBorder="0" 
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default Exercise;
