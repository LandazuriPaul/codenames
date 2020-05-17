import React, { FC, MouseEvent, useState } from 'react';
import { Link } from '@material-ui/core';

import { RoomForm } from '~/components/RoomForm';

import { Container, Or } from './homeForm.styles';

export const HomeForm: FC<{}> = () => {
  const [isJoinForm, setIsJoinForm] = useState<boolean>(false);

  function handleToggleClick(event: MouseEvent<HTMLSpanElement>): void {
    event.preventDefault();
    setIsJoinForm(!isJoinForm);
  }

  return (
    <Container>
      <RoomForm isJoinForm={isJoinForm} />
      <Or>or</Or>
      <Link href="#" color="primary" onClick={handleToggleClick}>
        {isJoinForm ? 'Create a room' : 'Join a room'}
      </Link>
    </Container>
  );
};