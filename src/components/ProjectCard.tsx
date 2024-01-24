type Project = {
    title: string;
    description: string;
    slug: string;
    needsJS: boolean;
}

type ProjectCardProps = {
    project: Project;
}

function ProjectCard(props: ProjectCardProps) {
   return (
    <div class="bg-green-500 p-4 m-4 rounded-md hover:shadow-lg">
        <a
            href={`/projects/${props.project.slug}`}
            style={`view-transition-name:${props.project.title}-title`}
            class="text-white"
        >
            <span class="text-xl">{props.project.title}</span>
            <span class="italic">{props.project.description}</span>
        </a>
    </div>
   )
}

export { ProjectCard }
