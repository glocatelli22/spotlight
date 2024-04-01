import Image from 'next/image';
import classes from './Footer.module.css';
import { Button } from '../layout-components';
import { AiOutlineArrowUp } from 'react-icons/ai';
import Logo from '../layout-components/Logo';

const Footer = () => {
    return <footer className={classes['footer']}>
        <div>
            <Button $btnType="secondary" onClick={() => window.scrollTo(0, 0)}>
                <AiOutlineArrowUp />
            </Button>
        </div>
        <div>
            <Logo />
        </div>
        <div>  
            <div className={classes['footer__banner']}>
                <div>
                    <Image alt="TMDB" src="/tmdb.svg" width={70} height={70}/>
                </div>
                <div>
                    <p>This wensite uses the TMDB API<br /> but is not endorsed <br /> or certified by TMDB.</p>
                </div>
            </div>
        </div>
    </footer>
};

export default Footer;