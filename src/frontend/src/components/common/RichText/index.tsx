/******************************************************************************  
 *   MODULE: RichText -> Rich Text Editor
 *   AUTHOR: BC GOV
 *   DATE:   20th November 2022   
 *   LAST UPDATED:
 * 
 *   DESCRIPTION: This module enable a rich text feature for forms. It can
 *                add Bold, underline, italics, sub-script, superscript, 
 *                ordered list, unordered list and clear formatting to default. 
 * 
 *   HOW TO USE THIS MODULE: 
 *   Input - This module accepts a few data elements from the parent component
 *           - [name] - For each instance of this module a unique 
 *                      name must be assigned
 *           - [value] - This allows two ways databinding. 
 *                 Use Case 1: If the form needs to be populated with 
 *                       exiting text from a database for example 
 *                       during initialization.
 *                 Use Case 2: If the description is changed in another component
 *                       the changes are tracked and will populate the richText
 *                       with this value. This usecase is rare.
 *                               
 *   Output[HTML] - This module will ouput the content of the textarea in 
 *                  HTML format to the parent using the onChange parent function 
 *           - [onChange] - For every keyup event the onChange function is called
 *        
 *   HOW TO TEST THIS MODULE: 
 *   This module is tightly coupled with the DPIA project and its parent 
 *   components                       
 *   !TODO - Write test cases to validate input and output
 ******************************************************************************
 */

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import {
    faBold, faItalic, faUnderline, faSubscript,
    faSuperscript, faList, faListOl, faParagraph
} from '@fortawesome/free-solid-svg-icons';

class RichText extends React.Component {
    constructor(props) {
        super(props);
        /* Binding 'this' to methods */
        this.enableRichText = this.enableRichText.bind(this);
        this.richTextBold = this.richTextBold.bind(this);
        this.richTextItalic = this.richTextItalic.bind(this);
        this.richTextUnderline = this.richTextUnderline.bind(this);
        this.richTextSubScript = this.richTextSubScript.bind(this);
        this.richTextSuperScript = this.richTextSuperScript.bind(this);
        this.richTextOrderedList = this.richTextOrderedList.bind(this);
        this.richTextUnOrderedList = this.richTextUnOrderedList.bind(this);
        this.richTextRemoveFormat = this.richTextRemoveFormat.bind(this);
        this.saveDatafn = this.saveDatafn.bind(this);

        this.state = {
            name: this.props.name,
            description: this.props.value,
        }
    };

    RichTextFrame: object = {};

    /* Add default fonts to the frame */
    addStyle() {
        this.RichTextFrame.contentDocument.head.innerHTML =   
            "<style>                                                                                  \
            @font-face {\
                src: url('/node_modules/@bcgov/bc-sans/fonts/BCSans-Regular.woff') format('woff');\
                font-weight: 400;\
                font-style: normal;\
                font-family: 'BCSans';\
            }\
            @font-face {                                                                              \
                src: url('/node_modules/@bcgov/bc-sans/fonts/BCSans-BoldItalic.woff') format('woff'); \
                font-weight: 700;\
                font-style: italic;\
                font-family: 'BCSans';\
            }\
            @font-face {\
                src: url('/node_modules/@bcgov/bc-sans/fonts/BCSans-Italic.woff') format('woff');\
                font-weight: 400;\
                font-style: italic;\
                font-family: 'BCSans';\
            }\
            @font-face {\
                src: url('/node_modules/@bcgov/bc-sans/fonts/BCSans-Bold.woff') format('woff');\
                font-weight: 700;\
                font-style: normal;\
                font-family: 'BCSans';\
            }\
            body { \
                position: relative;\
                font-family: 'BCSans', Helvetica;\
                color:rgb(36, 41, 47);\
                font-size: 16px;\
                font-weight: normal;\
                max-width:inherit;\
                overflow-wrap:break-word;\
            }\
             </style>"; 
    }

    /* Do not allow rich text copy pasting */
    PastePlainText() {
        this.RichTextFrame.contentDocument.onpaste = function(e) {
            e.preventDefault();
            var text = e.clipboardData.getData("text/plain");
            text = text.replace(/(?:\r\n|\r|\n)/g, '<p>');
            this.RichTextFrame.contentDocument.execCommand("insertHTML", false, text);
        }.bind(this);
    }

