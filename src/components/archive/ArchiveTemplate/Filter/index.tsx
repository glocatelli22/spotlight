import { useRef, useState } from "react";
import classes from "@/styles/Archive.module.css";
import { MdOutlineFilterAlt } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineSmallDash } from "react-icons/ai";
import RatingSelector from "./RatingSelector";
import DatePicker from "./DatePicker";
import { Button } from "@/components/layout-components";
import { Genre } from "@/types";

interface FilterProps {
    displaysShows: boolean, 
    submitCallback: (a: {}) => void,
    genres?: Genre[]
    
};

const Filter = ({ displaysShows, submitCallback, genres }: FilterProps) => {


    const formRef = useRef<HTMLFormElement | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState(false);
    
    const openFilterHandler = (b: boolean) => {
        setFilterOpen(b);
    };

    const submitFormHandler = (e : React.FormEvent<HTMLFormElement> ) => {
        
        e.preventDefault();

        let queryParamsObj = {};

        if(formRef.current) {
            const formData = new FormData(formRef.current);
            const formDataObj = Object.fromEntries(formData);
            
            const lteDateParam = displaysShows ? 'first_air_date.lte' : 'release_date.lte';
            const gteDateParam = displaysShows ? 'first_air_date.gte' : 'release_date.gte';
            const genresArray: FormDataEntryValue[] = [];
            Object.keys(formDataObj).forEach(k => k.startsWith('genre') && genresArray.push(formDataObj[k]));

            queryParamsObj = {
                ...formDataObj['rating'] && {
                    ['vote_average.gte']: formDataObj['rating']
                },
                ...formDataObj['releaseDateMin'] && {
                    [gteDateParam]: formDataObj['releaseDateMin']
                },
                ...formDataObj['releaseDateMax'] && {
                    [lteDateParam]: formDataObj['releaseDateMax']
                },
                ...genresArray.length && {
                    with_genres: genresArray.join('|')
                }
            }

            submitCallback(queryParamsObj);
            
        }

        openFilterHandler(false);
    };

    return (
        <div className={`${classes["archive-filter"]} ${filterOpen ? classes["open"] : ''}`}>
            <div className={classes['backdrop']} onClick={() => openFilterHandler(false)} />
            <div className={classes["archive-filter__head"]} onClick={() => openFilterHandler(true)}>
                <h3>Filtra</h3>
                <MdOutlineFilterAlt />
            </div>
            <div className={classes["archive-filter__body"]}>
                <div className={classes["archive-filter__body-close"]} onClick={() => openFilterHandler(false)}></div>
                <form className={classes["archive-filter__form"]} onSubmit={submitFormHandler} ref={formRef}> 
                    <div className={classes["archive-filter__form-section"]}>
                        <RatingSelector displaysShows={displaysShows} />
                    </div>
                    <div className={classes["archive-filter__form-section"]}>
                        <DatePicker />
                    </div>
                    {Array.isArray(genres) && genres.length &&
                        <div className={`${classes["archive-filter__form-section"]} ${accordionOpen ? classes["open-accordion"] : ''}`}>
                            <div className={classes["form-section__head"]} onClick={() => setAccordionOpen(prevState => !prevState)}>
                                <h4>Generi</h4>
                                {!accordionOpen ? <AiOutlinePlus /> : <AiOutlineMinus />}
                            </div>
                            <div className={classes['form-section__body']}>
                                {genres.map((el : Genre) => {
                                    return (
                                        <div className={classes["genre-tag"]} key={el.id}>
                                            <input 
                                                id={el.id} 
                                                type="checkbox" 
                                                name={`genre-${el.id}`} 
                                                value={el.id} />
                                            <label htmlFor={el.id}>
                                                {el.name}
                                            </label>
                                        </div>
                                        
                                    );
                                })}   
                            </div>    
                        </div>
                    }
                    <Button type="submit">Filtra</Button>
                </form>
            </div>
        </div>
    )
};

export default Filter;