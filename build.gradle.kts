import com.github.gradle.node.npm.task.NpxTask

plugins {
    id("war")
    id("com.github.node-gradle.node") version "7.1.0"
}

node {
    version = "20.18.0"
    download = true

    workDir = project.layout.buildDirectory.get().dir("nodejs") // where node is downloaded to
    nodeProjectDir = project.rootDir; // where package.json is read and node_modules downloaded
}

tasks.npmInstall {
    inputs.file(project.rootDir.resolve("package.json"));

    val packageLockFile = project.rootDir.resolve("package-lock.json");
    if (packageLockFile.exists()) {
        inputs.file(packageLockFile)
    }

    outputs.file(packageLockFile)
    outputs.dir(project.rootDir.resolve("node_modules"))
}


val webpackTask = tasks.register<NpxTask>("webpack") {
    dependsOn("npmInstall")

    command = "webpack"
    workingDir = project.rootDir;

    val outputDir = project.layout.buildDirectory.dir("react-js")
    val relativeOutputDir = "." + File.separatorChar + outputDir.get().asFile.relativeTo(project.projectDir)

    args = listOf(
        "--env=entryFile=./src/main/react-js/index.jsx",
        "--env=outputDir=$relativeOutputDir",
        "--env=outputFilename=index.js"
    )

    inputs.file(project.rootDir.resolve("webpack.config.js"))
    inputs.files(fileTree(rootProject.rootDir.resolve("node_modules")).exclude(".cache"))
    inputs.dir(project.projectDir.resolve("src/main/react-js"))

    outputs.dir(outputDir)
}

project.afterEvaluate {
    tasks.getByName("build").dependsOn(webpackTask);
}

tasks.war {
    dependsOn("webpack")

    from(project.layout.buildDirectory.dir("react-js")) {
        into("js")
    }
}
