import React from 'react';
import styles from './ArtistCard.module.css';
import PropTypes from "prop-types";

const propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    releases: PropTypes.array.isRequired,
    sets: PropTypes.array.isRequired,
    showNewReleases: PropTypes.func.isRequired,
    showSetMap: PropTypes.func.isRequired,
};

export const Card = ({
    name,
    img,
    releases,
    sets,
    showNewReleases,
    showSetMap
              }) => {

    return (
        <div className={`card col  grey lighten-5 z-depth-1 s12 m4 l3 text-lighten-6 ${styles.a__s3}`}>
            <div className="card-image">
                <img className={styles.ArtistImage} src={img}/>
                <span className="card-title">{name}</span>
            </div>
            <div className="card-content">
                <p className=""> {releases ?
                    <span
                        className={`release-btn new black badge ${styles.badge}`}
                        onClick={() => showNewReleases(name, releases)}
                    >
                        {releases.length} release(s)</span> :
                    <span className={`new black badge ${styles.badge}`}>There are no new releases</span>
                }
                    {sets.length ?
                        <span
                            className={`sets-btn new black badge ${styles.badge}`}
                            onClick={() => showSetMap(name, sets)}

                        >{sets.length} show(s) near you</span>
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
Card.propTypes = propTypes;
export default Card;