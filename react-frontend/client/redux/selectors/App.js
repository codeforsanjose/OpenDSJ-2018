import { Campaigns } from '../../constants/Campaigns';
import { Contributions } from '../../constants/Contributions';

export const mapStateToProps = state => {
    // How the data being past to the frontend should be formatted
    // Up for discussion -- for now this is just dummy data to work with
    return {
        campaigns: [
            {
                type: Campaigns.ballot_measure,
                id: 0, // Campaign ID
                title: 'Measure AA',
                subtitle: 'Oakland Children\'s Initiative',
                summary: 'Shall the measure amending Oakland’s Charter for the purposes of funding services to: expand access to early childhood and preschool education; improve high school and college graduation and career readiness; provide mentoring and college financial assistance; by establishing a $198, 30-year parcel tax for single family parcels and specified rates for other parcel types, raising approximately $25,000,000 – 30,000,000 annually, with citizen’s oversight, and exemptions for low-income households and others, be adopted? Percentage Needed to Pass: Two-thirds (2/3)',
                sourceUrl: 'https://www.acvote.org/election-information/elections?id=236#',
                contributions: [
                    {
                        type: Contributions.by_region,
                        to_support_total: 1461089,
                        to_oppose_total: 43125,
                        supporting_regions: [
                            {
                                type: 'Out of State',
                                total: 206000
                            },
                            {
                                type: 'Within California',
                                total: 788000
                            },
                            {
                                type: 'Within Oakland',
                                total: 467000
                            },
                        ],
                        opposing_regions: [
                            {
                                type: 'Out of State',
                                total: 22000
                            },
                            {
                                type: 'Within California',
                                total: 11000
                            },
                            {
                                type: 'Within Oakland',
                                total: 11000
                            },
                        ]
                    },
                    {
                        type: Contributions.by_type,
                        supporting_contributors: [
                            {
                                type: 'Committee',
                                total: 12000
                            },
                            {
                                type: 'Individual',
                                total: 595000
                            },
                            {
                                type: 'Other (includes Businesses)',
                                total: 854000
                            },
                        ],
                        opposing_contributors: [
                            {
                                type: 'Committee',
                                total: 0
                            },
                            {
                                type: 'Individual',
                                total: 12000
                            },
                            {
                                type: 'Other (includes Businesses)',
                                total: 31000
                            },
                        ]
                    }
                ]
            }
        ],
        elections: [
            {
                type: Campaigns.city_wide_office,
                id: 11, // Campaign ID
                title: 'Mayor',
                candidates: [
                    {
                        id: 0, // Candidate ID
                        name: 'Libby Schaaf',
                        position: 'Incumbent, Mayor',
                        donations_collected: 461593,
                        picture: '/images/libby_schaaf.jpg'
                    },
                    {
                        id: 1, // Candidate ID
                        name: 'Saied Karamooz',
                        position: 'Chief Operating Officer',
                        donations_collected: 181407,
                        picture: '/images/saied_karamooz.jpg'
                    }
                ]
            },
            {
                type: Campaigns.city_council,
                id: 2, // Campaign ID
                title: 'City Council District 2',
                candidates: [
                    {
                        id: 2, // Candidate ID
                        name: 'Abel Guillen',
                        position: 'Incumbent, Councilmember',
                        donations_collected: 173043,
                        picture: '/images/abel_guillen.jpg'
                    },
                    {
                        id: 3, // Candidate ID
                        name: 'Nikki Fortunato Bas',
                        position: 'Non-profit Executive/Mother',
                        donations_collected: 96087,
                        picture: '/images/nikki_fortunato_bas.jpg'
                    }
                ]
            },
            {
                type: Campaigns.school_district,
                id: 3, // Campaign ID
                title: 'OUSD District 2',
                candidates: [
                    {
                        id: 4, // Candidate ID
                        name: 'Aimee Eng',
                        position: 'Incumbent, School Board Director',
                        donations_collected: 5265,
                        picture: '/images/aimee_eng.jpg'
                    }
                ]
            }
        ],
        candidates: [
            // TODO
        ]
    };
};