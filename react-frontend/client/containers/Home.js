import React, { Component } from 'react';

import '../styles/home.scss';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='home'>
                <div className='navigation'>
                    <ul>
                        <li>
                            About
                        </li>
                        <li>
                            FAQ
                        </li>
                    </ul>
                </div>
                <div className='title-container'>
                    <div className='title'>
                        <h1>Open Disclosure San Jose</h1>
                        <h2>Follow the Money</h2>
                    </div>
                    <div className='subtitle'>
                        <p>
                            Open Disclosure San Jose is a project sponsored by Code for America.
                            Our goal is to empower citizens by helping voters understand who
                            is funding their local politicians.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {

};