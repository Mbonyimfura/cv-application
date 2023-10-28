import React, { Fragment, useState, useEffect } from "react";
import './Summary.css'

export default function Summary() {
    const [summaryData, setSummaryData] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    // Load summary data from local storage on component mount
    useEffect(() => {
        const storedSummary = localStorage.getItem('summary_data');
        if (storedSummary) {
            setSummaryData(storedSummary);
        }
    }, []);

    const handleEdit = () => {
        setIsEdit(true);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEdit(false);
        setSummaryData(e.target.summary.value);

        // Save the updated summary in local storage
        localStorage.setItem('summary_data', e.target.summary.value);
    }

    return (
        <Fragment>
            <div className="container">
                <div className="left-side">
                    {isEdit ? (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="summary">Summary</label>
                            <textarea
                                name="summary"
                                id="summary"
                                cols="30"
                                rows="10"
                                value={summaryData} // Bind the value to summaryData
                                onChange={(e) => setSummaryData(e.target.value)} // Handle change as you type
                            ></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    ) : (
                       <div>
                        <h2>Summary</h2>
                        <button onClick={handleEdit}>Edit</button>
                       </div>
                    )}
                </div>
                <div className="right-side">
                    <h2>Summary</h2>
                    <div>{summaryData}</div> 
                </div>
            </div>
        </Fragment>
    )
}
