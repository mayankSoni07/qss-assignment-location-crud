import React from 'react';
import './index.css';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

class AddLocation extends React.Component {
    render(){
        console.log('home : ', this.props)
        return (
            <React.Fragment>

                <h1>Add Location</h1>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    deviceType : state.commonReducer.deviceType,
    loading: state.commonReducer.loading
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ }, dispatch);

AddLocation = connect(mapStateToProps, mapDispatchToProps)(AddLocation)

export default AddLocation;
