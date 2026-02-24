import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BarrelIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="32" cy="10" rx="18" ry="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <ellipse cx="32" cy="54" rx="18" ry="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <path d="M14 10 C8 20 8 44 14 54" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M50 10 C56 20 56 44 50 54" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M10 28 C14 26 50 26 54 28" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M10 36 C14 38 50 38 54 36" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M32 4 L32 60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4"/>
  </svg>
);

interface Product {
  name: string;
  description: string;
  specs?: string[];
}

interface Category {
  key: string;
  icon: string;
  products: Product[];
}

const categories: Category[] = [
  {
    key: 'distillation',
    icon: '🔥',
    products: [
      {
        name: 'Alambiques em Cobre',
        description: 'Fabricados em cobre martelado, polido e envernizado. Equipados com soldas neutras, válvulas de segurança e sistema de limpeza integrado.',
        specs: ['Aquecimento: vapor, fogo direto ou elétrico', 'Válvulas de alívio e anti-vácuo', 'Portas de inspeção', 'Conexões em bronze'],
      },
      {
        name: 'Colunas Contínuas',
        description: 'Desenvolvidas em cobre liso ou martelado para produção em larga escala. Ideais para diversas bebidas destiladas.',
        specs: ['Alta produtividade', 'Fracionamento contínuo', 'Design modular', 'Fácil manutenção'],
      },
      {
        name: 'Caldeiras Geradoras de Vapor',
        description: 'Sistemas completos para fornecimento de vapor aos processos de destilação e aquecimento.',
        specs: ['Diversos tamanhos', 'Alta eficiência', 'Segurança certificada'],
      },
    ],
  },
  {
    key: 'processing',
    icon: '⚙️',
    products: [
      {
        name: 'Moendas para Cana-de-açúcar',
        description: 'Projetadas para processar cana inteira ou picada com alto índice de eficiência na extração.',
        specs: ['Tecnologia moderna', 'Diversas capacidades e potências', 'Alta segurança operacional', 'Manutenção simplificada'],
      },
      {
        name: 'Filtro Rotativo',
        description: 'Fabricado em aço inox 304 para filtragem de alta eficiência do caldo de cana.',
        specs: ['Inox 304', 'Alta eficiência', 'Fácil limpeza'],
      },
      {
        name: 'Tachos de Cozimento',
        description: 'Para produção de melado, fabricados em aço inox 304 com pés em aço carbono.',
        specs: ['Aquecimento a vapor', 'Estrutura robusta', 'Diversos tamanhos'],
      },
    ],
  },
  {
    key: 'fermentation',
    icon: '🧪',
    products: [
      {
        name: 'Dornas de Fermentação',
        description: 'Fabricadas em aço inox 304 escovado, disponíveis em diversos modelos e capacidades.',
        specs: ['Inox 304 escovado', 'Fácil higienização', 'Modelos variados'],
      },
      {
        name: 'Reservatórios',
        description: 'Tanques em aço inox para armazenamento e preparação do mosto.',
        specs: ['Diversas capacidades', 'Acabamento sanitário', 'Resistência à corrosão'],
      },
      {
        name: 'Tanques Decantadores',
        description: 'Sistemas para diluição e decantação com design otimizado.',
        specs: ['Fundo cônico', 'Válvulas de descarga', 'Inox 304'],
      },
    ],
  },
  {
    key: 'aging',
    icon: 'barrel',
    products: [
      {
        name: 'Barris de Carvalho Europeu',
        description: 'Barris de aproximadamente 200 litros, remontados, reformados, flambados, lixados e pintados.',
        specs: ['~200 litros', 'Carvalho europeu', 'Flambagem controlada', 'Acabamento profissional'],
      },
      {
        name: 'Dornas de Madeira Nacional',
        description: 'Disponíveis em diversos formatos incluindo pirâmides. Ideais para envelhecimento de cachaça.',
        specs: ['Madeiras nacionais diversas', 'Formatos variados', 'Grande capacidade', 'Perfil sensorial único'],
      },
    ],
  },
  {
    key: 'bottling',
    icon: '🍾',
    products: [
      {
        name: 'Engarrafadoras',
        description: 'Máquinas disponíveis em configurações de 2, 4 e 6 bicos para diferentes escalas de produção.',
        specs: ['2, 4 ou 6 bicos', 'Alta precisão', 'Operação simples'],
      },
      {
        name: 'Rinser (Lavador de Garrafas)',
        description: 'Equipamento para limpeza asséptica das garrafas antes do envase.',
        specs: ['Limpeza eficiente', 'Operação rápida', 'Baixo consumo de água'],
      },
      {
        name: 'Rosquiadeiras de Tampas',
        description: 'Máquinas automáticas ou semiautomáticas para fechamento com torque controlado.',
        specs: ['Torque ajustável', 'Alta velocidade', 'Diversos tipos de tampas'],
      },
      {
        name: 'Carro Plataforma',
        description: 'Equipamento para transporte interno e secagem de garrafas.',
        specs: ['Estrutura robusta', 'Fácil manuseio', 'Otimiza o fluxo'],
      },
    ],
  },
  {
    key: 'accessories',
    icon: '🔧',
    products: [
      {
        name: 'Alcoômetros',
        description: 'Instrumentos de alta precisão para medição do teor alcoólico.',
        specs: ['Alta precisão', 'Fácil leitura', 'Calibrados'],
      },
      {
        name: 'Termômetros',
        description: 'Termômetros industriais para monitoramento preciso de temperatura.',
        specs: ['Diversas escalas', 'Inox', 'Longa durabilidade'],
      },
      {
        name: 'Filtros Especiais',
        description: 'Modelos específicos para diferentes etapas de purificação da bebida.',
        specs: ['Diversos tipos', 'Alta eficiência', 'Fácil troca'],
      },
      {
        name: 'Kits de Análise',
        description: 'Conjuntos para verificação de acidez e presença de cobre, essenciais para conformidade regulatória.',
        specs: ['Kit de acidez', 'Kit de cobre', 'Instruções completas'],
      },
      {
        name: 'Tampas',
        description: 'Diversos modelos de tampas para garrafas.',
        specs: ['Vários tamanhos', 'Rosca e pressão', 'Alta qualidade'],
      },
    ],
  },
];

