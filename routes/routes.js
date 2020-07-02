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

        const totalLengthOfTime = (data)=>{

            let newItem = [];

            data.forEach(day=>{
                let newDuration = 0;

                day.excercises.forEach(exercise=>{
                    newDuration = newDuration + exercise.duration;
                    return newDuration
                })

                const newDay = {
                    "day": day.day,
                    "id": day._id,
                    "exercise": day.exercises,
                    "totalDuration": newDuration
                };
                return newItem.push(newDay);
            })

            return newItem;
        }
        data = totalLengthOfTime(data);
        res.json(data)
    }
    catch (error) {
        console.log(error)
        res.send(error)
    }
  });



router.post("/api/workouts", async ({body}, res) =>{
    try {
        const data = await db.Workouts.create(body) //does this need to change to req.body?
        res.json(data)
        // console.log(data)
    }
    catch (error){
        console.log(error)
        res.send(error)
    }
})

router.put("/api/workouts/:id", async(req, res)=>{
    try {
        const data = await db.Workouts.findByIdAndUpdate(req.params.id, {$push: {excercises: req.body}});
        res.json(data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get("/api/workouts/range", async(req, res)=>{
    try {
        const data = await db.Workouts.find({})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


module.exports = router;