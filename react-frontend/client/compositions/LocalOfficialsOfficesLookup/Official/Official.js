import React, { Component } from 'react';

class Official extends Component {
    render() {
        const { official } = this.props;
        const officialImageCSS = (photoURL) => {
            return {
                backgroundImage: `url(${photoURL})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '200px',
                borderRadius: '16px'
            }
        }
        
        const handleOfficialImage = (official) => {
            const NO_IMAGE_AVALABLE = '';
            var officialURL =  official.urls ? official.urls[0] : ''
            if (official.photoUrl) {
                return (
                    <a target={'_blank'} href={officialURL}>
                        <div style={officialImageCSS(official.photoUrl)}></div>
                    </a>
                )
            }
            else {
                return (
                    <a target={'_blank'} href={officialURL}>
                        <div style={officialImageCSS(NO_IMAGE_AVALABLE)}>
                        </div>
                    </a>
                )
            }  
        }
        const officialInfoContainer = () => {
            return {
                width: '150px',
                display: 'inline-block',
                margin: '6px'
            }
        }
        const officialHeader = () => {
            return {
                width: '150px',
                display: 'block',
                margin: '6px',
                fontSize: '14px',
                height: '40px'
            }
        }
    
        const officialName = () => {
            return {
                fontSize: '14px'
            }
        }
        const officialImageMarkup = handleOfficialImage(official);
        return (
            <div style={officialInfoContainer()} key={official.name}>
                <div style={officialHeader()}>
                    <div>{official.name}</div>
                    <div>{official.party}</div>
                </div>
                { officialImageMarkup }
                
            </div>
        )
    }
}

export default Official;
