/**
 * Datos de ejemplo para eventos universitarios UC.
 * @type {Array<{
 *   id: string,
 *   title: string,
 *   description: string,
 *   category: string,
 *   date: string,
 *   time: string,
 *   location: string,
 *   organizer: string,
 *   image: string,
 *   capacity: number,
 *   registered: number,
 *   isPaid: boolean,
 *   price: number | null,
 *   tags: string[],
 * }>}
 */
export const mockEvents = [
  {
    id: 'evt-1',
    title: 'Festival de Cine Estudiantil',
    description:
      'Proyecciones de cortometrajes hechos por alumnos de distintas carreras, charla con realizadores y votación del público.',
    category: 'Cultura',
    date: '2026-05-22',
    time: '18:30',
    location: 'Auditorio UC — Campus San Joaquín',
    organizer: 'Centro de Alumnos de Comunicación',
    image:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    capacity: 200,
    registered: 142,
    isPaid: false,
    price: null,
    tags: ['cine', 'campus', 'entrada liberada'],
  },
  {
    id: 'evt-2',
    title: 'Interfacultades Fútbol 7',
    description:
      'Campeonato relámpago entre facultades. Inscripción por equipo de 7 jugadores + 3 suplentes.',
    category: 'Deportes',
    date: '2026-05-24',
    time: '09:00',
    location: 'Canchas sintéticas San Joaquín',
    organizer: 'Deportes UC',
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    capacity: 120,
    registered: 118,
    isPaid: true,
    price: 3000,
    tags: ['deporte', 'equipos', 'interfacultades'],
  },
  {
    id: 'evt-3',
    title: 'Charla: Ética e IA en el trabajo',
    description:
      'Panel con académicos y egresados sobre impacto de la IA en distintas industrias y marcos éticos.',
    category: 'Académico',
    date: '2026-05-28',
    time: '17:00',
    location: 'Sala B08 — Facultad de Ingeniería',
    organizer: 'IEEE UC Student Branch',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    capacity: 80,
    registered: 54,
    isPaid: false,
    price: null,
    tags: ['IA', 'ética', 'panel'],
  },
  {
    id: 'evt-4',
    title: 'Picnic de bienvenida primavera',
    description:
      'Encuentro informal con música en vivo, food trucks y juegos para conocer gente de otras carreras.',
    category: 'Social',
    date: '2026-06-01',
    time: '12:00',
    location: 'Jardín central San Joaquín',
    organizer: 'FEUC',
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80',
    capacity: 400,
    registered: 210,
    isPaid: true,
    price: 1000,
    tags: ['picnic', 'música', 'networking'],
  },
  {
    id: 'evt-5',
    title: 'Hackathon “Campus Verde”',
    description:
      '36 horas para prototipar soluciones tecnológicas a desafíos de sostenibilidad en el campus.',
    category: 'Tecnología',
    date: '2026-06-06',
    time: '10:00',
    location: 'Maker Space — FCFM',
    organizer: 'ACM UC + Sustentabilidad UC',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    capacity: 100,
    registered: 67,
    isPaid: true,
    price: 5000,
    tags: ['hackathon', 'sostenibilidad', 'premios'],
  },
  {
    id: 'evt-6',
    title: 'Teatro: Noche de microobras',
    description:
      'Piezas breves dirigidas por alumnos de teatro. Cupos limitados con lista de espera.',
    category: 'Cultura',
    date: '2026-06-08',
    time: '20:00',
    location: 'Sala de Pruebas — Instituto de Literatura',
    organizer: 'Taller de Teatro UC',
    image:
      'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80',
    capacity: 60,
    registered: 60,
    isPaid: false,
    price: null,
    tags: ['teatro', 'microteatro', 'agotado'],
  },
  {
    id: 'evt-7',
    title: 'Clínica de tenis abierta',
    description:
      'Sesión guiada para principiantes e intermedios. Raquetas disponibles con préstamo previo.',
    category: 'Deportes',
    date: '2026-06-10',
    time: '08:00',
    location: 'Canchas de tenis Lo Contador',
    organizer: 'Club de Tenis UC',
    image:
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80',
    capacity: 24,
    registered: 11,
    isPaid: true,
    price: 2500,
    tags: ['tenis', 'clínica', 'principiantes'],
  },
  {
    id: 'evt-8',
    title: 'Meetup: Startups y VC en Chile',
    description:
      'Conversatorio con fundadores y inversionistas. Networking con café al finalizar.',
    category: 'Tecnología',
    date: '2026-06-12',
    time: '18:00',
    location: 'Edificio Emprende UC — Casa Central',
    organizer: 'Incuba UC',
    image:
      'https://images.unsplash.com/photo-1540575467063-027a693dca29?w=800&q=80',
    capacity: 150,
    registered: 88,
    isPaid: false,
    price: null,
    tags: ['startups', 'VC', 'networking'],
  },
];

export default mockEvents;
