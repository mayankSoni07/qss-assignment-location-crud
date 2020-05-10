import React from 'react';
import './index.css';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { initializeDb, addDataInDb, updateDataInDb, deleteDataFromDb, searchDataInDb, getAllDataFromDb } from '../../Utilities/commonMethods';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        initializeDb();
    }
    render(){
        return (
            <React.Fragment>

                <h1>Home</h1>

                <button onClick={addDataInDb}>ADD</button>
                <button onClick={updateDataInDb}>UPDATE</button>
                <button onClick={deleteDataFromDb}>DELETE</button>
                <button onClick={searchDataInDb}>SEARCH</button>
                <button onClick={getAllDataFromDb}>GET ALL</button>

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
