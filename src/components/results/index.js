import React, {Component} from "react";
import ResultItem from "./result-item";


class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentData: null,

        }
    }

    static getDerivedStateFromProps(props) {
        return {
            currentData: props.currentData,
        };
    }

    render() {
        const { sheetHeader, filterResults, sortResults } = this.props;
        const { currentData, sortOrder } = this.state;

        return (
            <div className="grid-x grid-margin-x">
                <div className="columns small-8 small-offset-2">
                    {currentData &&
                        <div className="animate__animated animate__fadeIn">
                            <div className="animate__animated animate__fadeInDown">
                                <input type="text" placeholder="Filter Results" onChange={filterResults}/>
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        {
                                            Object.keys(sheetHeader).map((item, index) => {
                                                let keyName = sheetHeader[item]
                                                let link = <a href="#" onClick={() => sortResults(keyName, sortOrder)}>{keyName}</a>

                                                return (
                                                    <th key={index}>
                                                        {link}
                                                    </th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        currentData.length > 0 ?
                                            Object.entries(currentData).map(([key, value]) => (
                                                <ResultItem key={key} value={value} />
                                            ))
                                            : <tr><td colSpan={4}>No results found</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Results;