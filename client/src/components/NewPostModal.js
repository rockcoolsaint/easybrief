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
import { addPost } from '../actions/postActions';
import PropTypes from 'prop-types'

//import { v4 as uuid } from 'uuid';

class NewPostModal extends Component {
  state = {
    modal: false,
    title: '',
    content: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      content: this.state.content
    }

    // Add post via addPost action
    this.props.addPost(newPost);

    // Close modal
    this.toggle();
  }

  render() {
    return(
      <div>
        { this.props.isAuthenticated ?
          <Button
            color="dark"
            style={{marginBottom: '2rem'}}
            onClick={this.toggle}
          >
            Create Post
          </Button> : <h4 className="mb-3 ml-4">Please log in to manage items</h4>
        }

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Create New Post</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
              <Label for="post">Title</Label>
              <Input
                type="text"
                name="title"
                id="post"
                placeholder="Add Post Title"
                onChange={this.onChange}
              />
              <Label for="content">Content</Label>
              <Input
                type="textarea"
                name="content"
                id="content"
                placeholder="Content"
                onChange={this.onChange}
              />
              <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
              >Submit Post</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addPost })(NewPostModal);