import React, { Component } from 'react';
import Official from '../Official/Official';

const LIGHT_BLUE = '#99ccff'
const LIGHT_RED = '#ff6666'
const LIGHT_GREY = '#f2f2f2'


class OfficialsForOffice extends Component {
    render() {
        const { office, officials } = this.props;
        const getOfficialsForOffice = (office, officials) => {
            const indicies = office.officialIndices
            const officialsForOffice = indicies.map( (index) => {
                return officials[index]
            })
            return officialsForOffice
        }
        const officeContainer = (party) => {
            let color = ''
            switch (party) {
                case 'Democratic':
                    color = LIGHT_BLUE
                    break
                case 'Republican':
                    color = LIGHT_RED
                    break
                case 'Nonpartisan':
                    color = LIGHT_GREY
                    break
            }
            return {
                height: '300px',
                display: 'inline-block',
                margin: '6px',
                border: '1px solid black',
                borderRadius: '6px',
                backgroundColor: color
            }
        }
        const officeHeader = () => {
            return {
                width: '160px',
                display: 'block',
                padding: '6px'
            }
        }
        const name = () => {
            return {
                fontSize: '14px',
                height: '30px',
                textAlign: 'center',
                fontWeight: 'bold'
            }
        }
        const officialsForOffice = getOfficialsForOffice(office, officials) 
        const officialsListMarkup = officialsForOffice.map( (official) => {
            return (
                <div style={officeContainer(official.party)}>
                    <div style={officeHeader()}>
                        <div style={name()}>{office.name}</div>
                    </div>
                    <Official official={ official } />
                </div>
            )
        })
        return (
            <div>
                { officialsListMarkup }
            </div>
        )
    }
}

export default OfficialsForOffice;