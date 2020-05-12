import React from 'react';

import { WEEKDAYS, WEEKENDS } from '../../Utilities/commonConstants';
import { toast } from 'react-toastify';

import './index.css';

class FacilityTimesModal extends React.Component{
    constructor(props){
        super(props);
        /** Initialize with 0 values */
        let timeData = {};
        WEEKDAYS.map((key)=>{
            timeData[key] = { fromtime: "00:00", totime: "00:00" };
        })

        /** Edit case: reinitialize with values */
        const { form } = this.props;
        if(form && form.values && form.values.facility_time){
            timeData = form.values.facility_time;
        }

        this.state = {
            timeData: timeData,
            runningInput: [],
            checked: {}
        };

        this.formatTime_From_24_12 = this.formatTime_From_24_12.bind(this);
        this.isValidTime = this.isValidTime.bind(this);
        this.onFocusAndChangeEvent = this.onFocusAndChangeEvent.bind(this);
        this.onBlurEvent = this.onBlurEvent.bind(this);
        this.applyAllChecked = this.applyAllChecked.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    formatTime_From_24_12(inputTime, ){
        let timeToDisplay = { hour: "", min: "" };
        let inputTimeSplitted = inputTime ? inputTime.split(":") : "";
        if(inputTime){
            if(parseInt(inputTimeSplitted[0]) > 12 && parseInt(inputTimeSplitted[0]) !== 24){
                timeToDisplay['hour'] = this.time00Format(parseInt(inputTimeSplitted[0]) - 12);
                timeToDisplay['min'] = this.time00Format(inputTimeSplitted[1]);
            } else if(parseInt(inputTimeSplitted[0]) === 24){
                timeToDisplay['hour'] = this.time00Format("00");
                timeToDisplay['min'] = this.time00Format(inputTimeSplitted[1]);
            } else {
                timeToDisplay['hour'] = this.time00Format(inputTimeSplitted[0]);
                timeToDisplay['min'] = this.time00Format(inputTimeSplitted[1]);
            }
        }
        return timeToDisplay;
    }

    time00Format(time){
        if(parseInt(time)<10){
            return "0"+parseInt(time);
        } else {
            return ""+parseInt(time);
        }
    }

    isValidTime(inputValue){
        let splittedInput = inputValue && inputValue.split(':');
        if(
            splittedInput.length === 2 && 
            !isNaN(splittedInput[0]) && parseInt(splittedInput[0]) <= 24 &&
            !isNaN(splittedInput[1]) && parseInt(splittedInput[1]) < 60 
        ){
            return true;
        } else {
            return false;
        }
    }

    onFocusAndChangeEvent(e, item, type){
        let arr = [];
        arr.push(item+"-"+type);
        arr.push(e.target.value);
        this.setState({ runningInput: arr, isInputRunning: true });
    }

    onBlurEvent(item, runningInput, timeData, type){
        if(this.isValidTime(runningInput[1])){
            timeData[item][type+"time"] = runningInput[1];
        } else {
            toast.warn("Time format should be in 00:00. Hour should be less than 24 and minutes should be less than 60.")
        }
        this.setState({ runningInput: [], isInputRunning: false });
    }

    applyAllChecked(item){
        const { checked, timeData } = this.state;
        let newTimeData = JSON.parse(JSON.stringify(timeData));
        Object.keys(checked).map((day)=>{
            newTimeData[day] = timeData[item]
        });
        this.setState({ timeData: JSON.parse(JSON.stringify(newTimeData)), checked: {} });
    }

    handleCheckbox(checkedValue, item){
        let obj = this.state.checked;
        obj[item] = checkedValue;
        this.setState({ checked: obj });
    }

    handleSubmit(){
        this.props.change('facility_time', this.state.timeData);
        this.props.closeFacilityModal();
    }

    render(){
        const { timeData, isInputRunning, runningInput, checked } = this.state;
        return (
            <div className="wrapper">
                <div className="data-wrapper">
                    <div className="modal-label">Facility Times</div>
                    <div className="head-label-wrapper">
                        <label className="head-label-from">From</label>
                        <label className="head-label-to">To</label>
                    </div>
                    {WEEKDAYS.map((item)=>{

                        let fromTimeDisplay = this.formatTime_From_24_12(timeData[item] ? timeData[item]["fromtime"] : "");
                        let toTimeDisplay = this.formatTime_From_24_12(timeData[item] ? timeData[item]["totime"] : "");

                        let fromTimeSplitted = timeData[item] && timeData[item]["fromtime"] ? timeData[item]["fromtime"].split(":") : "";
                        let toTimeSplitted = timeData[item] && timeData[item]["totime"] ? timeData[item]["totime"].split(":") : "";

                        return <div className="weekdays-wrapper">
                            <input 
                                type="checkbox" disabled={WEEKENDS.includes(item) ? true : false} 
                                checked={checked[item]}
                                onChange={(e)=>{
                                    this.handleCheckbox(e.target.checked, item);
                                }}
                            />
                            <label className={WEEKENDS.includes(item) ? "weekend-label" : "weekday-label"}>{item}</label>
                            
                            <input
                                className="from-time-input"
                                disabled={WEEKENDS.includes(item) ? true : false}
                                value={isInputRunning && runningInput[0].includes(item+"-from") ? runningInput[1] : fromTimeDisplay['hour'] + ":" + fromTimeDisplay['min']}
                                onFocus={(e)=>{
                                    this.onFocusAndChangeEvent(e, item, "from")
                                }}
                                onChange={(e)=>{
                                    this.onFocusAndChangeEvent(e, item, "from")
                                }}
                                onBlur={(e)=>{
                                    this.onBlurEvent(item, runningInput, timeData, "from")
                                }}
                            />
                            
                            <div className="from-AM-PM-wrapper">
                                <span className={parseInt(fromTimeSplitted[0]) < 12 || parseInt(fromTimeSplitted[0]) === 24 ? "active-am-pm" : "from-AM-PM-span"}>AM</span>
                                <span className={parseInt(fromTimeSplitted[0]) >= 12 && parseInt(fromTimeSplitted[0]) !== 24 ? "active-am-pm" : "from-AM-PM-span"}>PM</span>
                            </div>

                            <input 
                                className="to-time-input"
                                disabled={WEEKENDS.includes(item) ? true : false}
                                value={isInputRunning && runningInput[0].includes(item+"-to") ? runningInput[1] : toTimeDisplay['hour'] + ":" + toTimeDisplay['min']}
                                onFocus={(e)=>{
                                    this.onFocusAndChangeEvent(e, item, "to")
                                }}
                                onChange={(e)=>{
                                    this.onFocusAndChangeEvent(e, item, "to")
                                }}
                                onBlur={(e)=>{
                                    this.onBlurEvent(item, runningInput, timeData, "to")
                                }}
                            />
                            <div className="to-AM-PM-wrapper">
                                <span className={parseInt(toTimeSplitted[0]) < 12 || parseInt(toTimeSplitted[0]) === 24 ? "active-am-pm" : "to-AM-PM-span"}>AM</span>
                                <span className={parseInt(toTimeSplitted[0]) >= 12 && parseInt(toTimeSplitted[0]) !== 24 ? "active-am-pm" : "to-AM-PM-span"}>PM</span>
                            </div>

                            <div 
                                className={WEEKENDS.includes(item) ? "apply-all-disabled" : "apply-all-checked"}
                                onClick={() => {
                                    if(!WEEKENDS.includes(item))
                                        this.applyAllChecked(item)
                                }}
                            >
                                Apply to All Checked
                            </div>

                        </div>
                    })}
                    <div className="cancel-save-button-wrapper">
                        <div className="cancel-wrapper" onClick={this.props.closeFacilityModal}>Cancel</div>
                        <div className="save-wrapper" onClick={this.handleSubmit}>Save</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FacilityTimesModal;