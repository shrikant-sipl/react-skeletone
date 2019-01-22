import React, {Component} from 'react';
import _ from "lodash";
import {langs} from "./config/localization";
import moment from 'moment';

/*function for render redux form field*/
export const renderField = (field) => {
    const {meta: {touched, error}} = field; //es6 syntex
    const className = `form-group ${touched && error ? 'has-danger':'has-success'}`;
    let fieldType = 'input';
    let requiredSpan =  "";
    let customMaxLength = 45;
    if(field.maxLength){
        customMaxLength = field.maxLength;
    }
    //Check and set as field input type
    if((field.input.name == 'Password' || field.input.name == 'password_confirmation') ){
        if(Object.getOwnPropertyNames(field.user_id).length > 0)
            return (<div></div>);
        fieldType = 'password';
    }
    if(field.input.name == 'Id'){
        fieldType = 'hidden';
    }
    if(field.input.name == 'Gender'){
        fieldType = 'radio';
    }



    if(field.input.name == 'Email' && field.input.value && Object.getOwnPropertyNames(field.user_id).length > 0){
        return (

            <div className={className}>
                <label className="form-label">{field.label}</label>
                <div>{field.input.value}</div>
            </div>
        )

    }

    if(field.isRequired == 'true'){
        return (

            <div className={className}>
                <label className="form-label">{field.label} {requiredSpan}</label><span className="text-danger">*</span>
                <field.type className="form-control" maxLength={customMaxLength} type={fieldType} {...field.input} />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }else{

        return (

            <div className={className}>
                <label className="form-label">{field.label} {requiredSpan}</label>
                <field.type className="form-control " maxLength={customMaxLength} type={fieldType} {...field.input} />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
}


export const renderSelectField = (field) => {

    const {meta: {touched, error}} = field; //es6 syntex
    const className = `form-group ${touched && error ? 'has-danger':'has-success'}`;
    return (
        <div className={className}>
            <select className="form-control" {...field.input} >
                <option value="">Select</option>
                { field.children } </select>
            <div className="text-help">
                {touched ? error : ''}
            </div>
        </div>
    )
}

export function renderTextArea(field){
    const { meta : { touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : 'has-success'}`;
    if(field.isRequired == 'true'){
        return(
            <div className={className}>
                <label>{field.label }</label><span className='text-danger'>*</span>
                <textarea maxLength={201} className="form-control" {...field.input}></textarea>
                <div className="text-help">{(touched) ? error: ''}</div>
            </div>
        );
    }else{
        return(
            <div className={className}>
                <label>{field.label }</label>
                <textarea maxLength={201} className="form-control" {...field.input}></textarea>
                <div className="text-help">{(touched) ? error: ''}</div>
            </div>
        );
    }
}

/**
 * Strip html tags
 * @param text
 */
export function stripHtml(text) {
    return text.replace(/<[^>]+>/g, '');
}

/**
 * Format video duration in human readable form
 * @param videoDuration
 */
export function formatVideoDuration(videoDuration) {
    const splittedDuration = videoDuration.split(':');

    let formattedDuration   = [];
    let counter             = 1;

    _.map(splittedDuration, duration => {
        if(counter === 1 && duration > 0) {
            formattedDuration.push(`${Math.ceil(duration)}h`);
        } else if(counter === 2 && (duration > 0)) {
            formattedDuration.push(`${Math.ceil(duration)}min`);
        } else if(counter === 3 && (duration > 0)) {
            formattedDuration.push(`${Math.ceil(duration)}s`);
        }

        counter++;
    });

    return formattedDuration.join(' ');
}

/**
 * Pad the number with leading zeros
 * @param value
 * @param size
 * @returns {*}
 */
export function numberPadding(value, size) {
    let val = value.toString();

    while (val.length < size) {
        val = "0" + val;
    }

    return val;
}

/**
 * Make year range
 * @param startYear
 * @param totalYears
 * @returns {{}}
 */
export function makeNumberRange(start, total) {
    let range = [];
    const last = start + total;

    for(start; start <= last; start++) {
        range = [...range, start];
    }

    return range;
}

/**
 * Make month year range for month picker
 * @param startMonth
 * @param startYear
 * @param endMonth
 * @param endYear
 * @returns {{min: {year: number, month: number}, max: {year: number, month: number}}}
 */
export function makeMonthYearRangeForMonthPicker(startMonth, startYear, endMonth, endYear) {
    const range = {
        min: {year: startYear, month: startMonth},
        max: {year: endYear, month: endMonth}
    };

    return range;
}

/**
 * Get the time difference in time ago format
 * @param currentTime
 * @param previousTime
 * @returns {string}
 */
export function timeAgo(currentTime, previousTime) {
    const msPerMinute   = 60 * 1000;
    const msPerHour     = msPerMinute * 60;
    const msPerDay      = msPerHour * 24;
    const msPerMonth    = msPerDay * 30;
    const msPerYear     = msPerDay * 365;
    const elapsed       = currentTime - previousTime;

    if (elapsed < msPerMinute) {
        //return Math.round(elapsed/1000) + ' seconds ago';
        return langs.just_now;
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ` ${langs.minute}`;
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed/msPerHour ) + ` ${langs.hour}`;
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ` ${langs.day}`;
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ` ${langs.month}`;
    } else {
        return Math.round(elapsed/msPerYear ) + ` ${langs.year}`;
    }
}

/**
 * Detect the url in string and replace it with anchor tag
 * @param text
 */
export function urlify(text) {
    const stripedHtml = stripHtml(text);
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return stripedHtml.replace(urlRegex, function(url) {
        return '<a target="_blank" href="' + url + '">' + url + '</a>';
    });
}

/**
 * Truncate text and add ellipsis
 * @param text
 * @returns {*}
 */
export function truncateText(text, limit) {
    if (text.length > limit) {
        return text.substring(0, limit) + '...';
    }

    return text;
}

/**
 * Convert date
 * @param date
 * @returns {string}
 */
export function convertDate(date) {
    return moment(date).format("DD-MM-YYYY hh:mm A");
}

