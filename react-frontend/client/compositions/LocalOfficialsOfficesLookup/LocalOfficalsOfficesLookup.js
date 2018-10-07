import React, { Component } from 'react';
import { getFetchRequest, postFetchWithOptions } from '../../services/APIServices';

class LocalOfficialsOfficesLookup extends Component {
    constructor (props) {
        super(props);
        this.props = props;
        this.state = {
            address: '1184 normandy drive campbell ca 95008'
        }

    }
    handleAddress(event) {
        event.preventDefault()
        const address = event.target.value
        if (this.state.address !== address) {
            this.setState({
                address: address 
            })
        }
    }
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.lookupAddress(event)
        }
    }

    lookupAddress = () => {
        const addressData = {
            address: this.state.address
        }
        postFetchWithOptions('api/addressLookup', {}, addressData).then(response => {
            console.log('local officials component lookup address response', response)
        })
    }
    render () {
        return (
            <div>
                LocalOfficialsOfficesLookup
                <div>
                    <div>
                        <span>ex: 1184 normandy drive campbell ca 95008</span>
                        <br />
                        <input 
                            type='text' 
                            placeholder='Address'
                            onChange={ this.handleAddress }
                            onKeyPress={ this.handleKeyPress }
                        />
                        <button
                            onClick={ this.lookupAddress }
                        >
                        Submit for info
                        </button>
                    </div>
                    <div>
                        display results
                    </div>
                </div>
            </div>
        )
    }
}

export default LocalOfficialsOfficesLookup;