import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios"

export default class Editworker extends Component {
    constructor(props){
        super(props);
        this.state={
            workername:"",
            department:"",
            duration:"",
            date:"",
            users:[],
            message: "",
        }
        this.onChangeWorker = this.onChangeWorker.bind(this)
        this.onChangeDur = this.onChangeDur.bind(this)
        this.onChangeDes = this.onChangeDes.bind(this)
        this.onChangeData = this.onChangeData.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    componentDidMount(){
        axios.get('https://workerstracker.herokuapp.com/workers/' + this.props.match.params._id)
        .then(response =>{
           
            this.setState({
                workername:response.data.data.workername,
                department:response.data.data.department,
                duration:response.data.data.duration,
                date:new Date(response.data.data.date)
            })
        })
        .catch(function(error){
            console.log(error);
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
       
        
        axios.put('https://workerstracker.herokuapp.com/workers/update/'+ this.props.match.params._id, worker)
        .then(res =>{
            if(res.data.error ){
                this.setState({message: res.data.error});
            }
            else{
                this.setState({message: res.data.message});
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
               <h3>Edit Worker Log</h3> 

               <form onSubmit = {this.onSubmit}>
{/* 
// to select from list of users
                   <div className ='form-group'>
                        <label> workername: </label>
                        <select required className ="form-control"
                        value ={this.state.user}
                        onChange ={this.onChangeWorker}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                    key={user}
                                    value ={user}>{user}
                                    </option>
                                })
                            }
                        </select>
                  </div> */}

                  <div className ="form-group">
                      <label>Name:</label>
                      <input type="text" name="Name"
                      required
                      className="form-control"
                      value ={this.state.workername}
                      onChange ={this.onChangeWorker}
                      />
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
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                        { this.state.message && <span className="error"> { this.state.message } </span> } 
                    </div>

                </form>
          </div>
          )
    }
    
}

