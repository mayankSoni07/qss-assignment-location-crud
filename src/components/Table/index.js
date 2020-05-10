import React from 'react';
import './index.css';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import ReactTable from 'react-table-v6';

class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    render(){
        console.log('Table : ', this.props);
        const data = [{
            name: 'Tanner Linsley',
            age: 26,
            friend: {
              name: 'Jason Maurer',
              age: 23,
            }
          }]
         
          const columns = [{
            Header: 'Name',
            accessor: 'name'
          }, {
            Header: 'Age',
            accessor: 'age',
            Cell: props => <span className='number'>{props.value}</span>
          }, {
            id: 'friendName',
            Header: 'Friend Name',
            accessor: d => d.friend.name
          }, {
            Header: props => <span>Friend Age</span>,
            accessor: 'friend.age'
          }]
        return (
            <div className="table-wrapper">
                <ReactTable
                    data={data}
                    columns={columns}
                    minRows={0}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allData: state.commonReducer.allData
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
}, dispatch);

Table = connect(mapStateToProps, mapDispatchToProps)(Table)

export default Table;
