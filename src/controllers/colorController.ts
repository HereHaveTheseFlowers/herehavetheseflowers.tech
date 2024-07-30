

import { hslToHex, hexToHsl } from '../utils/helpers';
import store from '../utils/Store';
import { defaultStatsBGLight, defaultStatsBGDark } from '../constants/color';

function calculateComplimentaryColor(initialC: number) {
    if (initialC >= 345 || initialC <= 10) {
      // red
      return 159; // green
    } else if (initialC <= 29) {
      // red-orange
      return 192; // blue-green
    } else if (initialC <= 40) {
      // orange
      return 202; // blue
    } else if (initialC <= 51) {
      // orange-yellow
      return 230; // purple-blue
    } else if (initialC <= 68) {
      // yellow
      return 287; // purple
    } else if (initialC <= 123) {
      //yellow-green
      return 322;
    } else if (initialC <= 192) {
      //green
      return 1; //red
    } else if (initialC <= 197) {
      //green-blue
      return 19;
    } else if (initialC <= 216) {
      // blue
      return 32;
    } else if (initialC <= 260) {
      //purple-blue
      return 46;
    } else if (initialC <= 306) {
      //purple
      return 57;
    } else if (initialC <= 344) {
      //red-purple
      return 78;
    }
    return 0;
  }

export class colorController {
    constructor() {
        const htmlElem = document.querySelector('html');
        let colorHexInitial = '';
        if(htmlElem) {
            colorHexInitial = htmlElem.style.getPropertyValue('--color-main')
        } else {
            colorHexInitial = '#8055aa'
        }
        this.changeColor(colorHexInitial)
        store.clear('theme');
        store.on('theme', () => {  
            const htmlElemNew = document.querySelector('html');
            if(htmlElemNew) this.changeColor(htmlElemNew.style.getPropertyValue('--color-main'))
        });
    }
    public async changeColor(color: string) {
      try {
        setTimeout(()=>{
            
        const htmlElem = document.querySelector('html');
        const pattern = /^#[a-zA-Z\d]{6}$/gm;
        if (!pattern.test(color) || !htmlElem) return;
        const colorHsl = hexToHsl(color);
        htmlElem.style.setProperty('--color-main', color);
        let bgHue = 0;
        if(colorHsl) {
            bgHue = calculateComplimentaryColor(colorHsl.h);
        }
        let hexBG = '';
        if (store.getState().theme === 'dark') {
          const BgDarkSaturation = colorHsl.s > 15 ? defaultStatsBGDark.saturation : 0;
          hexBG = hslToHex(colorHsl.h, BgDarkSaturation, defaultStatsBGDark.lightness);
        } else {
          hexBG = hslToHex(colorHsl.h, defaultStatsBGLight.saturation, defaultStatsBGLight.lightness);
        }
        if (!htmlElem) return;
        htmlElem.style.setProperty('--color-bg', hexBG);
    }, 500) 

      } catch (e) {
        console.error('Error changing color: ', e);
      }
    }
  }
  
  const colorC = new colorController();
  
  export default colorC;
  