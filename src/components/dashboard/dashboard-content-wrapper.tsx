'use client';
import InstructorDashboardSidebar from "./instructor/instructor-sidebar-area";
import StudentDashboardSidebar from "./student/student-sidebar-area";
import AdminDashboardSidebar from "./admin/admin-sidebar-area"; // Importando o Cérebro da Operação

type IProps = {
  children: React.ReactNode;
  studentSidebar?: boolean;
  adminSidebar?: boolean; // Nova chave mestra para o God Mode
};

export default function DashboardContentWrapper({
  children,
  studentSidebar = false,
  adminSidebar = false, // Mantido como false por padrão para segurança
}: IProps) {
  return (
    <section className="tpd-main pb-75">
      <div className="container">
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