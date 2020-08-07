import React, { Component } from 'react';
// import React from 'react';
// const Component = React.Component
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import CampsiteInfo from './CampsiteInfoComponent';

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCampsite: null
            // campsites: [
            //     {
            //         id: 0,
            //         name: 'React Lake Campground',
            //         image: 'assets/images/react-lake.jpg',
            //         elevation: 1233,
            //         description: "Nestled in the foothills of the Chrome Mountains, this campground on the shores of the pristine React Lake is a favorite for fly fishers."
            //     },
            //     {
            //       id: 1,
            //       name: 'Chrome River Campground ',
            //       image: 'assets/images/chrome-river.jpg',
            //       elevation: 877,
            //       description: "Spend a few sunny days and starry nights beneath a canopy of old-growth firs at this enchanting spot by the Chrome River."
            //     },
            //     {
            //         id: 2,
            //         name: 'Breadcrumb Trail Campground',
            //         image: 'assets/images/breadcrumb-trail.jpg',
            //         elevation: 2901,
            //         description: "Let NuCamp be your guide to this off-the-beaten-path, hike-in-only campground."
            //     },
            //     {
            //         id: 3,
            //         name: 'Redux Woods Campground',
            //         image: 'assets/images/redux-woods.jpg',
            //         elevation: 42,
            //         description: "You'll never want to leave this hidden gem, deep within the lush Redux Woods."
            //     }
            // ],
        };
    }

    onCampsiteSelect(campsite) {
        this.setState({selectedCampsite: campsite});
        // this.state = { selectedCampsite: campsite };
        // this.render();
    }

    // renderSelectedCampsite(campsite) {
    //     if (campsite) {
    //         return (
    //             <Card>
    //                 <CardImg top src={campsite.image} alt={campsite.name} />
    //                 <CardBody>
    //                     <CardTitle>{campsite.name}</CardTitle>
    //                     <CardText>{campsite.description}</CardText>
    //                 </CardBody>
    //             </Card>
    //         );
    //     }
    //     return <div />;
    // }

    render() {
        const directory = this.props.campsites.map(campsite => {
            return (
                <div key={campsite.id}className="col-md-5 m-1">
                    <Card onClick={() => this.onCampsiteSelect(campsite)}>
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
                {/* <ExampleParentComponent /> */}
                <div className="row">
                    <CampsiteInfo campsite={this.state.selectedCampsite}/>
                </div>
            </div>
        );
    }
}

// class ExampleParentComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             number: 333
//         }
//     }
//     render() {
//         return <ExampleChildComponent number={this.state.number} greeting="Hello World"/>;
//     }
// }

// class ExampleChildComponent extends Component {
//     render() {
//         return <div>{this.props.number} {this.props.greeting}</div>
//     }
// }

export default Directory;