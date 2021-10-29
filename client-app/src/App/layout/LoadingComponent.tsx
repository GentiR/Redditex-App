import React from "react";
import {Dimmer, Loader} from 'semantic-ui-react';

interface Props{
    inverted?: boolean;
    content?: string;
}

//Adding a loading component
export default function LoadingComponent({inverted = true, content = 'Loading...'}: Props){
    return(
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    )
}