import React from 'react';
import styles from './Header.module.css';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


const propTypes = {
    sticky: PropTypes.bool.isRequired,
    mounted: PropTypes.bool.isRequired,
    auth: PropTypes.shape({}).isRequired,
    setHeight : PropTypes.func.isRequired

};

const Header = ({
                       sticky,
                       auth,
                        setHeight,
                        mounted
                   }) => {

    const renderContent = () => {
        if(auth.auth && auth.auth.spotifyID){

            return <ul className="right logout"><li><a href="/api/logout">logout</a></li><li><Link className="dashboard" to="/dashboard">Dashboard</Link></li></ul>;

        }else{
            return <ul className="right login"><li><a href="/auth/spotify">Login with Spotify</a></li></ul>;
        }
    }
    return (
        <nav className={sticky ? styles.sticky : null} >
            <div className={`black`}>
                    <Link to={auth ? '/' :  '/'}
                          className={styles.logo}>
                        Notify
                        <div className={styles.underline}></div>
                    </Link>


                {renderContent()}
            </div>
        </nav>
    )
};

Header.propTypes = propTypes;

export default Header;