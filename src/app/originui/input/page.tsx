import DemoComponent from "@/components/demo-component"
import PageHeader from "@/components/page-header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Input and Textarea Components - Origin UI",
  description:
    "A collection of beautiful and accessible input components built with Tailwind CSS and Next.js.",
}

type Component = {
  name: string
  className?: string
}

const components: Component[] = [
  { name: "originui/comp-01" },
  { name: "originui/comp-02" },
]

export default function Page() {
  return (
    <main>
      <div className="px-4 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <PageHeader title="Input and Textarea">
            A growing collection of {components.length} input and textarea
            components built with Next.js and TailwindCSS.
          </PageHeader>

          <div className="[&>*]:before:bg-border/70 [&>*]:after:bg-border/70 grid max-w-6xl grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 [&>*]:relative [&>*]:px-1 [&>*]:py-12 [&>*]:before:absolute [&>*]:before:[inset-inline-start:-1px] [&>*]:before:[block-size:100vh] [&>*]:before:[inline-size:1px] [&>*]:before:[inset-block-start:0] [&>*]:after:absolute [&>*]:after:[inset-inline-start:0] [&>*]:after:[block-size:1px] [&>*]:after:[inline-size:100vw] [&>*]:after:[inset-block-start:-1px] sm:[&>*]:px-8 xl:[&>*]:px-12">
            {components.map((component) => {
              return (
                <DemoComponent
                  key={component.name}
                  componentName={component.name}
                  className={component.className}
                />
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
