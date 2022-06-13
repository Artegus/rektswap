import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FC } from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import type { Container, Engine } from "tsparticles-engine";

import { 
	useViewportScroll,
	useTransform,
	motion 
} from 'framer-motion';

export const Particle: FC<{delicate?: boolean}> = ({delicate = false}) => {

    const particlesInit = async (main: Engine) => {
        await loadFull(main);
    }

    const particlesLoaded = async (container: Container) => {
        console.log(container)
    }

    const colorParticle = useColorModeValue('#8247E5', '#FF3737');
    const colorLink = useColorModeValue('#130d43', '#ffffff');

	const { scrollY } = useViewportScroll();

	const linksOp = useTransform(scrollY, [0, 1000], [0.5, 0]);

    return (
		<motion.div style={{opacity: linksOp}}>
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: colorParticle,
                    },
                    links: {
                        color: colorLink,
						distance: delicate? 100 : 150,
                        enable: true,
						opacity: delicate? 0.3 : 1,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
						speed: delicate? 1 : 3,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
						value: delicate? 100 : 49,
                    },
                    opacity: {
						value: delicate? 0.5 : 1,
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 5
                        },
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                },
                detectRetina: true,
            }}
        >
        </Particles>
		</motion.div>
    )
}
