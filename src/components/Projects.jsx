import React, { useState } from 'react';
import { projects } from '../data/resumeData';
import ProjectModal from './ProjectModal';
import { ExternalLink, Github, ArrowUpRight, Globe } from 'lucide-react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Quant & Full Stack', 'AI / ML & Web Platform', 'Data Analytics & Engineering', 'Algorithms & WebAssembly'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Proof of Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Projects & Systems
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            Engineered with focus on high throughput, real-time data streaming, advanced AI evaluations, and clean architectural design.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-xs card-subtle flex flex-col justify-between"
            >
              <div>
                {/* Category & Date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {project.category}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {project.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(project)}>
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  {project.shortDesc}
                </p>

                {/* Metric Badge Callout */}
                {project.metrics && project.metrics[0] && (
                  <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">{project.metrics[0].label}</span>
                    <span className="text-xs font-extrabold text-slate-900 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200/60">
                      {project.metrics[0].val}
                    </span>
                  </div>
                )}

                {/* Tech Stack Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] font-semibold text-slate-600 bg-slate-100 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-slate-50 rounded">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.demo && project.demo !== '#' ? project.demo : project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
                    title="Visit Live Site / Demo"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Site</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
}
