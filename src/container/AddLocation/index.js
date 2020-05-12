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

import { Toaster, FacilityTimesModal } from "../../components";
import './index.css';

class AddLocation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditDataFetched: false,
            isGetEditDataCall: false,
            isFacilityModalOpen: false
        }
        this.props.actionInitializeDb();

        this.openFacilityModal = this.openFacilityModal.bind(this);
        this.closeFacilityModal = this.closeFacilityModal.bind(this);
    }

    componentDidMount(){
        if(
            this.props.isDBInitialized && this.props.match.params.name && 
            !this.state.isEditDataFetched && !this.state.isGetEditDataCall
        ){
            this.props.actionGetDataByName(this.props.match.params.name);
            this.setState({ isGetEditDataCall: true });
        }
    }

    componentDidUpdate(){
        if(
            this.props.isDBInitialized && this.props.match.params.name && 
            !this.state.isEditDataFetched && !this.state.isGetEditDataCall
        ){
            this.props.actionGetDataByName(this.props.match.params.name);
            this.setState({ isGetEditDataCall: true });
        }
        if(
            this.props.isDBInitialized && this.props.fetchDataEdit && Object.keys(this.props.fetchDataEdit).length > 0 && 
            this.props.match.params.name && this.state.isGetEditDataCall && !this.state.isEditDataFetched
        ){
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
    }

    openFacilityModal(){
        this.setState({ isFacilityModalOpen: true });
    }

    closeFacilityModal(){
        this.setState({ isFacilityModalOpen: false });
    }

    render(){
        const { handleSubmit, pristine, reset, submitting, change, initialize , form, match} = this.props;
        return (
            <div className="addLocation-wrapper">

                {/* Toaster for success/error alert */}
                <Toaster />
                
                {/* Facility times modal */}
                {this.state.isFacilityModalOpen &&
                    <FacilityTimesModal
                        form={form}
                        change={change} closeFacilityModal={this.closeFacilityModal} 
                    />
                }
                
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>
                    <Field
                        name="name"
                        type="text"
                        component={renderField}
                        label="Location Name"
                        validate={[required, alphaNumeric, maxLength15, minLength2]}
                        required={true}
                        disabled={match.params.name ? true : false}
                    />
                    <Field
                        name="suite_number"
                        type="text"
                        component={renderField}
                        label="Suite No."
                        validate={[maxLength15, minLength2]}
                    />
                    <Field
                        name="address_line_1"
                        type="text"
                        component={renderField}
                        label="Address Line 1"
                        validate={[maxLength15, minLength2]}
                    />
                    <Field
                        name="address_line_2"
                        type="text"
                        component={renderField}
                        label="Address Line 2"
                        validate={[maxLength15, minLength2]}
                    />
                    <Field
                        name="city"
                        type="text"
                        component={renderField}
                        label="City"
                        validate={[maxLength15, minLength2]}
                        // required={true}
                    />
                    <Field
                        name="state"
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
                    />
                    <Field
                        name="phone_number"
                        type="number"
                        component={renderField}
                        label="Phone Number"
                        // required={true}
                        validate={[phoneNumber]}
                    />
                    <Field
                        name="timezone"
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
                        component={renderButton}
                        label="Facility Times"
                        onClick={this.openFacilityModal}
                        buttonText="Enter facility time"
                    />
                    <Field
                        name="appoinment_pool"
                        type="text"
                        component={renderField}
                        label="Appointment Pool"
                        // required={true}
                        validate={[maxLength15, minLength2]}
                    />
                    <div className="button-wrapper">
                        <button className="save-button" type="submit" disabled={submitting}>Save</button>
                        <button className="clear-button" type="button" onClick={()=>this.props.history.push('/')}>Cancel</button>
                        <button className="save-button" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                    </div>
                    </form>
                </div>
            </div>
          )
    }
}

const renderButton = (props)=>{
    return <div className="input-wrapper">
        <label className="input-label">{props.required ? <>{props.label} <span className="require-sign">*</span></> : <>{props.label}</>}</label>
        <div className="input-div">
            <div className="input-button-field" onClick={props.onClick}>{props.buttonText}</div>
        </div>
    </div>
}
const renderField = ({
    required,
    input,
    label,
    type,
    disabled,
    meta: { touched, error, warning },
    onClick
    }) => {
        return <div className="input-wrapper">
            <label className="input-label">{required ? <>{label} <span className="require-sign">*</span></> : <>{label}</>}</label>
            <div className="input-div">
                <input 
                    className={disabled ? "input-box disabled-input" : "input-box"}
                    {...input} placeholder={label} type={type} disabled={disabled} 
                    onClick={onClick}
                />
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