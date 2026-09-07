import React from 'react';
import { personalInfo } from '../data/resumeData';
import { Target, Cpu, Database, Network, Award, CheckCircle } from 'lucide-react';

export default function About() {
  const focusAreas = [
    {
      title: "Data Engineering & Analytics",
      icon: Database,
      description: "Building scalable data pipelines, processing massive datasets (1.21B+ rows), executing exploratory analysis with Pandas/NumPy, and deploying interactive Streamlit/Power BI dashboards."
    },
    {
      title: "AI & Natural Language Processing",
      icon: Cpu,
      description: "Developing intelligent evaluation engines leveraging Gemini 2.5 Flash structured outputs, FinBERT NLP sentiment scoring, and Toulmin argument logic frameworks."
    },
    {
      title: "High-Performance Algorithms & Systems",
      icon: Network,
      description: "Mastering complex DSA (350+ problems solved), low-latency WebSockets streaming (<200ms latency), and compiling graph algorithms via C++ WebAssembly (Wasm)."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Profile Overview
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              About Me & Core Specialization
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 font-semibold text-sm shadow-xs">
            <Award className="w-4 h-4 text-blue-600" />
            <span>CGPA: 8.85 / 10 @ LPU</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Objective & Bio */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-4 pb-3 border-b border-slate-100">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Career Objective</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                "{personalInfo.objective}"
              </p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600">
                    <strong className="text-slate-800">Academic Standing:</strong> Pursuing B.Tech Computer Science & Engineering with 8.85 CGPA.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600">
                    <strong className="text-slate-800">Problem Solving:</strong> 350+ solved problems across LeetCode & GeeksforGeeks.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600">
                    <strong className="text-slate-800">Industry Credentials:</strong> Oracle AI Associate, Oracle Data Platform, and MongoDB Certified DBA path.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>LPU Phagwara</span>
              <span>•</span>
              <span>DPS Ranipur Alumni</span>
              <span>•</span>
              <span>Data & AI Focus</span>
            </div>
          </div>

          {/* Right Column: Focus Areas */}
          <div className="lg:col-span-7 space-y-4">
            {focusAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs card-subtle flex flex-col sm:flex-row gap-5 items-start"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{area.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
