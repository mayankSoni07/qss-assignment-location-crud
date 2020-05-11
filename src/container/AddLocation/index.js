import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'

import { 
    required, maxLength15, maxLength10, minLength2, minLength5, alphaNumeric, noSpace, phoneNumber 
} from '../../Utilities/validation';
import { STATES, TIME_ZONE, DB_KEYS } from '../../Utilities/commonConstants';
import { 
    actionInitializeDb, actionAddData, actionEditData, actionGetDataByName, storeDataByKey
} from '../../redux/actions';

import { Toaster } from "../../components";
import './index.css';

class AddLocation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditDataFetched: false,
            isGetEditDataCall: false
        }
        // if(this.props.match.params.name){
        //     this.props.initialize({});
        // }
        this.props.actionInitializeDb();
    }

    componentDidMount(){
        if(
            this.props.isDBInitialized && this.props.match.params.name && 
            !this.state.isEditDataFetched && !this.state.isGetEditDataCall
        ){
            console.log('came here')
            this.props.actionGetDataByName(this.props.match.params.name);
            this.setState({ isGetEditDataCall: true });
        }
    }

    componentDidUpdate(){
        if(
            this.props.isDBInitialized && this.props.match.params.name && 
            !this.state.isEditDataFetched && !this.state.isGetEditDataCall
        ){
            console.log('came here 2')
            this.props.actionGetDataByName(this.props.match.params.name);
            this.setState({ isGetEditDataCall: true });
        }
        if(
            this.props.isDBInitialized && this.props.fetchDataEdit && Object.keys(this.props.fetchDataEdit).length > 0 && 
            this.props.match.params.name && this.state.isGetEditDataCall && !this.state.isEditDataFetched
        ){
            console.log('came here 3', this.props, this.state)
            this.props.initialize(this.props.fetchDataEdit);
            this.setState({ isEditDataFetched: true });
        }
    }

    componentWillUnmount(){
        this.props.storeDataByKey({
            key: "fetchDataEdit",
            value: {}
        });
    }

    submit(){
        console.log('submit', this.props);
        let formData = this.props.form.values;
        let requestData = {};
        DB_KEYS.map((key)=>{
            if(formData[key] && formData[key]){
                requestData[key] = formData[key];
            } else {
                requestData[key] = "";
            }
        })
        if(this.props.match.params){
            this.props.actionEditData(requestData, this.props.history);
        } else {
            this.props.actionAddData(requestData, this.props.history);
        }
        console.log('request Data : ', requestData)
    }

    render(){
        console.log('home : ', this.props)
        const { handleSubmit, pristine, reset, submitting, change, initialize , form, match} = this.props;
        return (
            <div className="addLocation-wrapper">
                <Toaster />
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>
                    <Field
                        name="name"
                        type="text"
                        component={renderField}
                        label="Location Name"
                        validate={[required, maxLength15, minLength2]}
                        warn={alphaNumeric}
                        required={true}
                        disabled={match.params.name ? true : false}
                    />
                    <Field
                        name="suite_number"
                        type="text"
                        component={renderField}
                        label="Suite No."
                        validate={[maxLength15, minLength2]}
                        warn={alphaNumeric}
                    />
                    <Field
                        name="address_line_1"
                        type="text"
                        component={renderField}
                        label="Address Line 1"
                        validate={[maxLength15, minLength2]}
                        warn={alphaNumeric}
                    />
                    <Field
                        name="address_line_2"
                        type="text"
                        component={renderField}
                        label="Address Line 2"
                        validate={[maxLength15, minLength2]}
                        warn={alphaNumeric}
                    />
                    <Field
                        name="city"
                        type="text"
                        component={renderField}
                        label="City"
                        validate={[maxLength15, minLength2]}
                        warn={alphaNumeric}
                        // required={true}
                    />
                    <Field
                        label="State"
                        className="input-div input-box"
                        fieldName="state"
                        placeholder="State"
                        // required={true}
                        component={renderDropdown}
                        data={STATES}
                        valueField="key"
                        textField="value"
                        change={this.props.change}
                        currentData={form && form.values && form.values["state"]}
                    />
                    <Field
                        name="zipcode"
                        type="text"
                        component={renderField}
                        label="Zipcode"
                        // required={true}
                        validate={[alphaNumeric, maxLength10, minLength5, noSpace]}
                        warn={alphaNumeric}
                    />
                    <Field
                        name="phone_number"
                        type="number"
                        component={renderField}
                        label="Phone Number"
                        // required={true}
                        validate={[phoneNumber]}
                        warn={alphaNumeric}
                    />
                    <Field
                        label="Time Zone"
                        className="input-div input-box"
                        fieldName="timezone"
                        placeholder="Time Zone"
                        // required={true}
                        component={renderDropdown}
                        data={TIME_ZONE}
                        valueField="abbr"
                        textField="text"
                        change={change}
                        currentData={form && form.values && form.values["timezone"]}
                    />
                    <Field
                        name="facility_time"
                        type="text"
                        component={renderField}
                        label="Facility Times"
                        // required={true}
                        validate={[maxLength15, minLength2]}
                        warn={alphaNumeric}
                    />
                    <Field
                        name="appoinment_pool"
                        type="text"
                        component={renderField}
                        label="Appointment Pool"
                        // required={true}
                        validate={[maxLength15, minLength2]}
                        warn={alphaNumeric}
                    />
                    <div className="button-wrapper">
                        <button className="button" type="submit" disabled={submitting}>Submit</button>
                        <button className="button clear-button" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                        <button className="button clear-button" type="button" onClick={()=>this.props.history.push('/')}>Back to Lobby</button>
                    </div>
                    </form>
                </div>
            </div>
          )
    }
}

const renderField = ({
    required,
    input,
    label,
    type,
    disabled,
    meta: { touched, error, warning }
    }) => {
        return <div className="input-wrapper">
            <label className="input-label">{required ? <>{label} <span className="require-sign">*</span></> : <>{label}</>}</label>
            <div className="input-div">
            <input className={disabled ? "input-box disabled-input" : "input-box"} onChange={(e)=>{
                console.log('e', e)
            }} {...input} placeholder={label} type={type} disabled={disabled} />
            {touched &&
                ((error && <div className="error-msg">{error}</div>) ||
                (warning && <div className="error-msg">{warning}</div>))}
            </div>
        </div>
    }
const renderDropdown = ({
        data,
        valueField,
        textField,
        fieldName,
        required,
        change,
        label,
        placeholder,
        currentData
        }) => {
            return <div className="input-wrapper">
                <label className="input-label">{required ? <>{label} <span className="require-sign">*</span></> : <>{label}</>}</label>
                <DropdownList
                    className="input-div input-box"
                    placeholder={placeholder}
                    data={data}
                    valueField={valueField}
                    textField={textField}
                    onChange={(value) => change(fieldName, value)}
                    value={currentData}
                />
            </div>
        }


const mapStateToProps = state => ({
    form: state.form.addLocationForm,
    isDBInitialized: state.commonReducer.isDBInitialized,
    fetchDataEdit: state.commonReducer.fetchDataEdit,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({ 
    actionInitializeDb, actionAddData, actionEditData, actionGetDataByName, storeDataByKey
}, dispatch);

AddLocation = connect(mapStateToProps, mapDispatchToProps)(AddLocation)
export default reduxForm({ form: 'addLocationForm', enableReinitialize: true })(AddLocation)