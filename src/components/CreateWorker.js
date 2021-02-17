import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios"

export default class CreateWorker extends Component {
    constructor(props){
        super(props);
        this.state={
            workername:"",
            department:"",
            duration:0,
            date:new Date(),
            users:[],
            errorMessage: "",

        }
        this.onChangeWorker = this.onChangeWorker.bind(this)
        this.onChangeDur = this.onChangeDur.bind(this)
        this.onChangeDes = this.onChangeDes.bind(this)
        this.onChangeData = this.onChangeData.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        
        axios.get('https://workerstracker.herokuapp.com/users/')
        .then(response =>{
            if(response.data.data.length > 0){
                this.setState({
                    users:response.data.data,
                    workername:response.data.data[0].workername
                })  
            }
            console.log(this.state.users)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    onChangeWorker(event){
        this.setState({workername:event.target.value})
      
    }

    onChangeDur(event){
      this.setState({duration:event.target.value})
    
    }

    onChangeDes(event){
        this.setState({department:event.target.value})
    }

    onChangeData(date){
        this.setState({date:date})
    }

    onSubmit(e){
        e.preventDefault();
        const worker ={
            workername :this.state.workername,
            department :this.state.department,
            duration :this.state.duration,
            date :this.state.date,
        }
        // console.log(worker)
        
        axios.post('https://workerstracker.herokuapp.com/workers/addworker',worker)
        .then(res=>{
            if(res.data.error ){
                this.setState({errorMessage: res.data.error});
            }
            else{
                this.setState({errorMessage: res.data.message});
                window.location ='/'
                   
            }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
    }
    
    render() {
        return (
            <div>
               <h3>Create New Worker Log</h3> 

               <form onSubmit = {this.onSubmit}>

                   <div className ='form-group'>
                        <label> Name: </label>
                        <select ref ="userInput" required className ="form-control"
                        value ={this.state.workername}
                        onChange ={this.onChangeWorker}>
                            {
                                this.state.users.map(function(user) {
                                    return <option key={user._id} value ={user.workername}>
                                        {user.workername}
                                    </option>
                                })
                            }
                        </select>
                  </div>

                  <div className ="form-group">
                      <label>Department:</label>
                      <input type="text" name="department"
                      required
                      className="form-control"
                      value ={this.state.department}
                      onChange ={this.onChangeDes}
                      />
                  </div>

                  <div className ="form-group">
                      <label>Working Hours:</label>
                      <input name="Duration"
                      type="text"
                      className="form-control"
                      value={this.state.duration}
                      onChange ={this.onChangeDur}
                      />
                  </div>
                  
                  <div className ="form-group">
                        <label> Date: </label>
                        <div>
                            <DatePicker
                            selected ={this.state.date}
                            onChange ={this.onChangeData}
                            />
                        </div>
                    </div>

                    <div className ="form-group">
                        <input type="submit" value="Create Worker Log" className="btn btn-primary"/>
                        { this.state.errorMessage && <span className="error"> { this.state.errorMessage } </span> } 
                    </div>

                </form>
          </div>
          )
    }
    
}
