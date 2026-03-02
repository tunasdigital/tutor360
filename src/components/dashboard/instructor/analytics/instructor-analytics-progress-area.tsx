'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import DatePicker from '@/components/ui/date-picker';
import { CalenderThreeSvg } from '@/components/svg';
// import AnalyticsProgressChart from './analytics-progress-chart';
const AnalyticsProgressChart = dynamic(() => import('./analytics-progress-chart'), { ssr: false });

export default function ProgressEarningsGraph () {
    const [date, setDate] = React.useState(new Date());

    return (
        <section className="tp-progress-wrapper">
            <div className="tp-dashboard-section">
                {/* Título Principal Nacionalizado */}
                <h2 className="tp-dashboard-title">Gráfico de Receitas</h2>
            </div>
            <div className="row">
                <div className="col-lg-7">
                    <div className="tpd-order-filter tpd-redio-style tmy-tab mb-30">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item p-relative" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="home-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#home"
                                    type="button"
                                    role="tab"
                                    aria-selected="true"
                                >
                                    <span className="tpd-redio-style-span"></span>
                                    {/* Tradução: Today -> Hoje */}
                                    <span>Hoje</span>
                                </button>
                            </li>
                            <li className="nav-item p-relative" role="presentation">
                                <button
                                    className="nav-link"
                                    id="profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#profile"
                                    type="button"
                                    role="tab"
                                    aria-selected="false"
                                >
                                    <span className="tpd-redio-style-span"></span>
                                    {/* Tradução: Monthly -> Mensal */}
                                    <span>Mensal</span>
                                </button>
                            </li>
                            <li className="nav-item p-relative" role="presentation">
                                <button
                                    className="nav-link"
                                    id="contact-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#contact"
                                    type="button"
                                    role="tab"
                                    aria-selected="false"
                                >
                                    <span className="tpd-redio-style-span"></span>
                                    {/* Tradução: Yearly -> Anual */}
                                    <span>Anual</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="tpd-order-date-input text-lg-end">
                        <form action="#">
                            <DatePicker date={date} setDate={setDate} />
                            <span><CalenderThreeSvg /></span>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="tpd-dashboard-progress-box">
                        <div className="tpd-dashboard-progress-heading d-flex">
                            <div className="tpd-dashboard-progress-item">
                                {/* Tradução e Moeda Local */}
                                <span>Receita Total</span>
                                <p>R$ 0,00</p>
                            </div>
                            <div className="tpd-dashboard-progress-item">
                                {/* Tradução */}
                                <span>Matrículas</span>
                                <p>35</p>
                            </div>
                            <div className="tpd-dashboard-progress-item">
                                {/* Tradução */}
                                <span>Total Reembolsado</span>
                                <p>35</p>
                            </div>
                            <div className="tpd-dashboard-progress-item">
                                {/* Tradução */}
                                <span>Descontos Aplicados</span>
                                <p>35</p>
                            </div>
                        </div>
                        <div className="tpd-dashboard-progress-body">
                            {/* Subtítulo do Gráfico Nacionalizado */}
                            <h4>Evolução de Receitas</h4>
                            <div className="tpd-dashboard-progress-graph">
                                <AnalyticsProgressChart/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};