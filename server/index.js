const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userDataModel = require('./Models/userModel');

app.use(express.json());
app.use(cors());

require('dotenv').config();
const port = process.env.PORT || 5000;
const connectUrl = process.env.MONGOURL;

console.log(connectUrl);

mongoose.connect(connectUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/', (req, res) => {
    res.send('server is running');
})

app.get('/read', async (req, res) => {
    userDataModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }

        // console.log(result);
        res.send(result);
    })

})

app.post('/submit', async (req, res) => {
    let name = req.body.userName;
    let mail = req.body.userEmail;

    console.log('username is :', name, "user email is:", mail)
    try {
        let details = new userDataModel({ userName: name, userEmail: mail })
        await details.save();
        console.log(details);
        res.send('data inserted succesfully');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

app.put('/update', async (req, res) => {
    let id = req.body.userId;
    let name = req.body.name;
    console.log('id', id)
    try {
        await userDataModel.findById(id, (err, element) => {
            element.userName = name;
            element.save()
            res.send('data updated');

        })

    } catch (error) {
        res.send(error)
    }
})

app.delete('/delete/:id', async (req, res) => {
    let id = req.params.id;
    console.log('id', id)
    try {
        await userDataModel.findOneAndRemove(id).exec();
        res.send('id deleted from database')

    } catch (error) {
        res.send(error)
    }
})


app.listen(port, () => {
    console.log(`port running on port ${port}`)
})









