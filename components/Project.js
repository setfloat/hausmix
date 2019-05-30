import React from "react";
import {
  ProjectContainer,
  ProjectTitle,
  HausmixTitle,
  ProjectDescription,
  ProjectRow,
  ProjectBox,
  ProjectContent,
  RowItem,
  WorksRow,
  WorksContent,
  EmojiSpan,
  CenteredSpan
} from "./styles/ProjectCompStyles";

// const features = [
//   "Multi-person chores",
//   "Chore Scheduling",
//   "Repeating Chores",
//   "Assign a cost",
//   "Steal overdue chores"
// ];

const futureFeatures = [
  "Track payments",
  "Add a utilities management system",
  "Family focused version for allowance management",
  "Multiple households per account",
  "Monetization",
  "Square Cash integration",
  "React native version (stretch goal)",
  "House account for shared tablets",
  "Calendar View / Integrations"
];

const enhancements = [
  "Allow user to input flat payments - 'Joe paid $20'",
  "User: settings, profile photo, permissions",
  "Household settings",
  "Take / Upload Pictures",
  "Edit recurring chores",
  "Add additional heads of house.",
  "Household / Account deletion",
  "Update Iconography",
  "Money input formatting"
];

const QuestionBox = (props) => (
  <ProjectBox>
    <ProjectContent>{props.children}</ProjectContent>
  </ProjectBox>
);

export default () => (
  <ProjectContainer>
    <HausmixTitle>🏡 Hausmix</HausmixTitle>
    <ProjectDescription>
      Manage your house in one place, let's start with chores.
    </ProjectDescription>
    <ProjectBox>
      <WorksContent>
        <h2>How it works</h2>
        <h3>
          Introducing the chore chart where your housemates pay your allowance.
        </h3>
        <h3 />
        <WorksRow>
          <RowItem>
            <EmojiSpan>📅</EmojiSpan>
            <CenteredSpan>Schedule & assign house chores.</CenteredSpan>
          </RowItem>
          <RowItem>
            <EmojiSpan>⏳</EmojiSpan>
            <CenteredSpan>Do your chores before the deadline.</CenteredSpan>
          </RowItem>
          <RowItem>
            <EmojiSpan>🔨</EmojiSpan>
            <CenteredSpan>
              Overdue chores can be completed by anyone.
            </CenteredSpan>
          </RowItem>
          <RowItem>
            <EmojiSpan>💰</EmojiSpan>
            <CenteredSpan>
              Your housemate pays you for doing their overdue chore.
            </CenteredSpan>
          </RowItem>
        </WorksRow>
      </WorksContent>
    </ProjectBox>

    <br />
    <ProjectTitle>Roadmap</ProjectTitle>
    <ProjectDescription>
      Considerations were made in both design & implementation with this roadmap
      in mind.
    </ProjectDescription>
    <ProjectRow>
      <QuestionBox>
        <h2>Future Features</h2>
        <WorksRow>
          <ul>
            {futureFeatures.map((feature, ind) => (
              <li key={ind}>{feature}</li>
            ))}
          </ul>
        </WorksRow>
      </QuestionBox>

      <QuestionBox>
        <h2>Future Enhancements</h2>
        <WorksRow>
          <ul>
            {enhancements.map((feature, ind) => (
              <li key={ind}>{feature}</li>
            ))}
          </ul>
        </WorksRow>
      </QuestionBox>
    </ProjectRow>
  </ProjectContainer>
);
