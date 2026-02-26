import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt-br' | 'pt-pt' | 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  'pt-br': {
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.products': 'Produtos',
    'nav.contact': 'Contato',
    
    // Hero Section
    'hero.title': 'Tradição e Excelência em Equipamentos para Indústrias de Bebidas derivadas da cana-de-açúcar',
    'hero.subtitle': 'Há mais de 30 anos fabricando equipamentos de alta qualidade para a produção de cachaça e bebidas destiladas',
    'hero.cta': 'Fale Conosco',
    'hero.products': 'Ver Produtos',
    
    // Features
    'features.title': 'Por que escolher a Arte & Técnica Lisboa?',
    'features.quality.title': 'Qualidade Premium',
    'features.quality.desc': 'Materiais de alta resistência como cobre martelado e aço inox 304',
    'features.technology.title': 'Tecnologia Moderna',
    'features.technology.desc': 'Equipamentos com sistemas de segurança e eficiência energética',
    'features.experience.title': '30+ Anos de Experiência',
    'features.experience.desc': 'Tradição e expertise reconhecidas em todo o Brasil',
    'features.support.title': 'Suporte Técnico',
    'features.support.desc': 'Consultoria, instalação e manutenção especializada',
    
    // Stats
    'stats.years': 'Anos de Mercado',
    'stats.equipment': 'Equipamentos Fabricados',
    'stats.states': 'Estados Atendidos',
    'stats.countries': 'Países Atendidos',
    'stats.clients': 'Clientes Satisfeitos',
    
    // Products Section
    'products.title': 'Nossos Produtos',
    'products.subtitle': 'Soluções completas para sua destilaria',
    'products.viewAll': 'Ver Catálogo Completo',
    
    // Product Categories
    'products.distillation': 'Destilação',
    'products.distillation.desc': 'Alambiques em cobre, colunas contínuas e caldeiras',
    'products.processing': 'Processamento',
    'products.processing.desc': 'Moendas, filtros rotativos e tachos de cozimento',
    'products.fermentation': 'Fermentação',
    'products.fermentation.desc': 'Dornas, reservatórios e tanques em aço inox',
    'products.aging': 'Envelhecimento',
    'products.aging.desc': 'Barris de carvalho e dornas de madeira nacional',
    'products.bottling': 'Envase',
    'products.bottling.desc': 'Engarrafadoras, rinsers e rosquiadeiras',
    'products.accessories': 'Acessórios',
    'products.accessories.desc': 'Alcoômetros, termômetros e kits de análise',
    
    // About Page
    'about.title': 'Nossa História',
    'about.subtitle': 'Mais de três décadas de dedicação à excelência',
    'about.history': 'A Arte & Técnica Lisboa nasceu da paixão pela tradição brasileira de produção de cachaça. Com mais de 30 anos de experiência, nos tornamos referência nacional na fabricação de equipamentos industriais para destilarias.',
    'about.mission.title': 'Missão',
    'about.mission.desc': 'Fornecer equipamentos de alta qualidade que permitam aos nossos clientes produzir bebidas destiladas de excelência, preservando a tradição e incorporando tecnologia moderna.',
    'about.vision.title': 'Visão',
    'about.vision.desc': 'Ser reconhecida como a principal fornecedora de equipamentos para destilarias no Brasil e na América Latina.',
    'about.values.title': 'Valores',
    'about.values.desc': 'Qualidade, tradição, inovação, compromisso com o cliente e respeito às normas técnicas.',
    
    // Services
    'services.title': 'Nossos Serviços',
    'services.projects': 'Elaboração de Projetos',
    'services.projects.desc': 'Desenvolvimento completo de projetos personalizados para sua destilaria',
    'services.manufacturing': 'Fabricação e Instalação',
    'services.manufacturing.desc': 'Produção de equipamentos e instalação no local',
    'services.sizing': 'Dimensionamento de Fábricas',
    'services.sizing.desc': 'Planejamento e dimensionamento completo da planta industrial',
    'services.consulting': 'Consultoria Técnica',
    'services.consulting.desc': 'Visitas técnicas e orientação especializada',
    'services.training': 'Cursos e Treinamentos',
    'services.training.desc': 'Capacitação para operação e manutenção dos equipamentos',
    'services.standardization': 'Padronização de Produtos',
    'services.standardization.desc': 'Auxílio na padronização da qualidade do destilado',
    
    // Contact Page
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Estamos prontos para atender você',
    'contact.form.name': 'Nome',
    'contact.form.email': 'E-mail',
    'contact.form.phone': 'Telefone',
    'contact.form.message': 'Mensagem',
    'contact.form.submit': 'Enviar Mensagem',
    'contact.info.title': 'Informações de Contato',
    'contact.info.address': 'Endereço',
    'contact.info.phones': 'Telefones',
    'contact.info.email': 'E-mail',
    'contact.info.instagram': 'Instagram',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados',
    'footer.description': 'Fabricação de equipamentos industriais para destilarias desde 1994',
    
    // WhatsApp
    'whatsapp.message': 'Olá! Gostaria de mais informações sobre equipamentos.',
  },
  'pt-pt': {
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.products': 'Produtos',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.title': 'Tradição e Excelência em Equipamentos para Indústrias de Bebidas derivadas da cana-de-açúcar',
    'hero.subtitle': 'Há mais de 30 anos a fabricar equipamentos de alta qualidade para a produção de aguardente e bebidas destiladas',
    'hero.cta': 'Fale Connosco',
    'hero.products': 'Ver Produtos',
    
    // Features
    'features.title': 'Porquê escolher a Arte & Técnica Lisboa?',
    'features.quality.title': 'Qualidade Premium',
    'features.quality.desc': 'Materiais de alta resistência como cobre martelado e aço inox 304',
    'features.technology.title': 'Tecnologia Moderna',
    'features.technology.desc': 'Equipamentos com sistemas de segurança e eficiência energética',
    'features.experience.title': '30+ Anos de Experiência',
    'features.experience.desc': 'Tradição e expertise reconhecidas em todo o Brasil',
    'features.support.title': 'Suporte Técnico',
    'features.support.desc': 'Consultoria, instalação e manutenção especializada',
    
    // Stats
    'stats.years': 'Anos de Mercado',
    'stats.equipment': 'Equipamentos Fabricados',
    'stats.states': 'Estados Atendidos',
    'stats.countries': 'Países Atendidos',
    'stats.clients': 'Clientes Satisfeitos',
    
    // Products Section
    'products.title': 'Os Nossos Produtos',
    'products.subtitle': 'Soluções completas para a sua destilaria',
    'products.viewAll': 'Ver Catálogo Completo',
    
    // Product Categories
    'products.distillation': 'Destilação',
    'products.distillation.desc': 'Alambiques em cobre, colunas contínuas e caldeiras',
    'products.processing': 'Processamento',
    'products.processing.desc': 'Moendas, filtros rotativos e tachos de cozimento',
    'products.fermentation': 'Fermentação',
    'products.fermentation.desc': 'Dornas, reservatórios e tanques em aço inox',
    'products.aging': 'Envelhecimento',
    'products.aging.desc': 'Barris de carvalho e dornas de madeira nacional',
    'products.bottling': 'Engarrafamento',
    'products.bottling.desc': 'Engarrafadoras, rinsers e roscadoras',
    'products.accessories': 'Acessórios',
    'products.accessories.desc': 'Alcoómetros, termómetros e kits de análise',
    
    // About Page
    'about.title': 'A Nossa História',
    'about.subtitle': 'Mais de três décadas de dedicação à excelência',
    'about.history': 'A Arte & Técnica Lisboa nasceu da paixão pela tradição brasileira de produção de aguardente. Com mais de 30 anos de experiência, tornámo-nos referência nacional no fabrico de equipamentos industriais para destilarias.',
    'about.mission.title': 'Missão',
    'about.mission.desc': 'Fornecer equipamentos de alta qualidade que permitam aos nossos clientes produzir bebidas destiladas de excelência, preservando a tradição e incorporando tecnologia moderna.',
    'about.vision.title': 'Visão',
    'about.vision.desc': 'Ser reconhecida como a principal fornecedora de equipamentos para destilarias no Brasil e na América Latina.',
    'about.values.title': 'Valores',
    'about.values.desc': 'Qualidade, tradição, inovação, compromisso com o cliente e respeito às normas técnicas.',
    
    // Services
    'services.title': 'Os Nossos Serviços',
    'services.projects': 'Elaboração de Projetos',
    'services.projects.desc': 'Desenvolvimento completo de projetos personalizados para a sua destilaria',
    'services.manufacturing': 'Fabrico e Instalação',
    'services.manufacturing.desc': 'Produção de equipamentos e instalação no local',
    'services.sizing': 'Dimensionamento de Fábricas',
    'services.sizing.desc': 'Planeamento e dimensionamento completo da planta industrial',
    'services.consulting': 'Consultoria Técnica',
    'services.consulting.desc': 'Visitas técnicas e orientação especializada',
    'services.training': 'Cursos e Formações',
    'services.training.desc': 'Capacitação para operação e manutenção dos equipamentos',
    'services.standardization': 'Padronização de Produtos',
    'services.standardization.desc': 'Auxílio na padronização da qualidade do destilado',
    
    // Contact Page
    'contact.title': 'Entre em Contacto',
    'contact.subtitle': 'Estamos prontos para o atender',
    'contact.form.name': 'Nome',
    'contact.form.email': 'E-mail',
    'contact.form.phone': 'Telefone',
    'contact.form.message': 'Mensagem',
    'contact.form.submit': 'Enviar Mensagem',
    'contact.info.title': 'Informações de Contacto',
    'contact.info.address': 'Morada',
    'contact.info.phones': 'Telefones',
    'contact.info.email': 'E-mail',
    'contact.info.instagram': 'Instagram',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados',
    'footer.description': 'Fabrico de equipamentos industriais para destilarias desde 1994',
    
    // WhatsApp
    'whatsapp.message': 'Olá! Gostaria de mais informações sobre equipamentos.',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.products': 'Productos',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.title': 'Tradición y Excelencia en Equipos para Destilerías',
    'hero.subtitle': 'Más de 30 años fabricando equipos de alta calidad para la producción de cachaza y bebidas destiladas',
    'hero.cta': 'Contáctenos',
    'hero.products': 'Ver Productos',
    
    // Features
    'features.title': '¿Por qué elegir Arte & Técnica Lisboa?',
    'features.quality.title': 'Calidad Premium',
    'features.quality.desc': 'Materiales de alta resistencia como cobre martillado y acero inox 304',
    'features.technology.title': 'Tecnología Moderna',
    'features.technology.desc': 'Equipos con sistemas de seguridad y eficiencia energética',
    'features.experience.title': '30+ Años de Experiencia',
    'features.experience.desc': 'Tradición y expertise reconocidas en todo Brasil',
    'features.support.title': 'Soporte Técnico',
    'features.support.desc': 'Consultoría, instalación y mantenimiento especializado',
    
    // Stats
    'stats.years': 'Años en el Mercado',
    'stats.equipment': 'Equipos Fabricados',
    'stats.states': 'Estados Atendidos',
    'stats.countries': 'Países Atendidos',
    'stats.clients': 'Clientes Satisfechos',
    
    // Products Section
    'products.title': 'Nuestros Productos',
    'products.subtitle': 'Soluciones completas para su destilería',
    'products.viewAll': 'Ver Catálogo Completo',
    
    // Product Categories
    'products.distillation': 'Destilación',
    'products.distillation.desc': 'Alambiques de cobre, columnas continuas y calderas',
    'products.processing': 'Procesamiento',
    'products.processing.desc': 'Molinos, filtros rotativos y tachos de cocción',
    'products.fermentation': 'Fermentación',
    'products.fermentation.desc': 'Tanques, reservorios y recipientes de acero inox',
    'products.aging': 'Envejecimiento',
    'products.aging.desc': 'Barriles de roble y toneles de madera nacional',
    'products.bottling': 'Embotellado',
    'products.bottling.desc': 'Embotelladoras, rinsers y roscadoras',
    'products.accessories': 'Accesorios',
    'products.accessories.desc': 'Alcoholímetros, termómetros y kits de análisis',
    
    // About Page
    'about.title': 'Nuestra Historia',
    'about.subtitle': 'Más de tres décadas de dedicación a la excelencia',
    'about.history': 'Arte & Técnica Lisboa nació de la pasión por la tradición brasileña de producción de cachaza. Con más de 30 años de experiencia, nos convertimos en referencia nacional en la fabricación de equipos industriales para destilerías.',
    'about.mission.title': 'Misión',
    'about.mission.desc': 'Proporcionar equipos de alta calidad que permitan a nuestros clientes producir bebidas destiladas de excelencia, preservando la tradición e incorporando tecnología moderna.',
    'about.vision.title': 'Visión',
    'about.vision.desc': 'Ser reconocida como la principal proveedora de equipos para destilerías en Brasil y América Latina.',
    'about.values.title': 'Valores',
    'about.values.desc': 'Calidad, tradición, innovación, compromiso con el cliente y respeto a las normas técnicas.',
    
    // Services
    'services.title': 'Nuestros Servicios',
    'services.projects': 'Elaboración de Proyectos',
    'services.projects.desc': 'Desarrollo completo de proyectos personalizados para su destilería',
    'services.manufacturing': 'Fabricación e Instalación',
    'services.manufacturing.desc': 'Producción de equipos e instalación en sitio',
    'services.sizing': 'Dimensionamiento de Fábricas',
    'services.sizing.desc': 'Planificación y dimensionamiento completo de la planta industrial',
    'services.consulting': 'Consultoría Técnica',
    'services.consulting.desc': 'Visitas técnicas y orientación especializada',
    'services.training': 'Cursos y Capacitaciones',
    'services.training.desc': 'Capacitación para operación y mantenimiento de equipos',
    'services.standardization': 'Estandarización de Productos',
    'services.standardization.desc': 'Asistencia en la estandarización de la calidad del destilado',
    
    // Contact Page
    'contact.title': 'Contáctenos',
    'contact.subtitle': 'Estamos listos para atenderle',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Correo electrónico',
    'contact.form.phone': 'Teléfono',
    'contact.form.message': 'Mensaje',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.info.title': 'Información de Contacto',
    'contact.info.address': 'Dirección',
    'contact.info.phones': 'Teléfonos',
    'contact.info.email': 'Correo electrónico',
    'contact.info.instagram': 'Instagram',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.description': 'Fabricación de equipos industriales para destilerías desde 1994',
    
    // WhatsApp
    'whatsapp.message': '¡Hola! Me gustaría más información sobre equipos.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Tradition and Excellence in Equipment for Sugarcane Beverage Industries',
    'hero.subtitle': 'Over 30 years manufacturing high-quality equipment for cachaça and distilled beverage production',
    'hero.cta': 'Contact Us',
    'hero.products': 'View Products',
    
    // Features
    'features.title': 'Why choose Arte & Técnica Lisboa?',
    'features.quality.title': 'Premium Quality',
    'features.quality.desc': 'High-resistance materials such as hammered copper and 304 stainless steel',
    'features.technology.title': 'Modern Technology',
    'features.technology.desc': 'Equipment with safety systems and energy efficiency',
    'features.experience.title': '30+ Years of Experience',
    'features.experience.desc': 'Tradition and expertise recognized throughout Brazil',
    'features.support.title': 'Technical Support',
    'features.support.desc': 'Consulting, installation, and specialized maintenance',
    
    // Stats
    'stats.years': 'Years in the Market',
    'stats.equipment': 'Equipment Manufactured',
    'stats.states': 'States Served',
    'stats.countries': 'Countries Served',
    'stats.clients': 'Satisfied Clients',
    
    // Products Section
    'products.title': 'Our Products',
    'products.subtitle': 'Complete solutions for your distillery',
    'products.viewAll': 'View Full Catalog',
    
    // Product Categories
    'products.distillation': 'Distillation',
    'products.distillation.desc': 'Copper stills, continuous columns, and boilers',
    'products.processing': 'Processing',
    'products.processing.desc': 'Mills, rotary filters, and cooking vats',
    'products.fermentation': 'Fermentation',
    'products.fermentation.desc': 'Vats, reservoirs, and stainless steel tanks',
    'products.aging': 'Aging',
    'products.aging.desc': 'Oak barrels and domestic wood casks',
    'products.bottling': 'Bottling',
    'products.bottling.desc': 'Bottling machines, rinsers, and cappers',
    'products.accessories': 'Accessories',
    'products.accessories.desc': 'Alcoholmeters, thermometers, and analysis kits',
    
    // About Page
    'about.title': 'Our History',
    'about.subtitle': 'Over three decades of dedication to excellence',
    'about.history': 'Arte & Técnica Lisboa was born from a passion for the Brazilian tradition of cachaça production. With over 30 years of experience, we have become a national reference in the manufacture of industrial equipment for distilleries.',
    'about.mission.title': 'Mission',
    'about.mission.desc': 'To provide high-quality equipment that enables our clients to produce excellent distilled beverages, preserving tradition while incorporating modern technology.',
    'about.vision.title': 'Vision',
    'about.vision.desc': 'To be recognized as the leading supplier of distillery equipment in Brazil and Latin America.',
    'about.values.title': 'Values',
    'about.values.desc': 'Quality, tradition, innovation, customer commitment, and respect for technical standards.',
    
    // Services
    'services.title': 'Our Services',
    'services.projects': 'Project Development',
    'services.projects.desc': 'Complete development of customized projects for your distillery',
    'services.manufacturing': 'Manufacturing & Installation',
    'services.manufacturing.desc': 'Equipment production and on-site installation',
    'services.sizing': 'Factory Sizing',
    'services.sizing.desc': 'Complete planning and sizing of the industrial plant',
    'services.consulting': 'Technical Consulting',
    'services.consulting.desc': 'Technical visits and specialized guidance',
    'services.training': 'Courses & Training',
    'services.training.desc': 'Training for equipment operation and maintenance',
    'services.standardization': 'Product Standardization',
    'services.standardization.desc': 'Assistance in standardizing distillate quality',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are ready to assist you',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'Address',
    'contact.info.phones': 'Phones',
    'contact.info.email': 'Email',
    'contact.info.instagram': 'Instagram',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.description': 'Manufacturing industrial equipment for distilleries since 1994',
    
    // WhatsApp
    'whatsapp.message': 'Hello! I would like more information about equipment.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'pt') return 'pt-br'; // Migrate old 'pt' to 'pt-br'
    return (saved as Language) || 'pt-br';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt-br']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
