import React from 'react';
import ReactDOM from "react-dom"
import { CSSTransition } from "react-transition-group"

import Backdrop from "./Backdrop"
import "./Modal.css"

const Modaloverlay = (props) => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.header}`}>
                <h2>{props.header}</h2>
               { props.langitude}  { props.latitude }   
            </header>
            <form onSubmit={
                props.onSubmit ? props.onSubmit : event => event.preventDefault()
            }>
                <div className={`modal__content ${props.contentClass}`}>
                    { props.children }
                </div>
                <footer className={`modal__footer ${props.footerClass}`}>
                    { props.footer }
                </footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = (props) => {
    return ( 
        <>
            {props.show && <Backdrop onClick={props.content}/>}
            <CSSTransition 
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <Modaloverlay {...props}/>
            </CSSTransition>
        </>
    );
}
 
export default Modal;