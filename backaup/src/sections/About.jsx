import profilePic from "../assets/profile.png";
import { motion } from "framer-motion";

const About = () => {
    const stats = [
        { label: "Experience", value: "1+ years" },
        { label: "Projects", value: "5+" },
        { label: "Focus", value: "Performance and Scalability" }
    ];

    return (
        <section className="min-h-screen flex items-center justify-center relative bg-black text-white overflow-hidden px-6">
            
            {/* Background bubbles */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-blue-300 opacity-60 blur-xl animate-pulse"></div>
                <div className="absolute top-1/3 left-1/2 w-24 h-24 rounded-full bg-blue-300 opacity-60 blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-blue-300 opacity-60 blur-2xl animate-pulse"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-10 z-10">

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex justify-center"
                >
                    <img
                        src={profilePic}
                        alt="Profile Pic"
                        className="rounded-4xl w-[260px] h-[330px] object-cover shadow-4xl"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-xl"
                >
                    <h2 className="text-3xl font-bold mb-4"
                     style={{fontFamily: 'Macondo'}}
                     >About Me</h2>

                    <p className="text-gray-300">
                        I craft digital experiences that blend clean engineering with purposeful design—
                        turning ideas into scalable, high-performance reality.
                    </p>
                    <p className="mt-2 text-gray-400">
                        I love transforming concepts into functional, impactful products through code.
                    </p>

                    
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                className="rounded-xl border border-cyan-400 bg-white/10 px-4 py-3 text-center"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 * i, duration: 0.5 }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="text-cyan-300 font-semibold">{stat.value}</div>
                                <div className="text-gray-300">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    
                    <div className="flex gap-4 items-center justify-center mt-6">
                        <a
                            href="#projects"
                            className="bg-cyan-200 text-black px-4 py-2 rounded-xl hover:bg-white/20 hover:text-white transition"
                        >
                            Projects
                        </a>

                        <a
                            href="#contact"
                            className="bg-white/10 text-white px-4 py-2 rounded-xl hover:bg-cyan-200 hover:text-black transition"
                        >
                            Contact
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
