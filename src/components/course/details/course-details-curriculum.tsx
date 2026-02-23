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

const CurriculumDataMock = [
  {
    moduleTitle: "Intro to Course and Histudy (Mock)",
    lessons: [
      { type: "video", title: "Course Intro", duration: "20 min", preview: true },
    ],
    totalLessons: 1,
    totalTime: "20m",
  },
];

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
                  {module.totalLessons} Lessons {module.totalTime && `• ${module.totalTime}`}
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
                        <i>{lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}:</i>{" "}
                        {lesson.title}
                      </span>
                    </div>
                    <div className="right">
                      <span>
                        {lesson.duration}{" "}
                        {lesson.preview && lesson.id ? (
                          <Link href={`/course-lesson/${lesson.id}`}>
                            <OpenEyeTwo /> Preview
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