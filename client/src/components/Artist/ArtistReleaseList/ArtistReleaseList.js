import React from 'react';
import styles from "./ArtistReleaseList.module.css";
import PropTypes from "prop-types";
const propTypes = {
    releases: PropTypes.array.isRequired,
    artist :PropTypes.string.isRequired,
    play :PropTypes.func.isRequired,

};
const ArtistReleaseList = ( {releases,artist,play} ) => {
    const releaseList = releases.map(release => {
        return(
            <li key={release.id} className="collection-item" onClick={() => play(release)}>
                    <div>
                        <div className={`row valign-wrapper ${styles.releaseRow}`}>
                            <div className="col s4">
                                <img src={release.images[0].url} alt=""
                                        className="circle responsive-img"/>
                            </div>
                            <div className="col s10">
                                <span className="black-text">
                                {release.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </li>
        )
    });

    return (
        <div>
           <h4 className={styles.Header}>{artist}</h4>

            <ul className="collection with-header">
                {releaseList}
            </ul>
        </div>
    )
}
ArtistReleaseList.propTypes = propTypes;
export default ArtistReleaseList;