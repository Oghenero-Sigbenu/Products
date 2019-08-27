import React from 'react';
import './css/Input.css';
// import eye from '../../assets/images/eye.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export default function Input({ placeHolder, type, handleChange, label, value, name, change, icon }) {
  return (
    <div className="form-element">
      <label>{label}</label><br />
      <input placeholder={placeHolder} type={type} onChange={handleChange} value={value} name={name} />
      {icon ?
        type !== 'password' ?
          <FontAwesomeIcon icon={faEye} onClick={change} className='show-password' />
          :
          <FontAwesomeIcon icon={faEyeSlash} onClick={change} className='show-password' />
        :
        ''}

    </div>
  );
}
