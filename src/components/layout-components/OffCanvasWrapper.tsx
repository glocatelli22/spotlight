import React, { useEffect, useRef } from "react";
import classes from './OffCanvasWrapper.module.css';

interface OffCanvasWrapperProps {
    children: React.ReactNode,
    displayNav: boolean,
    handleNavDisplay: () => void
};

const OffCanvasWrapper = ({children, displayNav, handleNavDisplay} : OffCanvasWrapperProps) => {

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        wrapperRef.current?.closest('html')?.classList?.toggle?.('no-scroll', displayNav);
    }, [displayNav])

    return (
        <div ref={wrapperRef} className={`${classes['off-canvas-wrapper']} ${displayNav ? classes['nav-displayed'] : ''}`}>
            <div className={classes['off-canvas-wrapper__backdrop']} onClick={handleNavDisplay}></div>
            {children}
        </div>        
    );
};

export default OffCanvasWrapper;