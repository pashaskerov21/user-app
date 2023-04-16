import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

export default class FormModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: null,
            firstname: '',
            lastname: '',
            username: '',
        }
    }
    onSubmit(){
        
        this.props.addUser(
            this.state.firstname,
            this.state.lastname,
            this.state.username
        )
        this.props.hide();
    }
    onUpdate(){
        this.props.editUser(
            this.state.id,
            this.state.firstname,
            this.state.lastname,
            this.state.username,
        )
        if(this.state.firstname=='' || this.state.lastname=='' || this.state.username==''){
            toast.error("Zəhmət olmasa formu doldurun")
        }else{
            this.props.hide();
            toast.success('Dəyişikliklər yadda saxlanıldı')
        }
    }
    componentDidMount(){
        this.setState({
            id: this.props.user.id,
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            username: this.props.user.username,
        })
    }
  render() {
    return (
      <Modal isOpen={this.props.visible}>
        <ModalHeader>{this.props.title}</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label for='input-lastname'>Soyad</Label>
                    <Input value={this.state.lastname || ''} onChange={(e) => this.setState({ lastname: e.target.value})} type='text' id='input-lastname' name='lastname' placeholder='Soyadınız'/>
                </FormGroup>
                <FormGroup>
                    <Label for='input-firstname'>Ad</Label>
                    <Input value={this.state.firstname || ''} onChange={(e) => this.setState({ firstname: e.target.value})} type='text' id='input-firstname' name='firstname' placeholder='Adınız'/>
                </FormGroup>
                <FormGroup>
                    <Label for='input-username'>İstifadəçi Adı</Label>
                    <Input value={this.state.username || ''} onChange={(e) => this.setState({ username: e.target.value})} type='text' id='input-username' name='username' placeholder='İstifadəçi adınız'/>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            {
                this.props.user.id ? (
                    <button className="btn btn-success modal-edit-button" onClick={() => this.onUpdate()}>Düzəliş et</button>
                ) : (
                    <button className="btn btn-success modal-add-button" onClick={() => this.onSubmit()}>Əlavə et</button>
                )
            }
            <button className="btn btn-danger modal-cancel-button" onClick={() => {this.props.hide()}}>Ləğv et</button>
        </ModalFooter>
      </Modal>
    )
  }
}
