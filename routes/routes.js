const router = require("express").Router();
const db = require("../models");
const path = require("path");

// add in regular page routes
router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

router.get("/exercise", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

router.get("/stats", (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})
router.get("/api/workouts", async (req, res) => {
    try {
        let data = await db.Workout.find({})
        // console.log(data)
        
        //this works but does not return anything on front end
        // no longer working
        data = data.map(workout =>{
            let totalDuration = 0;
            let totalDistance = 0;
            workout.exercises.forEach(exercise => {
                totalDuration = totalDuration + exercise.duration
                totalDistance = totalDistance + exercise.distance

            });

            workout.totalDuration = totalDuration;
            workout.totalDistance = totalDistance

            return {...workout._doc, totalDuration, totalDistance}
        });
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
        console.log(data)
    }
    catch (error){
        console.log(error)
        res.send(error)
    }
})

router.put("/api/workouts/:id", async(req, res)=>{
    try {
        const data = await db.Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}});
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