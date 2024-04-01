import classes from './Search.module.css';

interface SwitchProps {
    active: boolean, 
    activeAction: () => void, 
    disabledAction: () => void, 
};
const Switch = ({ active, activeAction, disabledAction } : SwitchProps ) => {
    return <div className={`${classes['film-tv__switch']} ${active ? classes['active'] : ''}`}>
        <span onClick={disabledAction}>FILM</span>
        <span onClick={activeAction}>TV</span>
    </div>
};

export default Switch;