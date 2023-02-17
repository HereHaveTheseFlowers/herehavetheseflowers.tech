import React, { useEffect, useState } from 'react';
import { Input } from '../Input';
import { SaturationColorPicker } from '../SaturationColorPicker';
import { hslToHex, hsvToHsl, hexToHsl, hslToHsv } from '../../utils/helpers';
import { Hue } from 'react-color/lib/components/common';
import store from '../../utils/Store';

export const Palette = React.forwardRef((props, ref: any) => {
    const htmlElem = document.querySelector("html");
    let colorHexInitial = "";
    let colorHslInitial = store.getState().colorHSL ==! null ? store.getState().colorHSL : {h: 0, s: 50, l: 50};
    const [colorHSL, setColorHSL] = useState(colorHslInitial);

    useEffect(() => {
        console.log("render")
        //Runs only on the first render
        if(window.localStorage.getItem("mainColor")) {
            colorHexInitial = window.localStorage.getItem("mainColor");
            htmlElem.style
                .setProperty('--color-main', colorHexInitial)
        }
        if(htmlElem) {
            colorHexInitial = getComputedStyle(htmlElem)
                .getPropertyValue('--color-main');
        }
        if(!colorHexInitial) colorHexInitial = "#8055aa";
        colorHslInitial = hexToHsl(colorHexInitial);
        setColorHSL(colorHslInitial)
        store.set("colorHSL", colorHslInitial);
        store.on("colorHSL", ()=>{ handleChangeSaturation() })
    }, []);

    const handleChangeHSL = (e: any) => {
        setColorHSL({ h: e.h, s: e.s, l: 50 })
        store.set("colorHSL", { h: e.h, s: e.s, l: 50 });
        const hex = hslToHex(e.h, e.s, 50)
        const pattern = /^#[a-zA-Z\d]{6}$/gm;
        if(pattern.test(hex)) {
            if(!htmlElem) return;
            window.localStorage.setItem("mainColor", hex);
            htmlElem.style
                .setProperty('--color-main', hex)
        }
    }
    const handleChangeSaturation = () => {
        setColorHSL({ h: store.getState().colorHSL.h, s: store.getState().colorHSL.s, l: 50 })
        const hex = hslToHex( store.getState().colorHSL.h, store.getState().colorHSL.s, 50)
        const pattern = /^#[a-zA-Z\d]{6}$/gm;
        if(pattern.test(hex)) {
            if(!htmlElem) return;
            window.localStorage.setItem("mainColor", hex);
            htmlElem.style
                .setProperty('--color-main', hex)
        }
    }

    return (
        <div className="palette palette_state_hidden" ref={ref}>
            <div className="palette__field">
                <Hue
                    hsl={colorHSL}
                    onChange={handleChangeHSL}
                />
            </div>
            <div className="palette__field" >
                <SaturationColorPicker 
                    hsl={colorHSL}
                />
            </div>
        </div>
    )
});
