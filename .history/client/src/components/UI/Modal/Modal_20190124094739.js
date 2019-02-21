import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from "prop-types";

const propTypes = {
    show: PropTypes.bool.isRequired,
    offset: PropTypes.string.isRequired,
    modalClosed: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
const modal = ({show,offset,modalClosed,children}) => {
    return(
        <div>
            <Backdrop show={show} clicked={modalClosed}/>
            <div className={styles.Modal}
                 style={{
                     transform: show ? 'translateY(0)' : "translateY(-100vh)",
                     opacity: show ? '1' : '0',
                     marginTop : offset,
                     pointerEvents : show ? 'auto' : 'none'
                 }}
            >
                {children}
            </div>
        </div>
    )};
modal.propTypes = propTypes;
export default modal;