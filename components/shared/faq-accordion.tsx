'use client'

import { Accordion } from '@base-ui/react/accordion'
import { ChevronDown } from 'lucide-react'
import type { FAQ } from '@/types'

export function FaqAccordion({ items }: { items: FAQ[] }) {
  return (
    <Accordion.Root className="flex flex-col gap-3">
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-right text-sm font-bold transition-colors hover:bg-muted/50">
              <span>{item.question}</span>
              <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-data-[panel-open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-sm leading-relaxed text-muted-foreground transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
            <div className="px-5 pb-4 pt-0">{item.answer}</div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
