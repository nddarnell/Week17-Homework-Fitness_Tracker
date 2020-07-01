const router = require("express").Router();
const Workouts = require("../models/workouts.js");
const Workout = require("../models/workouts.js");
const db = require("../models/workouts.js");

router.get("/api/workouts", async (req, res) => {
    try {
        let data = await db.find({})

        data = data.map(workout=>{
            let totalDuration = 0;
            let totalDistance = 0;
            workout.excercises.forEach(exercise => {
                totalDuration = totalDuration + exercise.duration;
                totalDistance = totalDistance + exercise.distance
            });

            workout.totalDuration = totalDuration;
            workout.totalDistance = totalDistance;

            return {...workout._doc, totalDuration};

        })

        console.log(data)
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

router.get("/api/workouts/range", async(req, res)=>{
    try {
        const data = await db.Workout.find({})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


module.exports = router;