const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan("tiny"))
app.use(express.json())

let data = [
	{
		todoItemId: 0,
		name: 'an item',
		priority: 3,
		completed: false
	},
	{
		todoItemId: 1,
		name: 'another item',
		priority: 2,
		completed: false
	},
	{
		todoItemId: 2,
		name: 'a done item',
		priority: 1,
		completed: true
	}
];

app.get("/", (req, res) => {
    res.send({status: "ok"}).status(200);
});

app.get("/api/TodoItems", (req, res) => {
    res.send(data).status(200);
})

app.get("/api/TodoItems/:number", (req, res) => {
   let urlId = parseInt(req.params.number)
   data.map(toDo => {
       if (toDo.todoItemId == urlId){
           res.send(toDo).status(200)
       } 
   })
})

app.post("/api/TodoItems", (req, res) => {
	let index = data.findIndex(toDo =>
		toDo.todoItemId == req.body.todoItemId
	);
	if (index >= 0){
		data.splice(index, 1, req.body)
	} else {
		data.push(req.body)
	}
	res.status(201).send(req.body)
	console.log(req.body)
})

app.delete("/api/TodoItems/:number", (req, res) => {
	let urlId = parseInt(req.params.number)
	let index = data.findIndex(toDo =>
		toDo.todoItemId == urlId
	);
		if (index >= 0){
			res.status(200).send(data.splice(index, 1)[0])
		} else {
			res.send("There is nothing to delete")
		}
})

module.exports = app;