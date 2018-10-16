/**
 * Maps the Redux state to MainContainer.js component's props
 * @param state
 * @returns {{}}
 */
export const mapStateToProps = state => {
	return {
		navigationGroups: {
			'Ballot Measures': [
				{
					id: 0,
					title: 'Measure A'
				},
				{
					id: 1,
					title: 'MeasureBB'
				},
			],
			'City-Wide Offices': [
				{
					id: 2,
					title: 'Mayor'
				},
				{
					id: 3,
					title: 'City Auditor'
				},
			],
			'City Council Office': [
				{
					id: 4,
					title: 'City Council District 2'
				},
				{
					id: 5,
					title: 'City Council District 4'
				},
			],
			'School District': [
				{
					id: 6,
					title: 'OUSD District 2'
				},
				{
					id: 7,
					title: 'OUSD District 4'
				},
			],

		}
	};
};