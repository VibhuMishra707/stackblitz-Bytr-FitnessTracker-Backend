port = 3000;

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// ---------------------------------------------------------- //
//        Project on BD 2: Flip Deal Product Listing          //
// ---------------------------------------------------------- //

// ----------------- DATA ----------------- //
let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 },
];

// --------------- Welcome Page --------------- //

app.get('/', (req, res) => {
  res.send('Welcome to Fitness Tracker Backend');
});

// Endpoint - 1 (Add an Activity)

function addActivity(activityId, type, duration, caloriesBurned) {
  let uniqueId = true;
  for (let i = 0; i < activities.length; ++i) {
    if (activities[i].activityId === activityId) {
      uniqueId = false;
      break;
    }
  }
  if (uniqueId) {
    let activity = {
      activityId: activityId,
      type: type,
      duration: duration,
      caloriesBurned: caloriesBurned,
    };
    activities.push(activity);
  }
  return activities;
}

app.get('/activities/add', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);

  let result = addActivity(activityId, type, duration, caloriesBurned);
  res.json({ activities: result });
});

// Path = /activities/add?activityId=4&type=Walking&duration=20&caloriesBurned=150

// Endpoint - 2 (Sort Activities by Duration)

function activitySortByDuration(activity1, activity2) {
  return activity1.duration - activity2.duration;
}

app.get('/activities/sort-by-duration', (req, res) => {
  let activitiesCopy = activities.slice();
  let result = activitiesCopy.sort(activitySortByDuration);
  res.json({ activities: result });
});

// Path = /activities/sort-by-duration

// Endpoint - 3 (Filter Activities by Type)

function activityFilterByType(activity, type) {
  return activity.type === type;
}

app.get('/activities/filter-by-type', (req, res) => {
  let type = req.query.type;
  let result = activities.filter((activity) =>
    activityFilterByType(activity, type)
  );
  res.json({ activities: result });
});

// Path = /activities/filter-by-type?type=Running

// Endpoint - 4 (Calculate Total Calories Burned)

function calculateTotalCalories() {
  let totalCalories = 0;
  for (let i = 0; i < activities.length; ++i) {
    totalCalories += activities[i].duration;
  }
  return totalCalories;
}

app.get('/activities/total-calories', (req, res) => {
  let result = calculateTotalCalories();
  res.json({ totalCaloriesBurned: result });
});

// Path = /activities/total-calories

// Endpoint - 5 (Update Activity Duration by ID)

function updateDurationByActivityID(activityId, duration) {
  for (let i = 0; i < activities.length; ++i) {
    if (activities[i].activityId === activityId) {
      activities[i].duration = duration;
    }
    return activities;
  }
}

app.get('/activities/update-duration', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  let result = updateDurationByActivityID(activityId, duration);
  res.json({ activities: result });
});

// Path = /activities/update-duration?activityId=1&duration=35

// Endpoint - 6 (Delete Activity by ID)

function deleteActivityByActivityID(activityId) {
  for (let i = 0; i < activities.length; ++i) {
    if (activities[i].activityId === activityId) {
      activities.splice(i, 1);
      break;
    }
  }
  return activities;
}

app.get('/activities/delete', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let result = deleteActivityByActivityID(activityId);
  res.json({ activities: result });
});

// Path = /activities/delete?activityId=2

// Endpoint - 7 (Delete Activities by Type)

function deleteActivityByActivityType(type) {
  for (let i = 0; i < activities.length; ++i) {
    if (activities[i].type === type) {
      activities.splice(i, 1);
    }
  }
  return activities;
}

app.get('/activities/delete-by-type', (req, res) => {
  let type = req.query.type;
  let result = deleteActivityByActivityType(type);
  res.json({ activities: result });
});

// Path = /activities/delete-by-type?type=Running

// ----------------- LISTENING ----------------- //
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
