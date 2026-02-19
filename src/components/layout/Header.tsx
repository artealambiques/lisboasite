import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import flagBR from '@/assets/flag-br.png';
import flagPT from '@/assets/flag-pt.png';
import flagES from '@/assets/flag-es.png';

const languageOptions = [
  { code: 'pt-br' as const, label: 'Português (BR)', flag: flagBR },
  { code: 'pt-pt' as const, label: 'Português (PT)', flag: flagPT },
  { code: 'es' as const, label: 'Español', flag: flagES },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/sobre', label: t('nav.about') },
    { path: '/produtos', label: t('nav.products') },
    { path: '/contato', label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  const currentLanguage = languageOptions.find(l => l.code === language) || languageOptions[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-copper flex items-center justify-center">
              <span className="text-primary font-display font-bold text-xl">A</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-primary-foreground font-display font-bold text-lg leading-tight">
                Arte & Técnica
              </h1>
              <p className="text-primary-foreground/70 text-xs tracking-wider">LISBOA</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(link.path)
                    ? 'text-accent'
                    : 'text-primary-foreground/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-accent hover:bg-primary-foreground/10">
                  <Globe className="w-4 h-4 mr-2" />
                  <img src={currentLanguage.flag} alt="" className="w-6 h-4 object-cover rounded-sm" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languageOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.code} 
                    onClick={() => setLanguage(option.code)}
                    className="cursor-pointer"
                  >
                    <img src={option.flag} alt="" className="w-6 h-4 object-cover rounded-sm mr-2" />
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="bg-gradient-copper hover:opacity-90 text-primary font-semibold">
              <Link to="/contato">{t('hero.cta')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium py-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-accent'
                      : 'text-primary-foreground/90 hover:text-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex flex-col gap-2 pt-4 border-t border-primary-foreground/10">
                <p className="text-primary-foreground/70 text-sm mb-2">Idioma / Language</p>
                {languageOptions.map((option) => (
                  <Button
                    key={option.code}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setLanguage(option.code);
                      setIsMenuOpen(false);
                    }}
                    className={`justify-start text-primary-foreground hover:text-accent ${
                      language === option.code ? 'bg-primary-foreground/10' : ''
                    }`}
                  >
                    <img src={option.flag} alt="" className="w-6 h-4 object-cover rounded-sm mr-2" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
