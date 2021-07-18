const express = require('express');
const cors = require('cors');
const fs = require('fs') 

const app = express();
app.use(express.json());
app.use(cors());

app.get('/read', cors(), (req, res) => {
	fs.readFile("./data/chatdata.json", 'utf8', (err, data) => {
		if(err) {
			console.error(err);
			return;
		}
		//console.log("Data retrieved!")
		res.send(data);
	})
});

app.post('/send', cors(), (req, res) => {
	fs.readFile("./data/chatdata.json", 'utf8', (err, data) => {
		if(err) {
			console.error(err);
			return;
		}
		msgString = JSON.stringify(req.body);
		fs.writeFile("./data/chatdata.json", msgString, (err) => {
			if(err) {
				console.error(err);
			} else {
				console.log("Write successful.");
			}
		})
		res.send(data);
	})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...\n\nPlease open a new Powershell/cmd Window in the ./guildchat folder and run NPM START from there to launch the React App.`);
});
