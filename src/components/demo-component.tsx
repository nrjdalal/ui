import { cn } from "@/lib/utils"
import { ComponentType } from "react"
import { CodeBlock } from "./code-block"
import ComponentDetails from "./component-details"
import CopyButton from "./copy-button"
import { readComponentSource } from "./read-component-source"

interface DemoComponentBaseProps {
  componentName: string
  className?: string
}

export default async function DemoComponent<TProps extends object>({
  componentName,
  className,
  ...props
}: DemoComponentBaseProps & TProps) {
  const Component = (await import(`@/components/x/${componentName}`))
    .default as ComponentType<TProps>
  const source = (await readComponentSource(componentName)) || ""

  return (
    <div className={cn("group/item relative", className)}>
      <Component {...(props as TProps)} />
      <div className="absolute top-2 right-2 flex">
        <ComponentDetails name={componentName}>
          <div className="relative">
            <CodeBlock lang="tsx">{source}</CodeBlock>
            <CopyButton componentSource={source} />
          </div>
        </ComponentDetails>
      </div>
    </div>
  )
}
