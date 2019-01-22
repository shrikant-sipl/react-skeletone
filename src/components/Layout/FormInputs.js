import React, {Component} from 'react';
/*
@method: renderTextField
@desc: Render textarea input
*/
export function renderTextField(field){
  const { input, meta : { touched, error} } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
  const InputClassName = `form-control ${field.className ? field.className : ''}`;
  const placeholder = field.placeholder ? field.placeholder : '';
  return(
    <div className={className}>
     <label>{field.label }</label>
      <textarea maxLength={field.mxLength} className={InputClassName} {...input} placeholder={placeholder}></textarea>
      <div className="text-help">{(touched) ? error: ''}</div>
    </div>
  );
}
/*
@method: renderTextInputField
@desc: Render text input
*/
export function renderTextInputField(field){
    const { input, meta : { touched, error, active}, ...others } = field;
    const inputbox = `inputbox ${active ? 'active' : ''}`;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const InputClassName = `form-control ${field.className ? field.className : ''}`;
    return(
        <div className={className}>
            <label>{field.label }{field.value}</label>
            <div className={inputbox}>
                <input maxLength={field.mxLength} {...others} type="text"  className={`form-control ${InputClassName}`} {...input} />
            </div>
            <div className="text-help">{(touched) ? error: ''}</div>
        </div>
    );
}

/*
@method: renderPasswordInputField
@desc: Render password input
*/
export function renderPasswordInputField(field){
    const { input, meta : { touched, error, active} } = field;
    const inputbox = `inputbox ${active ? 'active' : ''}`;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const InputClassName = `form-control ${field.className ? field.className : ''}`;
    return(
        <div className={className}>
            <label>{field.label }</label>
            <div className={inputbox}>
                <input maxLength={32} type="password" className={InputClassName} {...input} />
            </div>
            <div className="text-help">{(touched) ? error: ''}</div>
        </div>
    );
}

/*
@method: renderEmailInputField
@desc: Render email input
*/
export function renderEmailInputField(field){
    const {input, meta : { touched, error, active}, ...others } = field;
    const inputbox = `inputbox ${active ? 'active' : ''}`;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const InputClassName = `form-control ${field.className ? field.className : ''}`;
    return(
        <div className={className}>
            <label>{field.label }</label>
            <div className={inputbox}>
                <input maxLength={50} {...others} type="text" className={InputClassName} {...input} />
            </div>
            <div className="text-help">{(touched) ? error: ''}</div>
        </div>
    );
}

/*
@method: renderSelectField
@desc: Render select input
*/
export function renderSelectField(field){
    const { meta : { touched, error, active} } = field;
    const inputbox = `inputbox ${active ? 'active' : ''}`;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const InputClassName = `form-control ${field.className ? field.className : ''}`;
    let optionKey = 'id';
    let optionText = 'text';

    if(field.keys != undefined) {
       optionKey = field.keys[0];
        optionText = field.keys[1];
    }

    return(
      <div className={className}>
       <label>{field.label }</label>
       <div className={inputbox}>
        <select className={InputClassName} {...field.input}>
         <option value=''>Select</option>
         {
           field.options.map((data) => {
                return (
                   <option key={data[optionKey]} value={data[optionKey]}>{data[optionText]}</option>
               )
           })
         }
        </select>
        <i className="icon-right-arrow"></i>
        </div>
      <div className="text-help">{(touched) ? error: ''}</div>
      </div>
    );
}

export function renderHiddenInputField(field){
    const { meta : { touched, error, active} } = field;
    return(
        <input type="hidden" value={field.val} />
    );
}
