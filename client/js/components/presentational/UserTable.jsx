import React, { Component } from "react";
import { DeleteOutlined } from '@material-ui/icons';
import { EditOutlined } from '@material-ui/icons';

import { CancelOutlined } from '@material-ui/icons';
import { DoneOutline } from '@material-ui/icons';

import Input from "@material-ui/core/Input";

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      users: [{
        id: 1,
        name: 'Sandeep',
        type: 'Food',
        favorite: 'Spicy',
      }, 
      {
        id: 2,
        name: 'Ravi',
        type: 'Movie',
        favorite: 'Action',
      }]
    };
    this.handleCellEdit = this.handleCellEdit.bind(this);
    this.handleCellDelete = this.handleCellDelete.bind(this);
    this.handleCellSave = this.handleCellSave.bind(this);
    this.handleCellIgnore = this.handleCellIgnore.bind(this);
    this.handleAddButtonChange = this.handleAddButtonChange.bind(this);
  }

  componentDidMount() {
    this.props.handleAddButtonChange(this.handleAddButtonChange);
  }

  handleAddButtonChange(e){
    if(this.state.mode === 'add'){
      alert('save current change');
      return;
    }

    let usersCopy = JSON.parse(JSON.stringify(this.state.users));
    this.setState({usersCopy});
    let users = this.state.users.map((user) => {
      user.editMode = false;
      return user;
    });
    if(this.state.mode !== 'add') {
      let users = this.state.users;
      users.push({
        id: 'new',
        name: '',
        type: '',
        favorite: '',
        editMode: true,
      });
      this.setState({users, mode: 'add'});
    } 
  }

  handleCellEdit(e, selectedUser) {
    let usersCopy = JSON.parse(JSON.stringify(this.state.users));
    this.setState({usersCopy});
    let users = this.state.users.map((user) => {
        user.editMode = (selectedUser.id === user.id);
        return user;
    });
    this.setState({users, mode: 'edit'});
  }
  
  handleCellDelete(e, selectedUser){
    let users = this.state.users.filter((user) => {
        return selectedUser.id !== user.id;
    });  
    this.setState({users, mode: ''});
  }
  
  handleCellSave(e, selectedUser) {
    let error = this.validateError(selectedUser);
    if(error){
      return alert(error);
    }
    if(this.state.mode === 'add'){
      alert('add');
    }else{
      alert('update');
    }
    let users = this.state.users.map((user) => {
      user.editMode = false;
      return user;
    });
    this.setState({users, mode: ''});
  }


  handleCellIgnore(e, selectedUser){
    let users = this.state.usersCopy;
    this.setState({users, mode: ''});
  }

  handlechange(e, selectedUser, key){
    let users = this.state.users.map((user) => {
      if(selectedUser.id === user.id){
        user[key] = e.target.value;
      }
        return user;
    });    
    this.setState({users});
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
            {this.state.users.map((user)=>{
              return <tr>
              <td><Input value={user.name} placeholder={"Name"} editable={!user.editMode} onChange={(e)=> this.handlechange(e, user, 'name')}></Input></td>
              <td><Input value={user.type} placeholder={"Type"}editable={!user.editMode} onChange={(e)=>this.handlechange(e, user, 'type')}></Input></td>
              <td><Input value={user.favorite} placeholder={"Favorite"} editable={!user.editMode} onChange={(e)=>this.handlechange(e, user, 'favorite')}></Input></td>
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
    if(!user.name){
      return 'Enter Name';
    } if(!user.type){
      return 'Enter Type';
    } if(!user.favorite){
      return 'Enter Favorite';
    }
    return false;
  }

}
export default UserTable;

