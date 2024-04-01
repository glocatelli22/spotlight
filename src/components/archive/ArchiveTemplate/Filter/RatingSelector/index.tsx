import { useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

import classes from "@/styles/Archive.module.css";

const RatingSelector = ({ displaysShows } : {displaysShows: boolean}) => {

    const INITIAL_RATING = [
        <BsStar key={1} />,
        <BsStar key={2} />,
        <BsStar key={3} />,
        <BsStar key={4} />,
        <BsStar key={5} />
    ];

    const [rating, setRating] = useState([...INITIAL_RATING]);
    const [starsNumber, setStarsNumber] = useState(0);

    const ratingDisplayerHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const vote = +e.target?.value;
        let starsNumber = (vote*5)/10;
        setStarsNumber(starsNumber);
        if(starsNumber === 0) {
            setRating([...INITIAL_RATING]);
        } else {
            let i = 0;
            let score =  [...INITIAL_RATING];
            while(i+1<=starsNumber) {
                score.splice(i, 1, <BsStarFill key={i}/>);
                i++;
            }
            if(starsNumber - i >= 0.5) {
                score.splice(i, 1, <BsStarHalf key={i+1}/>)
            }
            setRating(score);
        }
    }

    return (
        <div className={classes['rating-selector']}>
            <h4>Rating</h4>
            <input 
                type="range" 
                name="rating" 
                defaultValue="0" 
                min="0" 
                max="10" 
                step="1" 
                onChange={ratingDisplayerHandler}>
            </input>
            <div className={!displaysShows ? classes['rating-selector__rating-displayer'] : classes['rating-selector__rating-displayer']+' '+classes['tv-shows'] }>
                <div>
                    {rating}
                </div>
                <span>{starsNumber}</span>
            </div>
        </div>
    );
};

export default RatingSelector;