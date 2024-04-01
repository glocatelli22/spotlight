const Loader = ({ loaderSecondaryColor } : { loaderSecondaryColor?: boolean}) => {
    return (
        <div className={`loader ${loaderSecondaryColor ? 'secondary-color' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
        </div>    
    );
}

export default Loader;