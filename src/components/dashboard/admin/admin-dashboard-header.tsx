'use client';
import React from 'react';

export default function AdminDashboardHeader() {
    // 🛡️ MODO ESTÁTICO: Valores fixos para garantir que o navegador não entre em loop
    return (
        <div className="tp-dashboard-header mb-30" style={{ 
            background: 'linear-gradient(90deg, #0055FF 0%, #003399 100%)', 
            borderRadius: '12px', 
            padding: '30px',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(0, 85, 255, 0.15)'
        }}>
            <div className="row align-items-center">
                <div className="col-xl-7 col-lg-6">
                    <div className="tp-dashboard-header-content text-start">
                        <span style={{ 
                            backgroundColor: 'rgba(255,255,255,0.2)', 
                            padding: '4px 12px', 
                            borderRadius: '50px', 
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Acesso Administrativo (ROOT)
                        </span>
                        <h2 className="mt-10" style={{ color: '#fff', fontWeight: '700', fontSize: '28px' }}>
                            Painel de Comando: Tutor 360
                        </h2>
                        <p className="mb-0" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                            Gerencie ativos digitais e moderação da PHD Tecnologia.
                        </p>
                    </div>
                </div>
                
                <div className="col-xl-5 col-lg-6">
                    <div className="d-flex justify-content-lg-end gap-4 mt-20 mt-lg-0 align-items-center">
                        <div className="text-center" style={{ borderRight: '1px solid rgba(255,255,255,0.2)', paddingRight: '20px' }}>
                            <h4 style={{ color: '#fff', margin: 0, fontSize: '22px' }}>39</h4>
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Cursos Reais</span>
                        </div>
                        <div className="text-center">
                            <h4 style={{ color: '#fff', margin: 0, fontSize: '22px' }}>145</h4>
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Alunos Ativos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}