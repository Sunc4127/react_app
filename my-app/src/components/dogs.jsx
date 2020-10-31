import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import * as bs from "react-bootstrap";
import "./dogs.css";

class Dogs extends Component {
    constructor() {
        super();
        this.state = {
            dogs: [],
        };
    }

    async componentDidMount() {
        var dogs = [];
        // get eight valid input
        for (var i = 0; i < 8; i++) {
            const { data: dog } = await axios.get(
                "https://random.dog/woof.json"
            );
            dog.id = i;
            if (
                dog.url.toLowerCase().includes(".png") ||
                dog.url.toLowerCase().includes(".gif") ||
                dog.url.toLowerCase().includes(".jpg") ||
                dog.url.toLowerCase().includes(".mp4")
            ) {
                dogs.push(dog);
            } else {
                // if invalid, continue reading
                //console.log(dog.u)
                i--;
            }
        }
        this.state.dogs = dogs;
        this.setState(dogs);
    }

    render() {
        const { length: count } = this.state.dogs;
        if (count === 0) return (
            <h1>
                <bs.Badge variant="dark" className="load">Images and Videos Loading......</bs.Badge>{" "}
            </h1>
        );
        return (
            <React.Fragment>
                <h3>
                    <bs.Badge variant="dark" className="count">
                        {" "}
                        Showing {count} Dogs in the database.{" "}
                    </bs.Badge>
                </h3>
                <bs.Container fluid className="container">
                    <bs.Row>
                        {this.state.dogs.map((dog) =>
                            dog.url.toLowerCase().includes(".png") ||
                            dog.url.toLowerCase().includes(".gif") ||
                            dog.url.toLowerCase().includes(".jpg") ? (
                                <bs.Col
                                    lg="3"
                                    md="6"
                                    sm="12"
                                    key={guidGenerator()}
                                >
                                    <img
                                        className="grid-item"
                                        src={dog.url}
                                        alt=""
                                    />
                                </bs.Col>
                            ) : (
                                <bs.Col
                                    lg="3"
                                    md="6"
                                    sm="12"
                                    key={guidGenerator()}
                                >
                                    <ReactPlayer
                                        className="grid-item"
                                        url={dog.url}
                                        controls={true}
                                        width={"100%"}
                                    />
                                </bs.Col>
                            )
                        )}
                    </bs.Row>
                    <bs.Row>
                        <bs.Col>
                            <bs.Button
                                className="grid-item"
                                size="lg"
                                onClick={() => {
                                    this.componentDidMount();
                                }}
                            >
                                Refresh
                            </bs.Button>
                        </bs.Col>
                    </bs.Row>
                </bs.Container>
            </React.Fragment>
        );
    }
}

// copied from https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
// get a unique ID
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
    );
}

export default Dogs;
