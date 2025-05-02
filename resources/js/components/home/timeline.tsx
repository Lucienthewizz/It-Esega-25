import { Event } from "@/types/event";
import { motion } from "framer-motion";
import { FormattedDateWithOutTime } from "@/utils/formated-date";

export default function TimelineSection({ timeline }: { timeline: Event[] }) {
    const now = new Date();

    console.log(now);
    return (
        <>
            {/* Timeline Section */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/40 to-red-100/30"></div>
                <div className="relative z-10 max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4" data-aos="fade-up">
                            Event <span className="text-red-600">Timeline</span>
                        </h2>
                        <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-up" data-aos-delay="50"></div>
                    </div>

                    <div className="relative mx-auto flex w-full flex-col items-center">
                        {/* Timeline Line */}
                        <div
                            className="bg-red-500 absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 transform md:block hidden"
                            data-aos="fade-down"
                            data-aos-duration="1500"
                            data-aos-delay="200"
                            data-aos-easing="ease-out-cubic"
                        />
                        {/* Mobile Timeline Line */}
                        <div
                            className="bg-red-500 absolute top-0 left-6 h-full w-1 md:hidden"
                            data-aos="fade-down"
                            data-aos-duration="1500"
                            data-aos-delay="200"
                            data-aos-easing="ease-out-cubic"
                        />
                        {timeline.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`mb-8 md:mb-16 flex w-full flex-col ${isLeft
                                        ? 'md:pr-4 md:items-end md:self-start pl-12 md:pl-0'
                                        : 'md:pl-4 md:items-start md:self-end pl-12 md:pl-0'
                                        } md:w-1/2 items-start`}
                                >
                                    <div className="relative max-w-md w-full rounded-xl border border-red-100 bg-white p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        {/* Icon tetap sama */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform md:block hidden">
                                            <div className="relative">
                                                <div className="absolute -inset-4 rounded-full bg-red-500/20 animate-pulse"></div>
                                                <div className="relative">
                                                    <div className="bg-red-500 h-10 w-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
                                                        <div className="text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Icon mobile */}
                                        <div className="absolute -left-[2.4rem] top-2 md:hidden">
                                            <div className="relative">
                                                <div className="absolute -inset-1 rounded-full bg-red-500/20 animate-pulse"></div>
                                                <div className="relative">
                                                    <div className="bg-red-500 h-7 w-7 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                                        <div className="text-white scale-75">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date, Title, Description */}
                                        <p className={`mb-2 text-sm font-medium text-red-500 ${item.end_date ? 'mt-4' : ''}`}>
                                            <FormattedDateWithOutTime date={item.due_date} />
                                            {item.end_date && (
                                                <>
                                                    {" - "}
                                                    <FormattedDateWithOutTime date={item.end_date} />
                                                </>
                                            )}
                                        </p>

                                        <h4 className="text-red-600 mb-2 text-lg sm:text-xl font-semibold">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                            {item.description}
                                        </p>
                                        {item.location && (
                                            <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm relative">
                                                <div className="relative">
                                                    <div className="absolute -inset-2 rounded-full bg-red-500/20 animate-pulse"></div>
                                                    <div className="relative flex items-center justify-center w-6 h-6 bg-red-500 rounded-full text-white shadow animate-bounce">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.1046 0 2-.8954 2-2s-.8954-2-2-2-2 .8954-2 2 .8954 2 2 2z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4.5 8-12a8 8 0 10-16 0c0 7.5 8 12 8 12z" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {(item.location.includes("youtube.com") || item.location.includes("youtu.be")) ? (
                                                    <a href={item.location} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-700">
                                                        <span className="italic">Watch On YouTube</span>
                                                    </a>
                                                ) : item.location.includes("maps") ? (
                                                    <a href={item.location} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-700">
                                                        <span className="italic">Visit On Google Maps</span>
                                                    </a>
                                                ) : (
                                                    <span className="italic">{item.location}</span>
                                                )}
                                            </div>
                                        )}

                                    </div>
                                </motion.div>
                            );
                        })}

                    </div>
                </div>
            </section>
        </>
    )
}