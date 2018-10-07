import React, { Component } from 'react';

class LocalOfficialsOfficesLookup extends Component {
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