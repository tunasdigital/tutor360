'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type IProps = {
    courses: any[];
}

export default function AdminAllCoursesArea({ courses }: IProps) {
    const [activeTab, setActiveTab] = useState('publish');

    const publishedCourses = courses.filter(c => c.status === 'Público');
    const pendingCourses = courses.filter(c => c.status === 'Pendente');
    
    const displayCourses = activeTab === 'publish' ? publishedCourses : pendingCourses;

    return (
        <div className="tp-dashboard-area pt-30 pb-30">
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div className="row">
                    <div className="col-12">
                        <div className="tp-dashboard-tab-wrapper tp-dashboard-content-wrap white-bg pt-30 pb-30 pl-30 pr-30" style={{ borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)' }}>
                            
                            <div className="tp-dashboard-tab-menu p-relative mb-30">
                                <h3 className="tp-dashboard-title">Acervo Total de Cursos</h3>
                                <div className="tp-dashboard-tab-menu-nav">
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button 
                                                onClick={() => setActiveTab('publish')}
                                                className={`nav-link ${activeTab === 'publish' ? 'active' : ''}`} 
                                                type="button"
                                            >
                                                Públicos ({publishedCourses.length})
                                            </button>
                                            <button 
                                                onClick={() => setActiveTab('pending')}
                                                className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`} 
                                                type="button"
                                            >
                                                Pendentes ({pendingCourses.length})
                                            </button>
                                        </div>
                                    </nav>
                                </div>
                            </div>

                            <div className="row">
                                {displayCourses.length === 0 ? (
                                    <div className="col-12 text-center py-5">
                                        <p className="text-muted">Nenhum curso encontrado nesta categoria.</p>
                                    </div>
                                ) : (
                                    displayCourses.map((course) => (
                                        <div key={course.id} className="col-xl-4 col-md-6 col-sm-12 mb-25">
                                            <div className="tp-course-item p-relative white-bg" style={{ border: '1px solid #F1F5F9', borderRadius: '12px', overflow: 'hidden' }}>
                                                <div className="tp-course-thumb w-img p-relative">
                                                    {course.thumbnail ? (
                                                        <Image 
                                                            src={course.thumbnail} 
                                                            alt={course.title} 
                                                            width={350} 
                                                            height={230} 
                                                            style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                                                        />
                                                    ) : (
                                                        <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
                                                            <span className="text-muted" style={{ fontSize: '13px' }}>Sem Thumbnail</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="tp-course-content p-20">
                                                    <div className="tp-course-rating d-flex align-items-center mb-10">
                                                        <div className="tp-course-rating-star" style={{ color: '#FFB600' }}>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                        </div>
                                                        <div className="tp-course-rating-text ml-10">
                                                            <span style={{ fontSize: '12px', color: '#64748B' }}>(0 Avaliações)</span>
                                                        </div>
                                                    </div>
                                                    <h4 className="tp-course-title mb-15" style={{ fontSize: '16px', fontWeight: '700', minHeight: '44px' }}>
                                                        <Link href={`/course-details/${course.id}`}>{course.title}</Link>
                                                    </h4>
                                                    <div className="tp-course-meta d-flex align-items-center justify-content-between pt-15 border-top" style={{ borderColor: '#F1F5F9' }}>
                                                        <div className="tp-course-meta-item d-flex align-items-center">
                                                            <i className="fi fi-rr-book-alt mr-5" style={{ color: '#3B82F6' }}></i>
                                                            <p style={{ margin: 0, fontSize: '12px' }}>0 Aulas</p>
                                                        </div>
                                                        <div className="tp-course-meta-item d-flex align-items-center">
                                                            <i className="fi fi-rr-user mr-5" style={{ color: '#3B82F6' }}></i>
                                                            <p style={{ margin: 0, fontSize: '12px' }}>0 Alunos</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}