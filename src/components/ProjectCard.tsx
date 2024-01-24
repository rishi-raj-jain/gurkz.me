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
            transition:name={`${props.project.title}-title`}
        >
            {project.title}
        </a>
    </li>
   )
}

export { ProjectCard }