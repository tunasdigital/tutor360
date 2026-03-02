import { CategoryTwoSvg } from "@/components/svg";
import Link from "next/link";

// Matriz de categorias turbinada com 'slug' para roteamento dinâmico real
const categories = [
   { title: "Empreendedorismo", slug: "empreendedorismo", courseCount: 15, colorClass: "", delay: ".3s" },
   { title: "Vendas & Marketing", slug: "vendas-e-marketing", courseCount: 10, colorClass: "color-1", delay: ".5s" },
   { title: "Soft Skills", slug: "soft-skills", courseCount: 9, colorClass: "color-2", delay: ".7s" },
   { title: "Finanças", slug: "financas", courseCount: 12, colorClass: "color-3", delay: ".9s" },
   { title: "Carreira & Liderança", slug: "carreira-e-lideranca", courseCount: 17, colorClass: "color-4", delay: ".3s" },
   { title: "Tecnologia & IA", slug: "tecnologia", courseCount: 20, colorClass: "color-5", delay: ".5s" },
   { title: "Comunicação", slug: "comunicacao", courseCount: 25, colorClass: "color-6", delay: ".7s" },
   { title: "Saúde & Bem-Estar", slug: "saude", courseCount: 30, colorClass: "color-7", delay: ".9s" },
];

export default function CategoryArea() {
   return (
      <section className="tp-course-categories-area pt-100 pb-75">
         <div className="container">
            <div className="row">
               {categories.map((category, index) => (
                  <div key={index} className="col-lg-3 col-sm-6">
                     {/* TÁTICA DE NAVEGAÇÃO: Injeção de parâmetro Query na URL */}
                     <Link
                        href={`/course-with-filter?category=${category.slug}`}
                        className="tp-course-categories-item p-relative mb-25 wow fadeInUp"
                        data-wow-delay={category.delay}
                     >
                        <div className="tp-course-categories-icon">
                           <span className={category.colorClass}>
                              <CategoryTwoSvg />
                           </span>
                        </div>
                        <h3 className="tp-course-categories-title">{category.title}</h3>
                        <p>{category.courseCount} Cursos</p>
                     </Link>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}