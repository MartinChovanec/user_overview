import React from "react";
import logo from "./logo.svg";
import "./App.css";
import data from "./example-data.json";

function App() {
    console.log(data[0]);
    console.log(data[0].children);
    console.log(data[0].children.has_nemesis?.records, "teest");
    return (
        <div className="App">
            <div>
                {data.map((item, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        {Object.entries(item.data).map(([key, value]) => (
                            <div key={key}>
                                <strong>{key}:</strong> {value}
                            </div>
                        ))}
                        {item.children.has_nemesis?.records?.map((nemesisRecord, index) => (
                            <div key={index} style={{ marginBottom: "20px" }}>
                                {Object.entries(nemesisRecord.data).map(([key, value]) => (
                                    <div key={key}>
                                        <strong>{key}:</strong> {value}
                                    </div>
                                ))}
                            </div>
                        ))}
                        {item.children.has_nemesis?.records[0]?.children?.has_secrete?.records?.map((secreteRecords, index) => (
                            <div key={index} style={{ marginBottom: "20px" }}>
                                {Object.entries(secreteRecords.data).map(([key, value]) => (
                                    <div key={key}>
                                        <strong>{key}:</strong> {value}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
                <p></p>
            </div>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                Learn React
            </a>
        </div>
    );
}

export default App;
