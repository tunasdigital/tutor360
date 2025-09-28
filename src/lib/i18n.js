import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "hero": {
        "subtitle": "Transforming learning into action and dreams into achievements.",
        "title1": "Best",
        "title2": "digital Online",
        "title3": "Courses",
        "description": "We empower young people to develop practical skills and essential knowledge that prepare them to turn challenges into opportunities.",
        "button": "Find Courses"
      },
      "categories": {
        "subtitle": "Top Categories",
        "title_part1": "Most demanding",
        "title_part2": "Categories",
        "items": {
          "development": { "name": "Development", "description": "Code with Confident", "count": "3 courses" },
          "ux_design": { "name": "UI/UX Design", "description": "Design with Confident", "count": "5 courses" },
          "lifestyle": { "name": "Lifestyle", "description": "New Skills, New You", "count": "2 courses" },
          "business": { "name": "Business", "description": "Improve your business", "count": "10 courses" },
          "photography": { "name": "Photography", "description": "Major or Minor", "count": "4 courses" },
          "music": { "name": "Music", "description": "Control your Wallet", "count": "6 courses" },
          "teaching": { "name": "Teaching", "description": "High Education Level", "count": "8 courses" },
          "art_design": { "name": "Art & Design", "description": "Improve your business", "count": "7 courses" }
        }
      },
      "banner": {
        "subtitle": "Let Us Help",
        "title": "Finding Your Right Courses",
        "button": "Get Started"
      },
      "services": {
        "flexible_classes": {
            "title": "Aulas <br/> Flexíveis",
            "text": "Você escolhe seu cronograma. Estude no seu ritmo, quando for melhor para você."
        },
        "offline_mode": {
            "title": "Modo <br/> Offline",
            "text": "Baixe as aulas e estude em qualquer lugar, mesmo sem acesso à internet."
        },
        "online_courses": {
            "title": "Mais de 40 <br/> Cursos Online",
            "text": "Explore novas tendências e conhecimentos essenciais em finanças, vendas e soft skills."
        },
        "educator_help": {
            "title": "Ajuda do <br/> Educador 24h",
            "text": "Nosso Tutor 360 está sempre pronto para tirar suas dúvidas e te dar o suporte necessário."
        },
        "trusted_by_text": "Apoiado pelos jovens empreendedores do mundo.",
        "trusted_by_link": "Nossos Resultados"
      }
    }
  },
  pt: {
    translation: {
      "hero": {
        "subtitle": "Transformando aprendizado em ação e sonhos em conquistas.",
        "title1": "Melhores",
        "title2": "Cursos Digitais",
        "title3": "Online",
        "description": "Capacitamos jovens para desenvolverem habilidades práticas e adquirirem conhecimentos essenciais que os preparem para transformar desafios em oportunidades.",
        "button": "Encontre Cursos"
      },
      "categories": {
        "subtitle": "Principais Categorias",
        "title_part1": "Categorias mais",
        "title_part2": "demandadas",
        "items": {
          "development": { "name": "Desenvolvimento", "description": "Programe com Confiança", "count": "3 cursos" },
          "ux_design": { "name": "Design de UI/UX", "description": "Design com Confiança", "count": "5 cursos" },
          "lifestyle": { "name": "Estilo de Vida", "description": "Novas Habilidades, Novo Você", "count": "2 cursos" },
          "business": { "name": "Negócios", "description": "Impulsione seus Negócios", "count": "10 cursos" },
          "photography": { "name": "Fotografia", "description": "Iniciante ou Avançado", "count": "4 cursos" },
          "music": { "name": "Música", "description": "Controle suas Finanças", "count": "6 cursos" },
          "teaching": { "name": "Ensino", "description": "Alto Nível de Educação", "count": "8 cursos" },
          "art_design": { "name": "Arte & Design", "description": "Impulsione seus Negócios", "count": "7 cursos" }
        }
      },
      "banner": {
        "subtitle": "Deixe-nos ajudar",
        "title": "Encontrando os cursos certos para você",
        "button": "Comece agora"
      },
      "services": {
        "flexible_classes": {
            "title": "Aulas <br/> Flexíveis",
            "text": "Você escolhe seu cronograma. Estude no seu ritmo, quando for melhor para você."
        },
        "offline_mode": {
            "title": "Modo <br/> Offline",
            "text": "Baixe as aulas e estude em qualquer lugar, mesmo sem acesso à internet."
        },
        "online_courses": {
            "title": "Mais de 40 <br/> Cursos Online",
            "text": "Explore novas tendências e conhecimentos essenciais em finanças, vendas e soft skills."
        },
        "educator_help": {
            "title": "Ajuda do <br/> Educador 24h",
            "text": "Nosso Tutor 360 está sempre pronto para tirar suas dúvidas e te dar o suporte necessário."
        },
        "trusted_by_text": "Apoiado pelos jovens empreendedores do mundo.",
        "trusted_by_link": "Nossos Resultados"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    lng: "pt",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;