export default function Products() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('distillation');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              {t('products.title')}
            </h1>
            <p className="text-xl text-primary-foreground/80">
              {t('products.subtitle')}
            </p>
            <div className="w-24 h-1 bg-gradient-copper mx-auto mt-8 rounded-full" />
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            {/* Category Tabs */}
            <TabsList className="flex flex-wrap justify-center gap-2 mb-12 bg-transparent h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.key}
                  value={category.key}
                  className="data-[state=active]:bg-gradient-copper data-[state=active]:text-primary px-4 py-3 rounded-lg border border-border data-[state=active]:border-transparent"
                >
                  {category.icon === 'barrel' ? (
                    <span className="mr-2 text-foreground"><BarrelIcon className="w-5 h-5 inline" /></span>
                  ) : (
                    <span className="mr-2">{category.icon}</span>
                  )}
                  {t(`products.${category.key}`)}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Products Grid */}
            {categories.map((category) => (
              <TabsContent key={category.key} value={category.key} className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.products.map((product, index) => (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          {category.icon === 'barrel' ? (
                            <span className="text-accent"><BarrelIcon className="w-6 h-6" /></span>
                          ) : (
                            <span className="text-2xl">{category.icon}</span>
                          )}
                          <CardTitle className="font-display text-xl group-hover:text-accent transition-colors">
                            {product.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {product.description}
                        </p>
                        {product.specs && (
                          <ul className="space-y-2">
                            {product.specs.map((spec, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <span className="text-foreground/80">{spec}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Materials Info */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-center mb-8">
            Materiais de Alta Qualidade
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-copper flex items-center justify-center text-white">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                  <circle cx="32" cy="28" r="16" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                  <path d="M18 20 C18 12 46 12 46 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M24 44 L24 52 L40 52 L40 44" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 52 L28 58 M36 52 L36 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20 24 L22 28 M44 24 L42 28 M22 32 L18 34 M42 32 L46 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </div>
              <h3 className="font-display font-semibold mb-2">Cobre Martelado</h3>
              <p className="text-muted-foreground text-sm">
                Aumenta a área de contato para melhor catálise e neutralização de impurezas.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-copper flex items-center justify-center">
                <span className="text-2xl">🔩</span>
              </div>
              <h3 className="font-display font-semibold mb-2">Aço Inox 304</h3>
              <p className="text-muted-foreground text-sm">
                Resistência à corrosão ácida e acabamento escovado antisséptico.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-copper flex items-center justify-center text-white">
                <BarrelIcon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold mb-2">Madeiras Nobres</h3>
              <p className="text-muted-foreground text-sm">
                Carvalho europeu e madeiras nacionais para envelhecimento premium.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
