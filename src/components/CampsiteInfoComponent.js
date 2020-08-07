import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {
    constructor(props) {
        super(props);
    }

    renderCampsite(campsite) {
        return (
            <div className ="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
            </div>
        );
        return <div />;
    }

    render() {
        if (!this.props.campsite) {
            return (
                <div />
            );
        };

        return (
            <div className="container">
                <div className="row">
                    {/* {this.props.campsite.name} */}
                    {this.renderCampsite(this.props.campsite)}
                </div>
                <div className="row">
                    {this.renderComments(this.props.campsite.comments)}
                </div>
            </div>
        );
    }

    renderComments(comments) {
        if (comments) {
            return (
                <div className = "col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map((comment) => {
                        const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                            .format(new Date(Date.parse(comment.date)));

                        return (
                            <div className ="comment">
                                <div key={comment.id}>{comment.text}</div>
                                <div key={comment.id}> --- {comment.author} , {formattedDate}</div>
                            </div>
                        )
                    })}
                </div>
            );
        }
        return <div />;
    }
}

export default CampsiteInfo;








