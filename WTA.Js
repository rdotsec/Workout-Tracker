document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.workout-form');

  // Create a section to display saved workout logs dynamically
  const logSection = document.createElement('section');
  logSection.className = 'section';
  logSection.innerHTML = `
    <div class="container">
      <h2>Your Workout Log</h2>
      <ul id="workout-log" class="workout-log"></ul>
    </div>
  `;

  // Append log display section after the main content
  document.querySelector('main').appendChild(logSection);

  const logList = document.getElementById('workout-log');

  // Load workouts from LocalStorage and render them
  function loadWorkouts() {
    const saved = localStorage.getItem('workouts');
    if (saved) {
      const workouts = JSON.parse(saved);
      logList.innerHTML = ''; // Clear existing content
      workouts.forEach((w, index) => {
        const li = document.createElement('li');
        li.textContent = `${w.date} - ${w.type} - ${w.exercise} - ${w.sets} sets × ${w.reps} reps @ ${w.weight || 'N/A'} kg - Notes: ${w.notes || ''}`;
        logList.appendChild(li);
      });
    } else {
      logList.innerHTML = '<li>No workouts logged yet.</li>';
    }
  }

  // Save a new workout entry to LocalStorage
  function saveWorkout(workout) {
    const saved = localStorage.getItem('workouts');
    const workouts = saved ? JSON.parse(saved) : [];
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  // Handle form submission: save workout and refresh log display
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const workout = {
      date: form.date.value,
      type: form.type.value,
      exercise: form.exercise.value,
      sets: form.sets.value,
      reps: form.reps.value,
      weight: form.weight.value,
      notes: form.notes.value.trim()
    };
    saveWorkout(workout);
    loadWorkouts();
    form.reset();
  });

  // Initial load of workouts on page load
  loadWorkouts();
});
