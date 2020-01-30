import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addTask } from '../actions/taskActions';

class TaskModal extends Component {
  state = {
    modal: false,
    name: ''
  };

  toggle = () => {
    this.setState(state => ({
      modal: !state.modal
    }));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newTask = {
      name: this.state.name
    };

    // Add task via addTask action
    this.props.addTask(newTask);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Add Task
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Task List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Task</Label>
                <Input
                  type='text'
                  name='name'
                  id='task'
                  placeholder='Add Task'
                  onChange={this.onChange}
                ></Input>
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Task
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  task: state.task
});

export default connect(mapStateToProps, { addTask })(TaskModal);
