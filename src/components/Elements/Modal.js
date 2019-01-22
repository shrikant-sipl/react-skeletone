import React, { Component } from "react";
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 0.5},
    entered:  { opacity: 1},
    exiting: { opacity: 0.5},
    exited:  { opacity: 0},
};

class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            PropsToggleModal: props.ToggleModal,
            ToggleModal: false,
            ModalClassName:props.ModalClassName,
        };
    }


    componentWillReceiveProps(updatedProps) {
        this.setState({
            ToggleModal : updatedProps.ToggleModal,
            ModalClassName: updatedProps.ModalClassName
        });
        this.ModalToggleClass(updatedProps.ToggleModal);
    }

    ModalToggleClass = (isOpen=false ) => {
        if(!isOpen){
            document.body.classList.remove('modal-open');
        } else {
            document.body.classList.add('modal-open');
            setTimeout(function () {
                let modal = document.getElementById('modalBody');
                let windowH = window.innerHeight;
                let modalH = modal.clientHeight;
                let top = '';
                if(windowH > modalH){
                    top = (windowH - modalH) / 2;
                } else {
                    top = 0;
                }
                modal.style.top = top+'px';
            },100)

        }
    };


    ModalToggleClose() {
        this.setState({ToggleModal : false});
        this.ModalToggleClass(false);
        if(this.props.onClose){
            this.props.onClose();
        }
    };


    ShowHideContent(state){
        if(this.state.ToggleModal == true && state != 'exited'){
            return(
                <div className={this.state.ModalClassName + ' modal-wrapper '}>
                    <div id={'modalBody'} className="modal-body" style={{maxWidth:`${this.props.width}px`}}>
                        <a href="javascript:void(0)" onClick={this.ModalToggleClose.bind(this)} className="modal-close"><i className="icon-close"></i></a>
                        {this.props.children}
                    </div>
                </div>
            )
        }
    }

    closeModalOnMouseup(){
        document.onmouseup = (e) => {
            e.preventDefault()
            let container = document.getElementById('modalBody');
            // if the target of the click isn't the container nor a descendant of the container
            // if (container != e.target && container.querySelector(e.target).length === 0){
    	    //     //this.ModalToggleClose();
    	    // }
    	};
    }

    closeModalOnEsc () {
        document.onkeydown = (e) => {
            event = e || window.event;
            if (event.keyCode == 27 && this.state.ToggleModal) {
                this.ModalToggleClose();
            }
        };
    }

    render() {
        this.closeModalOnEsc();
        this.closeModalOnMouseup();
        return (
            <div>
                <Transition in={this.state.ToggleModal} timeout={duration}>
                    {(state) => (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                          }}>
                        {this.ShowHideContent()}
                    </div>
                    )}
                </Transition>
            </div>
         )
    }
}

export default Modal;
