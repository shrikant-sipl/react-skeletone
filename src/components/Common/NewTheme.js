import React from "react";

const NewTheme = ({isNewTheme}) =>
{
    if(isNewTheme) {
        return (
            <div className="module-completed">
                <img src="/assets/images/ic-modulo-completo-big-blue.png"
                     srcSet="/assets/images/ic-modulo-completo-big-blue@2x.png 2x,
                                             /assets/images/ic-modulo-completo-big-blue@3x.png 3x"
                     className="ic_modulo_completo_big_blue" />
            </div>
        )
    } else {
        return null
    }
}

export {NewTheme};