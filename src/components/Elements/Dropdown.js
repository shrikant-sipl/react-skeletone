import React, { Component } from "react";
import Transition from 'react-transition-group/Transition';

const duration = 100;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    display: 'none',
}

const transitionStyles = {
    entering: { opacity: 0.5, display: 'block' },
    entered: { opacity: 1, display: 'block' },
};

class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ToggleDropdown: props.ToggleDropdown,
            Title: props.Title,
            Position: props.Position,
            ClassName: props.ClassName,
        };


        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    closeDropdown = () => {
        this.setState({ ToggleDropdown: false });
    };

    openDropdown = () => {
        this.setState({ ToggleDropdown: true });
    };

    openDropdownToggle = () => {
        if (this.state.ToggleDropdown) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    };

    componentWillReceiveProps(updatedProps) {
        this.setState(
            {
                Title: updatedProps.Title,
                ToggleDropdown: updatedProps.ToggleDropdown,
                Position: updatedProps.Position,
                ClassName: updatedProps.ClassName,
            }
        );
        if (this.state.ToggleDropdown) {
            this.openDropdown;
        } else {
            this.closeDropdown;
        }
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeDropdown();
        }
    }

    render() {
        return (
            <div ref={this.setWrapperRef} id={'dropdown_menu'} className={`dropdown-menu-wrapper ${this.state.ToggleDropdown ? 'show' : 'hidden'} ${this.state.ClassName} `}>
                <a href="javascript:void(0)" onClick={this.openDropdownToggle.bind(this)} className="dropdown-menu-toggle">{this.state.Title}</a>
                <Transition in={this.state.ToggleDropdown} timeout={duration}>
                    {(state) => (
                        <div className={`dropdown-menu ${this.state.Position}`} style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            {this.props.children}
                        </div>
                    )}
                </Transition>
            </div>
        )
    }
}

export default Dropdown;
