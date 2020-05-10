import React from 'react';
import './index.css';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { Table } from '../../components';
import { actionGetAllDataFromDb, actionInitializeDb } from '../../redux/actions';
import { addDataInDb, updateDataInDb, deleteDataFromDb, searchDataInDb, getAllDataFromDb } from '../../Utilities/commonMethods';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    componentDidMount(){
        this.props.actionInitializeDb();
    }

    render(){
        console.log('home : ', this.props);
        const { isDBInitialized, allData } = this.props;
        return (
            <React.Fragment>
                <button onClick={addDataInDb}>ADD</button>
                <button onClick={updateDataInDb}>UPDATE</button>
                <button onClick={deleteDataFromDb}>DELETE</button>
                <button onClick={searchDataInDb}>SEARCH</button>
                <button onClick={getAllDataFromDb}>GET ALL</button>

                <div className="header-div">
                    <span className="locaions-label" >Locations</span>
                    <span className="add-button" >+ Add Location</span>
                </div>

                {/* No Data screen */}
                {
                    isDBInitialized && allData && allData.length === 0 && 
                    <div className="nolocation-parent">
                        <div className="nolocation-div">
                            <img className="nolocation-img" alt="No Location" src={require("../../Assests/Location.png")} />
                        </div>
                        <div className="label-1">Kindly Add Your Location First</div>
                        <div className="label-2">There is no location added right now</div>
                    </div>
                }

                {
                    isDBInitialized && allData && allData.length > 0 && 
                    <Table />
                }

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    allData: state.commonReducer.allData,
    isDBInitialized: state.commonReducer.isDBInitialized
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
    actionGetAllDataFromDb, actionInitializeDb
}, dispatch);

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home;
