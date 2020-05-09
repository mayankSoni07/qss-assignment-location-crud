import React from 'react';
import './index.css';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

class Home extends React.Component {
    render(){
        console.log('home : ', this.props)
        return (
            <React.Fragment>

                <h1>Home</h1>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    deviceType : state.commonReducer.deviceType,
    loading: state.commonReducer.loading
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ }, dispatch);

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home;
