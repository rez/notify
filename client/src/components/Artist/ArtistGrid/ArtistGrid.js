import React from 'react';
import Card from "../ArtistCard";
import styles from './ArtistGrid.module.css';

const ArtistGrid = (props) => {


    return (
        <div className={`row s5 m6 ${styles.ArtistGrid}`}
             style={{
                 transform: props.show ? 'translateX(0)' : "translateX(-100vw)",
                 opacity: props.show ? '1' : '0',
                 pointerEvents : props.show ? 'auto' : 'none',
                 visibility : props.show ? 'visible' : 'hidden',
                 position : props.show ? 'relative' : 'absolute',
             }}
        >
            {
                props.items.map( item => {
                    return (<Card
                            key={item.id}
                            sets={item.releases.sets}
                            name={item.name}
                            img={item.images[0].url}
                            releases={item.releases.releases}
                            showNewReleases={props.showNewReleases}
                            showSetMap={props.showSetMap}
                        >
                        </Card>
                    );
                })
            }
        </div>
    );
};

export default ArtistGrid;