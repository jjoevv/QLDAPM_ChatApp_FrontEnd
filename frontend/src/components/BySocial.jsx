import React from 'react'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebookF, faGoogle, faTwitter} from  "@fortawesome/free-brands-svg-icons";


const facebook = <FontAwesomeIcon icon={faFacebookF} />
const google = <FontAwesomeIcon icon={faGoogle} />
const twitter = <FontAwesomeIcon icon={faTwitter} />

function BySocial() {
    return (
        <>
            <div style={{position: 'relative', top: '-12px', padding: '0px 10px', backgroundColor: '#F6F5F5'}}>Or sign in with</div>
            <i>{facebook}</i>
            <i>{google}</i>
            <i>{twitter}</i>  
        </>
    )
}

export default BySocial