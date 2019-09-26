import React, { Component } from "react";
import { DeleteOutlined } from '@material-ui/icons';
import { EditOutlined } from '@material-ui/icons';

import { CancelOutlined } from '@material-ui/icons';
import { DoneOutline } from '@material-ui/icons';

import Input from "@material-ui/core/Input";

import axios from 'axios';

import {GET_ALL_USERS, TASKS} from './../settings/settings'

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      girdData: []
    };
    this.handleCellEdit = this.handleCellEdit.bind(this);
    this.handleCellDelete = this.handleCellDelete.bind(this);
    this.handleCellSave = this.handleCellSave.bind(this);
    this.handleCellIgnore = this.handleCellIgnore.bind(this);
    this.handleAddButtonChange = this.handleAddButtonChange.bind(this);
  }

  componentDidMount() {
    this.props.handleAddButtonChange(this.handleAddButtonChange);
    this.getAllUser();
  }

  /**
   * @memberof UserTable
   */
  async getAllUser(){
    try{
      let result = await axios.get(GET_ALL_USERS);
      this.setState({girdData: result.data})
    }catch(e){
      alert(e);
    }
  }
  

  handleAddButtonChange(e){
    if(this.state.mode === 'add'){
      alert('save current change');
      return;
    }

    let usersCopy = JSON.parse(JSON.stringify(this.state.girdData));
    this.setState({usersCopy});
    let girdData = this.state.girdData.map((user) => {
      user.editMode = false;
      return user;
    });
    if(this.state.mode !== 'add') {
      let girdData = this.state.girdData;
      girdData.push({
        id: 'new',
        name: '',
        type: '',
        favorite: '',
        editMode: true,
      });
      this.setState({girdData, mode: 'add'});
    } 
  }

  handleCellEdit(e, selectedUser) {
    let usersCopy = JSON.parse(JSON.stringify(this.state.girdData));
    this.setState({usersCopy});
    let girdData = this.state.girdData.map((user) => {
        user.editMode = (selectedUser.id === user.id);
        return user;
    });
    this.setState({girdData, mode: 'edit'});
  }
  
  async handleCellDelete(e, selectedUser){
    // let girdData = this.state.girdData.filter((user) => {
    //     return selectedUser.id !== user.id;
    // });  
    await axios.delete(`${TASKS}/${selectedUser.id}`); 
    this.getAllUser();
    this.setState({girdData, mode: ''});
  }
  

  async handleCellSave(e, selectedUser) {
    alert(JSON.stringify(selectedUser));
    let error = this.validateError(selectedUser);
    if(error){
      return alert(error);
    }

    if(selectedUser.id ===  'new'){
      selectedUser.id = await axios.post(TASKS, {
        "Name" : selectedUser.Name,
        "Type" : selectedUser.Type,
        "Favorite": selectedUser.Favorite
      });
    }else {
      await axios.put(`${TASKS}/${selectedUser.id}`, {
        "id": selectedUser.Name,
        "Name" : selectedUser.Name,
        "Type" : selectedUser.Type,
        "Favorite": selectedUser.Favorite
      });    
    }

    this.getAllUser();
    // let girdData = this.state.girdData.map((user) => {
    //   user.editMode = false;
    //   return user;
    // });
    this.setState({girdData, mode: ''});
  }


  handleCellIgnore(e, selectedUser){
    let girdData = this.state.usersCopy;
    this.setState({girdData, mode: ''});
  }

  handlechange(e, selectedUser, key){
    let girdData = this.state.girdData.map((user) => {
      if(selectedUser.id === user.id){
        user[key] = e.target.value;
      }
        return user;
    });    
    this.setState({girdData});
  }
  
  
  render() {
    return (
        <table style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Favorite</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.girdData.map((user)=>{
              return <tr>
              <td><Input value={user.Name} placeholder={"Name"} editable={!user.editMode} onChange={(e)=> this.handlechange(e, user, 'Name')}></Input></td>
              <td><Input value={user.Type} placeholder={"Type"}editable={!user.editMode} onChange={(e)=>this.handlechange(e, user, 'Type')}></Input></td>
              <td><Input value={user.Favorite} placeholder={"Favorite"} editable={!user.editMode} onChange={(e)=>this.handlechange(e, user, 'Favorite')}></Input></td>
              {!user.editMode ? 
               (this.state.mode === 'add' || this.state.mode === 'edit') ? '': <td>
                <EditOutlined variant="contained" color="primary" onClick={(e) => this.handleCellEdit(e,user)}>Edit</EditOutlined>
                <DeleteOutlined variant="contained" color="primary" onClick={(e) => this.handleCellDelete(e,user)}>Delete</DeleteOutlined>
              </td> 
              :
              <td>
                <DoneOutline variant="contained" color="primary" onClick={(e) => this.handleCellSave(e,user)}>Edit</DoneOutline>
                <CancelOutlined variant="contained" color="primary" onClick={(e) => this.handleCellIgnore(e,user)}>Delete</CancelOutlined>
                </td>
              }
            </tr>;
            })}
            
          </tbody>
        </table>
      );
  }

  validateError(user){
    if(!user.Name){
      return 'Enter Name';
    } if(!user.Type){
      return 'Enter Type';
    } if(!user.Favorite){
      return 'Enter Favorite';
    }
    return false;
  }

}
export default UserTable;

