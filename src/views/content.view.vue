<script setup lang="ts">
import { computed } from 'vue';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import type { Content } from '@lilaquadrat/studio/lib/interfaces';

const content: Content = {
    id: 'home',
    company: 'company',
    project: 'project',
    settings: {
        mode: 'presentation'
    },
    state: 'publish',
    modules: [
    {
            uuid: 'de7dde11-e48b-49fc-adf2-6b25b1445645',
            id: 'Für Agenturen, Freelancer ',
            variant: [
                'center'
            ],
            position: 'content',
            type: 'text-module',
            subline: 'Für Agenturen, Freelancer und alle anderen Ambitionierten.',
            text: [
                'Unser Enterprise CMS ist als SaaS ein innovatives und vielseitiges System. Wir bieten unseren Partnern besten Support und ein lukratives Vertriebsmodell.'
            ]
        },
    ]
};
const contentMerged = computed(() => prepareContent(content)); 

console.log('hello', this);

</script>

<template>
    <article class="content-screen screen">

        content screen
        <router-link :to="{name: 'second'}">second</router-link>
        <lila-content-module :content="contentMerged"></lila-content-module>

    </article>
</template>