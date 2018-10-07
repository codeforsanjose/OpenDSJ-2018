import React, { Component } from 'react';

class Divisions extends Component {
    
    render () {
        console.log('this.props.allDivisions', this.props.allDivisions)
        const { allDivisions } = this.props;
        const divisionList = allDivisions && allDivisions.length > 0 
            ? allDivisions.map( (division, index) => {
                var officesInDivision = []
                if (division.officeIndices) {
                    officesInDivision = division.officeIndices.map( (index) => {
                        return this.props.offices[index]
                    })
                }
                if (division.name !== 'United States' && officesInDivision.length != 0)
                    return division.name; //displayDivision(division, officesInDivision, officials, elections, index)
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

export default Divisions;