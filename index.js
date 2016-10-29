'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES
app.get('/', function(req, res) {
	res.send("EAARKjedcdlUBAJWbr213c5WKtW9ZAc7jt29N23DA7caw9UmMaJ18WzrHrrMWQsvNZAURmICZAjRo6RV76zsJy6qrUVXOTbTn1sqSlfLqAT0KBpuFXVEMZAdZBRUZCQwGpg9fMlbs5xipVUBdQHiP0NjjePgvfErgluMXRjtqqpNQZDZD")
})

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === 'blondiebytes') {
		res.send(req.query['hub.challenge'])
	}
	req.send('Wrong token')
})

app.listen(app.get('port'), function() {
	console.log("running: port")
})

