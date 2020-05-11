import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table-v6';

import { actionDeleteData } from '../../redux/actions';
import { ADDRESS_KEYS } from '../../Utilities/commonConstants';
import { formatPhoneNumber } from '../../Utilities/commonMethods';
import './index.css';

class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    render(){
        console.log('Table : ', this.props);
        const { allData } = this.props;
        const columns = [{
            Header: <span><b>Name</b></span>,
            accessor: 'name'
          }, {
            Header: <span><b>Address</b></span>,
            accessor: 'address',
            Cell: props => {
                let address = "";
                ADDRESS_KEYS.map((item)=>{
                    if(props.original[item] && props.original[item].length){
                        if(address.length){
                            address = address + ", " + props.original[item];    
                        } else {
                            address = props.original[item];
                        }
                    }
                })
                return <span className='address'>{address}</span>
            }
          }, {
            Header: <span><b>Phone Number</b></span>,
            accessor: 'phone_number',
            Cell: props => <span>{formatPhoneNumber(props.original.phone_number)}</span>
          }, {
            Header: <span><b>Action</b></span>,
            accessor: 'action',
            Cell: props => {
                return <span className='action'>
                    <span onClick={()=>{
                        this.props.history.push('/edit-location/'+ props.original.name)
                    }}>Edit</span>
                    <span onClick={()=>{
                        this.props.actionDeleteData(props.original.name)
                    }}>Delete</span>
                </span>
            }
          }]
        return (
            <div className="table-wrapper">
                <ReactTable
                    data={allData}
                    columns={columns}
                    minRows={10}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allData: state.commonReducer.allData
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
    actionDeleteData
}, dispatch);

Table = connect(mapStateToProps, mapDispatchToProps)(Table)

export default Table;
