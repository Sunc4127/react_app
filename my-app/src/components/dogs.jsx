import React, { Component } from "react";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
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
                i--;
            }
        }
        console.log(dogs);
        this.state.dogs = dogs;
        this.setState(dogs);
    }

    render() {
        const { length: count } = this.state.dogs;
        console.log("Count is: " + count);
        if (count === 0) return <p>Dogs Loading...</p>;
        return (
            <React.Fragment>
                <p> Showing {count} Dogs in the database. </p>
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
