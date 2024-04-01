import { useRouter } from 'next/router';
import classes from './Search.module.css';
import { useEffect, useRef, useState } from 'react';
import Switch from './Switch';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchForm = ({ archiveSearch} : { archiveSearch: boolean}) => {
    const router = useRouter();

    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const [searchShow, setSearchShow] = useState(false);
    const [displaySearch, setDisplaySearch]  = useState(false)
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!searchInputRef.current?.value) {
            return;
        }
        router.push(`/search/${searchShow ? 'serie-tv' : 'film'}?keywords=${searchInputRef.current?.value || ""}`)
        setDisplaySearch(false);
    };
    
    useEffect(() => {
        if(searchInputRef.current) {
            searchInputRef.current.value = router?.query?.keywords as string || "";
        }
    }, [router.asPath, router.query.keywords]);

    useEffect(() => {
        setSearchShow(router.query.category == 'serie-tv');
    }, [router.query.category])


    return (
        <>
            {!archiveSearch && 
                <>
                    <div className={`
                        ${classes['backdrop']}
                        ${displaySearch ? classes['display'] : ''}
                    `} 
                        onClick={() => setDisplaySearch(false)}/>
                    <button className={classes['search-toggle']} onClick={() => setDisplaySearch(prevState => !prevState)}>
                        <AiOutlineSearch size={22}/>
                    </button>       
                </>
            } 
            <div className={`
                ${classes['search']} 
                ${archiveSearch ? classes['archive-search'] : ''}
                ${displaySearch ? classes['display'] : ''}
            `}> 
                {!archiveSearch && 
                    <div className={classes['search-close']} onClick={() => setDisplaySearch(false)} />
                }
                <div className={classes['search-form']}>
                    <Switch 
                        active={searchShow}
                        activeAction={() => setSearchShow(true)}
                        disabledAction={() => setSearchShow(false)} />
                    <form onSubmit={submitHandler}>
                        <input 
                            ref={searchInputRef} 
                            type="text" 
                            name="search" 
                            placeholder="Cerca..."/>
                    </form>
                    <button 
                        type='submit'
                        className={classes['search-btn']}>
                        <AiOutlineSearch size={22}/>
                    </button>
                </div>
            </div>
        </>
    )
};

SearchForm.defaultProps = {
    archiveSearch: false
};

export default SearchForm;