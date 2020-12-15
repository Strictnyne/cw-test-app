import './App.css';
import React, { Component } from "react"
import CSVReader from "./components/csv-reader/index"


export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="title">
                    <h2>Camping World CSV Upload</h2>
                </div>

                <div className="grid-x grid-margin-x">
                    <div className="columns small-12">
                        <CSVReader />
                    </div>
                </div>
            </div>
        );
    }
}
