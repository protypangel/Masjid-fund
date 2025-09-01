<script setup lang="ts">
import { TimelineStep } from '@/interfaces/layouts/Timeline/Timeline'
import Timeline from '@/components/layouts/timeline/Timeline.vue'
const steps: TimelineStep[] = [
    {
      title: 'Étude & plans',
      subtitle: 'Architecte + dépôt de dossier',
      description: 'Validation des plans, conformité, et dépôt en mairie.',
      status: 'done',
      progress: 100,
      weight: 1,
      periode: {
        start: '2024-09-10',
        end: '2024-12-05',
      },
      budget: {
        planned: 15000,
        spent: 14800,
      },
      tags: ['plans', 'administratif'],
      links: [{ label: 'Dossier PDF', href: '#' }]
    },
    {
      title: 'Fondations',
      subtitle: 'Terrassement & coulage',
      description: 'Préparation du terrain, coulage des fondations, ferraillage.',
      status: 'doing',
      progress: 60,
      weight: 2,
      periode: {
        start: '2025-01-10',
        end: '2025-03-15',
      },
      budget: {
        planned: 120000,
        spent: 72000,
      },
      tags: ['gros-oeuvre'],
      links: []
    },
    {
      title: 'Élévation des murs',
      subtitle: 'Structure RDC + étage',
      description: 'Montage des murs porteurs et cloisons principales.',
      status: 'todo',
      progress: 0,
      weight: 3,
      periode: {
        start: '2025-03-20',
        end: '2025-06-20',
      },
      budget: {
        planned: 280000,
        spent: 0,
      },
      tags: [],
      links: []
    },
    {
      title: 'Étanchéité & toiture',
      status: 'todo',
      progress: 0,
      weight: 4,
      periode: {
        start: '2025-06-25',
        end: '2025-07-30',
      },
      budget: {
        planned: 90000,
        spent: 0,
      },
      tags: [],
      links: []
    },
    {
      title: 'Second œuvre & finitions',
      subtitle: 'Élec, plomberie, peinture',
      status: 'todo',
      progress: 0,
      weight: 5,
      periode: {
        start: '2025-08-01',
        end: '2025-11-15',
      },
      budget: {
        planned: 210000,
        spent: 0,
      },
      tags: [],
      links: []
    },
  ]
</script>

<template>
  <main>
    <Timeline title="Étapes du projet" :steps="steps" class="p-8 min-h-full"/>
	</main>
</template>
