const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const graphData = require('./data.json')


app.use(express.static('public'))
app.use(express.static('src'))

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/graphData', (req, res) => {
	res.json(graphData);
})

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname })
})

app.get('/', (req, res) => {
    res.json(graphData);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))