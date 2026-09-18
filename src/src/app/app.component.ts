import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';

interface Project {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  stack: string[];
  features: string[];
  palette: 'cyan' | 'violet' | 'amber' | 'blue' | 'rose' | 'green';
  stat: string;
  statLabel: string;
  confidential?: boolean;
  live?: string;
  challenge: string;
  solution: string;
  impact: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  menuOpen = false;
  scrolled = false;
  activeProject: Project | null = null;
  private observer?: IntersectionObserver;

  readonly flagshipProjects: Project[] = [
    {
      id: 'practicefit', number: '01', title: 'PracticeFit / Smart RCM', eyebrow: 'Enterprise Healthcare SaaS',
      summary: 'Complex revenue-cycle workflows turned into a clean, fast and responsive Angular product experience.',
      stack: ['Angular 21', 'TypeScript', 'RxJS', 'PrimeNG', 'REST APIs'],
      features: ['Claims & denial workflows', 'Payer / contract management', 'Complex patient forms', 'Operational dashboards'],
      palette: 'cyan', stat: 'Enterprise', statLabel: 'production product', confidential: true,
      challenge: 'Healthcare RCM screens carry dense data, strict rules, long forms and highly operational workflows. The interface still needs to feel obvious under pressure.',
      solution: 'I build reusable Angular patterns, responsive form systems, data-heavy layouts, timelines, filters and strong validation with deliberate hierarchy.',
      impact: 'A more consistent product experience across complex billing workflows, from large desktop workstations to smaller screens.'
    },
    {
      id: 'converter', number: '02', title: 'MyConverterApp', eyebrow: 'Live SaaS Product',
      summary: 'A public file-conversion product combining practical UX, responsive tooling, SEO architecture and deployment ownership.',
      stack: ['Web App', 'Python', 'SEO', 'Nginx', 'Responsive UI'],
      features: ['PDF & image workflows', 'Production deployment', 'SEO landing architecture', 'Responsive utility UX'],
      palette: 'violet', stat: 'LIVE', statLabel: 'myconverterapp.com', live: 'https://myconverterapp.com',
      challenge: 'Many utilities can quickly become confusing. The product had to stay simple, discoverable and fast while supporting multiple conversion and editing tasks.',
      solution: 'Tool-first navigation, focused workflows, conversion-specific content structure, responsive layouts and production deployment work.',
      impact: 'A deployed product showing end-to-end ownership beyond implementation — from interaction design through SEO and launch.'
    },
    {
      id: 'ims', number: '03', title: 'IMS / IRS', eyebrow: 'Business Platforms',
      summary: 'Dense operational dashboards reworked into premium interfaces with strong visual hierarchy and breakpoint-aware layouts.',
      stack: ['Angular', 'Charts', 'CSS Grid', 'Flexbox', 'Responsive Design'],
      features: ['Inventory & operations', 'Analytics dashboards', 'Enterprise workflows', 'Adaptive data layouts'],
      palette: 'amber', stat: '360°', statLabel: 'operations UI', confidential: true,
      challenge: 'Large business systems often become a wall of cards, tables and controls. They need density without visual noise.',
      solution: 'Grid systems that actually recompose, clearer content hierarchy, adaptive dashboards and a more polished visual language.',
      impact: 'Operational interfaces that remain understandable and intentional across desktop, tablet and mobile widths.'
    }
  ];

  readonly moreProjects: Project[] = [
    {
      id: 'medical', number: '04', title: 'Medical Billing Operations', eyebrow: 'RCM Operations',
      summary: 'Claim Watch, Denial Control, Rejections, Practice Inquiries, timelines and assignment-heavy team workflows.',
      stack: ['Angular', 'PrimeNG', 'Chart.js', 'RxJS'], features: ['Work queues', 'Timelines', 'Assignments', 'Filters & charts'], palette: 'rose', stat: 'RCM', statLabel: 'workflow suite', confidential: true,
      challenge: 'Teams need to identify priority work, ownership and status quickly.', solution: 'Scannable states, timelines, filters and responsive operational layouts.', impact: 'Faster-to-read billing operations screens.'
    },
    {
      id: 'react', number: '05', title: 'React / Next.js Interfaces', eyebrow: 'Career Foundation',
      summary: 'Responsive forms and frontend interfaces built early in my career using React, Next.js and strong CSS fundamentals.',
      stack: ['React', 'Next.js', 'CSS', 'Grid', 'Flexbox'], features: ['Responsive forms', 'Breakpoint control', 'Mobile-first composition', 'Reusable UI'], palette: 'blue', stat: 'START', statLabel: 'React → Next.js', confidential: true,
      challenge: 'Forms need to stay polished through changing widths and content states.', solution: 'Grid, Flexbox and media-query driven layouts instead of one-size-fits-all stacking.', impact: 'The responsive discipline that now carries into enterprise applications.'
    },
    {
      id: 'contracts', number: '06', title: 'Payer & Contract Workflows', eyebrow: 'Healthcare Product UI',
      summary: 'Payer registration, contract scope, procedures, pricing and selection experiences for complex healthcare workflows.',
      stack: ['Angular', 'TypeScript', 'Forms', 'Responsive UI'], features: ['Stateful selection', 'Complex forms', 'Pricing UI', 'Workflow steps'], palette: 'green', stat: 'UX', statLabel: 'complex flows', confidential: true,
      challenge: 'Multi-step contract workflows can be difficult to understand and easy to misconfigure.', solution: 'Progressive disclosure, clear state, responsive selectors and structured data entry.', impact: 'More understandable contract configuration flows.'
    }
  ];

  readonly tech = ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'RxJS', 'PrimeNG', 'Bootstrap', 'CSS Grid', 'Flexbox', 'Media Queries', 'Chart.js', 'REST APIs', 'Git', 'Python'];

  readonly principles = [
    { no: '01', title: 'Responsive is architecture.', text: 'I do not shrink desktop UI. I decide what should move, collapse, scroll, wrap, reorder or become a different composition at each breakpoint.' },
    { no: '02', title: 'Dense does not mean messy.', text: 'Dashboards, forms and enterprise workflows can carry a lot of information while still feeling calm when hierarchy and spacing are intentional.' },
    { no: '03', title: 'Polish should improve speed.', text: 'Motion, visual emphasis and component details should help users understand state and action — not decorate the screen for its own sake.' }
  ];

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => this.observer?.observe(el));
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }

  @HostListener('window:scroll')
  onScroll(): void { this.scrolled = window.scrollY > 18; }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.closeProject(); this.menuOpen = false; }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void { this.menuOpen = false; }

  openProject(project: Project): void {
    this.activeProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeProject(): void {
    this.activeProject = null;
    document.body.style.overflow = '';
  }
}
