import Image from "next/image";
import PageCtas from "@/components/PageCtas";
import Reveal from "@/components/Reveal";
import { Users, Microscope, ShieldCheck, Truck, Globe2, Target, Zap, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const leadershipTeam = [
    {
      name: "Tanaporn Likit",
      role: "Chief Executive Officer",
      bio: "Tanaporn drives the strategic direction of Calu-Synthetics, focusing on the intersection of industrial innovation and sustainable growth. Under his leadership, the company has expanded its footprint across global markets while maintaining a boutique focus on client precision.",
      image: "/New stuff/About us Compresses/CEO TANAPORN LIKIT.png",
      icon: <Users className="w-6 h-6" />
    },
    {
      name: "Somchai Phisud",
      role: "Head of Manufacturing Operations",
      bio: "Somchai oversees the heart of our facility, ensuring that our manufacturing processes are as efficient as they are safe. With a deep background in chemical engineering, he bridges the gap between complex formulations and large-scale industrial output.",
      image: "/New stuff/About us Compresses/Head of Manufacturing Operations SOMCHAI PHISUD.png",
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      name: "Siriporn Krajang",
      role: "Manager, Quality Assurance (QA)",
      bio: "Siriporn is the guardian of our product integrity. She leads our laboratory team with a focus on uncompromising purity and rigorous testing protocols, ensuring that every batch of Calu-Synthetics product exceeds international regulatory standards.",
      image: "/New stuff/About us Compresses/Mananger QA, SIRIPON KRAJANG.png",
      icon: <Microscope className="w-6 h-6" />
    },
    {
      name: "Supachai Chen",
      role: "Logistics & Supply Chain Director",
      bio: "Supachai specializes in the \"last mile\" of industrial reliability. By optimizing our global supply chain and warehouse management, he ensures that our partners receive their shipments on time, every time, regardless of geographic complexity.",
      image: "/New stuff/About us Compresses/Logistic & Chain Supply, SUPACHAI CHEN.png",
      icon: <Truck className="w-6 h-6" />
    },
    {
      name: "Mei Ling Chen",
      role: "Head of International Sales",
      bio: "Mei Ling translates technical capability into client-focused solutions. She manages our international partnerships, ensuring that our global clients receive personalized service and strategic sourcing advice tailored to their specific market needs.",
      image: "/New stuff/About us Compresses/Head of International Sales, MEI LING CHEN.png",
      icon: <Globe2 className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-metallic-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="About Background"
            fill
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-industrial-950/80"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
            About <br className="hidden md:block" />
            Calu-Synthetics
          </h1>
          <p className="text-xl text-industrial-300 max-w-2xl font-medium">Precision, Reliability, and Industrial Expertise since 1998.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
            <div>
              <h2 className="text-3xl font-black text-industrial-950 mb-8 tracking-tight flex items-center gap-4">
                <span className="w-12 h-1 bg-industrial-600 rounded-full"></span>
                Who We Are
              </h2>
              <div className="space-y-6 text-lg text-metallic-600 leading-relaxed">
                <p>
                  Calu-Synthetics is a leading manufacturer of high-grade industrial chemicals, specializing in the production of <span className="text-industrial-900 font-bold underline decoration-industrial-500/30">Caluanie Muelear Oxidize</span>. Based in Bangkok, Thailand, we have established ourselves as a cornerstone of the global chemical supply chain.
                </p>
                <p>
                  Our expertise lies in the development of powerful oxidizing agents designed for critical applications in automotive, aerospace, and heavy manufacturing. We pride ourselves on our ISO-certified production facilities and our commitment to chemical purity.
                </p>
              </div>
            </div>
            <div className="metallic-card rounded-3xl p-12 border border-metallic-300 shadow-2xl relative group">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-industrial-600/10 rounded-full blur-2xl group-hover:bg-industrial-600/20 transition-all duration-500"></div>
              <h3 className="text-xl font-black text-industrial-900 mb-8 tracking-widest uppercase">Our Core Values</h3>
              <ul className="space-y-8">
                <li className="flex gap-6">
                  <div className="w-10 h-10 bg-industrial-900 text-white rounded-lg flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-industrial-950 mb-1">Uncompromising Quality</h4>
                    <p className="text-sm text-metallic-500">Every batch undergoes rigorous lab testing to ensure 99.9% purity standards.</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="w-10 h-10 bg-industrial-900 text-white rounded-lg flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-industrial-950 mb-1">Global Logistics</h4>
                    <p className="text-sm text-metallic-500">Strategic shipping routes and export documentation expertise for worldwide delivery.</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="w-10 h-10 bg-industrial-900 text-white rounded-lg flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-industrial-950 mb-1">Technical Partnership</h4>
                    <p className="text-sm text-metallic-500">More than a supplier, we provide ongoing technical support for all industrial applications.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Mission & Values Section */}
          <div className="pb-24">
            <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Safety",
                  icon: <ShieldCheck className="w-8 h-8 text-industrial-600" />,
                  desc: "Uncompromising protocols to protect our team and the environment."
                },
                {
                  title: "Precision",
                  icon: <Target className="w-8 h-8 text-industrial-600" />,
                  desc: "Atomic-level consistency in every batch of Caluanie Muelear Oxidize."
                },
                {
                  title: "Innovation",
                  icon: <Zap className="w-8 h-8 text-industrial-600" />,
                  desc: "Continuous R&D to refine industrial efficiency."
                }
              ].map((value, idx) => (
                <div key={idx} className="bg-white border border-metallic-200 rounded-3xl p-10 hover:shadow-xl transition-all duration-300 group text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-industrial-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-black text-industrial-950 mb-4 tracking-tight">{value.title}</h4>
                  <p className="text-metallic-600 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Capabilities & Facilities Section */}
          <div className="py-24 border-t border-metallic-200">
            <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 lg:order-1">
                <div>
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-industrial-600 mb-4">Our Facility</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-industrial-950 tracking-tighter leading-none">
                    Global Scale. <br />
                    <span className="text-industrial-600">Boutique Precision.</span>
                  </h3>
                </div>
                
                {/* Mobile/Tablet Image Placement: Directly after heading */}
                <div className="lg:hidden relative aspect-video rounded-3xl overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-industrial-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <Image
                    src="/New stuff/Public Compressed/Many Warehouse workers.png"
                    alt="Calu-Synthetics Bangkok Facility"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 border-[12px] border-white/10 rounded-3xl pointer-events-none z-20"></div>
                </div>

                <p className="text-lg text-metallic-600 leading-relaxed">
                  Our Bangkok-based manufacturing facility represents the pinnacle of industrial chemical production. Utilizing high-automated distillation units and advanced HPLC (High-Performance Liquid Chromatography) testing, we maintain absolute control over the molecular integrity of our oxidizing agents.
                </p>

                <ul className="space-y-4">
                  {[
                    "50,000L Monthly Capacity",
                    "ISO-Certified Lab",
                    "Global Logistics"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-industrial-950 font-bold">
                      <div className="w-6 h-6 rounded-full bg-industrial-900 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desktop Image Placement */}
              <div className="hidden lg:block relative aspect-video rounded-3xl overflow-hidden shadow-2xl group lg:order-2">
                <div className="absolute inset-0 bg-industrial-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <Image
                  src="/New stuff/Public Compressed/Many Warehouse workers.png"
                  alt="Calu-Synthetics Bangkok Facility"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 border-[12px] border-white/10 rounded-3xl pointer-events-none z-20"></div>
              </div>
            </Reveal>
          </div>

          <div className="bg-industrial-950 rounded-3xl p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-industrial-900/40">
            <h2 className="text-4xl font-black mb-8 tracking-tight">ISO 9001:2015 Certified Excellence</h2>
            <p className="text-industrial-300 max-w-3xl mx-auto text-lg leading-relaxed mb-12">
              Our commitment to quality and safety is demonstrated by our international certifications. We adhere to the highest international standards in manufacturing, quality control, and environmental responsibility.
            </p>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest">Quality Assurance</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest">Environmental Safety</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest">Research Focus</p>
              </div>
            </div>
          </div>

          {/* Leadership Team Section */}
          <div className="mt-32">
            <Reveal className="text-center mb-16">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-industrial-600 mb-4">Our Leadership Team</h2>
              <h3 className="text-4xl md:text-5xl font-black text-industrial-950 mb-6 tracking-tighter">The Vision & The Execution</h3>
              <p className="text-lg text-metallic-600 max-w-3xl mx-auto leading-relaxed">
                At Calu-Synthetics, excellence isn’t a goal—it’s our baseline. Our leadership team represents a fusion of scientific rigor, operational grit, and global strategic vision. From the laboratory floor to international ports, we work in lockstep to ensure that every synthetic solution we deliver meets the most exacting standards of the modern industry.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
                <Reveal 
                  key={index} 
                  transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
                  className="metallic-card bg-white rounded-[2.5rem] p-8 border border-metallic-200 shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="relative mb-8">
                    {/* Leader Image */}
                    <div className="aspect-[4/5] bg-metallic-100 rounded-3xl overflow-hidden relative flex items-center justify-center border border-metallic-200 group-hover:border-industrial-300 transition-colors">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="h-1 w-0 bg-industrial-600 group-hover:w-full transition-all duration-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-black text-industrial-950 tracking-tight">{member.name}</h4>
                      <p className="text-xs font-black uppercase tracking-widest text-industrial-600 mt-1">{member.role}</p>
                    </div>
                    <p className="text-sm text-metallic-600 leading-relaxed font-medium">
                      {member.bio}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Strategic Location Section */}
          <div className="mt-32">
            <Reveal className="overflow-hidden group">
              <div className="relative w-full h-[500px] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15506.034459356156!2d100.61339121854442!3d13.66449645163155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sth!4v1715291234567!5m2!1sen!2sth"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-1000 ease-in-out"
                ></iframe>
                
                {/* Google Maps Style Info Box - Matching the provided image */}
                  <div className="absolute top-6 left-6 bg-white py-4 px-5 rounded-sm shadow-md border border-gray-100 max-w-[360px] z-10 flex justify-between items-start gap-12">
                    <div className="flex flex-col">
                      <p className="text-[#212121] text-sm font-medium leading-5">
                        123 Industrial Park, Bang Na, <br />
                        Bangkok 10260, Thailand
                      </p>
                    </div>
                  
                  <div className="flex gap-4 items-center mt-1">
                    {/* View on Google Maps Icon */}
                    <a 
                      href="https://maps.google.com/?q=Bang+Na+Bangkok" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#4285F4] hover:text-[#1a73e8] transition-colors"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                      </svg>
                    </a>
                    {/* Directions Icon */}
                    <a 
                      href="https://www.google.com/maps/dir//Bang+Na,+Bangkok" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#4285F4] hover:text-[#1a73e8] transition-colors"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PageCtas />
    </div>
  );
}
