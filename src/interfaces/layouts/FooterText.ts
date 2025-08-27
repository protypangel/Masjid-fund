import FooterText from '@/components/layouts/FooterText.vue'

export interface FooterTextProps {
  text: string
  type: string
  author: string
}

export type FotterTextRef = InstanceType<typeof FooterText> | null;