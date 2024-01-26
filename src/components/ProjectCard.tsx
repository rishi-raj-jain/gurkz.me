type Project = {
  title: string;
  description: string;
  slug: string;
  needsJS: boolean;
};

type ProjectCardProps = {
  project: Project;
};

function ProjectCard(props: ProjectCardProps) {
  return (
    <a href={`/projects/${props.project.slug}`} class="text-white no-underline">
      <div class="bg-teal-600 p-4 my-4 rounded-md hover:shadow-lg">
        <span
          class="text-xl font-bold"
          style={`view-transition-name:${props.project.slug}-title`}
        >
          {props.project.title}
        </span>
        <br />
        <span
          class="italic"
          style={`view-transition-name:${props.project.slug}-description`}
        >
          {props.project.description}
        </span>
      </div>
    </a>
  );
}

export { ProjectCard };
