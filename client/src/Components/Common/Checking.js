import React from 'react';
import './css/Checking.css';

const Checking = props => {
    return (
        <>
            <div className="lds-checking" style={{ width: '100%', height: '100%' }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>Checking if session is availble....</p>
        </>
    );
};


export default Checking;
