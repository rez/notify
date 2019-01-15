import React from 'react';
import styles from './Loader.module.css';
import Backdrop from '../Backdrop/Backdrop';
import loaderImg from './images/loader.gif';

const loader = (props) => (
    <div>
        {console.log("LETS SHOW THIS LOADER")}
        <Backdrop show={props.show} clicked={()=>{return}}/>
        <img className={styles.loader} src={loaderImg}/>
    </div>
);

export default loader;