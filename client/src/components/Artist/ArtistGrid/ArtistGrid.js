import React from 'react';
import Card from "../ArtistCard";
import styles from './ArtistGrid.module.css';
import PropTypes from "prop-types";
const propTypes = {
    show: PropTypes.bool.isRequired,
    items :PropTypes.array.isRequired,
    showNewReleases :PropTypes.func.isRequired,
    showSetMap :PropTypes.func.isRequired,

};
const ArtistGrid = ({show,items,showNewReleases,showSetMap}) => {


    return (
        <div className={`row s5 m6 ${styles.ArtistGrid}`}
             style={{
                 transform: show ? 'translateX(0)' : "translateX(-100vw)",
                 opacity: show ? '1' : '0',
                 pointerEvents : show ? 'auto' : 'none',
                 visibility : show ? 'visible' : 'hidden',
                 position : show ? 'relative' : 'absolute',
             }}
        >
            {
                items.map( item => {
                    return (<Card
                            key={item.id}
                            sets={item.sets}
                            name={item.name}
                            img={item.images[0].url}
                            releases={item.releases}
                            showNewReleases={showNewReleases}
                            showSetMap={showSetMap}
                        >
                        </Card>
                    );
                })
            }
        </div>
    );
};
ArtistGrid.propTypes  = propTypes;
export default ArtistGrid;