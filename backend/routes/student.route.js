const express = require('express');
const app = express();
const studentRoute = express.Router();

//Student model
let Student = require('../model/Student');
//Add Student
studentRoute.route('/add-student').post((req, res, next) =>{
  console.log(req);
  Student.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

studentRoute.route('/').get((req, res) => {
  Student.find((error, data) => {
    if(error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Get single student
studentRoute.route('/read-student/:id').get((req, res) => {
  Student.findById(req.param.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Update student
studentRoute.route('/edit-student/:id').put((req, res, next)=> {
  console.log(req);
  Student.findByIdAndUpdate(req.param.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Student successfully updated!')
    }
  })
})

//Delete student
studentRoute.route('/delete-student/:id').delete((req, res, next) =>{
  Student.findByIdAndRemove(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = studentRoute;
