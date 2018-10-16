import React, { Component } from 'react';
import { getFetchRequest, postFetchWithOptions } from '../../services/APIService';
import Divisions from './Divisions';

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
                address: address,
                divisions: [],
                offices: [],
                officials: [],
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
            console.log('local officials component lookup address response', JSON.stringify(response) )

            const divisionList =  Object.keys(response.divisions).map( key => {
                return {
                    ...response.divisions[key],
                    divisionId: key
                }
            })
            .sort( (divisionOne, divisionTwo) => {
                return divisionTwo.divisionId.length - divisionOne.divisionId.length
            })

            this.setState(previousState => {
                return {
                    divisions: divisionList,
                    offices: response.offices,
                    officials: response.officials,
                }
            })
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
                            value={ this.state.address }
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
                        <Divisions allDivisions={ this.state.divisions }
                            offices={ this.state.offices }
                            officials={ this.state.officials }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default LocalOfficialsOfficesLookup;