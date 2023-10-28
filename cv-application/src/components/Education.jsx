// Education.js
import './Education.css';
import React, { useEffect, useState } from 'react';

function Education() {
    const initialData = {
        schoolName: '',
        studyTitle: '',
        startDate: '',
        endDate: '',
    };

    const [studyData, setStudyData] = useState(initialData);
    const [educationEntries, setEducationEntries] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        // Load education entries from local storage
        const storedData = localStorage.getItem('education-entries');
        if (storedData) {
            setEducationEntries(JSON.parse(storedData));
        }
    }, []);

    const handleEdit = (index) => {
        setStudyData(educationEntries[index]);
        setIsEditing(true);
        setActiveIndex(index);
    };

    const handleSaveEducation = (e) => {
        e.preventDefault();

        const updatedEntries = [...educationEntries];
        if (isEditing && activeIndex !== null) {
            updatedEntries[activeIndex] = studyData;
        } else {
            updatedEntries.push(studyData);
        }

        // Store the updated entries in local storage
        localStorage.setItem('education-entries', JSON.stringify(updatedEntries));

        setEducationEntries(updatedEntries);
        setStudyData(initialData);
        setIsEditing(false);
        setActiveIndex(null);
    };

    const handleDelete = (index) => {
        const updatedEntries = [...educationEntries];
        updatedEntries.splice(index, 1);

        // Store the updated entries in local storage
        localStorage.setItem('education-entries', JSON.stringify(updatedEntries));

        setEducationEntries(updatedEntries);
    };

    return (
        <div className='container'>
            <div className="left-side">
                <div>
                    <h2>Education</h2>
                    {isEditing ? (
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Add Education</button>
                    )}
                    {educationEntries.map((entry, index) => (
                        <div key={index} className='result-card'>
                            <div>
                                <p>{entry.studyTitle}    <div className="card-actions">
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </div></p>
                                
                            </div>
                         
                        </div>
                    ))}
                </div>
                {isEditing && (
                    <form onSubmit={handleSaveEducation}>
                        <label htmlFor="schoolName">School Name</label>
                        <input
                            type="text"
                            name="schoolName"
                            value={studyData.schoolName}
                            onChange={(e) =>
                                setStudyData({ ...studyData, schoolName: e.target.value })
                            }
                        />
                        <label htmlFor="studyTitle">Title of the Study</label>
                        <input
                            type="text"
                            name="studyTitle"
                            value={studyData.studyTitle}
                            onChange={(e) =>
                                setStudyData({ ...studyData, studyTitle: e.target.value })
                            }
                        />
                        <div className="date-inputs">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={studyData.startDate}
                                onChange={(e) =>
                                    setStudyData({ ...studyData, startDate: e.target.value })
                                }
                            />
                            <label htmlFor="endDate">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={studyData.endDate}
                                onChange={(e) =>
                                    setStudyData({ ...studyData, endDate: e.target.value })
                                }
                            />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                )}
            </div>
            <div className="right-side">
                <h2>Education</h2>
                {educationEntries.map((entry, index) => (
                    <div key={index} className='result-card'>
                        <div className='result'>
                        <div>{`${entry.startDate} - ${entry.endDate}`}</div>
                            <div> {entry.schoolName}</div>
                            <div> {entry.studyTitle}</div>
                           
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Education;
