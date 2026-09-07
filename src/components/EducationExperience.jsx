import React, { useState } from 'react';
import { education, achievements } from '../data/resumeData';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2, Users } from 'lucide-react';

export default function EducationExperience() {
  const [activeTab, setActiveTab] = useState('education');

  return (
    <section id="education" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Background & Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Education, Training & Honors
            </h2>
          </div>

          {/* Toggle Tabs */}
          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-lg shadow-2xs">
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                activeTab === 'education'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education & Training</span>
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                activeTab === 'achievements'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Achievements & Honors</span>
            </button>
          </div>
        </div>

        {/* Content Views */}
        {activeTab === 'education' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Timeline Column */}
            <div className="lg:col-span-8 space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs card-subtle flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{edu.score}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-sm font-semibold text-slate-700">{edu.institution}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{edu.location}</span>
                    </p>
                    <p className="text-sm text-slate-600 mt-2">{edu.details}</p>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 whitespace-nowrap bg-slate-100 px-3 py-1.5 rounded-md self-start">
                    {edu.period}
                  </div>
                </div>
              ))}
            </div>

            {/* Specialized Training Card */}
            <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Specialized Training</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Data Structures & Graph Data Analytics
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-4">
                  Lovely Professional University • Jun 2026
                </p>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Established robust foundation in computational data structures and Big-O algorithmic analysis.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Mastered core DSA modules: Dynamic Programming, Greedy models, AVL Trees, Heaps, and MST algorithms.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Applied graph structures (Dijkstra, Bellman-Ford, BFS, DFS) for high-performance packet routing.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
                Core Focus: Algorithmic Efficiency & Graph Analytics
              </div>
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs card-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
                      {ach.organization}
                    </span>
                    <span className="text-xs font-medium text-slate-400">{ach.period}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{ach.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
