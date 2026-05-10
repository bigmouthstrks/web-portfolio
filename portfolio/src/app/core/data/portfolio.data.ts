import { PortfolioData } from '../models/portfolio.model';

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: 'Benjamín Cáceres Ramírez',
    title: 'Software Engineer',
    subtitle: 'iOS Developer · Full Stack · Co-Founder',
    location: 'Valparaíso, Chile',
    email: '',   // kept empty — address is server-side only to prevent exposure
    linkedin: 'https://www.linkedin.com/in/bigmouthstrks/',
    github: 'https://github.com/bigmouthstrks',
    bio: 'Soy Ingeniero de Software en Valparaíso, Chile. Me muevo con comodidad entre el diseño de interfaces, la lógica de negocio y la infraestructura — porque entender el sistema completo hace mejor cada parte de él. Especializado en iOS con Swift, con experiencia real en backend, bases de datos y despliegue. Trabajo bien en equipos diversos, me adapto rápido a contextos nuevos y tengo claro que el código es el medio, no el fin: lo que importa es la experiencia que llega al usuario.',
  },

  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'Falabella Financiero',
      type: 'Jornada completa',
      startDate: 'feb. 2023',
      endDate: 'actualidad',
      duration: '3 años 4 meses',
      location: 'Región Metropolitana de Santiago, Chile · En remoto',
      description:
        'Desarrollo iOS para la plataforma financiera de Falabella. Entrega de nuevas funcionalidades centradas en Tarjeta de Crédito y Estados de Cuenta, mejorando la adopción digital y reduciendo las consultas manuales de los clientes.',
      skills: ['Swift', 'UIKit', 'iOS', 'Resolución de problemas', 'Comunicación', 'Web components', 'Angular', 'Null Platform', 'Bitrise', 'App Store Connect'],
      current: true,
    },
    {
      role: 'Ingeniero de Software Independiente',
      company: 'Freelance',
      type: 'Jornada parcial',
      startDate: 'ene. 2022',
      endDate: 'actualidad',
      duration: '4 años 5 meses',
      location: 'Remoto',
      description:
        'Desarrollo de soluciones de software a medida para distintos clientes. Trabajo en proyectos Full Stack con foco en TypeScript, arquitectura limpia y buenas prácticas de desarrollo.',
      skills: ['TypeScript', 'Full Stack', 'Node.js', 'React', 'PostgreSQL', 'Laravel', 'Express', 'Figma', 'Trello', 'Notion'],
      current: true,
    },
    {
      role: 'Co-Founder & Team Lead',
      company: 'Matchbook Chile',
      type: 'Jornada parcial',
      startDate: 'ago. 2021',
      endDate: 'feb. 2025',
      duration: '3 años 7 meses',
      location: 'Valparaíso, Chile · Presencial',
      description:
        'Dirección del equipo de desarrollo y planificación de proyectos de software para la plataforma de compra y venta de libros usados. Desarrollo backend con Node, Express, PostgreSQL y Sequelize. Diseño de prototipos y maquetas web y mobile con Adobe XD y Figma.',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'Figma', 'Adobe XD'],
    },
    {
      role: 'Desarrollador iOS',
      company: 'Trust Technologies',
      type: 'Jornada completa',
      startDate: 'mar. 2021',
      endDate: 'feb. 2023',
      duration: '2 años',
      location: 'Valparaíso, Chile',
      description:
        'Desarrollo de vistas Storyboard y programáticas. Desarrollo y distribución de XCFrameworks usando Carthage y CocoaPods. Implementación de módulos VIPER, MVVM y MVC con patrón Coordinator.',
      skills: ['Swift', 'UIKit', 'VIPER', 'MVVM', 'CoreData', 'CocoaPods', 'GitLab'],
    },
    {
      role: 'Desarrollador WordPress',
      company: 'I. Municipalidad de Valparaíso',
      type: 'Jornada completa',
      startDate: 'dic. 2020',
      endDate: 'mar. 2021',
      duration: '4 meses',
      location: 'Valparaíso, Chile',
      description:
        'Implementación de plugins WordPress, desarrollo de funcionalidades y vistas en la plataforma web de la Red de Salud Popular de Valparaíso. Mantenimiento, detección y corrección de errores.',
      skills: ['PHP', 'WordPress', 'HTML', 'CSS'],
    },
    {
      role: 'Desarrollador de Aplicaciones Móviles',
      company: 'Empírica',
      type: 'Jornada completa',
      startDate: 'sept. 2020',
      endDate: 'dic. 2020',
      duration: '4 meses',
      location: 'Chile',
      description:
        'Diseño y desarrollo de aplicación móvil para digitalizar el proceso de Control de Calidad (QAQC) en laboratorios de plantas concentradoras. Implementación con Flutter, Dart y Google Firebase.',
      skills: ['Flutter', 'Dart', 'Firebase', 'Mobile Development'],
    },
    {
      role: 'Desarrollador Python',
      company: 'Empírica',
      type: 'Contrato de prácticas',
      startDate: 'jul. 2020',
      endDate: 'ago. 2020',
      duration: '2 meses',
      location: 'Chile',
      description:
        'Desarrollo de aplicaciones para procesamiento de datos y creación de bases de datos en Excel utilizando Python, TkInter y Pandas.',
      skills: ['Python', 'TkInter', 'Pandas', 'Data Processing'],
    },
  ],

  education: [
    {
      institution: 'Universidad Andrés Bello',
      degree: 'Ingeniería en Computación e Informática',
      field: 'Ingeniería',
      startYear: '2025',
      endYear: '2026',
      notes: 'Grado académico de Licenciado en Ingeniería · UNAB Advance',
    },
    {
      institution: 'Universidad Técnica Federico Santa María',
      degree: 'Técnico Universitario en Informática',
      field: 'Informatics',
      startYear: '2016',
      endYear: '2020',
      notes: 'Aptitudes: Desarrollo de aplicaciones, OOP y más',
    },
  ],

  skillCategories: [
    {
      name: 'Mobile',
      skills: [
        { name: 'Swift' },
        { name: 'SwiftUI' },
        { name: 'UIKit' },
        { name: 'Flutter' },
        { name: 'CoreData' },
        { name: 'App Store Connect' },
        { name: 'Bitrise' },
      ],
    },
    {
      name: 'Arquitectura',
      skills: [
        { name: 'Clean Architecture' },
        { name: 'Coordinator' },
        { name: 'VIPER' },
        { name: 'MVVM' },
        { name: 'MVP' },
        { name: 'MVC' },
      ],
    },
    {
      name: 'Web & API',
      skills: [
        { name: 'TypeScript' },
        { name: 'Node.js' },
        { name: 'Express' },
        { name: 'React' },
        { name: 'Laravel' },
      ],
    },
    {
      name: 'Datos',
      skills: [
        { name: 'PostgreSQL' },
        { name: 'Firebase' },
        { name: 'SQL' },
      ],
    },
    {
      name: 'Infraestructura',
      skills: [
        { name: 'Git' },
        { name: 'Docker' },
        { name: 'CI/CD' },
        { name: 'Heroku' },
        { name: 'Null Platform' },
      ],
    },
    {
      name: 'Diseño & Producto',
      skills: [
        { name: 'Figma' },
        { name: 'Adobe XD' },
        { name: 'Prototipado' },
        { name: 'UX / UI' },
      ],
    },
    {
      name: 'Proceso & Colaboración',
      skills: [
        { name: 'Agile / Scrum' },
        { name: 'Code review' },
        { name: 'Jira' },
        { name: 'Notion' },
        { name: 'Postman' },
      ],
    },
  ],

  languages: [
    { name: 'Español', proficiency: 'Nativo' },
    { name: 'Inglés', proficiency: 'Bilingüe (C2)' },
    { name: 'Portugués', proficiency: 'Básico' },
  ],
};
