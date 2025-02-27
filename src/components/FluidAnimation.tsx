import React, { useEffect } from 'react'
import { isNil } from "lodash";
import { useRouter } from "next/router";
import Script from 'next/script';

const FLUID_PATHNAMES = [
    { path: "/", eventType: "click" },
    { path: "/airdrop", eventType: "click" }
]

const FLUID_LIGHT_OPACITY = 0.4;
const FLUID_DARK_OPACITY = 0.8;

const FluidAnimation = () => {
    const  darkModeActive  = true;
    const { pathname } = useRouter();

    /* useEffect(() => {
        const canvas:any = document.getElementById('canvas');

        const currentPath = FLUID_PATHNAMES.find(item => item.path === pathname);

        if (!isNil(canvas)) {
            if (!isNil(currentPath)) {
                canvas.style.display = 'initial';
                canvas.style.backgroundImage = darkModeActive ? 'url(background-dark.png)' : 'url(background.png)';
                canvas.style.opacity = darkModeActive ? FLUID_DARK_OPACITY : FLUID_LIGHT_OPACITY

                const event = new CustomEvent('fluid-config-change', {
                    detail: {
                        eventType: currentPath.eventType,
                        theme: darkModeActive ? "dark" : "light"
                    }
                });
                window.dispatchEvent(event);
            }
            else {
                canvas.style.display = 'none';
            }
        }

    }, [darkModeActive, pathname]) */

    return (
        <>
            <canvas id='canvas'></canvas>
            <Script src="script.js"></Script>
        </>
    )
}

export default FluidAnimation