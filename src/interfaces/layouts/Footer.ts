export type PhraseType = 'Sourate' | 'Hadith'
export type Phrase = { text: string; author: string; type: PhraseType }

export interface FooterProps {
  phrases: Phrase[]
}