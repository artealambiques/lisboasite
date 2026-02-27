import { Link } from 'react-router-dom';
import { ArrowRight, Award, Cpu, Clock, Headphones, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-alambique.jpg';

// SVG barrel icon component
const BarrelIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <ellipse cx="32" cy="10" rx="18" ry="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <ellipse cx="32" cy="54" rx="18" ry="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <path d="M14 10 C8 20 8 44 14 54" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M50 10 C56 20 56 44 50 54" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M10 28 C14 26 50 26 54 28" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M10 36 C14 38 50 38 54 36" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M32 4 L32 60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4"/>
  </svg>
);

// Product category icons and data
const productCategories = [
  { key: 'distillation', icon: '🔥' },
  { key: 'processing', icon: '⚙️' },
  { key: 'fermentation', icon: '🧪' },
  { key: 'aging', icon: 'barrel' },
  { key: 'bottling', icon: '🍾' },
  { key: 'accessories', icon: '🔧' },
];

const features = [
  { key: 'quality', icon: Award },
  { key: 'technology', icon: Cpu },
  { key: 'experience', icon: Clock },
  { key: 'support', icon: Headphones },
];

const stats = [
  { key: 'years', value: '30+' },
  { key: 'equipment', value: '500+' },
  { key: 'states', value: '10+' },
  { key: 'countries', value: '3+' },
  { key: 'clients', value: '100+' },
];

export default function Index() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Alambique de cobre"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="bg-gradient-copper hover:opacity-90 text-primary font-semibold text-lg px-8">
                <a href="https://wa.me/5582996720107?text=Quero%20saber%20mais!" target="_blank" rel="noopener noreferrer">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button asChild size="lg" className="bg-gradient-copper hover:opacity-90 text-primary font-semibold text-lg px-8">
                <Link to="/produtos">
                  {t('hero.products')}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            {t('features.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-copper mx-auto mb-12 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.key} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-copper flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {t(`features.${feature.key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(`features.${feature.key}.desc`)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <p className="text-primary-foreground/80 text-sm md:text-base">
                  {t(`stats.${stat.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('products.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('products.subtitle')}
            </p>
            <div className="w-24 h-1 bg-gradient-copper mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {productCategories.map((category) => (
              <Link
                key={category.key}
                to="/produtos"
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {category.icon === 'barrel' ? (
                        <span className="text-accent"><BarrelIcon /></span>
                      ) : (
                        <span className="text-4xl">{category.icon}</span>
                      )}
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                          {t(`products.${category.key}`)}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {t(`products.${category.key}.desc`)}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a
                href="https://drive.google.com/file/d/1eGY8RQzpE7SBnXqzdemGrHWGGk8q2Iyp/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('products.viewAll')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-wood relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Button asChild size="lg" className="bg-gradient-copper hover:opacity-90 text-primary font-semibold text-lg px-8">
            <a href="https://wa.me/5582996720107?text=Quero%20saber%20mais!" target="_blank" rel="noopener noreferrer">
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
