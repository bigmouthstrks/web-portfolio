import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Benjamín Cáceres · iOS Engineer',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre mí · Benjamín Cáceres',
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience.component').then(m => m.ExperienceComponent),
    title: 'Experiencia · Benjamín Cáceres',
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills.component').then(m => m.SkillsComponent),
    title: 'Habilidades · Benjamín Cáceres',
  },
  {
    path: 'education',
    loadComponent: () =>
      import('./features/education/education.component').then(m => m.EducationComponent),
    title: 'Educación · Benjamín Cáceres',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contacto · Benjamín Cáceres',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
