import React, { Component } from 'react';
import OfficialsForOffice from './OfficialsForDivision/OfficialsForDivision';

class Divisions extends Component {
    render () {
        const { allDivisions, officials, offices } = this.props;
        const divisionList = allDivisions && allDivisions.length > 0 
            ? allDivisions.map( (division, index) => {
                var officesInDivision = []
                if (division.officeIndices) {
                    officesInDivision = division.officeIndices.map( (index) => {
                        return offices[index]
                    })
                }
                if (division.name !== 'United States' && officesInDivision.length != 0)
                    return displayDivision(division, officesInDivision, officials)
                else
                    return 'No Officies for Division'
            })
            : [];
        return (
            <div>
                { divisionList }
            </div>
        )
    }
}

const displayDivision = (division, officesInDivision, officials) => {
    const officialsInDivision = officesInDivision.map( (office, index) => {
        return <OfficialsForOffice office={ office } officials={ officials } />
    })
    return (
        
        <div key={`key.${division.divisionId}`}>
            <h3>{division.name}</h3>
            <div>
            { officialsInDivision }
            </div>
        </div>
    )
}

export default Divisions;