import React from 'react';

function Modal({ setClose, children }) {
    return (
        <div className="globalModal">
            <div className="globalModal__backdrop" onClick={() => setClose(true)}></div>
            {/* <div className="close_btn" onClick={() => setClose(true)}></div> */}
            <div className="globalModal__con">{children}</div>
        </div>
    );
}

export default Modal;
