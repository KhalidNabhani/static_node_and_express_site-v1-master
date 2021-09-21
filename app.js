const express = require("express");
const {projects} = require('./data.json');




const port =7000;
const app = express();

app.use(express.json());
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
    next();
})

/*
  About  page route
  @param prject id  
*/
app.get("/about", function (req, res, next) {
    res.render('about');
    next();
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

    if (err) {
      console.log('Global error handler called', err);
    }
  
    /* TODO 2: Handle errors caught by your route handlers
      - If the error status is 404:
          * Set the response status to 404
          * Render the 'not-found' view and pass the error object to the view
      - Else:
          * Set the error message to the given message, or specify a general, 
            default error message
          * Set response status to the given error status OR, set it to 500 by default if no error status is set
          * Render the 'error' view, passing it the error object
    */
    if (err.status === 404) {
      res.status(404).render('not-found', { err });
    } else {
      err.message = `Oops!  It looks like something went wrong on the server.`;
      res.status(err.status= 500).render('error', { err });
    }
  });



app.listen(port, () => {
    console.log(`This app is running in port ${port}`)
  })
