import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import stickOnScroll from "../../../components/HOC/StickyScroll/StickyScroll"
import Header from "../../../components/Header/Header";
import styles from "./Header.module.css";

export class HeaderContainer extends Component {
    state = {
        sticky : this.props.sticky,
        mounted : false
    };

    componentDidMount(){
      this.setState({mounted : true})
      const height = this.containerNode ? this.containerNode.getBoundingClientRect().height : "100%";
      this.props.getMeasure(height);
    }
    setRef (node){
        this.containerNode = node
    }
    render(){
        return (
            <div className={this.props.sticky ? styles.sticky : null}
                 ref={(node) => this.setRef(node)}>
                <Header {...this.props} {...this.state} />
            </div>
        );
    }
}

function mapStateToProps({auth}) {
    return { auth };
}
export default connect(mapStateToProps)(stickOnScroll(HeaderContainer));