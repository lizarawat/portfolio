import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Globe } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const demoUrl = project.demo && project.demo !== '#' ? project.demo : project.github;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {project.category}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Date & Overview */}
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-2">PROJECT OVERVIEW • {project.date}</div>
            <p className="text-slate-700 leading-relaxed font-normal text-base">
              {project.fullDesc}
            </p>
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Key Performance Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-lg p-3 text-center">
                    <div className="text-base font-extrabold text-blue-700">{m.val}</div>
                    <div className="text-xs font-medium text-slate-600 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Highlights */}
          {project.highlights && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Architectural Highlights & Engineering Impact
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Technologies & Frameworks Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
            >
              <Globe className="w-4 h-4" />
              <span>Visit Live Site</span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors shadow-2xs"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200/80 rounded-lg transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
