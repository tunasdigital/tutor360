'use client';

import { useTranslation } from 'react-i18next';
import Link from "next/link";
import Image from "next/image";
import { RightArrowTwo, RightSmArrowTwo } from "../svg";

// Importações dos ícones
import ser_icon_1 from "@/assets/img/icon/service/service-icon-1.svg";
import ser_icon_2 from "@/assets/img/icon/service/service-icon-2.svg";
import ser_icon_3 from "@/assets/img/icon/service/service-icon-3.svg";
import ser_icon_4 from "@/assets/img/icon/service/service-icon-4.svg";
import ser_shape from '@/assets/img/shape/service/services-shape-1.png';

// Dados com chaves para tradução
const service_data_tutor = [
  { id: 1, icon: ser_icon_1, key: "flexible_classes" },
  { id: 2, icon: ser_icon_2, key: "offline_mode" },
  { id: 3, icon: ser_icon_3, key: "online_courses" },
  { id: 4, icon: ser_icon_4, key: "educator_help" },
];

export default function ServiceOne() {
    // Apenas o useTranslation, sem useState/useEffect
    const { t } = useTranslation();

    return (
        <section
            className="service-area tp-service-bg"
            style={{ backgroundImage: `url(/assets/img/bg/services-bg.jpg)` }}
        >
            <div className="container">
                <div className="row">
                    {service_data_tutor.map((item) => (
                        <div key={item.id} className="col-lg-3 col-md-6">
                            <div
                                className="tp-service-item text-center mb-40 wow fadeInUp"
                                data-wow-delay={`.${item.id}s`}
                            >
                                <div className="tp-service-wrap">
                                    <div className="tp-service-icon">
                                        <span>
                                            <Image src={item.icon} alt="service-icon" />
                                        </span>
                                    </div>
                                    <h4 className="tp-service-title">
                                        <Link
                                            href="/university-about"
                                            // Usamos a tradução para o título
                                            dangerouslySetInnerHTML={{ __html: t(`services.${item.key}.title`) }}
                                        ></Link>
                                    </h4>
                                </div>
                                <div className="tp-service-content">
                                    {/* Usamos a tradução para o texto */}
                                    <p>{t(`services.${item.key}.text`)}</p> 
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-service-all text-center">
                            <span>
                                {t('services.trusted_by_text')}{" "}
                                <Link href="/university-about">
                                    {t('services.trusted_by_link')} <RightSmArrowTwo />
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tp-service-shape">
                <div
                    className="tp-service-shape-1 wow bounceIn"
                    data-wow-duration="1.5s"
                    data-wow-delay=".4s"
                >
                    <Image src={ser_shape} alt="service-shape" />
                </div>
            </div>
        </section>
    );
}