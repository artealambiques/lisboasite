import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-copper flex items-center justify-center">
                <span className="text-primary font-display font-bold text-xl">A</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Arte & Técnica</h3>
                <p className="text-primary-foreground/70 text-xs tracking-wider">LISBOA</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-accent">
              Links Rápidos
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                {t('nav.home')}
              </Link>
              <Link to="/sobre" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                {t('nav.about')}
              </Link>
              <Link to="/produtos" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                {t('nav.products')}
              </Link>
              <Link to="/contato" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-accent">
              {t('contact.info.title')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-primary-foreground/80 text-sm">
                  Av. Manoel Firmino, 120<br />
                  Luziápolis, Campo Alegre/AL
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <div className="text-primary-foreground/80 text-sm">
                  <p>(82) 3142-3721</p>
                  <p>(82) 9 9672-0031</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a 
                  href="mailto:artealambiques@gmail.com" 
                  className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  artealambiques@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-accent">
              Redes Sociais
            </h4>
            <a
              href="https://instagram.com/arte_e_tecnica_lisboa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm">@arte_e_tecnica_lisboa</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-center text-primary-foreground/60 text-sm">
            © {currentYear} Arte & Técnica Lisboa. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
