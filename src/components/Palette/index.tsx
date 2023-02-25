import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { SaturationColorPicker } from '../SaturationColorPicker';
import { hslToHex, hsvToHsl, hexToHsl, hslToHsv } from '../../utils/helpers';
import { Hue } from 'react-color/lib/components/common';
import store from '../../utils/Store';
import { defaultStatsMain, defaultStatsBGLight, defaultStatsBGDark } from './stats';

export const Palette = React.forwardRef((props, ref: any) => {
    const htmlElem = document.querySelector("html");
    let colorHexInitial = "";
    let colorHslInitial = store.getState().colorHSL ==! null ? store.getState().colorHSL : {h: 0, s: defaultStatsMain.saturation, l: defaultStatsMain.lightness};
    const [colorHSL, setColorHSL] = useState(colorHslInitial);

    useEffect(() => {
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
        const bgHue = colorHslInitial.h + 180 > 360 ? colorHslInitial.h + 180 - 360 : colorHslInitial.h + 180;
        let hexBG = ""
        if(store.getState().theme === "dark") {
            hexBG = hslToHex(bgHue, defaultStatsBGDark.saturation, defaultStatsBGDark.lightness);
        } else {
            hexBG = hslToHex(bgHue, defaultStatsBGLight.saturation, defaultStatsBGLight.lightness);
        }
        const pattern=/^#[a-zA-Z\d]{6}$/gm;
        if(pattern.test(hexBG)) {
            if(!htmlElem) return;
            htmlElem.style
            .setProperty('--color-bg', hexBG)
        }
        store.set("colorHSL", colorHslInitial);
        store.on("colorHSL", ()=>{ handleChangeSaturation() })
    }, []);
    store.clear("theme");
    store.on("theme", () => {
        const bgHueSwitched = colorHSL.h + 180 > 360 ? colorHSL.h + 180 - 360 : colorHSL.h + 180;
        let hexBGSwitched = ""
        if(store.getState().theme === "dark") {
            const BgDarkSaturation = colorHSL.s > 15 ? defaultStatsBGDark.saturation : 0;
            hexBGSwitched = hslToHex(bgHueSwitched, BgDarkSaturation, defaultStatsBGDark.lightness);
        } else {
            hexBGSwitched = hslToHex(bgHueSwitched, defaultStatsBGLight.saturation, defaultStatsBGLight.lightness);
        }
        const pattern=/^#[a-zA-Z\d]{6}$/gm;
        if(pattern.test(hexBGSwitched)) {
            if(!htmlElem) return;
            htmlElem.style
                .setProperty('--color-bg', hexBGSwitched)
        }
    })

    const handleChangeHSL = (e: any) => {
        setColorHSL({ h: e.h, s: e.s, l: defaultStatsMain.lightness })
        store.set("colorHSL", { h: e.h, s: e.s, l: defaultStatsMain.lightness });
        const hex = hslToHex(e.h, e.s, defaultStatsMain.lightness)
        const pattern =/^#[a-zA-Z\d]{6}$/gm;
        if(pattern.test(hex)) {
            if(!htmlElem) return;
            window.localStorage.setItem("mainColor", hex);
            htmlElem.style
                .setProperty('--color-main', hex)
        }
        const bgHue = e.h + 180 > 360 ? e.h + 180 - 360 : e.h + 180;
        let hexBG = ""
        if(store.getState().theme === "dark") {
            const BgDarkSaturation = e.s > 15 ? defaultStatsBGDark.saturation : 0;
            hexBG = hslToHex(bgHue, BgDarkSaturation, defaultStatsBGDark.lightness);
        } else {
            hexBG = hslToHex(bgHue, defaultStatsBGLight.saturation, defaultStatsBGLight.lightness);
        }
        if(!htmlElem) return;
        htmlElem.style
            .setProperty('--color-bg', hexBG)
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
        const bgHue = store.getState().colorHSL.h + 180 > 360 ? store.getState().colorHSL.h + 180 - 360 : store.getState().colorHSL.h + 180;
        let hexBG = ""
        if(store.getState().theme === "dark") {
            const BgDarkSaturation = store.getState().colorHSL.s > 15 ? defaultStatsBGDark.saturation : 0;
            hexBG = hslToHex(bgHue, BgDarkSaturation, defaultStatsBGDark.lightness);
        } else {
            hexBG = hslToHex(bgHue, defaultStatsBGLight.saturation, defaultStatsBGLight.lightness);
        }
        if(!htmlElem) return;
        htmlElem.style
            .setProperty('--color-bg', hexBG)
    }

    return (
        <div className="palette palette_state_hidden" ref={ref}>
            <div className="palette__field">
                <Hue
                    // @ts-ignore
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
