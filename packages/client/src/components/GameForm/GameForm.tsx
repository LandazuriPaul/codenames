import React, { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  DialogActions,
  Grid,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { AccessAlarm, Apps, GroupWork, PlayArrow } from '@material-ui/icons';

import { GameSettings, ValueOf } from '@codenames/domain';

import { DEFAULT_GAME_SETTINGS } from '~/config';
import { useStores } from '~/hooks';
import { gameSettingsContext } from '~/contexts';
import { isGameSettingsValid } from '~/utils';

import { BoardSettings } from './BoardSettings';
import { TimerSettings } from './TimerSettings';
import { TeamSettings } from './TeamSettings';

import { GameSettingsContainer, TabContent, Title } from './gameForm.styles';

export const GameForm: FC<{}> = () => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_GAME_SETTINGS);

  const {
    gameStore,
    roomStore: { isHost },
  } = useStores();

  function setSetting(
    setting: keyof GameSettings,
    value: ValueOf<GameSettings>
  ): void {
    setSettings({ ...settings, [setting]: value });
  }

  function onSettingsSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    gameStore.generateGame(settings);
  }

  function renderTab(): JSX.Element {
    switch (activeTab) {
      default:
      case 0:
        return <BoardSettings />;
      case 1:
        return <TimerSettings />;
      case 2:
        return <TeamSettings />;
    }
  }

  return (
    <GameSettingsContainer container justify="center">
      {isHost ? (
        <Grid item sm={10}>
          <form onSubmit={onSettingsSubmit}>
            <Title variant="h5" align="center">
              New game settings
            </Title>
            <Paper elevation={6}>
              <gameSettingsContext.Provider
                value={{ activeTab, setActiveTab, setSetting, settings }}
              >
                <TabsHandler />
                <TabContent>{renderTab()}</TabContent>
                <DialogActions>
                  <Button
                    type="submit"
                    disabled={!isGameSettingsValid(settings)}
                    color="secondary"
                    variant="contained"
                  >
                    Start game <PlayArrow />
                  </Button>
                </DialogActions>
              </gameSettingsContext.Provider>
            </Paper>
          </form>
        </Grid>
      ) : (
        <Card>
          <CardContent>
            <FadedTypography variant="body2">
              Please wait while your host configures the game
            </FadedTypography>
            <FadedTypography align="center" component="div">
              <CircularProgress color="inherit" />
            </FadedTypography>
          </CardContent>
        </Card>
      )}
    </GameSettingsContainer>
  );
};

const TabsHandler: FC<{}> = () => {
  const { activeTab, setActiveTab } = useContext(gameSettingsContext);

  function handleChangeTab(event: ChangeEvent<{}>, newValue: 0 | 1): void {
    event.preventDefault();
    setActiveTab(newValue);
  }

  return (
    <Tabs
      value={activeTab}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onChange={handleChangeTab}
      variant="fullWidth"
      role="message-filter"
      scrollButtons="off"
      indicatorColor="secondary"
      textColor="secondary"
    >
      <Tooltip title="Board" placement="top">
        <FlexTab icon={<Apps />} />
      </Tooltip>
      <Tooltip title="Timer" placement="top">
        <FlexTab icon={<AccessAlarm />} />
      </Tooltip>
      <Tooltip title="Teams" placement="top">
        <FlexTab icon={<GroupWork />} />
      </Tooltip>
    </Tabs>
  );
};

const FlexTab = styled(Tab)({
  minWidth: 'unset',
});

const FadedTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],

  '&:first-of-type': {
    marginBottom: theme.spacing(3),
  },
})) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
