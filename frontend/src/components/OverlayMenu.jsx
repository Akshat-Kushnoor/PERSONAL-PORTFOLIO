import { AnimatePresence, motion } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";

const OverlayMenu = ({ isOpen, onClose }) => {

    const isMobile = window.innerWidth < 1024 ;
    const origin = isMobile ? "0% 10%" : "2% 10%";
   
    

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/80 grid place-items-center z-50"
                    initial={{ clipPath: `circle(0% at ${origin})` }}
                    animate={{clipPath: `circle(150% at ${origin})`  }}
                    exit={{ clipPath: `circle(0% at ${origin})` }}
                    transition={{duration:2.5 , ease: [0.4,0,0.2,1]}}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white text-3xl"
                        aria-label="CLOSE MENU"
                    >
                        <RiCloseLine />
                    </button>

                    <ul className="space-y-6 text-center text-white text-2xl"
                     style={{fontFamily: 'Shadows Into Light Two'}}>
                        {["HOME", "ABOUT", "SKILLS", "PROJECTS", "CONTACT"].map(
                            (item, index) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.15 }}
                                >
                                    {item}
                                </motion.li>
                            )
                        )}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OverlayMenu;