    /* 
     *  Once this component is mounted we need to 
     *  reload the iframe. Somme browsers need this 
    */
    componentDidMount() {
        const { name } = this.state;
        var richText = document.getElementsByName(name);
        if (richText.length) {
            richText[0].contentWindow.location.reload();
            /*  
                !TODO: This code may not be necessary during init.
                Will need to test once we start to save data
                richText[0].contentDocument.body.innerHTML= this.value;
            */
        }
    }

    /* 
     *  Enable Two way binding 
     *  If the value changes at the parent level, we would like
     *  to update. 
     *  This tracks for changes in description and if there are 
     *  differences it will update to the parent value.
     *  This condition should not execute in most cases. 
    */
    componentDidUpdate(prevProps: object) {
        if (this.props.value !== this.state.description) {
            this.state.description = this.props.value;
            this.RichTextFrame.contentDocument.body.innerHTML = this.state.description;
        }
    }

    handleChange(event: object) {
        console.log(event);
    }

    enableRichText = function (this: RichText, event: object) {
        this.RichTextFrame = event.target;
        event.target.designMode = 'On';
        event.target.contentDocument.designMode = 'On';
        event.target.contentDocument.onkeyup = function (e) {
            this.saveDatafn(event.target);
        }.bind(this);
        this.PastePlainText();
        this.addStyle();
    };

    richTextBold = function (this: RichText, event: object) {
        this.RichTextFrame.contentDocument.execCommand('bold', false, null);
        /* !TODO - This might be needed for some browsers 
            document.getElementById('richText').execCommand('bold', false, null);
        */
    };
    richTextItalic = function (this: RichText, event: object) {
        this.RichTextFrame.contentDocument.execCommand('italic', false, null);
    };
    richTextUnderline = function (this: RichText, event: object) {
        this.RichTextFrame.contentDocument.execCommand('underline', false, null);
    };
    richTextSubScript = function (this: RichText, event: object) {
        this.RichTextFrame.contentDocument.execCommand('subscript', false, null);
    };
    richTextSuperScript = function (this: RichText, event: object) {
        this.RichTextFrame.contentDocument.execCommand('superscript', false, null);
    };
    richTextOrderedList = function (this: RichText, event: object) {
        this.RichTextFrame.contentDocument.execCommand('insertOrderedList', false, null);
    };
    richTextUnOrderedList = function (this: RichText, event: object) {
        this.RichTextFrame.contentDocument.execCommand('insertUnorderedList', false, null);
    };
    richTextRemoveFormat = function (this: RichText, event: object) {
        console.log('remove format');
        this.RichTextFrame.contentDocument.execCommand('removeFormat', false, null);
        this.RichTextFrame.contentDocument.execCommand('FormatBlock', false, null);
    };
    saveDatafn = function (this: RichText, event_data: object) {
        this.props.onChange(event_data.contentDocument.body.innerHTML);
        this.state.description = event_data.contentDocument.body.innerHTML;
    };

    render() {
        const { name } = this.state;
        return (
            <div className="richTextContainer">
                <iframe
                    className="richTextFrame form-control"
                    onLoad={this.enableRichText}
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onKeyUp={this.saveDatafn}
                    name={name}
                >
                </iframe>

                <div className="formattingBar">
                    <div className="formattingBar__section">
                        <div className="icon__container" onClick={this.richTextBold}>
                            <FontAwesomeIcon icon={faBold} />
                        </div>
                        <div className="icon__container" onClick={this.richTextItalic}>
                            <FontAwesomeIcon icon={faItalic} />
                        </div>
                        <div className="icon__container" onClick={this.richTextUnderline}>
                            <FontAwesomeIcon icon={faUnderline} />
                        </div>
                        <div className="icon__container" onClick={this.richTextSubScript}>
                            <FontAwesomeIcon icon={faSubscript} />
                        </div>
                        <div className="icon__container" onClick={this.richTextSuperScript}>
                            <FontAwesomeIcon icon={faSuperscript} />
                        </div>
                    </div>
                    <div className="formattingBar__section">
                        <div className="icon__container" onClick={this.richTextUnOrderedList}>
                            <FontAwesomeIcon icon={faList} />
                        </div>
                        <div className="icon__container" onClick={this.richTextOrderedList}>
                            <FontAwesomeIcon icon={faListOl} />
                        </div>
                    </div>
                    <div className="formattingBar__section">
                        <div className="icon__container" onClick={this.richTextRemoveFormat}>
                            <div className="icon__container--text">Clear Format</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default RichText;