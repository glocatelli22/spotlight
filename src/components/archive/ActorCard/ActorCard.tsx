
import { Actor } from "@/types";
import classes from "./ActorCard.module.css";

const ActorCard = ({name, character, profile_path} : Actor) => {
    return (
        <div className={classes['actor-card']}>
            <div className={classes['actor-card__pic']} style={{backgroundImage: `url('${process.env.posterBaseUrl}${profile_path})'`}}></div>
            <div className={classes['actor-card__content']}>
                <h3>{name}</h3>   
                <h4>{character}</h4>           
            </div>
        </div>
    );
};

export default ActorCard;