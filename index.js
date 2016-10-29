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
	res.send("whats up")
})

let token = "EAAK33QTXStsBAF8vAt3TsrVsu4gPA1SpOhc2XpbL6c3eoZAMeDXErAcX3NKh6nbU0Ep5uY039ZBYTAUrTEjISZBbGduSlbItSZAoY4JMwDG12w03V4hIbLH820spwWGNpByfgaUjUrLE7MzRffl3MYeIFZB75K126DPtoOB2jxgZDZD"

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === 'ktbot') {
		res.send(req.query['hub.challenge'])
	}
	req.send('Wrong token')
})

app.post('/webhook', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id

		if (event.message && event.message.text) {

			if (event.message.text === "weather") {
				sendText(sender, "Ka Tai hasn't finished this feature")
			}
			else {
				let text = event.message.text
				sendText(sender, "Bot: " + text.substring(0, 100))
			}
		}
	}
	res.sendStatus(200)
})

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages", 
		qs: {access_token : token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}

app.listen(app.get('port'), function() {
	console.log("running: port")
})

