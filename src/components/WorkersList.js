// This file has two components
import React, { Component } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import moment from "moment"

// functional Component
 const Worker =(props)=>(
    <tr>
        <td> {props.worker.workername}</td>
        <td> {props.worker.department}</td>
        <td> {props.worker.duration}</td>
        <td> {moment(props.worker.date).format('DD/MM/YYYY')}</td>
        <td> 
            <Link to = {"/edit/" + props.worker._id}>edit</Link> | <a href ="#" onClick={()=>{props.deleteWorker(props.worker._id)}}>delete</a>
        </td>
    </tr>
 )
//  /edit/:_id
 

export default class WorkersList extends Component {
    constructor(props){
        super(props);
        this.state={
            workers:[],
        }

        this.deleteWorker = this.deleteWorker.bind(this)
        
    }

    componentDidMount(){
        axios.get('https://workerstracker.herokuapp.com/workers/')
        .then(response =>{
            this.setState({workers:response.data.data})
      
        })
          .catch((error)=>{
            console.log(error) })
    }

    deleteWorker(id){
        this.setState({
            workers:this.state.workers.filter(el=> el._id !== id)
        })
        axios.delete('https://workerstracker.herokuapp.com/workers/'+ id) 
        .then(response =>{
            console.log(response.data.data)
            
        })
          .catch((error)=>{
            console.log(error) })
    }

    workersList(){
        return this.state.workers.map(currentworker=>{
            return <Worker worker ={currentworker} deleteWorker={this.deleteWorker} key={currentworker._id}/>
        })
    }

    render() {
        return (
            <div className="work">
               <h1>Logged Worker </h1>
               <table className="table">
                   <thead className ="thead-light">
                       <tr>
                           <th>Name</th>
                           <th>Department</th>
                           <th>Working Hours</th>
                           <th>Date</th>
                           <th>Actions</th>
                       </tr>
                   </thead>
                   <tbody>
                       {this.workersList()}
                   </tbody>
               </table>
            </div>
        )
    }
}
