'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// 🚀 O MOTOR DE EJEÇÃO: Importação obrigatória do Next-Auth para o lado do cliente
import { signOut } from "next-auth/react"; 
import { DashboardSvg } from "@/components/svg";
import { AnalyticSvg, AnnouncementSvg, AssignmentSvg, BundleSvg, CalenderSvg, CertificateSvg, CourseSvg, EnrolledCourseSvg, LogoutSvg, OrderHistorySvg, ProfileSvg, QuestionAnswerSvg, QuizAttemptsSvg, QuizAttemptsTwoSvg, ReviewSvg, SettingSvg, WishlistSvg, WithdrawalSvg } from "@/components/svg/dashboard-icons";
import user_banner from "@/assets/img/dashboard/icon/menu/menu-shape.png";

// Dicionário de menu ESTRATÉGICO para o ADMIN (Tutor360 God Mode)
const adminDashboardMenuData = [
    {
        section: "VISÃO GERAL", items: [
            { title: "Painel de Controle", icon: <DashboardSvg />, href: "/dashboard/admin-dashboard"},
            { title: "Gestão Financeira", icon: <OrderHistorySvg />, href: "/dashboard/admin-finance" },
            { title: "Análise de Plataforma", icon: <AnalyticSvg />, href: "/dashboard/admin-analytics" }
        ]
    },
    {
        section: "CURADORIA & CONTEÚDO", items: [
            { title: "Todos os Cursos", icon: <CourseSvg />, href: "/dashboard/admin-all-courses" },
            { title: "Aprovar Cursos", icon: <AssignmentSvg />, href: "/dashboard/admin-approve-courses" }, // Curadoria do eBuscador/Tutor360
            { title: "Gestão de Quizzes", icon: <QuizAttemptsTwoSvg />, href: "/dashboard/admin-quizzes" },
            { title: "Emitir Certificados", icon: <CertificateSvg />, href: "/dashboard/admin-certificates" }
        ]
    },
    {
        section: "COMUNIDADE & SUPORTE", items: [
            { title: "Lista de Instrutores", icon: <ProfileSvg />, href: "/dashboard/admin-instructors" },
            { title: "Lista de Alunos", icon: <EnrolledCourseSvg />, href: "/dashboard/admin-students" },
            { title: "Avisos Globais", icon: <AnnouncementSvg />, href: "/dashboard/admin-announcements" },
            { title: "Moderação de Fórum", icon: <QuestionAnswerSvg />, href: "/dashboard/admin-qa-moderation" }
        ]
    },
    {
        section: "SISTEMA", items: [
            { title: "Configurações Globais", icon: <SettingSvg />, href: "/dashboard/admin-settings" },
            { title: "Sair", icon: <LogoutSvg />, href: "#" } // O href aqui não importa mais, o onClick vai assumir o controle
        ]
    }
];

export default function AdminDashboardSidebar() {
    const pathname = usePathname();
    return (
        <div className="tpd-user-sidebar">
            <div className="tp-user-wrap">
                <div className="tp-user-menu">
                    <nav>
                        <ul>
                            {adminDashboardMenuData.map((menuSection, i) => (
                                <React.Fragment key={i}>
                                    <li className={`tp-user-menu-title ${i!==0?"space-gap":""}`}>
                                        {menuSection.section}
                                    </li>
                                    <ul>
                                        {menuSection.items.map((item, index) => (
                                            <li key={index}>
                                                {/* 🚀 INTERCEPTADOR: Se for o botão Sair, aplica a função de destruição de sessão */}
                                                {item.title === "Sair" ? (
                                                    <a onClick={() => signOut({ callbackUrl: '/login' })} style={{ cursor: 'pointer' }}>
                                                        <span>{item.icon}</span>
                                                        {item.title}
                                                    </a>
                                                ) : (
                                                    <Link className={item.href === pathname ? "active" : ""} href={item.href}>
                                                        <span>{item.icon}</span>
                                                        {item.title}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </React.Fragment>
                            ))}
                        </ul>
                    </nav>
                </div>
                
                {/* Banner adaptado para o Admin */}
                <div className="tp-user-banner d-flex align-items-center">
                    <div className="tp-user-banner-text">
                        <h4 className="tp-user-banner-title">Painel Root</h4>
                        <div className="tp-user-banner-btn">
                            <a className="tp-btn-course" href="/dashboard/admin-all-courses">Gerenciar Tudo</a>
                        </div>
                    </div>
                    <div className="tp-user-banner-shape">
                        <Image src={user_banner} alt="Acesso Root" />
                    </div>
                </div>
            </div>
        </div>
    )
}