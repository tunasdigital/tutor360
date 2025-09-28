import type { Metadata } from "next";
// Restaurando as fontes originais: Outfit, Jost e Crimson_Pro
import {Outfit,Jost,Crimson_Pro} from 'next/font/google'; 
import I18nProvider from '@/lib/I18nProvider'; // Mantendo nosso provedor de tradução
import './globals.scss';

// Definindo as variáveis da fonte Outfit (principal do corpo e títulos)
const outfit_bold = Outfit({
  subsets: ['latin'],
  weight: ["300","400","500","600","700","800"],
  variable: '--tp-ff-body' // Fonte para o corpo principal
});
const outfit_heading = Outfit({
  subsets: ['latin'],
  weight: ["300","400","500","600","700","800"],
  variable: '--tp-ff-heading' // Fonte para os títulos
});
const outfit_p = Outfit({
  subsets: ['latin'],
  weight: ["300","400","500","600","700","800"],
  variable: '--tp-ff-p' // Fonte para o parágrafo
});
// Definindo as fontes secundárias do template
const jost_primary = Jost({
  subsets: ['latin'],
  weight: ["300","400","500","600","700","800"],
  variable: '--tp-ff-primary'
});
const crismon_secondary = Crimson_Pro({
  subsets: ['latin'],
  weight: ["300","400","500","600","700","800"],
  variable: '--tp-ff-secondary'
});


export const metadata: Metadata = {
  title: "Tutor 360 - Transformando Aprendizado em Ação",
  description: "Uma plataforma inovadora para jovens empreendedores.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    // Aplicando todas as variáveis de fonte ao body
    <html lang="pt">
      <body className={`${outfit_bold.variable} ${outfit_heading.variable} ${outfit_p.variable} ${jost_primary.variable} ${crismon_secondary.variable}`}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}