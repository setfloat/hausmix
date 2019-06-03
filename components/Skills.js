import {
  SkillContainer,
  SkillTitle,
  SkillsDescription,
  SkillRow,
  SkillBox,
  SkillContent,
  IconDiamond,
  DoubleDiamond,
  RightedServer,
  RightedBrowser,
  RightedGeneral,
  Skill
} from "./styles/skillStyles";

const skills = [
  {
    title: "Frontend",
    icon: <RightedBrowser />,
    skills: [
      "React",
      "GraphQL",
      "REST",
      "Apollo",
      "Redux",
      "Styled Components",
      "AngularJS",
      "Mobile & Desktop Design",
      "Gatsby",
      "Moment.js / date-fns"
    ]
  },
  {
    title: "Backend",
    icon: <RightedServer />,
    skills: [
      "Node.js",
      "GraphQL",
      "REST",
      "Prisma",
      "Express",
      "MySQL",
      "PostgreSQL",
      "External APIs",
      "Webpack",
      "bcrypt"
    ]
  },
  {
    title: "General",
    icon: <RightedGeneral />,
    skills: [
      "JavaScript",
      "Git",
      "CSS",
      "HTML",
      "External Integrations",
      "Authentication",
      "JWTs",
      "Cookies",
      "Command Line",
      "Semantic Versioning"
    ]
  }
];

export default () => (
  <SkillContainer>
    <SkillTitle>Skills & Technologies</SkillTitle>
    <SkillsDescription>
      Patrick is a full stack developer specialized in frontend React
      development. He is co-organizer of the Seattle React.JS meetup. He has
      experience with the following technologies, many of which were used in
      this project.
    </SkillsDescription>
    <SkillRow>
      {skills.map((skillType) => (
        <SkillBox key={skillType.title}>
          <IconDiamond>
            <DoubleDiamond>{React.cloneElement(skillType.icon)}</DoubleDiamond>
          </IconDiamond>
          <SkillContent>
            <h2>{skillType.title}</h2>
            {skillType.skills.map((skill) => (
              <Skill key={skill}>{skill}</Skill>
            ))}
          </SkillContent>
        </SkillBox>
      ))}
    </SkillRow>
  </SkillContainer>
);
