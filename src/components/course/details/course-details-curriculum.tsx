'use client';
import Link from "next/link";
import {
  AudioPlayerSvg,
  Document,
  Lock,
  OpenEyeTwo,
  VideoPlayerTwoSvg,
} from "@/components/svg";

interface CurriculumProps {
  lessons?: any[]; // Recebe o Array verdadeiro do Prisma (Lesson[])
}

// Dicionário para nacionalizar o ícone de acordo com o tipo vindo do banco
const typeTranslation: Record<string, string> = {
  video: "Vídeo",
  audio: "Áudio",
  reading: "Leitura",
  document: "Material",
};

export default function CourseDetailsCurriculum({ lessons = [] }: CurriculumProps) {
  
  // 🚫 O FIM DO MOCK: Se o Prisma não trouxer nenhuma aula, a verdade é dita.
  if (!lessons || lessons.length === 0) {
    return (
      <div className="tp-course-details-2-faq">
        <div style={{ backgroundColor: '#F8F9FA', borderRadius: '12px', padding: '30px', textAlign: 'center', border: '1px dashed #CCC' }}>
          <h5 style={{ color: '#666', margin: 0 }}>Conteúdo Programático em Construção</h5>
          <p style={{ color: '#999', fontSize: '14px', marginTop: '10px', marginBottom: 0 }}>
            As aulas deste curso estão sendo cadastradas e estarão disponíveis em breve.
          </p>
        </div>
      </div>
    );
  }

  // 🧠 ENGENHARIA REAL: Lendo os dados brutos do Prisma e organizando
  const displayModules = [
    {
      moduleTitle: "Conteúdo Programático",
      lessons: lessons.map((l: any, index: number) => ({
        id: l.id,
        // Fallback inteligente: se o banco não disser o tipo, assume "video" se tiver URL, ou "reading"
        type: l.type || (l.videoUrl ? "video" : "reading"),
        // Garante que a aula tenha um nome, mesmo que o campo title venha nulo
        title: l.title || l.name || `Aula ${index + 1}`,
        duration: l.duration || "—",
        
        // 🔐 A INTELIGÊNCIA DO CADEADO:
        // A primeira aula (index 0) SEMPRE será livre como "Isca" de Vendas.
        // As demais só são livres se o seu banco de dados tiver a flag isFreePreview como true.
        preview: index === 0 || l.isFreePreview === true,
      })),
      totalLessons: lessons.length,
    },
  ];

  return (
    <div className="tp-course-details-2-faq">
      <div className="accordion" id="accordionPanelsStayOpenExample">
        {displayModules.map((module, moduleIndex) => (
          <div className="accordion-item" key={moduleIndex} style={{ border: 'none', marginBottom: '10px' }}>
            
            <h2 className="accordion-header" id={`heading-${moduleIndex}`}>
              <button
                className={`accordion-button ${moduleIndex !== 0 ? "collapsed" : ""} d-flex justify-content-between`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${moduleIndex}`}
                aria-expanded={moduleIndex === 0 ? "true" : "false"}
                aria-controls={`collapse-${moduleIndex}`}
                style={{ backgroundColor: '#F8F9FA', fontWeight: 'bold', borderRadius: '8px' }}
              >
                <span className="span">{module.moduleTitle}</span>
                <span className="lesson" style={{ color: '#0055FF' }}>
                  {module.totalLessons} {module.totalLessons === 1 ? 'Aula' : 'Aulas'}
                </span>
                <span className="accordion-btn"></span>
              </button>
            </h2>

            <div
              id={`collapse-${moduleIndex}`}
              className={`accordion-collapse collapse ${moduleIndex === 0 ? "show" : ""}`}
              aria-labelledby={`heading-${moduleIndex}`}
            >
              <div className="accordion-body" style={{ padding: '10px 20px' }}>
                {module.lessons.map((lesson: any, lessonIndex: number) => (
                  <div
                    className="tp-course-details-2-faq-item d-flex justify-content-between align-items-center"
                    key={lessonIndex}
                    style={{ padding: '15px 0', borderBottom: lessonIndex === module.lessons.length - 1 ? 'none' : '1px solid #EAEAEA' }}
                  >
                    <div className="left d-flex align-items-center">
                      <span style={{ marginRight: '10px', color: '#666' }}>
                        {lesson.type === "video" && <VideoPlayerTwoSvg />}
                        {lesson.type === "audio" && <AudioPlayerSvg />}
                        {lesson.type === "reading" && <Document />}
                      </span>
                      <span>
                        <i style={{ fontSize: '13px', color: '#999', marginRight: '5px' }}>{typeTranslation[lesson.type] || lesson.type}:</i>
                        <span style={{ fontWeight: '500', color: lesson.preview ? '#000' : '#888' }}>{lesson.title}</span>
                      </span>
                    </div>
                    
                    <div className="right d-flex align-items-center">
                      <span style={{ fontSize: '14px', color: '#666', marginRight: '15px' }}>{lesson.duration}</span>
                      
                      {/* O JUIZ FINAL: Assistir vs Cadeado */}
                      {lesson.preview ? (
                        <Link href={`/course-lesson/${lesson.id}`} style={{ color: '#00BA55', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <OpenEyeTwo /> Assistir
                        </Link>
                      ) : (
                        <span style={{ color: '#FF3B30', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                          <Lock /> Fechado
                        </span>
                      )}
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