import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody,
    Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


// class CampsiteInfo extends Component {
//     constructor(props) {
//         super(props);
//     }


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        //   isNavOpen: false,
          isModalOpen: false
        };

        // this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleSubmit.bind(this);
        }

    // toggleNav() {
    //     this.setState({
    //         isNavOpen: !this.state.isNavOpen
    //     });
    // }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        // console.log('this', this)
        // console.log('values', values)
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
        // console.log('Current State is: ' + JASON.stringify(values));
        // // alert(`Rating: ${values.rating} Author: ${values.author} Text: ${values.text}`);
        // alert('Current State is: ' + JASON.stringify(values));

    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <div className="col-md-12">
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={5}>Rating</Label>
                                <Col md={12}>
                                <Control.select
                                    model=".rating"
                                    id="rating"
                                    name="rating"
                                    placeholder="1"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show="touched"
                                    component="div"
                                    messages={{
                                    required: 'Required'
                                }}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={5}>Your Name</Label>
                                <Col md={12}> 
                                    <Control.text 
                                    model=".author" 
                                    id="author" 
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    >
                                    </Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="text" md={5}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea 
                                    model=".text" 
                                    id="text" 
                                    name="text"
                                    rows="6"
                                    className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 0}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                    </div>
                </ModalBody>
                </Modal>
            </React.Fragment>
         );
      }
    }

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
    return <div />;
}

function RenderComments({comments, postComment, campsiteId}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                <Stagger in>
                {comments.map(comment => {
                    return (
                        <Fade in key={comment.id}>
                        <div>
                            <p>
                                {comment.text}<br />
                                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    </Fade>
                    );
                })}
                </Stagger>
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    }
    return <div />
}

    // render() {
    //     if (!this.props.campsite) {
    //         return (
    //             <div />
    //         );
    //     };

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
}

    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    } 
    
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
    return <div />;
}

//     renderComments(comments) {
//         if (comments) {
//             return (
//                 <div className = "col-md-5 m-1">
//                     <h4>Comments</h4>
//                     {comments.map((comment) => {
//                         const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
//                             .format(new Date(Date.parse(comment.date)));

//                         return (
//                             <div className ="comment">
//                                 <div key={comment.id}>{comment.text}</div>
//                                 <div key={comment.id}> --- {comment.author} , {formattedDate}</div>
//                             </div>
//                         )
//                     })}
//                 </div>
//             );
//         }
//         return <div />;
//     }
// }

export default CampsiteInfo;




