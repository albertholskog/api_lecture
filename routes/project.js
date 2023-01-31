const express = require("express");
const router = express.Router();
const project = require("../services/project");

router.get("/", async function(req, res, next) {
  try {
    res.json(await project.getMultriple(req.query.page));
  } catch (e) {
    console.error(`Error while getting projects ${e}`);
    next(e);
  }
});

router.post("/", async function(req,res,next){
  try {
    res.json(await project.create(req.body))
  } catch (error) {
    console.error("error while creating project", error.massage)
    next(error)
  }
})
module.exports = router;