import React from 'react';
import './css/Checkbox.css';

export default function Checkbox({ name, onclick, label, id, classStyle }) {
  return (
    <div className="checkbox">
      <label className={classStyle} htmlFor={id}>{label}</label><br />
      <input type="radio" name={name} id={id} onClick={onclick} />
    </div>
  );
}
