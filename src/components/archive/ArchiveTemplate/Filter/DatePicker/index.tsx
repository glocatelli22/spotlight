import classes from "@/styles/Archive.module.css";

import { FaGreaterThanEqual, FaLessThanEqual } from 'react-icons/fa';
import { useState } from 'react';

const DatePicker = () => {
        
    const [releaseDateMin, setReleaseDateMin] = useState("");
    const [releaseDateMax, setReleaseDateMax] = useState("");

    return (
        <div className={classes['date-picker']}>
            <h4>Data di uscita</h4>
            <div> 
                <FaGreaterThanEqual />
                <input 
                    type="date" 
                    name="releaseDateMin" 
                    min="1930-01-01" 
                    max={
                        releaseDateMax ? releaseDateMax : 
                        new Date().toISOString().split("T")[0]
                    }
                    value={releaseDateMin}
                    onChange={(e) => {setReleaseDateMin(e.target.value)}}/>   
            </div>
            <div>
                <FaLessThanEqual />
                <input 
                    type="date" 
                    name="releaseDateMax" 
                    min={
                        releaseDateMin ? releaseDateMin : 
                        "1930-01-01"
                    }
                    max={new Date().toISOString().split("T")[0]}
                    value={releaseDateMax}
                    onChange={(e) => {setReleaseDateMax(e.target.value)}}/>   
            </div>
        </div>
    )
};

export default DatePicker;