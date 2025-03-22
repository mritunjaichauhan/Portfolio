import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { projects } from '../pages/HomePage';
import { Project } from '../types';
import { useEffect } from 'react';

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p: Project) => p.id === id);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return null;
  }

  // Navigate back to the projects section
  const handleBackClick = () => {
    // Use state to indicate we want to scroll to the projects section
    navigate('/', { state: { scrollToSection: 'projects' } });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-8 py-16"
      >
        <motion.button
          onClick={handleBackClick}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-16"
          whileHover={{ x: -10 }}
        >
          <ArrowLeft size={24} />
          <span>Back to Projects</span>
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-6xl font-black mb-6">{project.title}</h1>
            <p className="text-2xl text-white/60 mb-8">{project.description}</p>
            <div className="flex gap-4 mb-12">
              {project.details.github && (
                <a
                  href={project.details.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg"
                >
                  <Github size={20} />
                  <span>View on GitHub</span>
                </a>
              )}
              {project.details.demo && (
                <a
                  href={project.details.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  {project.details.overview}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  {project.details.features.map((feature: string, index: number) => (
                    <li key={index} className="text-lg">{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.details.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="sticky top-16">
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-2xl shadow-2xl mb-8"
              />
              <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden">
                {/* Additional project visuals could go here */}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectPage;