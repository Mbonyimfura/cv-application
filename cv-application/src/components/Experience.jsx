
import './Experience.css';
import React, { useEffect, useState } from 'react';

function Experience() {
    const initialData = {
        companyName: '',
        position: '',
        responsibility: '',
        startDate: '',
        endDate: ''
    };

    const [experienceData, setExperienceData] = useState(initialData);
    const [experienceEntries, setExperienceEntries] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        // Load experience entries from local storage
        const storedData = localStorage.getItem('experience-entries');
        if (storedData) {
            setExperienceEntries(JSON.parse(storedData));
        }
    }, []);

    const handleEdit = (index) => {
        setExperienceData(experienceEntries[index]);
        setIsEditing(true);
        setActiveIndex(index);
    };

    const handleSaveExperience = (e) => {
        e.preventDefault();

        const updatedEntries = [...experienceEntries];
        if (isEditing && activeIndex !== null) {
            updatedEntries[activeIndex] = experienceData;
        } else {
            updatedEntries.push(experienceData);
        }

        // Store the updated entries in local storage
        localStorage.setItem('experience-entries', JSON.stringify(updatedEntries));

        setExperienceEntries(updatedEntries);
        setExperienceData(initialData);
        setIsEditing(false);
        setActiveIndex(null);
    };

    const handleDelete = (index) => {
        const updatedEntries = [...experienceEntries];
        updatedEntries.splice(index, 1);

        // Store the updated entries in local storage
        localStorage.setItem('experience-entries', JSON.stringify(updatedEntries));

        setExperienceEntries(updatedEntries);
    };

    const handleChange = (e) => {
        setExperienceData({
            ...experienceData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='container'>
            <div className="left-side">
                <div>
                    <h2>Experience</h2>
                    {isEditing ? (
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Add Experience</button>
                    )}
                    {experienceEntries.map((entry, index) => (
                        <div key={index} className='result-card'>
                            <div>
                                <p>{entry.companyName}</p>
                            </div>
                            <div className="card-actions">
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                {isEditing && (
                    <form onSubmit={handleSaveExperience}>
                        <label htmlFor="companyName">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            id="companyName"
                            value={experienceData.companyName}
                            onChange={handleChange}
                        />
                        <label htmlFor="position">Position Title</label>
                        <input
                            type="text"
                            name="position"
                            id="position"
                            value={experienceData.position}
                            onChange={handleChange}
                        />
                        <label htmlFor="responsibility">Main Responsibilities</label>
                        <input
                            type="text"
                            name="responsibility"
                            id="responsibility"
                            value={experienceData.responsibility}
                            onChange={handleChange}
                        />
                        <div className="date-inputs">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                id="startDate"
                                value={experienceData.startDate}
                                onChange={handleChange}
                            />
                            <label htmlFor="endDate">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                id="endDate"
                                value={experienceData.endDate}
                                onChange={handleChange}
                            />
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                )}
            </div>
            <div className="right-side">
                <h2>Experience</h2>
                {/* Display experience entries here */}
                {experienceEntries.map((entry, index) => (
                    <div key={index} className='result-card'>
                        <div className='result'>
                        <div>{`${entry.startDate} - ${entry.endDate}`}</div>
                            <div>{entry.companyName}</div>
                            </div>
                            <div className="result-one">
                            <div style={{ whiteSpace: 'nowrap' }}>{entry.position}</div>

                            <div>{entry.responsibility}</div>
                            </div>
                          
                       
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Experience;
