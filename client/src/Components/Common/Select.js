import React from 'react';
import './css/Select.css';

export default function Select({ name, children, onchange, selectedId }) {
    return (
        <select className="select-group" name={name} onChange={onchange} value={selectedId}>
            {children && children.map((child, index) => (
                <option value={child.id} key={index}>{child.title}</option>
            ))
            }
        </select>
    );
}
