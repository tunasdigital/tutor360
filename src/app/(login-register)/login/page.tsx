import { Metadata } from "next";
import LoginRegisterBanner from "../_components/login-register-banner";
import LoginForm from "@/components/form/login-form";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Acesso Restrito - Tutor 360",
   description: "Portal de autenticação da PHD Tecnologia",
};

export default function LoginPage() {
   return (
      <main>
         {/* login area start */}
         <section className="tp-login-area">
            <div className="tp-login-register-box d-flex align-items-center">
               <LoginRegisterBanner />
               <div className="tp-login-register-wrapper d-flex justify-content-center align-items-center">
                  <div className="tp-login-from-box">
                     <div className="tp-login-from-heading text-center">
                        <h4 className="tp-login-from-title">Acesso à Plataforma</h4>
                        <p>Área segura. Não tem uma conta? <Link href="/register">Criar Agora</Link></p>
                     </div>
                     
                     {/* 🚀 O MOTOR DE AUTENTICAÇÃO: Os campos de digitação estão aqui dentro */}
                     <LoginForm />
                     
                  </div>
               </div>
            </div>
         </section>
         {/* login area end */}
      </main>
   );
}