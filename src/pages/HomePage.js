import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'
import { v4 as uuidv4 } from 'uuid';
import UserListComponent from '../components/UserListComponent'
import { ToastContainer, toast } from 'react-toastify';

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [
                {
                    id: uuidv4(),
                    firstname: 'Əlipaşa',
                    lastname: 'Əskərov',
                    username: "@pashaaskerov21",
                },
            ]
        }
        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
    }
    addUser = (firstname,lastname,username) => {
        if(firstname, lastname, username){
            const users = [...this.state.users]
            users.push({
                id: uuidv4(),
                firstname: firstname,
                lastname: lastname,
                username: username,
            })
            this.setState({users});
            toast.success(`"${firstname}" adlı istifadəçi əlavə edildi`)
        }
    }
    deleteUser = (obj) => {
        const users = this.state.users.filter(user=>{
            return user.id !== obj.id
        })
        this.setState({users});
        toast.info(`"${obj.firstname}" adlı istifadəçi silindi`)
    }
    editUser = (id, firstname, lastname, username) => {
        if(id, firstname, lastname, username){
            const users = [...this.state.users];
            let updatedUsers = users.map(user=>{
                if(user.id == id){
                    user = {
                        id: id,
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                    }
                }
                return user;
                
            });
            this.setState({
                users: updatedUsers
            })
            
            
        }
    }
  render() {
    return (
      <div>
        <ToastContainer/>
        <Navbar>
            <div className="nav container">
                <NavbarBrand className='nav-brand' href="/">User app</NavbarBrand>
            </div>
        </Navbar>
        <UserListComponent 
            users={this.state.users}
            addUser={this.addUser}   
            deleteUser={this.deleteUser} 
            editUser={this.editUser}
        />
      </div>
    )
  }
}
