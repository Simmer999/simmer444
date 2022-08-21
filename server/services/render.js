const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    // axios.get('https://localhost:5554/api/users')
    //     .then(function(response){
            res.render('cube');
        // })
        // .catch(err =>{
        //     res.send(err);
        // })
}

exports.indexRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:5554/api/users')
        .then(function(response){
            res.render('memoryApp/bookList', { users : response.data });
            // console.log(response.data)
        })
        .catch(err =>{
            res.send(err);
        })

}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:5554/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}