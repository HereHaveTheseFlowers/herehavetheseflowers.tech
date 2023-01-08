import React from 'react';
import { Input } from '../Input';

export const Palette = React.forwardRef((props, ref: any) => {
    return (
        <div className="palette palette_state_hidden" ref={ref}>
            <Input className="palette__input" />
            <Input className="palette__input" />
        </div>
    )
});