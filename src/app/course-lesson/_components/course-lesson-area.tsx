'use client';

import Link from "next/link";
import { CloseThreeSvg, PrevArrowTwo, VideoPlayerFourSvg } from "@/components/svg";
import { useState, useMemo, useTransition, useEffect, useRef } from "react";
import { toggleLessonProgress } from "@/actions/lesson-progress";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }

  namespace YT {
    interface Player {
      destroy: () => void;
      playVideo: () => void;
      pauseVideo: () => void;
      stopVideo: () => void;
      loadVideoById: (videoId: string) => void;
    }

    interface PlayerEvent {
      target: Player;
      data: number;
    }

    interface PlayerOptions {
      videoId?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: PlayerEvent) => void;
        onStateChange?: (event: PlayerEvent) => void;
      };
    }

    const PlayerState: {
      UNSTARTED: number;
      ENDED: number;
      PLAYING: number;
      PAUSED: number;
      BUFFERING: number;
      CUED: number;
    };

    const Player: new (elementId: string | HTMLElement, options: PlayerOptions) => Player;
  }
}

interface IProps {
  course: any;
  userId: string;
  completedLessons: string[];
}

export default function CourseLessonArea({ course, userId, completedLessons }: IProps) {
  const allLessons = useMemo(() => {
    if (!course?.modules) return [];
    return course.modules.flatMap((module: any) => module.lessons || []);
  }, [course]);

  const [activeLesson, setActiveLesson] = useState<any>(allLessons[0] || null);
  const [isPending, startTransition] = useTransition();
  const [localCompleted, setLocalCompleted] = useState(false);

  const playerRef = useRef<YT.Player | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const currentVideoIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (activeLesson) {
      setLocalCompleted(completedLessons.includes(activeLesson.id));
    }
  }, [activeLesson, completedLessons]);

  if (!course) return <div className="p-5 text-center">Curso não encontrado.</div>;

  const currentVideoId = activeLesson?.videoUrl || course.videoId;
  const currentTitle = activeLesson?.title || "Introdução ao Curso";
  const currentDescription = activeLesson?.description || course.description;

  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleToggleComplete = () => {
    if (!activeLesson?.id || !userId) return;

    const novoStatus = !localCompleted;
    setLocalCompleted(novoStatus);

    startTransition(async () => {
      try {
        await toggleLessonProgress(course.id, activeLesson.id, userId);
      } catch (error) {
        console.error("Erro na sincronização:", error);
        setLocalCompleted(!novoStatus);
      }
    });
  };

  useEffect(() => {
    if (!currentVideoId || !playerContainerRef.current) return;

    const containerId = "tutor360-youtube-player";

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      currentVideoIdRef.current = currentVideoId;

      playerRef.current = new window.YT.Player(containerId, {
        videoId: currentVideoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          fs: 0,
          modestbranding: 1,
          disablekb: 1,
          playsinline: 1,
          iv_load_policy: 3,
          origin: window.location.origin,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              if (nextLesson) {
                setActiveLesson(nextLesson);
              }
            }
          },
        },
      });
    };

    const scriptId = "youtube-iframe-api";

    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!existingScript) {
      const tag = document.createElement("script");
      tag.id = scriptId;
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, [currentVideoId, nextLesson]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="tpd-dashboard-wrap-bg"
      style={{ backgroundImage: "url(/assets/img/dashboard/bg/dashboard-bg-shape-1.jpg)" }}
    >
      <div className="tpd-continue-learning-wrapper">
        {/* BARRA LATERAL (SIDEBAR) */}
        <div className="tpd-continue-learning-sidebar">
          <div className="tpd-continue-learning-accordion">
            <div className="accordion" id="accordionExample">
              {course.modules?.map((module: any, index: number) => (
                <div className="accordion-item" key={module.id}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                    >
                      {module.title}
                    </button>
                  </h2>

                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                  >
                    <div className="tpd-continue-learning-body">
                      {module.lessons?.map((lesson: any) => {
                        const isLessonDone =
                          activeLesson?.id === lesson.id
                            ? localCompleted
                            : completedLessons.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            className={`w-100 border-0 bg-transparent text-start d-flex justify-content-between align-items-center p-2 ${
                              activeLesson?.id === lesson.id ? "active" : ""
                            }`}
                          >
                            <p className="m-0">
                              <span className={isLessonDone ? "text-primary" : ""}>
                                <VideoPlayerFourSvg />
                              </span>{" "}
                              {lesson.title}
                            </p>
                            {isLessonDone && (
                              <i className="fa-solid fa-circle-check text-primary"></i>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL (MAIN) */}
        <div className="tpd-continue-learning-main">
          <div className="tpd-continue-learning-popup d-flex justify-content-between align-items-center">
            <div className="tpd-continue-learning-popup-main d-flex align-items-center">
              <Link href="/dashboard/student-enroll-course">
                <span className="close">
                  <PrevArrowTwo cls="svg-1" />
                </span>
              </Link>
              <p>{course.title}</p>
            </div>

            <div className="tpd-continue-learning-popup-main d-flex align-items-center">
              <p className="d-none d-md-block">Área de Foco</p>
              <Link href="/dashboard/student-enroll-course">
                <span className="crose">
                  <CloseThreeSvg />
                </span>
              </Link>
            </div>
          </div>

          <div className="tpd-continue-learning-about-bg">
            {/* VÍDEO PLAYER */}
            <div
              className="tpd-continue-learning-about-thumb mb-40"
              style={{
                position: "relative",
                paddingTop: "56.25%",
                backgroundColor: "#000",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                ref={playerContainerRef}
                id="tutor360-youtube-player"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            <div className="tpd-continue-learning-about-wrapper">
              {/* CABEÇALHO DA AULA E BOTÃO DISCRETO */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-30 pb-20 border-bottom">
                <div style={{ flex: 1 }}>
                  <h4
                    className="m-0"
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#1E293B",
                    }}
                  >
                    {currentTitle}
                  </h4>
                </div>

                <button
                  onClick={handleToggleComplete}
                  disabled={isPending || !activeLesson}
                  className="btn d-flex align-items-center justify-content-center gap-2"
                  style={{
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                    backgroundColor: localCompleted ? "#EFF6FF" : "transparent",
                    color: localCompleted ? "#2563EB" : "#64748B",
                    border: localCompleted ? "1px solid #BFDBFE" : "1px solid #CBD5E1",
                    boxShadow: "none",
                  }}
                >
                  {isPending ? (
                    <>
                      <span className="spinner-border spinner-border-sm mr-2"></span> ...
                    </>
                  ) : localCompleted ? (
                    <>
                      <i className="fa-solid fa-check" style={{ fontSize: "14px" }}></i>
                      Aula concluída
                    </>
                  ) : (
                    <>
                      <i className="fa-regular fa-circle"></i>
                      Marcar como Concluída
                    </>
                  )}
                </button>
              </div>

              {/* TEXTO/CONTEÚDO DA AULA */}
              <div className="tutor-content-area mt-20">
                <div
                  className="tutor-html-content"
                  dangerouslySetInnerHTML={{ __html: currentDescription || "" }}
                  style={{ lineHeight: "1.8", fontSize: "16px", color: "#334155" }}
                />
              </div>

              {/* MATERIAIS COMPLEMENTARES */}
              {course.attachments && course.attachments.length > 0 && (
                <div
                  className="course-materials-area mt-50 p-4"
                  style={{
                    backgroundColor: "#F8FAFC",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <h5
                    className="mb-4"
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#1E293B",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fa-solid fa-paperclip" style={{ color: "#3B82F6" }}></i>
                    Materiais Complementares do Curso
                  </h5>

                  <div className="d-flex flex-column gap-3">
                    {course.attachments.map((file: any) => (
                      <a
                        key={file.id}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center justify-content-between p-3"
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderRadius: "8px",
                          border: "1px solid #E2E8F0",
                          textDecoration: "none",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#93C5FD";
                          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#E2E8F0";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "8px",
                              backgroundColor: "#EFF6FF",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#3B82F6",
                            }}
                          >
                            <i className="fa-regular fa-file-pdf" style={{ fontSize: "24px" }}></i>
                          </div>

                          <div>
                            <p
                              className="m-0 fw-semibold"
                              style={{ color: "#334155", fontSize: "15px" }}
                            >
                              {file.name}
                            </p>
                            {file.size && (
                              <span style={{ fontSize: "13px", color: "#94A3B8" }}>
                                {Number(file.size).toFixed(2)} MB
                              </span>
                            )}
                          </div>
                        </div>

                        <span
                          style={{
                            color: "#3B82F6",
                            fontWeight: "600",
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          Baixar <i className="fa-solid fa-download"></i>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* NAVEGAÇÃO E MINI-FOOTER */}
              <div className="lesson-footer-actions mt-50 pt-30 border-top">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-50 gap-3">
                  <div style={{ width: "200px" }}>
                    {prevLesson ? (
                      <button
                        onClick={() => setActiveLesson(prevLesson)}
                        className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          borderRadius: "8px",
                          padding: "12px 20px",
                          fontWeight: "600",
                        }}
                      >
                        <i className="fa-solid fa-arrow-left"></i> Aula Anterior
                      </button>
                    ) : (
                      <div />
                    )}
                  </div>

                  <div style={{ width: "200px" }}>
                    {nextLesson ? (
                      <button
                        onClick={() => setActiveLesson(nextLesson)}
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          borderRadius: "8px",
                          padding: "12px 20px",
                          backgroundColor: "#2563EB",
                          border: "none",
                          fontWeight: "600",
                        }}
                      >
                        Próxima Aula <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    ) : (
                      <Link
                        href="/dashboard/student-enroll-course"
                        className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          borderRadius: "8px",
                          padding: "12px 20px",
                          fontWeight: "600",
                        }}
                      >
                        <i className="fa-solid fa-trophy"></i> Painel de Cursos
                      </Link>
                    )}
                  </div>
                </div>

                <div
                  className="text-center pb-3 mt-4"
                  style={{ color: "#94A3B8", fontSize: "14px" }}
                >
                  <p className="m-0 fw-medium">© {new Date().getFullYear()} Tutor360.</p>
                  <p className="m-0" style={{ fontSize: "13px", marginTop: "4px" }}>
                    Foco total no seu aprendizado. Mantenha o ritmo!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}