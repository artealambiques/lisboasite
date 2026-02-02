import { CheckCircle, Target, Eye, Heart, Wrench, Factory, Ruler, Users, GraduationCap, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  { icon: Award, label: 'Qualidade' },
  { icon: Heart, label: 'Tradição' },
  { icon: Target, label: 'Inovação' },
  { icon: Users, label: 'Compromisso' },
];

const services = [
  { key: 'projects', icon: Ruler },
  { key: 'manufacturing', icon: Factory },
  { key: 'sizing', icon: Target },
  { key: 'consulting', icon: Users },
  { key: 'training', icon: GraduationCap },
  { key: 'standardization', icon: Award },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              {t('about.subtitle')}
            </p>
            <div className="w-24 h-1 bg-gradient-copper mx-auto mt-8 rounded-full" />
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold mb-6">
                Mais de 30 Anos de Tradição
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('about.history')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nossa trajetória é marcada pela busca incessante pela excelência. Cada equipamento que produzimos carrega a expertise acumulada ao longo de décadas, combinando técnicas tradicionais de fabricação com tecnologia moderna.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Atendemos destilarias em diversos estados brasileiros e também exportamos para países da América Latina, sempre mantendo o compromisso com a qualidade e o suporte técnico personalizado.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-8xl font-bold text-gradient-copper mb-4">30+</div>
                  <p className="text-2xl font-display text-foreground">Anos de Experiência</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-gradient-copper flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  {t('about.mission.title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.mission.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-gradient-copper flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  {t('about.vision.title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('about.vision.desc')}
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-gradient-copper flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  {t('about.values.title')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {values.map((value) => (
                    <span
                      key={value.label}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-accent" />
                      {value.label}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('services.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-copper mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.key} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-gradient-copper transition-colors">
                        <Icon className="w-6 h-6 text-primary group-hover:text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold mb-2">
                          {t(`services.${service.key}`)}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {t(`services.${service.key}.desc`)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-primary-foreground text-center mb-12">
              Diferenciais Técnicos
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Soldas neutras para evitar contaminação',
                'Válvulas de alívio de pressão e anti-vácuo',
                'Sistema de limpeza CIP integrado',
                'Conexões em bronze de alta durabilidade',
                'Cobre martelado para melhor catálise',
                'Aço inox 304 escovado antisséptico',
                'Aquecimento versátil: vapor, fogo ou elétrico',
                'Conformidade com normas técnicas',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-primary-foreground/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
