import React, { Component } from 'react'
import axios from "axios"

export default class CreateUser extends Component {
    constructor(props){
        super(props);
        this.state={
            workername:"",
            email:"",
            phonenumber:"",
            message: "",
        }
        this.onChangeWorker = this.onChangeWorker.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePhonenumber = this.onChangePhonenumber.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeWorker(event){
        this.setState({
            workername:event.target.value,
        })
      
    }
    onChangeEmail(event){
        this.setState({
            email:event.target.value,
        })
      
    }
    onChangePhonenumber(event){
        this.setState({
            phonenumber:event.target.value,
        })
      
    }
   

    onSubmit(e){
        e.preventDefault();
        const user ={
            workername :this.state.workername,
            email :this.state.email,
            phone_number :this.state.phonenumber,
        }
         console.log(user)

        axios.post('https://workerstracker.herokuapp.com/users/adduser',user)
    
        .then(res=>{
            console.log(res.data.error)
            if(res.data.error ){
                this.setState({message: res.data.error});
                return false
            }
            // else{
                this.setState({message: res.data.message});
               window.location ='/create'
            // }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h3>Add Worker</h3> 

                <form onSubmit={this.onSubmit}>
                    <div className ='form-group'>
                        <label> Name: </label>        
                         <input type="text" 
                            required
                        className="form-control"
                        value ={this.state.workername}
                        onChange ={this.onChangeWorker}
                        />
                        <label> Email: </label>        
                         <input type="email" 
                            required
                        className="form-control"
                        value ={this.state.email}
                        onChange ={this.onChangeEmail}
                        />
                        <label>Phone Number: </label>        
                         <input type="number" 
                            required
                        className="form-control"
                        value ={this.state.phonenumber}
                        onChange ={this.onChangePhonenumber}
                        />
                    </div>
                    <div className ='form-group'>
                        <input type = "submit" value="Create User" className="btn btn-primary"/>
                        { this.state.message && <span className="error"> { this.state.message } </span> } 
                    </div>
                </form>
            </div>
        )
    }
}

