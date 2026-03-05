'use client';

import Link from "next/link";
import { CloseThreeSvg, NextArrowFive, PrevArrowFive, PrevArrowTwo, VideoPlayerFourSvg } from "@/components/svg";
import { useState, useMemo } from "react";

interface IProps {
    course: any;
}

export default function CourseLessonArea({ course }: IProps) {
    // 🚀 A-1: Cria uma fila única de todas as aulas para navegação linear
    const allLessons = useMemo(() => {
        if (!course?.modules) return [];
        return course.modules.flatMap((module: any) => module.lessons || []);
    }, [course]);

    const [activeLesson, setActiveLesson] = useState<any>(allLessons[0] || null);

    if (!course) return <div className="p-5 text-center">Curso não encontrado.</div>;

    const currentVideoId = activeLesson?.videoUrl || course.videoId;
    const currentTitle = activeLesson?.title || "Introdução ao Curso";
    const currentDescription = activeLesson?.description || course.description;

    // 🚀 A-2: Lógica de Salto (Próxima / Anterior)
    const currentIndex = allLessons.findIndex((l: any) => l.id === activeLesson?.id);
    
    const goToNext = () => {
        if (currentIndex < allLessons.length - 1) {
            setActiveLesson(allLessons[currentIndex + 1]);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Sobe a página para o novo vídeo
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            setActiveLesson(allLessons[currentIndex - 1]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="tpd-dashboard-wrap-bg" style={{ backgroundImage: "url(/assets/img/dashboard/bg/dashboard-bg-shape-1.jpg)" }}>
            <div className="tpd-continue-learning-wrapper">
                {/* SIDEBAR MANTIDA */}
                <div className="tpd-continue-learning-sidebar">
                    <div className="tpd-continue-learning-accordion">
                        <div className="accordion" id="accordionExample">
                            {course.modules?.map((module: any, index: number) => (
                                <div className="accordion-item" key={module.id}>
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button className={`accordion-button ${index === 0 ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                                            {module.title} <span>{module.lessons?.length || 0} aulas</span>
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`} data-bs-parent="#accordionExample">
                                        <div className="tpd-continue-learning-body">
                                            <div className="tpd-continue-learning-body-item">
                                                {module.lessons?.map((lesson: any) => (
                                                    <button 
                                                        key={lesson.id} 
                                                        onClick={() => setActiveLesson(lesson)} 
                                                        className={`w-100 border-0 bg-transparent text-start d-flex justify-content-between align-items-center p-2 ${activeLesson?.id === lesson.id ? "active" : ""}`}
                                                    >
                                                        <p className="m-0"><span><VideoPlayerFourSvg /></span>{lesson.title}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="tpd-continue-learning-main">
                    <div className="tpd-continue-learning-popup d-flex justify-content-between align-items-center">
                        <div className="tpd-continue-learning-popup-main d-flex align-items-center">
                            <Link href="/dashboard/my-courses"><span className="close"><PrevArrowTwo cls="svg-1" /></span></Link>
                            <p>{course.title}</p>
                        </div>
                        <div className="tpd-continue-learning-popup-main d-flex align-items-center">
                            <p>Agora: {currentTitle}</p>
                            <Link href="/dashboard/my-courses"><span className="crose"><CloseThreeSvg /></span></Link>
                        </div>
                    </div>

                    <div className="tpd-continue-learning-about-bg">
                        <div className="tpd-continue-learning-about-thumb mb-45" style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                            {currentVideoId ? (
                                <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&autoplay=1`} title={currentTitle} frameBorder="0" allowFullScreen></iframe>
                            ) : (
                                <div className="p-5 text-white text-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Vídeo não configurado.</div>
                            )}
                        </div>

                        <div className="tpd-continue-learning-about-wrapper">
                            <h4>{activeLesson ? "Sobre a Aula" : "Sobre o Curso"}</h4>
                            <div 
                                className="tutor-html-content"
                                dangerouslySetInnerHTML={{ __html: currentDescription || "" }}
                                style={{ lineHeight: '1.6', fontSize: '15px', color: '#475569', marginTop: '15px' }}
                            />
                        </div>

                        {/* A-3: 🎮 BOTÕES DE NAVEGAÇÃO ATIVADOS */}
                        <div className="tpd-continue-learning-about-btn d-flex justify-content-center gap-3 mt-40">
                            <button 
                                onClick={goToPrev}
                                disabled={currentIndex <= 0}
                                className="btn btn-outline-primary d-flex align-items-center gap-2"
                                style={{ padding: '12px 25px', borderRadius: '8px', fontWeight: '600', opacity: currentIndex <= 0 ? 0.5 : 1 }}
                            >
                                <span><PrevArrowFive /></span> Anterior
                            </button>
                            
                            <button 
                                onClick={goToNext}
                                disabled={currentIndex >= allLessons.length - 1}
                                className="btn btn-primary d-flex align-items-center gap-2 text-white"
                                style={{ padding: '12px 25px', borderRadius: '8px', fontWeight: '600', opacity: currentIndex >= allLessons.length - 1 ? 0.5 : 1 }}
                            >
                                Próxima <span><NextArrowFive /></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}