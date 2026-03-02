const popularCoursesData = [
    {
        id: 1,
        name: 'Design de Produto',
        enroll: 45,
        rating: 5,
    },
    {
        id: 2,
        name: 'Masterclass de Design Gráfico',
        enroll: 12,
        rating: 3,
    },
    {
        id: 3,
        name: 'Fundamentos de Análise de Negócios',
        enroll: 22,
        rating: 2,
    },
    {
        id: 4,
        name: 'Design System no Figma',
        enroll: 30,
        rating: 5,
    },
    {
        id: 5,
        name: 'Motion Design 3D',
        enroll: 8,
        rating: 5,
    },
];

export default function InstructorAnalyticsPopularCourses() {
    return (
        <section className="tp-dashboard-course-wrapper">
            <div className="tp-dashboard-section">
                {/* Tradução do título da seção */}
                <h2 className="tp-dashboard-title">Cursos Mais Populares</h2>
            </div>
            <div className="tp-dashboard-course-list">
                <ul>
                    {popularCoursesData.map((course, index) => (
                        <li key={course.id} className={index === 0 ? 'active' : ''}>
                            <div className="tp-dashboard-course-item">
                                <div className="tp-dashboard-course-name">
                                    <h5 className="tp-dashboard-course-name-title">{course.name}</h5>
                                </div>
                                <div className="tp-dashboard-course-enroll">
                                    {/* Número de matrículas */}
                                    <span>{course.enroll}</span>
                                </div>
                                <div className="tp-dashboard-course-rating">
                                    {/* Renderização das estrelas baseada na avaliação */}
                                    {[...Array(5)].map((_, i) => (
                                        <i
                                            key={i}
                                            className={i < course.rating ? 'fa-solid fa-star' : 'fa-light fa-star'}
                                        />
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}