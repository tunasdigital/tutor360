import Link from "next/link";
import {
  AudioPlayerSvg,
  Document,
  Lock,
  OpenEyeTwo,
  VideoPlayerTwoSvg,
} from "@/components/svg";

interface LessonLite {
  id: string;
  title?: string | null;
  name?: string | null;
  videoUrl?: string | null;
  duration?: string | null;
}

interface CurriculumProps {
  lessons?: LessonLite[];
}

// Mock traduzido para caso o curso não tenha aulas (fallback)
const CurriculumDataMock = [
  {
    moduleTitle: "Introdução ao Curso (Exemplo)",
    lessons: [
      { type: "video", title: "Introdução", duration: "20 min", preview: true },
    ],
    totalLessons: 1,
    totalTime: "20m",
  },
];

// Dicionário para traduzir o tipo de mídia de forma dinâmica
const typeTranslation: Record<string, string> = {
  video: "Vídeo",
  audio: "Áudio",
  reading: "Leitura",
};

export default function CourseDetailsCurriculum({ lessons = [] }: CurriculumProps) {
  const safeLessons = Array.isArray(lessons) ? lessons : [];
  const hasRealLessons = safeLessons.length > 0;

  const displayModules = hasRealLessons
    ? [
        {
          moduleTitle: "Conteúdo do Curso",
          lessons: safeLessons.map((l) => ({
            id: l.id,
            type: l.videoUrl ? "video" : "reading",
            title: l.title || l.name || "Aula sem título",
            duration: l.duration || "—",
            preview: !!l.videoUrl,
          })),
          totalLessons: safeLessons.length,
          totalTime: "",
        },
      ]
    : CurriculumDataMock;

  return (
    <div className="tp-course-details-2-faq">
      <div className="accordion" id="accordionPanelsStayOpenExample">
        {displayModules.map((module, moduleIndex) => (
          <div className="accordion-item" key={moduleIndex}>
            <h2 className="accordion-header" id={`heading-${moduleIndex}`}>
              <button
                className={`accordion-button ${moduleIndex !== 0 ? "collapsed" : ""} d-flex justify-content-between`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${moduleIndex}`}
                aria-expanded={moduleIndex === 0 ? "true" : "false"}
                aria-controls={`collapse-${moduleIndex}`}
              >
                <span className="span">{module.moduleTitle}</span>
                <span className="lesson">
                  {/* Lógica para pluralizar "Aula/Aulas" automaticamente */}
                  {module.totalLessons} {module.totalLessons === 1 ? 'Aula' : 'Aulas'} {module.totalTime && `• ${module.totalTime}`}
                </span>
                <span className="accordion-btn"></span>
              </button>
            </h2>

            <div
              id={`collapse-${moduleIndex}`}
              className={`accordion-collapse collapse ${moduleIndex === 0 ? "show" : ""}`}
              aria-labelledby={`heading-${moduleIndex}`}
            >
              <div className="accordion-body">
                {module.lessons.map((lesson: any, lessonIndex: number) => (
                  <div
                    className="tp-course-details-2-faq-item d-flex justify-content-between"
                    key={lessonIndex}
                  >
                    <div className="left">
                      <span>
                        {lesson.type === "video" && <VideoPlayerTwoSvg />}
                        {lesson.type === "audio" && <AudioPlayerSvg />}
                        {lesson.type === "reading" && <Document />}{" "}
                        {/* Aplica a tradução do tipo (ex: Video -> Vídeo) */}
                        <i>{typeTranslation[lesson.type] || lesson.type}:</i>{" "}
                        {lesson.title}
                      </span>
                    </div>
                    <div className="right">
                      <span>
                        {lesson.duration}{" "}
                        {lesson.preview && lesson.id ? (
                          <Link href={`/course-lesson/${lesson.id}`}>
                            <OpenEyeTwo /> Assistir
                          </Link>
                        ) : (
                          <Lock />
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}