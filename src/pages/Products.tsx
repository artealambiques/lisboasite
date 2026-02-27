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
  nameKey: string;
  descKey: string;
  specKeys?: string[];
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
        nameKey: 'product.copperStills',
        descKey: 'product.copperStills.desc',
        specKeys: ['product.copperStills.spec1', 'product.copperStills.spec2', 'product.copperStills.spec3', 'product.copperStills.spec4'],
      },
      {
        nameKey: 'product.continuousColumns',
        descKey: 'product.continuousColumns.desc',
        specKeys: ['product.continuousColumns.spec1', 'product.continuousColumns.spec2', 'product.continuousColumns.spec3', 'product.continuousColumns.spec4'],
      },
      {
        nameKey: 'product.steamBoilers',
        descKey: 'product.steamBoilers.desc',
        specKeys: ['product.steamBoilers.spec1', 'product.steamBoilers.spec2', 'product.steamBoilers.spec3'],
      },
    ],
  },
  {
    key: 'processing',
    icon: '⚙️',
    products: [
      {
        nameKey: 'product.sugarcaneMills',
        descKey: 'product.sugarcaneMills.desc',
        specKeys: ['product.sugarcaneMills.spec1', 'product.sugarcaneMills.spec2', 'product.sugarcaneMills.spec3', 'product.sugarcaneMills.spec4'],
      },
      {
        nameKey: 'product.rotaryFilter',
        descKey: 'product.rotaryFilter.desc',
        specKeys: ['product.rotaryFilter.spec1', 'product.rotaryFilter.spec2', 'product.rotaryFilter.spec3'],
      },
      {
        nameKey: 'product.cookingVats',
        descKey: 'product.cookingVats.desc',
        specKeys: ['product.cookingVats.spec1', 'product.cookingVats.spec2', 'product.cookingVats.spec3'],
      },
    ],
  },
  {
    key: 'fermentation',
    icon: '🧪',
    products: [
      {
        nameKey: 'product.fermentationVats',
        descKey: 'product.fermentationVats.desc',
        specKeys: ['product.fermentationVats.spec1', 'product.fermentationVats.spec2', 'product.fermentationVats.spec3'],
      },
      {
        nameKey: 'product.reservoirs',
        descKey: 'product.reservoirs.desc',
        specKeys: ['product.reservoirs.spec1', 'product.reservoirs.spec2', 'product.reservoirs.spec3'],
      },
      {
        nameKey: 'product.settlingTanks',
        descKey: 'product.settlingTanks.desc',
        specKeys: ['product.settlingTanks.spec1', 'product.settlingTanks.spec2', 'product.settlingTanks.spec3'],
      },
    ],
  },
  {
    key: 'aging',
    icon: 'barrel',
    products: [
      {
        nameKey: 'product.oakBarrels',
        descKey: 'product.oakBarrels.desc',
        specKeys: ['product.oakBarrels.spec1', 'product.oakBarrels.spec2', 'product.oakBarrels.spec3', 'product.oakBarrels.spec4'],
      },
      {
        nameKey: 'product.woodCasks',
        descKey: 'product.woodCasks.desc',
        specKeys: ['product.woodCasks.spec1', 'product.woodCasks.spec2', 'product.woodCasks.spec3', 'product.woodCasks.spec4'],
      },
    ],
  },
  {
    key: 'bottling',
    icon: '🍾',
    products: [
      {
        nameKey: 'product.bottlingMachines',
        descKey: 'product.bottlingMachines.desc',
        specKeys: ['product.bottlingMachines.spec1', 'product.bottlingMachines.spec2', 'product.bottlingMachines.spec3'],
      },
      {
        nameKey: 'product.rinser',
        descKey: 'product.rinser.desc',
        specKeys: ['product.rinser.spec1', 'product.rinser.spec2', 'product.rinser.spec3'],
      },
      {
        nameKey: 'product.cappers',
        descKey: 'product.cappers.desc',
        specKeys: ['product.cappers.spec1', 'product.cappers.spec2', 'product.cappers.spec3'],
      },
      {
        nameKey: 'product.platformCart',
        descKey: 'product.platformCart.desc',
        specKeys: ['product.platformCart.spec1', 'product.platformCart.spec2', 'product.platformCart.spec3'],
      },
    ],
  },
  {
    key: 'accessories',
    icon: '🔧',
    products: [
      {
        nameKey: 'product.alcoholmeters',
        descKey: 'product.alcoholmeters.desc',
        specKeys: ['product.alcoholmeters.spec1', 'product.alcoholmeters.spec2', 'product.alcoholmeters.spec3'],
      },
      {
        nameKey: 'product.thermometers',
        descKey: 'product.thermometers.desc',
        specKeys: ['product.thermometers.spec1', 'product.thermometers.spec2', 'product.thermometers.spec3'],
      },
      {
        nameKey: 'product.specialFilters',
        descKey: 'product.specialFilters.desc',
        specKeys: ['product.specialFilters.spec1', 'product.specialFilters.spec2', 'product.specialFilters.spec3'],
      },
      {
        nameKey: 'product.analysisKits',
        descKey: 'product.analysisKits.desc',
        specKeys: ['product.analysisKits.spec1', 'product.analysisKits.spec2', 'product.analysisKits.spec3'],
      },
      {
        nameKey: 'product.caps',
        descKey: 'product.caps.desc',
        specKeys: ['product.caps.spec1', 'product.caps.spec2', 'product.caps.spec3'],
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
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-12 bg-transparent h-auto w-full max-w-6xl mx-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.key}
                  value={category.key}
                  className="data-[state=active]:bg-gradient-copper data-[state=active]:text-primary px-4 py-3 rounded-lg border border-border data-[state=active]:border-transparent w-full justify-start text-left whitespace-nowrap"
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
                            {t(product.nameKey)}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {t(product.descKey)}
                        </p>
                        {product.specKeys && (
                          <ul className="space-y-2">
                            {product.specKeys.map((specKey, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <span className="text-foreground/80">{t(specKey)}</span>
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
            {t('products.materialsTitle')}
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
              <h3 className="font-display font-semibold mb-2">{t('products.copper')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('products.copper.desc')}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-copper flex items-center justify-center">
                <span className="text-2xl">🔩</span>
              </div>
              <h3 className="font-display font-semibold mb-2">{t('products.steel')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('products.steel.desc')}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-copper flex items-center justify-center text-white">
                <BarrelIcon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-semibold mb-2">{t('products.wood')}</h3>
              <p className="text-muted-foreground text-sm">
                {t('products.wood.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
