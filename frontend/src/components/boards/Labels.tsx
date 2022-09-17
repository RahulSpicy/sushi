import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

const Tag = styled.p`
  font-weight: 900;
  margin: 0 0.25em;
  line-height: 1px;
  margin-bottom: 10px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
  &--red {
    color: $red;
  }

  &--blue {
    color: $blue;
  }

  &--yellow {
    color: $yellow;
  }
`;

const Labels = ({ labels }: any) => {
  if (labels.length === 0) return null;
  return (
    <div style={{ display: "flex" }}>
      {labels.map((label) => (
        <Tag key={uuidv4()} style={{ color: `#${label.color}` }}>
          ___
        </Tag>
      ))}
    </div>
  );
};

export default Labels;
