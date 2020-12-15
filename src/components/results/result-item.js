import React, {Component} from "react";

class ResultItem extends Component {
    currencyFormatter = (currency) => {
        if(currency !== "n/a") {
            return '$' + currency.toLocaleString('en-US', { style: 'currency' });
        }
        return "n/a";
    }

    render() {
        const { value } = this.props;

        return (
            <tr className="animate__animated animate__fadeInUp">
                {
                    Object.entries(value).map(([index, data]) => (
                        <td key={index}>
                            {
                                index === "Price"
                                    ? this.currencyFormatter(data)
                                    : data
                            }
                        </td>
                    ))
                }
            </tr>
        );
    }
}

export default ResultItem;