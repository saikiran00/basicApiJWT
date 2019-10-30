const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.get('/api', (req,res) => {
	res.json({
		message: "saikiran"
	});
});

app.post('/api/posts', verifyToken, (req,res) => {
	jwt.verify(req.token, 'key', (err, authData) => {
		res.json({
			message: "more check...",
			authData
		});
	});
});

app.post('/api/login', (req,res) => {
	const user = {
		id:1,
		username:"saikiran",
		email:"saikiran@test.com",
	}
	jwt.sign({user}, 'key', (err, token) =>{
		res.json({
			token
		})
	});
});
//Format Of Token
//Authorization: Bearer token

function verifyToken(req, res, next){
	//get auth header value
	const bearerHeader = req.headers['authorization'];
	if(bearerHeader){
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	}else{
		res.sendStatus(403);
	}
}

app.listen(5000, () => {
	console.log("this is good");
});