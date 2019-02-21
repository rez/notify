import React from 'react'
import styles from './Backdrop.module.css';
import PropTypes from "prop-types";

const propTypes = {
    show :PropTypes.bool.isRequired,
    clicked :PropTypes.func.isRequired,

};
const backdrop = ({show,clicked}) => (
    show ? <div className={styles.Backdrop} onClick={clicked}></div> : null
);
backdrop.propTypes = propTypes;
export default backdrop;