'use client';
import Image from "next/image";
import Link from "next/link"; // Importação para o Logo ser clicável
import InstructorDashboardSidebar from "./instructor/instructor-sidebar-area";
import StudentDashboardSidebar from "./student/student-sidebar-area";
import AdminDashboardSidebar from "./admin/admin-sidebar-area";
// Assumindo um padrão de imagem para o logo. Se não tiver, o Next.js avisará e você ajusta o caminho.
import LogoImg from "@/assets/img/logo/logo.png"; 

type IProps = {
  children: React.ReactNode;
  studentSidebar?: boolean;
  adminSidebar?: boolean;
};

export default function DashboardContentWrapper({
  children,
  studentSidebar = false,
  adminSidebar = false,
}: IProps) {
  return (
    <section className="tpd-main pb-75">
      <div className="container">
        
        {/* NOVO TOPO DO ADMIN: Barra de Ferramentas Global (Header) */}
        {adminSidebar && (
          <div className="row mb-30 align-items-center tutor360-admin-header p-relative">
            <div className="col-12 d-flex align-items-center justify-content-between">
              
              {/* Lado Esquerdo: Logo + Título */}
              <div className="d-flex align-items-center">
                <div className="admin-logo-wrap mr-15">
                  <Link href="/">
                    {/* Exemplo de renderização do Logo */}
                    <Image src={LogoImg} alt="Tutor 360 Logo" width={150} height={50} style={{objectFit: 'contain'}} />
                  </Link>
                </div>
                <div className="admin-title-wrap">
                  {/* Título Nacionalizado e Identificador */}
                  <h2 className="tp-dashboard-title mb-0">Painel de Comando: Tutor 360</h2>
                </div>
              </div>

              {/* Lado Direito: (Opcional) Poderíamos adicionar aqui o perfil/notificações no futuro */}

            </div>
          </div>
        )}

        <div className="row">
          <div className="col-lg-3">
            {/* dashboard-menu-area-start */}
            {adminSidebar ? (
              <AdminDashboardSidebar />
            ) : studentSidebar ? (
              <StudentDashboardSidebar />
            ) : (
              <InstructorDashboardSidebar />
            )}
            {/* dashboard-menu-area-end */}
          </div>
          <div className="col-lg-9">
            {/* dashboard-content-area-start */}
            <div className="tpd-content-layout">{children}</div>
            {/* dashboard-content-area-end */}
          </div>
        </div>
      </div>
    </section>
  );
}