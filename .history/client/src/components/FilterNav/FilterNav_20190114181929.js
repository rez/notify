import React from 'react';
import styles from './FilterNav.module.css';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


const propTypes = {
    navFilters: PropTypes.array.isRequired,
    active : PropTypes.string.isRequired,
    basePath : PropTypes.string.isRequired
};

const FilterNav = ({
                     navFilters,
                     active,
                     basePath
                 }) => {

    return (
        <div className={styles.filter__nav}>
            <div className={styles.filter__nav__container}>
                {navFilters.map((link) => {
                    return(
                        <Link to={`${basePath}/${link.path}`}
                              className={styles.logo}>
                            <span className={`${active === link.label ? styles.filter__nav__active : null} ${styles.filter__nav__link}`}
                                  >
                            {link.label}
                             </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
};

FilterNav.propTypes = propTypes;

export default FilterNav;