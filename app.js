const express = require("express");
const {projects} = require('./data.json');




const port =7000;
const app = express();

app.use(express.json());
app.use('/static', express.static('public'));
app.use('/views', express.static('views'));
app.use('/images', express.static('images'));

app.set('view engine', 'pug');

/*
    routing 
*/
/*
  root page route 
*/
app.get('/',(req, res)=>{
    res.locals.projects = projects;
    console.log(res.locals.projects);
    res.render('index');
})

/*
  project  page route
  @param prject id  
*/
app.get((req, res, next) =>{
    res.render('/prjects:id');
    next();
})
    
/*
app.set('views', path.join(__dirname, 'views'));

*/


app.listen(port, () => {
    console.log(`This app is running in port ${port}`)
  })
