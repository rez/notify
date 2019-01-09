import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';

class Header extends Component {
    renderContent(){
        const a = this.props.auth;
        if(a.auth && a.auth.data){

            return <ul className="right"><li><a href="/api/logout">logout</a></li><li><Link to="/dashboard">Dashboard</Link></li></ul>;

        }else{
            return <ul className="right"><li><a href="/auth/spotify">Login with Spotify</a></li></ul>;
        }

    }

    render(){
        return (
            <nav>
                <div className={`black`}>
                    {true ? console.log(this.props.auth) : null}
                        <Link to={this.props.auth ? '/' :  '/'}
                            className={styles.logo}>
                            Notify
                        </Link>

                    {this.renderContent()}
                </div>
            </nav>
        );
    }
}

function mapStateToProps({auth}) {
    return { auth };
}
export default connect(mapStateToProps)(Header);