import React from 'react';
import { storiesOf } from '@storybook/react';
import { Footer } from './index';
import {boolean} from "@storybook/addon-knobs";

storiesOf('Home', module).add('Footer', () => {

    const isMobile = boolean('isMobile', false);

    return(
        <Footer isMobile={isMobile}/>
    )
});
