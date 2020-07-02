const router = require("express").Router();
const db = require("../models/workouts.js");
const path = require("path")

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