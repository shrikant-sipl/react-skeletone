import React, {Component} from 'react'

let selectedFileName = '';

class FileInput extends Component{
    constructor(props) {
        super(props);

        this.state = {
            duration: '',
        };

        selectedFileName = '';

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { input: { onChange } } = this.props;
        selectedFileName = e.target.files[0].name;
        
        //Remove the validation message on file selection
        if(document.getElementById('media_upload')) {
            document.getElementById('media_upload').innerText = '';
        }

        onChange(e.target.files[0]);

        let video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function() {
            var duration = video.duration;
        }

        video.src = URL.createObjectURL(e.target.files[0]);

        if(this.props.onChangeProfileImage != undefined) {
            this.props.onChangeProfileImage(e.target.files[0]);
        }
    }

    render(){
        const { input: { value } } = this.props;
        const {input,label, required, meta, } = this.props;  //whatever props you send to the component from redux-form Field

        return(
            <div className="form-group"><label>{label}</label>
                <div>
                    <input
                        className="form-control"
                        type='file'
                        onChange={this.onChange}
                    />
                    <span className={'file-name'}>{selectedFileName}</span>
                </div>
            </div>
        )
    }
}

export default FileInput;