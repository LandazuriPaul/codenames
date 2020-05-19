/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, {
  ChangeEvent,
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Tab, Tooltip } from '@material-ui/core';
import { AllInclusive, GroupWork } from '@material-ui/icons';

import { UserColor } from '@codenames/domain';

import { MessageInput } from './MessageInput';

import { ChatTabs } from './chatControls.styles';
import { chatControlsContext } from '~/contexts';

interface ChatControlsProps {
  globalChatRef: MutableRefObject<HTMLDivElement>;
  isTabsEnabled: boolean;
  teamChatRef: MutableRefObject<HTMLDivElement>;
  userColor: UserColor;
}

export const ChatControls: FC<ChatControlsProps> = ({
  globalChatRef,
  isTabsEnabled,
  teamChatRef,
  userColor,
}) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  return (
    <chatControlsContext.Provider
      value={{
        activeTab,
        globalChatRef,
        setActiveTab,
        teamChatRef,
        userColor,
      }}
    >
      {isTabsEnabled && <TabsHandler />}
      <MessageInput />
    </chatControlsContext.Provider>
  );
};

const TabsHandler: FC<{}> = () => {
  const {
    activeTab,
    globalChatRef,
    setActiveTab,
    teamChatRef,
    userColor,
  } = useContext(chatControlsContext);
  useEffect(() => {
    globalChatRef.current.scrollTop = globalChatRef.current.scrollHeight;
  }, [globalChatRef]);

  function handleChangeTab(event: ChangeEvent<{}>, newValue: 0 | 1): void {
    event.preventDefault();
    setActiveTab(newValue);
    if (newValue === 0) {
      globalChatRef.current.style.display = 'block';
      teamChatRef.current.style.display = 'none';
      globalChatRef.current.scrollTop = globalChatRef.current.scrollHeight;
    } else {
      globalChatRef.current.style.display = 'none';
      teamChatRef.current.style.display = 'block';
      teamChatRef.current.scrollTop = teamChatRef.current.scrollHeight;
    }
  }

  return (
    <ChatTabs
      value={activeTab}
      // @ts-ignore
      onChange={handleChangeTab}
      variant="fullWidth"
      userColor={activeTab === 0 ? 'default' : userColor}
      role="message-filter"
      scrollButtons="off"
    >
      <Tooltip disableFocusListener placement="top" title="Full room">
        <Tab icon={<AllInclusive />} />
      </Tooltip>
      <Tooltip disableFocusListener placement="top" title="Team only">
        <Tab
          icon={
            // @ts-ignore
            <GroupWork color={userColor} />
          }
        />
      </Tooltip>
    </ChatTabs>
  );
};
