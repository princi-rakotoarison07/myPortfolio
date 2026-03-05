import React, { useRef } from "react";
import SectionTitle from "../components/SectionTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
  
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".fade-up");
  
      gsap.set(elements, {
        opacity: 0,
        y: 30,
        filter: "blur(6px)"
      });
  
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);
  
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen md:h-fit w-full bg-zinc-900 text-white px-6 py-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-between">

        <SectionTitle title="CONTACT" theme="white" />

        {/* Intro */}
       

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10">

          {/* LEFT - Contact Info */}
          <div className="fade-up flex flex-col justify-between h-full">
            <div className="fade-up mb-10 max-w-2xl">
              <p className="text-zinc-400 leading-relaxed">
                Have a project in mind or just want to connect?  
                Feel free to reach out. I’m always open to discussing new ideas,
                collaborations or opportunities.
              </p>
            </div>
            <div className="fade-up">
              <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-2">
                Email
              </h3>
              <a
                href="mailto:your@email.com"
                className="text-lg hover:text-zinc-300 transition"
              >
                jonathanandrianantenaina@gmail.com
              </a>
            </div>

            <div className="fade-up">
              <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-2">
                Location
              </h3>
              <p className="text-lg">Madagascar</p>
            </div>

            <div className="fade-up">
              <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
                Social
              </h3>
              <div className="flex gap-6">
                <a href="#" className="hover:text-zinc-400 transition">
                  GitHub
                </a>
                <a href="#" className="hover:text-zinc-400 transition">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-zinc-400 transition">
                  Twitter
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT - Contact Form */}
          <form
            action="https://formspree.io/f/xpqyapzv"
            method="POST"
            className="fade-up flex flex-col gap-6 justify-center h-full w-full" 
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 focus:outline-none focus:border-white transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 focus:outline-none focus:border-white transition"
            />

            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              className="bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 focus:outline-none focus:border-white transition resize-none"
            />

            <button
              type="submit"
              className="mt-4 bg-white text-black py-3 rounded-md hover:bg-zinc-300 transition-all duration-300"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}

export default Contact;
