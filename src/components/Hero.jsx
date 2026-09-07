import React from 'react';
import { personalInfo, keyMetrics } from '../data/resumeData';
import { Code2, Database, Zap, GraduationCap, ArrowRight, FileText, CheckCircle2, MapPin, Mail } from 'lucide-react';

const iconMap = {
  Code2: Code2,
  Database: Database,
  Zap: Zap,
  GraduationCap: GraduationCap,
};

export default function Hero() {
  return (
    <section className="relative py-16 md:py-24 bg-white border-b border-slate-200/80 overflow-hidden">
      {/* Background Subtle Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Seeking Data Engineering & AI Roles</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Engineering Data Platforms & AI Solutions
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Hi, I'm <span className="font-semibold text-slate-900">{personalInfo.name}</span>. B.Tech Computer Science student at Lovely Professional University specializing in <span className="text-blue-700 font-medium">Data Engineering</span>, <span className="text-blue-700 font-medium">Machine Learning</span>, and <span className="text-blue-700 font-medium">High-Performance Algorithms</span>.
          </p>

          {/* Location & Quick Info */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{personalInfo.email}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#education"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-all"
            >
              <GraduationCap className="w-4 h-4 text-slate-600" />
              <span>Qualifications & Credentials</span>
            </a>
          </div>
        </div>

        {/* Key Performance Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {keyMetrics.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Code2;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-5 card-subtle flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {item.value}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.subtext}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
