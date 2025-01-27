import fs from "fs"
import path from "path"
import { globby } from "globby"

// Configuration object
const config = {
  srcDir: "src/",
  aliasPrefix: "@/",
  outputDir: "public/r/",
  registry: {
    components: {
      type: "registry:component",
      path: "components/x",
    },
    hook: { type: "registry:hook", path: "hooks" },
    lib: { type: "registry:lib", path: "lib" },
    ui: { type: "registry:ui", path: "components/ui" },
  },
}

// Define the project root directory
const projectRoot = path.resolve(__dirname)

// Array to store the result
const result = []

// Function to get all import paths from a file
async function getImports(filePath: string): Promise<string[]> {
  // Read the file content
  const content = fs.readFileSync(filePath, "utf-8")
  // Match all import statements
  const importPaths = content.match(/import.*from ['"](.*)['"]/g)
  if (!importPaths) return []

  // Extract paths from import statements
  const paths = importPaths
    .map((importStatement) => {
      const match = importStatement.match(/['"](.*)['"]/)
      return match ? match[1] : null
    })
    .filter(Boolean) as string[]

  // Recursively get additional imports for alias paths
  const additionalImports = await Promise.all(
    paths
      .filter((importPath) => importPath.startsWith(config.aliasPrefix))
      .map(async (importPath) => {
        const resolvedPaths = await globby(
          path.resolve(
            projectRoot,
            importPath.replace(config.aliasPrefix, config.srcDir),
          ) + ".*",
        )
        if (resolvedPaths.length > 0) {
          return getImports(resolvedPaths[0])
        }
        return []
      }),
  )

  // Return unique and sorted import paths
  return Array.from(new Set(paths.concat(...additionalImports))).sort()
}

// Get all component files
const components = await globby(
  path.join(config.srcDir, config.registry.components.path, "**/*"),
)

for (const file of components) {
  // Get all imports for the current file
  const imports = await getImports(file)
  // Get file details for each import
  const files = await Promise.all(
    imports
      .filter((importPath) => importPath.startsWith(config.aliasPrefix))
      .map(async (importPath) => {
        const resolvedPaths = await globby(
          path.resolve(
            projectRoot,
            importPath.replace(config.aliasPrefix, config.srcDir),
          ) + ".*",
        )
        if (resolvedPaths.length > 0) {
          const filePath = path.relative(projectRoot, resolvedPaths[0])
          const fileContent = fs.readFileSync(resolvedPaths[0], "utf-8")
          const type =
            Object.values(config.registry).find((reg) =>
              filePath.startsWith(path.join(config.srcDir, reg.path)),
            )?.type || config.registry.components.type
          return {
            path: filePath.replace(config.srcDir, ""),
            target: filePath.replace(config.srcDir, ""),
            content: fileContent,
            type: type,
          }
        }
        return null
      }),
  )

  if (files.includes(null)) {
    console.error(
      `Error building registry for: ${file}. Reason: One or more imports could not be resolved.`,
    )
    continue
  }

  // Filter out non-alias dependencies
  const dependencies = imports.filter(
    (importPath) => !importPath.startsWith(config.aliasPrefix),
  )
  // Generate a name for the component
  const name = file
    .split(path.join(config.srcDir, config.registry.components.path))[1]
    .split(".")[0]

  // Read the file content
  const fileContent = fs.readFileSync(file, "utf-8")
  // Push the component details to the result array
  result.push({
    name: name.slice(1),
    type: config.registry.components.type,
    dependencies: dependencies,
    files: [
      {
        path: path.relative(projectRoot, file).replace(config.srcDir, ""),
        target: path.relative(projectRoot, file).replace(config.srcDir, ""),
        content: fileContent,
        type: config.registry.components.type,
      },
      ...files.filter(Boolean),
    ],
  })
}

// Create the output directory if it doesn't exist
fs.mkdirSync(path.resolve(projectRoot, config.outputDir), {
  recursive: true,
})

// Write each component's details to a JSON file
let count = 0
for (const component of result) {
  count++
  console.log(count + ". " + component.name)
  fs.mkdirSync(
    path.resolve(
      projectRoot,
      config.outputDir +
        component.name.substring(0, component.name.lastIndexOf("/")),
    ),
    { recursive: true },
  )

  const filePath = path.resolve(
    projectRoot,
    config.outputDir + `${component.name}.json`,
  )

  fs.writeFileSync(filePath, JSON.stringify(component, null, 2) + "\n")
}

console.log(`Registry components written: ${count}`)
