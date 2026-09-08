import React from 'react';
import { certifications } from '../data/resumeData';
import { ShieldCheck, ExternalLink, CheckCircle } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Verified Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Certifications & Industry Standards
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            Validated technical expertise across Cloud AI, Enterprise Data Platforms, NoSQL Databases, and Generative AI.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-5 card-subtle flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-blue-800 font-semibold text-xs border border-blue-100">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>{cert.issuer}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">{cert.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {cert.title}
                </h3>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 text-[11px] font-medium text-slate-600 bg-white border border-slate-200 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>ID: {cert.credentialId}</span>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    title="Verify Certificate Credential"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-emerald-700 font-sans font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
