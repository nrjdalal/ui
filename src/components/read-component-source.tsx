import { promises as fs } from "fs"
import path from "path"

export async function readComponentSource(componentName: string) {
  console.log(`Reading source for component ${componentName}`)
  const filePath = path.join(
    process.cwd(),
    "src/components/x",
    `${componentName}.tsx`,
  )
  try {
    const source = await fs.readFile(filePath, "utf8")
    return source
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return null
  }
}
