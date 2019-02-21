import React from 'react';
import styles from './Loader.module.css';
import Backdrop from '../Backdrop/Backdrop';
import loaderImg from './images/loader.gif';
import PropTypes from "prop-types";
const propTypes = {
    show: PropTypes.bool.isRequired,
};

const loader = ({show}) => (
    <div>
        <Backdrop show={show} clicked={()=>{return}}/>
        <img className={styles.loader} src={loaderImg}/>
    </div>
);
loader.propTypes = propTypes;
export default loader;