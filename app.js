const express = require("express");
const {projects} = require('./data.json');




const port =7000;
const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

/*
    routing 
*/
/*
  root page route 
*/
app.get('/', function (req, res){
    
    res.render('index',{projects});
})

/*
  project  page route
  @param prject id  
*/
app.get("/project/:id", function (req, res, next) {
    const projId = req.params.id;
    const proj= projects.find( ({ id }) => id === +projId );
    res.render('project',{proj});
    
})

/*
  About  page route
  @param prject id  
*/
app.get("/about", function (req, res, next) {
    res.render('about');
   
})

/*
    error handlers 
*/
app.use((req, res, next) => {


  console.log('404 error handler called');
  res.status(404).render('not-found');

  
  });

/* Global error handler */
app.use((err, req, res, next) => {
  err.status= 500;
  err.message = `Oops!  It looks like something went wrong on the server.`;
  console.log('500 Global error handler called');
  res.status(err.status).render('error', { err });
    
});



app.listen(port, () => {
    console.log(`This app is running in port ${port}`)
  })
