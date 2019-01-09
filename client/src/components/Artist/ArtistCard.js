import React from 'react';
import styles from './ArtistCard.module.css';

const card = (props) => {


    return (
        <div className={`card col  grey lighten-5 z-depth-1 s3 text-lighten-6 ${styles.a__s3}`}>
            <div className="card-image">
                <img src={props.img}/>
                <span className="card-title">{props.name}</span>
            </div>
            <div className="card-content">
                <p className=""> {props.releases ?
                    <span
                        className={`new black badge ${styles.badge}`}
                        onClick={() => props.showNewReleases(props.name, props.releases)}
                    >
                        {props.releases.length} releases</span> :

                    <span className={`new black badge ${styles.badge}`}>There are no new releases</span>
                }
                    {props.sets.length ?
                        <span
                            className={`new black badge ${styles.badge}`}
                            onClick={() => props.showSetMap(props.name, props.sets)}

                        > {props.sets.length} show(s) near you</span>
                        :
                        <span className={`new black badge ${styles.badge}`}> No shows near you</span>}
                </p>

            </div>
            {/*<div className="card-action green-text">*/}
                {/*<a href="#" >This is a link</a>*/}
            {/*</div>*/}

        </div>
    );
};

export default card;