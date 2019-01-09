import React from 'react';
import styles from "./ArtistReleaseList.module.css";

const ArtistReleaseList = ( props ) => {
    const releaseList = props.releases.map(release => {
        return(
                    <li key={release.id} className="collection-item" onClick={() => props.play(release)}>
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
           <h4 className={styles.Header}>{props.artist}</h4>

            <ul className="collection with-header">
                {releaseList}
            </ul>
        </div>
    )
}

export default ArtistReleaseList;