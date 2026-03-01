'use client';
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  DashboardSvg,
  EnrollmentSvg,
  LogoutSvg,
  OrderSvg,
  QuestionSvg,
  QuizSvg,
  ReviewSvg,
  SettingSvg,
  UserSvg,
  UserSvgThree,
  WishlistSvg,
} from "@/components/svg";
import user_img from '@/assets/img/event/user.jpg';

type ListItem =
  | { link: string; icon: JSX.Element; label: string; isDivider?: false }
  | { isDivider: true };

// Tradução dos itens do menu de usuário
const listData: ListItem[] = [
  { link: "/dashboard/instructor-dashboard", icon: <DashboardSvg />, label: "Meu Painel" },
  { link: "/dashboard/instructor-profile", icon: <UserSvg />, label: "Meu Perfil" },
  { link: "/dashboard/instructor-enroll-course", icon: <EnrollmentSvg />, label: "Meus Cursos" },
  { link: "/dashboard/instructor-wishlist", icon: <WishlistSvg />, label: "Lista de Desejos" },
  { link: "/dashboard/instructor-reviews", icon: <ReviewSvg />, label: "Minhas Avaliações" },
  { link: "/dashboard/instructor-quiz-attempts", icon: <QuizSvg />, label: "Meus Testes" },
  { link: "/dashboard/instructor-order", icon: <OrderSvg />, label: "Histórico de Pedidos" },
  { link: "/dashboard/instructor-announcements", icon: <QuestionSvg />, label: "Perguntas e Respostas" },
  { isDivider: true },
  { link: "/dashboard/instructor-setting-profile", icon: <SettingSvg />, label: "Configurações" },
  { link: "/login", icon: <LogoutSvg />, label: "Sair" },
];

type IProps = {
  top_cls?: string;
  user_icon?:boolean;
}

export default function ProfileDropdown({top_cls="tp-header-inner-login",user_icon}: IProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className={`${top_cls} tp-header-user-hover ${openDropdown ? "active" : ""}`}>
      <button onClick={() => setOpenDropdown(!openDropdown)}>
        {user_icon ? <span><UserSvgThree/></span> : <Image src={user_img} alt="user" />}
      </button>
      <div className="tp-header-user-box">
        <div className="tp-header-user-content">
          <div className="tp-header-user-profile d-flex align-items-center">
            <div className="tp-header-user-profile-thumb">
              <Image src={user_img} alt="user" />
            </div>
            <div className="tp-header-user-profile-content">
              {/* Adaptação provisória para o ecossistema Tutor360 */}
              <h4>Aluno Tutor360</h4>
              <span>Empreendedor</span>
            </div>
          </div>

          <div className="tp-header-user-list">
            <ul>
              {listData.map((item, index) => (
                item.isDivider ? (
                  <li key={`divider-${index}`} className="hr-border"></li>
                ) : (
                  <li key={index}>
                    <Link href={item.link}>
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}