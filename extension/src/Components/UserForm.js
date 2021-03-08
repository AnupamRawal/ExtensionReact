import React from 'react';
import { useState, useEffect } from 'react';
import * as axios from 'axios';
// import AllData from './AllData';

const serverUrl = 'http://localhost:5000';

function UserForm() {
    const [name, setname] = useState('');
    const [mail, setmail] = useState('');
    const [userData, setuserData] = useState([]);
    const [updateName, setupdateName] = useState('');
    // const [updateEmail, setupdateEmail] = useState('');

    useEffect(() => {
        axios.get(`${serverUrl}/read`)
            .then(res => {
                // console.log(res.data)
                setuserData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        let data = {
            userName: name,
            userEmail: mail
        }
        // console.log(data);

        axios.post(`${serverUrl}/submit`, data)
            .then(res => {
                console.log(res)
                // if(res.status === 200){
                //     setname(' ');
                //     setmail(' ');
                // }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const updateUser = (id) => {
        console.log(id);
        axios.put(`${serverUrl}/update/`, { userId: id, name: updateName })
            .then(res => {
                console.log(res);

            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteUser=(id)=>{
        console.log(id);
        axios.delete(`${serverUrl}/delete/${id}`)
            .then(res => {
                console.log(res);

            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div class="form-Container">
            <form >
                <input placeholder="Enter Name" type='text' name="name" onChange={(e) => { setname(e.target.value) }} /><br />
                <input placeholder="Enter Email" type='text' name="email" onChange={(e) => { setmail(e.target.value) }} /><br />
                <button type="submit" onClick={submitHandler} >submit</button>
                <h4>User Details:</h4>
                {
                    userData.map(e => (
                        <div key={e._id}>
                            <h5>{e.userName}</h5>
                            <input placeholder="update Name" onChange={(e) => { setupdateName(e.target.value) }} />
                            <button type="button" onClick={() => updateUser(e._id)}>Update</button>
                            <button type="button" onClick={()=>deleteUser(e._id)}>Delete</button>
                        </div>

                    ))
                }
                {/* <AllData data={userData}/> */}
            </form>
        </div>
    )
}

export default UserForm
