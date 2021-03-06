import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { Table, Toaster } from '../../components';
import { actionInitializeDb, storeDataByKey } from '../../redux/actions';
import { addDataInDb, updateDataInDb, deleteDataFromDb, searchDataInDb, getAllDataFromDb } from '../../Utilities/commonMethods';

import './index.css';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.props.actionInitializeDb();
    }

    render(){
        const { isDBInitialized, allData, history } = this.props;
        return (
            <React.Fragment>
                <Toaster />
                {/* <button onClick={addDataInDb}>ADD</button>
                <button onClick={updateDataInDb}>UPDATE</button>
                <button onClick={deleteDataFromDb}>DELETE</button>
                <button onClick={searchDataInDb}>SEARCH</button>
                <button onClick={getAllDataFromDb}>GET ALL</button> */}

                <div className="header-div">
                    <span className="locaions-label" >Locations</span>
                    <span className="add-button" onClick={()=>{
                        this.props.history.push('/add-location')
                        // this.props.storeDataByKey({
                        //     key: "fetchDataEdit",
                        //     value: {}
                        // })
                    }} >+ Add Location</span>
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
                {/* Data Table Screen */}
                {
                    isDBInitialized && allData && allData.length > 0 && 
                    <Table history={history} />
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
    actionInitializeDb, storeDataByKey
}, dispatch);
Home = connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home;
