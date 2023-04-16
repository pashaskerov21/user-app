import React, { Component } from 'react'
import { Alert, Table } from 'reactstrap'
import {MdModeEditOutline} from 'react-icons/md'
import {BsFillTrashFill} from 'react-icons/bs'
import FormModal from './FormModal'

export default class UserListComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            user: {},
        }
        this.hide = this.hide.bind(this)
    }
    hide(){
        this.setState({visible: false})
    }
    getElementById(value){
        this.setState({
            user: value,
            visible: true,
            title: value.lastname + ' ' + value.firstname,
        })
    }
  render() {
    return (
      <div className='container py-3 px-0'>
        <button className="btn btn-primary add-button" onClick={() => this.setState({user: {}, visible: true, title: 'Yeni İstifadəçi'})}>Əlavə Et</button>
        {this.state.visible ? (
            <FormModal 
                visible={this.state.visible}
                hide={this.hide}
                addUser={this.props.addUser}
                editUser={this.props.editUser}
                user={this.state.user}
                title={this.state.title}
            />
        ) : null}
        {this.props.users.length > 0 ? (
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Soyadı</th>
                        <th>Adı</th>
                        <th>İstifadəçi adı</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.users.map(user=>(
                            <tr key={user.id}>
                                <th scope='row'></th>
                                <td>{user.lastname}</td>
                                <td>{user.firstname}</td>
                                <td>{user.username}</td>
                                <td className='d-flex'>
                                    <button className="btn btn-warning edit-button" onClick={() => this.getElementById(user)}><MdModeEditOutline className='text-white'/></button>
                                    <button className="btn btn-danger delete-button" onClick={() => this.props.deleteUser(user)}><BsFillTrashFill className='text-white'/></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        ) : (
            <Alert color="warning">İstifadəçi Yoxdur</Alert>
        )}
      </div>
    )
  }
}
