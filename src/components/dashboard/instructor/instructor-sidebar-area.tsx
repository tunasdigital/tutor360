'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DashboardSvg } from "@/components/svg";
import { AnalyticSvg, AnnouncementSvg, AssignmentSvg, BundleSvg, CalenderSvg, CertificateSvg, CourseSvg, EnrolledCourseSvg, LogoutSvg, OrderHistorySvg, ProfileSvg, QuestionAnswerSvg, QuizAttemptsSvg, QuizAttemptsTwoSvg, ReviewSvg, SettingSvg, WishlistSvg, WithdrawalSvg } from "@/components/svg/dashboard-icons";
import user_banner from "@/assets/img/dashboard/icon/menu/menu-shape.png";

// Dicionário de menu traduzido para o ecossistema Tutor360
const dashboardMenuData = [
    {
        section: "BEM-VINDO", items: [
            { title: "Painel Principal", icon: <DashboardSvg />, href: "/dashboard/instructor-dashboard"},
            { title: "Meu Perfil", icon: <ProfileSvg />, href: "/dashboard/instructor-profile" },
            { title: "Cursos Matriculados", icon: <EnrolledCourseSvg />, href: "/dashboard/instructor-enroll-course" },
            { title: "Lista de Desejos", icon: <WishlistSvg />, href: "/dashboard/instructor-wishlist" },
            { title: "Avaliações", icon: <ReviewSvg />, href: "/dashboard/instructor-reviews" },
            { title: "Meus Testes", icon: <QuizAttemptsSvg />, href: "/dashboard/instructor-my-quiz" },
            { title: "Histórico de Pedidos", icon: <OrderHistorySvg />, href: "/dashboard/instructor-order" },
            { title: "Perguntas & Respostas", icon: <QuestionAnswerSvg />, href: "/dashboard/instructor-question-answer" },
            { title: "Calendário", icon: <CalenderSvg />, href: "/dashboard/instructor-calender" }
        ]
    },
    {
        section: "ÁREA DO INSTRUTOR", items: [
            { title: "Meus Cursos", icon: <CourseSvg />, href: "/dashboard/instructor-my-course" },
            { title: "Meus Pacotes", icon: <BundleSvg />, href: "/dashboard/instructor-my-bundle" },
            { title: "Avisos aos Alunos", icon: <AnnouncementSvg />, href: "/dashboard/instructor-announcements" },
            { title: "Saques e Receitas", icon: <WithdrawalSvg />, href: "/dashboard/instructor-withdrawal" },
            { title: "Gerenciar Testes", icon: <QuizAttemptsTwoSvg />, href: "/dashboard/instructor-quiz" },
            { title: "Tarefas", icon: <AssignmentSvg />, href: "/dashboard/instructor-assignment" },
            { title: "Certificados", icon: <CertificateSvg />, href: "/dashboard/instructor-certificate" },
            { title: "Análise de Dados", icon: <AnalyticSvg />, href: "/dashboard/instructor-analytics-overview" }
        ]
    },
    {
        section: "CONTA", items: [
            { title: "Configurações", icon: <SettingSvg />, href: "/dashboard/instructor-setting-profile" },
            { title: "Sair", icon: <LogoutSvg />, href: "/" }
        ]
    }
];

export default function InstructorDashboardSidebar() {
    const pathname = usePathname();
    return (
        <div className="tpd-user-sidebar">
            <div className="tp-user-wrap">
                <div className="tp-user-menu">
                    <nav>
                        <ul>
                            {dashboardMenuData.map((menuSection, i) => (
                                <React.Fragment key={i}>
                                    <li className={`tp-user-menu-title ${i!==0?"space-gap":""}`}>
                                        {menuSection.section}
                                    </li>
                                    <ul>
                                        {menuSection.items.map((item, index) => (
                                            <li key={index}>
                                                <Link className={item.href === pathname ? "active" : ""} href={item.href}>
                                                    <span>{item.icon}</span>
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </React.Fragment>
                            ))}
                        </ul>
                    </nav>
                </div>
                {/* Tradução do pequeno banner promocional na barra lateral */}
                <div className="tp-user-banner d-flex align-items-center">
                    <div className="tp-user-banner-text">
                        <h4 className="tp-user-banner-title">Educação Digital</h4>
                        <div className="tp-user-banner-btn">
                            <a className="tp-btn-course" href="instructor-my-course">Ver Cursos</a>
                        </div>
                    </div>
                    <div className="tp-user-banner-shape">
                        <Image src={user_banner} alt="Educação Digital" />
                    </div>
                </div>
            </div>
        </div>
    )
}