import React, { useState } from "react";
import styled from "styled-components";
import Layout from "./Layout";
import { storeUser } from "../utils/methods";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
    .formControl {
      margin-bottom: 16px;
    }
  }
`;

const StyledButton = styled(Button)`
  &.disabled {
    color: #67a33d;
    border-color: #67a33d;
  }
`;

const UserForm = ({ user = {}, setUser, setPage }) => {
  const { emailAddress = "", fullName = "", phoneNumber = "" } = user;
  const [email, updateEmail] = useState(emailAddress);
  const [name, updateName] = useState(fullName);
  const [phone, updatePhone] = useState(phoneNumber);
  const [saved, setSaved] = useState(false);
  return (
    <Main>
      <p>
        Lane Breach makes it easy to report bike lane blockages to San
        Francisco's 311 service; just take a picture, select a category (Uber,
        bus, etc), enter an optional description, and press SEND.
      </p>
      <h4>User Information</h4>
      <form
        onSubmit={e => {
          e.preventDefault();
          let values = {};
          e.target.querySelectorAll("input").forEach(node => {
            return (values[node.name] = node.value);
          });
          storeUser(values);
          setUser(values);
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);
        }}
      >
        <FormControl className="formControl">
          <InputLabel htmlFor="emailAddress">Email</InputLabel>
          <Input
            id="emailAddress"
            name="emailAddress"
            value={email}
            onChange={e => updateEmail(e.target.value)}
            autoComplete="email"
            placeholder="optional"
            type="email"
          />
        </FormControl>
        <FormControl className="formControl">
          <InputLabel htmlFor="fullName">Name</InputLabel>
          <Input
            id="fullName"
            name="fullName"
            value={name}
            onChange={e => updateName(e.target.value)}
            autoComplete="name"
            placeholder="optional"
            type="text"
          />
        </FormControl>
        <FormControl className="formControl">
          <InputLabel htmlFor="phoneNumber">Phone</InputLabel>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={phone}
            onChange={e => updatePhone(e.target.value)}
            autoComplete="tel"
            placeholder="optional"
            type="tel"
          />
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          disabled={saved}
        >
          {saved ? "Saved!" : "Submit"}
        </Button>
      </form>
    </Main>
  );
};

export default UserForm;
