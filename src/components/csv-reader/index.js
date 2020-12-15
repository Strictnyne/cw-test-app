import React, {Component} from "react";
import {CSVReader} from "react-papaparse";
import Results from "../results";

const buttonRef = React.createRef();

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sheetHeader: null,
            currentData: null,
            originalData: null,
            sortAsc: true
        }
    }

    handleOpenDialog = (event) => {
        if(buttonRef.current) {
            buttonRef.current.open(event);
        }
    }

    handleOnFileLoad = (data) => {
        let headerRow = []
        let sheetRows = []

        Object.keys(data[0].data).forEach(value => {
            headerRow.push(value.trim())
        })

        data.forEach((element) => {
            let dataRow = element.data
            let parsedData = JSON.stringify(dataRow)
            let cleanData = parsedData.replace(/"([^"]+)\s"/g, '"$1"')
            let cleansedObject = JSON.parse(cleanData)

            if(cleansedObject["Camper Make"] !== "")
                return sheetRows.push(cleansedObject)
            return false;
        })

        this.setState({
            sheetHeader: headerRow,
            currentData: sheetRows,
            originalData: sheetRows
        })
    };

    handleOnError = (err, file, inputElem, reason) => {
        console.log('---------------------------');
        console.log(err);
        console.log('---------------------------');
    };

    handleOnRemoveFile = () => {
        this.setState({
            sheetHeader: null,
            sheetData: null
        })
    }

    handleRemoveFile = (event) => {
        if(buttonRef.current) {
            buttonRef.current.removeFile(event);
        }
    }

    handleFilterResults = (event) => {
        let currentResults = this.state.originalData
        let alphaNumeric = /^[0-9a-zA-Z]+$/;
        let currentSearchTerm = event.target.value.toLowerCase()
        let newCurrentResults = []

        if(!currentSearchTerm.match(alphaNumeric) && currentSearchTerm !== "") {
            alert("Please use only alpha-numeric text.")
            return false;
        }

        const updatedResults = currentResults.filter(item => {
            return Object.keys(item).some((key) => {
                if(item[key].toLowerCase().search(currentSearchTerm) > -1) {
                    return newCurrentResults.push(item)
                }
                return false
            });
        });

        this.setState({
            currentData: updatedResults
        });
    }

    handleSorting = (type) => {
        let sortedData = this.state.currentData
        const { sortAsc } = this.state

        if(type === "Camper Make" || type === "Camper Brand") {
            if(sortAsc) {
                sortedData = [...sortedData].sort((first, last) => {
                        return first[type].localeCompare(last[type])
                })
            }
            else {
                sortedData = [...sortedData].reverse((first, last) => {
                    return last[type].localeCompare(first[type])
                })
            }
        }
        else {
            sortedData = [...sortedData].sort((first, last) =>
                sortAsc ? first[type] - last[type] : last[type] - first[type]
            )
        }

        this.setState(prevState => ({
            currentData: sortedData,
            sortAsc: !prevState.sortAsc
        }))
    }

    render() {
        const { sheetHeader, currentData } = this.state;

        return (
            <div className="grid-x grid-margin-x">
                <div className="cell small-8 small-offset-2">

                        <CSVReader
                            ref={buttonRef}
                            onFileLoad={this.handleOnFileLoad}
                            onError={this.handleOnError}
                            noClick
                            noDrag
                            config={{
                                header: true
                            }}
                            noProgressBar
                            onRemoveFile={this.handleOnRemoveFile}
                        >

                        {({file}) => (
                            <div>
                                <div>
                                    <button type="button" onClick={this.handleOpenDialog} className="button">
                                        Browse file
                                    </button>
                                    <div style={{padding: 10}}>{file && file.name}</div>
                                </div>
                            </div>
                        )}
                    </CSVReader>

                    <Results sheetHeader={sheetHeader}
                             currentData={currentData}
                             filterResults={this.handleFilterResults}
                             sortResults={this.handleSorting}
                    />
                </div>
            </div>
        );
    }
}

export default Index;