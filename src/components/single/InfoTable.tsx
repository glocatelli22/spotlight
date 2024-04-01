import { Fragment } from "react";

import classes from "@/styles/ArchiveSingle.module.css";
import { NamedItemsObj } from "@/types";

interface TableData {
    genres?: string[],
    prodCompanies?: string[],
    revenue?: number,
    budget?: number,
    prodCountries?: string[],
    homepage?: string, 
    created_by?: NamedItemsObj[],
    directors?: NamedItemsObj[]
};

interface TableProps {
    data: TableData
};

const InfoTable = ({ data }: TableProps) => {

    const { genres, prodCompanies, revenue, budget, prodCountries, homepage, created_by, directors } = data;

    return (
        <Fragment>
            <div className={classes['info-table']}>    
                {!!genres && genres.length > 0 &&
                    <div>
                        <h3>Genere</h3>
                        <span >{genres.join(', ')}</span>
                    </div>
                }
                {!!directors && directors.length > 0 && 
                    <div>
                        <h3>Regia</h3>
                        <div className={classes['created-by']}>
                            {directors.map((creator, i) => 
                                <span key={i} >{creator.name}</span>
                            )}
                        </div>
                    </div>
                }
                {!!created_by && created_by.length > 0 && 
                    <div>
                        <h3>Creata da</h3>
                        <div className={classes['created-by']}>
                            {created_by.map((creator, i) => 
                                <span key={i} >{creator.name}</span>
                            )}
                        </div>
                    </div>
                }
                {!!prodCompanies && prodCompanies?.length > 0 &&
                    <div>
                        <h3>Produzione</h3>
                        <span >{prodCompanies.join(', ')}</span>
                    </div>
                }  
                {!!prodCountries && prodCountries.length > 0 &&
                    <div>
                        <h3>Paese</h3>
                        <span >{prodCountries.join(', ')}</span>
                    </div>
                }  
                {!!revenue && revenue > 0 &&
                    <div>
                        <h3>Incasso</h3>
                        <span >
                            {revenue.toLocaleString('it-IT')+' $'}
                        </span>
                    </div>
                } 
                {!!budget && budget > 0  &&
                    <div>
                        <h3>Budget</h3>
                        <span >
                            {budget.toLocaleString('it-IT')+' $'}
                        </span>
                    </div>
                } 
                {homepage &&
                    <div>
                        <a href={homepage} target="_blank" rel="noreferrer">
                            Maggiori informazioni
                        </a>
                    </div>
                }   
            </div>
        </Fragment>
    );
}

export default InfoTable;