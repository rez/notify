import React from 'react';
import Card from "../../components/Artist/ArtistCard";

const FollowGrid = (props) => {


    return (
        <div className="row s5 m6">
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

export default FollowGrid;