import React from "react";
import { Button, Form, Checkbox } from "semantic-ui-react";

const DetailSelectForm = ({ options, onChange, state }) => (
  <Form>
    <h3>Basic Details</h3>
    <Form.Field>
      <Checkbox
        label="Show Email"
        onChange={() => onChange("email")}
        checked={state.email}
      />
    </Form.Field>
    <Form.Field>
      <Checkbox
        label="Show Phone"
        onChange={() => onChange("phone")}
        checked={state.phone}
      />
    </Form.Field>
    <Form.Field>
      <Checkbox
        label="Show Address"
        onChange={() => onChange("address")}
        checked={state.address}
      />
    </Form.Field>

    <h3>Education</h3>
    {options.education.map((e, i) => (
      <Form.Field>
        <Checkbox
          label={`${e.school}, ${e.degree} ${e.major}`}
          onChange={() => onChange("education", i)}
          checked={state.education[i]}
        />
      </Form.Field>
    ))}

    <h3>Experience</h3>
    {options.experience.map((e, i) => (
      <Form.Field>
        <Checkbox
          label={`${e.company}, ${e.title}`}
          onChange={() => onChange("experience", i)}
          checked={state.experience[i]}
        />
      </Form.Field>
    ))}

    <h3>Skills</h3>
    {options.skills.map((e, i) => (
      <Form.Field>
        <Checkbox
          label={e}
          onChange={() => onChange("skills", i)}
          checked={state.skills[i]}
        />
      </Form.Field>
    ))}

    <h3>Honors and Awards</h3>
    {options.honors.map((e, i) => (
      <Form.Field>
        <Checkbox
          label={e}
          onChange={() => onChange("honors", i)}
          checked={state.honors[i]}
        />
      </Form.Field>
    ))}
  </Form>
);

export default DetailSelectForm;
