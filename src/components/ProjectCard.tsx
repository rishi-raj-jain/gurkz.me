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
    <li class="underline font-bold">
        <a
            href={`/projects/${props.project.slug}`}
            style={`view-transitiom-name:${props.project.title}-title`}
        >
            {props.project.title}
        </a>
    </li>
   )
}

export { ProjectCard }
