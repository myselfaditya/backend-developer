//const { response } = require('express');
const arr=require('lodash')
const express = require('express');
const abc = require('../introduction/intro');
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    logger.welcome()
    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})

router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    //let requestParams = req.params
  
    // JSON strigify function helps to print an entire object
    // We can use any ways to print an object in Javascript, JSON stringify is one of them
    //console.log("This is the request "+ JSON.stringify(requestParams))
    //let studentName = requestParams.name
    console.log('Name of the student is', req.params.name)
    
    res.send('Dummy response')
})


router.get('/movies',function(req,res) {
    let movies = ['bahubali','RRR','KGF2','The Warrior']
    res.send(movies)
})

router.get('/movies/:indexNumber',function(req,res){
    let Movies= ['Rang de Basanti','The shining', 'Lord of the rings', 'Batman begins','heathers','dangal']
    //let requestParams = req.params
    let Mnumber = req.params.indexNumber
        if (Mnumber<Movies.length && Mnumber>=0)
            return res.send(Movies[Mnumber])
        else
            res.send ('it is not a valid indexNumber ')
        })


router.get('/films',function(req,res){
    const film=[ {
        'id': 1,
        'name': 'The Shining'
       }, {
        'id': 2,
        'name': 'Incendies'
       }, {
        'id': 3,
        'name': 'Rang de Basanti'
       }, {
        'id': 4,
        'name': 'Finding Nemo'
       }]
      let films = film.reduce((obj,item)=>Object.assign(obj, {[item.id]:item.name}),{})
      res.send(films)  
})

    
    router.get("/films/:filmId", function (req, res) {
        // films accessing using filmid 
        let requestParams = req.params
       let  movieIndex=requestParams.filmId-1
    
        const films = [
          {
            id: 1,
            name: "The Shining",
          },
          {
            id: 2,
            name: "Incendies",
          },
          {
            id: 3,
            name: "Rang de Basanti",
          },
          {
            id: 4,
            name: "Finding Nemo",
          },
        ];
        if( movieIndex <= -1 || movieIndex >=4 ){
               res.send("No movie exists with this id")
         }
        res.send(films[movieIndex]);
      });

      module.exports = router;