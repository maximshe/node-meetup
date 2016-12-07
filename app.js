var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
// set up handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// Before any routes
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    var fortunes = [
        "Conquer your fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple.",
        ];
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]; 
    res.render('about', { fortune: randomFortune });
});

app.get('/hello', function (req, res) {
    if (req.query.name === null || req.query.name === undefined || req.query.name === "") {
        res.status(400);
        res.render('400');
        return;
    }
    if (req.accepts('html')) {
        res.send('<h1>Hello <em>' + req.query.name + '</em>!</h1>');
        return;
    }
    if (req.accepts('json')) {
        res.json({ "message": "Hello " + req.query.name + "!" });
        return;
    }

    res.send('Hello ' + req.query.name + '!');
});

// custom 404 page
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
