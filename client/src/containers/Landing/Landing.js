import React, {Component} from 'react';
import styles from './Landing.module.css';
import axios from 'axios';
import Card from '../../components/Artist/ArtistCard';

class Landing extends Component{
    state = {
        page : 0,
        items : []
    }
    componentDidMount() {
       // this.getData();
    }


    render(){
        return (
            <div style={{textAlign:'center'}}>
                <h1 className={styles.LandingHeader}>Notify</h1>

                <p className={styles.siteDescription}>
                    Notify provides a quick and easy interface to check updates for your favorite and most listened to artist on Spotify.<br /><br />
                    Log-in at the top right to connect your account and you will be redirected to a list of artist where you can see their new releases
                    and any up-comming shows near you.
                </p>


            </div>
        );
    }

}

export default Landing;