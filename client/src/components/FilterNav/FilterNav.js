import React from 'react';
import styles from './FilterNav.module.css';
import PropTypes from 'prop-types';


const propTypes = {
    navFilters: PropTypes.array.isRequired,
};

const FilterNav = ({
                     navFilters,
                 }) => {

    return (
        <div className={styles.filter__nav}>
            <div className={styles.filter__nav__container}>
                {navFilters.map((link) => {
                    return(
                        <span className={`${link.active ? styles.filter__nav__active : null} ${styles.filter__nav__link}`}
                          onClick={() => link.clickHandler()}>
                        {link.label}
                    </span>)
                })}
            </div>
        </div>
    )
};

FilterNav.propTypes = propTypes;

export default FilterNav;