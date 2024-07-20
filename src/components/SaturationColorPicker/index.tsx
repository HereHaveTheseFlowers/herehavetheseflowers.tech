import { useEffect, useRef } from 'react';
import { hslToHex } from '../../utils/helpers';
import store from '../../utils/Store';

export type SaturationColorPickerProps = {
  hsl: {
    h: number;
    s: number;
    l: number;
  };
};

export function SaturationColorPicker(props: SaturationColorPickerProps) {
  const { hsl } = props;
  const pickerElement = useRef(null);
  const cursorElement = useRef(null);
  const gradientElement = useRef(null);
  const hex = hslToHex(hsl.h, 100, hsl.l);
  const pattern = /^#[a-zA-Z\d]{6}$/gm;
  if (pattern.test(hex)) {
    if (gradientElement.current) {
      gradientElement.current.style.background = `linear-gradient(to right, #fff 0%, ${hex} 100%)`;
    }
  }

  useEffect(() => {
    const mouseDown = { isPressed: false };
    document.body.onmousedown = function () {
      mouseDown.isPressed = true;
    };
    document.body.onmouseup = function () {
      mouseDown.isPressed = false;
    };
    if (pickerElement?.current && cursorElement?.current) {
      const rect = pickerElement.current.getBoundingClientRect();
      const pickerWidth = rect.right - rect.left;
      const handleChangeColor = (e: MouseEvent | PointerEvent, clicked?: boolean) => {
        if (!clicked && !mouseDown.isPressed) return;
        const cursorPos = e.clientX - rect.left;
        const percent = (cursorPos * 100) / pickerWidth - 6;
        if (percent >= 100) {
          cursorElement.current.style.left = '99%';
          store.set('colorHSL.s', 100);
        } else if (percent <= 0) {
          cursorElement.current.style.left = '1%';
          store.set('colorHSL.s', 0);
        } else {
          cursorElement.current.style.left = `${percent.toFixed(2)}%`;
          store.set('colorHSL.s', Number(percent.toFixed(1)));
        }
      };
      pickerElement.current.addEventListener('mousemove', (e: MouseEvent) => {
        handleChangeColor(e);
      });
      pickerElement.current.addEventListener('mousedown', (e: PointerEvent) => {
        handleChangeColor(e, true);
      });
      pickerElement.current.addEventListener('touchend', (e: PointerEvent) => {
        handleChangeColor(e, true);
      });


      
    }
  }, []);
  return (
    <>
      <div style={{ position: 'absolute', inset: '0px' }} ref={pickerElement}>
        <div
          className='saturationpicker'
          style={{ padding: '0px 2px', position: 'relative', height: '100%' }}
          ref={gradientElement}
        >
          <div style={{ position: 'absolute', left: `${hsl.s}%` }} ref={cursorElement}>
            <div
              style={{
                marginTop: '1px',
                width: '4px',
                borderRadius: '1px',
                height: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.6) 0px 0px 2px',
                background: 'rgb(255, 255, 255)',
                transform: 'translateX(-2px)'
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
