import React from 'react';
import './index.css';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { initializeDb, addDataInDb, updateDataInDb, deleteDataFromDb, searchDataInDb, getAllDataFromDb } from '../../Utilities/commonMethods';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        initializeDb(()=>{
            this.setState({ allData: getAllDataFromDb() });
        });
    }

    render(){
        console.log('sdfdssdf : ', this.state);
        return (
            <React.Fragment>
                {/* <button onClick={addDataInDb}>ADD</button>
                <button onClick={updateDataInDb}>UPDATE</button>
                <button onClick={deleteDataFromDb}>DELETE</button>
                <button onClick={searchDataInDb}>SEARCH</button>
                <button onClick={getAllDataFromDb}>GET ALL</button> */}

                <div className="header-div">
                    <span className="locaions-label" >Locations</span>
                    <span className="add-button" >+ Add Location</span>
                </div>
                <div className="nolocation-parent">
                    <div className="nolocation-div">
                        <img className="nolocation-img" alt="No Location" src={require("../../Assests/Location.png")} />
                    </div>
                    <div className="label-1">Kindly Add Your Location First</div>
                    <div className="label-2">There is no location added right now</div>
                </div>
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
