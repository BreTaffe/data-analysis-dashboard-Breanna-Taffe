import { Twitter, Github, Linkedin, Atom } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white/70 backdrop-blur-sm border-t border-slate-200">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-slate-600">
        <div className="flex items-center space-x-3">
          <span>© {year} Breanna Taffe</span>
          <span className="hidden md:inline-flex items-center space-x-2">
            <Atom className="h-4 w-4 text-rose-500" />
            <span>Built with React</span>
          </span>
        </div>

        <div className="flex items-center space-x-3 mt-3 md:mt-0">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-600 hover:text-blue-500 flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </a>

          <a href="https://github.com/BreTaffe" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-600 hover:text-slate-900 flex items-center gap-2">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>

          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-600 hover:text-blue-700 flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
