import { useState } from 'react';

import formatDate from './../../util/formatDate';
import Modal from './../Modal';

function SearchItem({ data }) {
    const [showDetails, setShowDetails] = useState(false);
    const [close, setClose] = useState(true);
    const newDate = formatDate(data.date);
    return (
        <div className="searchItem">
            {console.log(data)}
            <h2>{newDate}</h2>
            <h2>{data.field}</h2>
            <h2>PHP {data.amount}</h2>
            <div className="searchItem_btn_holder">
                <button onClick={() => setClose(false)}>View More Details</button>
            </div>

            {!close && (
                <Modal setClose={setClose} close={close}>
                    <div id="itemDetails">
                        <div className="itemDetails_info">
                            <div className="itemDetails_info_left">
                                <ul>
                                    <li>
                                        <h3>Date Reported:</h3>
                                        <p>{newDate}</p>
                                    </li>
                                    <li>
                                        <h3>Reported by:</h3>
                                        <p>{data.id}</p>
                                    </li>
                                    <li>
                                        <h3>Reference No.:</h3>
                                        <p>{data.gcashRefNum}</p>
                                    </li>
                                    <li>
                                        <h3>Category: </h3>
                                        <p>{data.field}</p>
                                    </li>
                                    <li>
                                        <h3>Amount:</h3>

                                        <p>
                                            <b>PHP {data.amount}.00</b>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="itemDetails_info_right">
                                <h3 className="scammerName">0{data.gcashNumber}</h3>
                                <h4 className="scammerNumber">{data.gcashName}</h4>
                            </div>
                        </div>
                        <div className="itemDetails_ir">
                            <h4 class="itemDetails_ir_title">Incident Report:</h4>
                            <p class="itemDetails_ir_desc">{data.incidentReport}</p>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default SearchItem;
