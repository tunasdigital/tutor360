'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DashboardSvg } from "@/components/svg";
import { EnrolledCourseSvg, LogoutSvg, OrderHistorySvg, ProfileSvg, QuestionAnswerSvg, QuizAttemptsSvg, ReviewSvg, SettingSvg, WishlistSvg } from "@/components/svg/dashboard-icons";
import user_banner from "@/assets/img/dashboard/icon/menu/menu-shape.png";

// Dados do menu do dashboard traduzidos
const dashboardMenuData = [
    {
        section: "Início", items: [
            { title: "Dashboard", icon: <DashboardSvg />, href: "/dashboard/student-dashboard"},
            { title: "Meu Perfil", icon: <ProfileSvg />, href: "/dashboard/student-profile" },
            { title: "Cursos Matriculados", icon: <EnrolledCourseSvg />, href: "/dashboard/student-enroll-course" },
            { title: "Lista de Desejos", icon: <WishlistSvg />, href: "/dashboard/student-wishlist" },
            { title: "Minhas Avaliações", icon: <ReviewSvg />, href: "/dashboard/student-reviews" },
            { title: "Tentativas de Quiz", icon: <QuizAttemptsSvg />, href: "/dashboard/student-my-quiz" },
            { title: "Histórico de Pedidos", icon: <OrderHistorySvg />, href: "/dashboard/student-order" },
            { title: "Perguntas e Respostas", icon: <QuestionAnswerSvg />, href: "/dashboard/student-question-answer" },
        ]
    },
    {
        section: "Usuário", items: [
            { title: "Configurações", icon: <SettingSvg />, href: "/dashboard/student-setting-profile" },
            { title: "Sair", icon: <LogoutSvg />, href: "/login" }
        ]
    }
];

export default function StudentDashboardSidebar() {
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
                <div className="tp-user-banner d-flex align-items-center">
                    <div className="tp-user-banner-text">
                        <h4 className="tp-user-banner-title">Educação Online</h4>
                        <div className="tp-user-banner-btn">
                            <a className="tp-btn-course" href="instructor-my-course">Ver Cursos</a>
                        </div>
                    </div>
                    <div className="tp-user-banner-shape">
                        <Image src={user_banner} alt="Forma decorativa" />
                    </div>
                </div>
            </div>
        </div>
    )
}