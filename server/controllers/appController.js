'use strict';

var Task = require('../models/appModel.js');

exports.list_all_tasks = function(req, res) {
  Task.getAllTask(function(err, task) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', task);
    res.send(task);
  });
};



exports.create_a_task = function(req, res) {

  let body = req.body;
  let new_task = {
    "Name" : body.Name,
    "Type" : body.Type,
    "Favorite": body.Favorite,
  };

  Task.createTask(new_task, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.getTaskById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  let body = req.body;
  let new_task = {
    "Name" : body.Name,
    "Type" : body.Type,
    "Favorite": body.Favorite,
  };
  Task.updateById(req.params.taskId, new_task , function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove( req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};