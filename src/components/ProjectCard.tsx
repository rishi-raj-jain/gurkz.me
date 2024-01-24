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
    <div class="bg-teal-600 p-4 my-4 rounded-md hover:shadow-lg">
        <a
            href={`/projects/${props.project.slug}`}
            style={`view-transition-name:${props.project.title}-title`}
            class="text-white"
        >
            <span class="text-xl">{props.project.title}</span>
            <br />
            <span class="italic">{props.project.description}</span>
        </a>
    </div>
   )
}

export { ProjectCard }
