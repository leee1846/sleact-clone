import React from 'react';
import gravatar from 'gravatar';
import { Header, Container } from './styles';
import useSwr from 'swr';
import fetcher from '../../utils/fetcher';
import { useParams } from 'react-router-dom';
import ChatBox from './../../components/ChatBox/index';
import ChatList from './../../components/ChatList/index';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const { data: userData } = useSwr(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSwr(`/api/users`, fetcher);

  if (!userData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nuickname} />
      </Header>
      <ChatList />
      <ChatBox chat="" />
    </Container>
  );
};

export default DirectMessage;
