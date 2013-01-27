var express = require('express');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var app = module.exports = express();

// configuration
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.engine('html', require('ejs').__express);
	app.set('view engine', 'html');
	
	app.use(express.static(__dirname + '/public'));
	
	// require to get post content from FORM
	app.use(express.bodyParser());
	//app.use(express.methodOverride());
	//app.use(app.router);
});

app.configure('development', function(){
	//app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	//app.use(express.errorHandler());
});

var articleProvider = new ArticleProvider();

// routes
app.get('/', function(req, res){
	articleProvider.findAll(function(error, data){
		res.render('index', { locals: {
			title: 'Blog title form server!',
			articles: data
			}
		});
	});
});

app.get('/add/article', function(req, res){
	res.render('add/add-article');
});
// form submit action = '/addNewArticle'
app.post('/addNewArticle', function(req, res){
	//console.log('new post! title: ' + req.param('title') + ' body: ' + req.param('body'));
	articleProvider.save({
		title: req.param('title'),
		body: req.param('body')
	}, function(err, data){
		res.redirect('/');
	});
});

app.listen(8000);








