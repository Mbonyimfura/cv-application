import { Fragment, useState,useEffect } from "react";
import './PersonalInformation.css'
import { FaUser, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function PersonalInformation() {
  const initialData = {
    fullName: '',
    lastName: '',
    email: '',
    tel: '',
  };

  const [formData, setFormData] = useState(initialData);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('user_data');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    // Reset the form data to the initial state when cancelling
    setFormData(initialData);
  };

  const handleSubmit = () => {
    setIsEdit(false);
    // Save the edited data
    const { fullName,email, tel } = formData;
    const userData = {
    fullName,
      email,
      tel,
    };
    const userDataJson = JSON.stringify(userData);
    localStorage.setItem('user_data', userDataJson);
    cons
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <div className="container">
        <div className="left-side">
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="fulName">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            <label htmlFor="tel">Tel</label>
            <input type="text" name="tel" value={formData.tel} onChange={handleChange} />
            {isEdit ? (
              <div>
                <button onClick={handleCancel}>CANCEL</button>
                <button onClick={handleSubmit}>SUBMIT</button>
              </div>
            ) : (
             <div> 
               <button onClick={handleCancel}>CANCEL</button>
                <button onClick={handleSubmit}>SUBMIT</button>
              <button onClick={handleEdit}>Edit</button></div>
              
            )}
          </form>
        </div>
        <div className="right-side">
    
       <div className="header">
       <div style={{ whiteSpace: 'nowrap' }}>
               {formData.fullName} 
              
              </div>
            <div className="contact">
            <div className="icon-text">
              <FaEnvelope />    {formData.email}
              </div>
              <div className="icon-text"> <FaPhoneAlt/> {formData.tel}</div>
            </div>
       </div>
            </div>
      </div>
    </Fragment>
  );
}
