const router = require("express").Router();
const Workouts = require("../models/workouts.js");
const Workout = require("../models/workouts.js");
const { db } = require("../models/workouts.js");

//need to add get and post routes
//readME stats the following copy paste
//As a user, I want to be able to view create and track daily workouts. I want to be able to log multiple exercises in a workout 
// on a given day. I should also be able to track the name, type, weight, sets, reps, and duration of exercise. 
//If the exercise is a cardio exercise, I should be able to track my distance traveled.

// api/workouts get and post routes
// api/workouts/range get route only?
router.get("/api/workouts", async (req, res) => {
    try {
        const data = await db.Workout.find({})
        res.json(data)
    }
    catch (error) {
        console.log(error)
        res.send(error)
    }
  });



router.post("/api/workouts", async ({body}, res) =>{
    try {
        const data = await db.Workout.create(body)
        res.json(data)
    }
    catch (error){
        console.log(error)
        res.send(error)
    }
})

router.put("/api/workouts/:id", async(req, res)=>{
    try {
        const data = await db.Workout.findByIdAndUpdate(req.params.id, {$push: {excercises: req.body}});
        res.json(data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


module.exports = router;