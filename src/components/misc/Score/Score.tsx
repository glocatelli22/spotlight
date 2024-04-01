import { BsStarFill, BsStarHalf } from "react-icons/bs";
import classes from "./Score.module.css";

const Score = ({vote} : { vote: number }) => {
    let starsNumber = (vote*5)/10;
    const score : React.ReactElement[] = [];
    
    if(starsNumber === 0) {
        score.push(<span key={0}>N / A</span>);
    } 

    let i = 1;
    while(i<=starsNumber) {
        score.push(<BsStarFill key={i}/>);
        i++;
    }
    if(starsNumber - (i-1) > 0.5) {
        score.push(<BsStarHalf key={i+1}/>)
    }
    
    return <div className={classes['score']}>
        {score}
    </div>;
};

export default Score;