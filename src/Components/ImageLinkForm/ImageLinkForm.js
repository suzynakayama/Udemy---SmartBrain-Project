import React from 'react';
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div >
            <p>
                {"The Brain will magically detect faces in your pictures. Try it out!"}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input 
                        className="f4 pa2 w-70 center" 
                        type="text" 
                        onChange={onInputChange}
                    />
                    <button 
                        className="f4 w-30 grow link ph3 pv2 dib dark-pink bg-light-blue"
                        onClick={onButtonSubmit}
                    >Detect Now</button>
                </div>
            </div>
        </div>
    ) 
}

export default ImageLinkForm;