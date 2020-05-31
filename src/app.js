const path = require('path');
const exp = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = exp();
const port = process.env.PORT||3000;

//setting handle bars engine and view locaton
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'../templates/views'));

hbs.registerPartials(path.join(__dirname,'../templates/partials'));

//setup static directory to serve 
app.use(exp.static(path.join(__dirname ,'../public')));

 
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather', 
        name : 'Nagireddy'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.status(400).send({
            error: 'Address is requred to get the weather details'
        })
    }

    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        console.log(longitude,latitude,location);
         forecast(latitude,longitude,(error,forecastData)=>{
             if(error){
                 console.log('------');
                 return res.send({error});                
             }
             res.send({
                 forecast:forecastData,
                 location,
                 address:req.query.address
             })
         })
    })
})




app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.status(404).send({
           error: 'you must provide search term'
       }) 
    };

    res.status(200).send({
        products:[],
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name : 'Nagireddy'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title : 'Help',
        name : 'Nagireddy'
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404!',
        name : 'Nagireddy',
        errorMessage: 'Help article not availble'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404!',
        name: 'Nagireddy',
        errorMessage: 'Page Not Found'
        
    });
})


//server calls


//starting server
app.listen(port,()=>{
    console.log(`app is listening at ${port}`);
});