import { memo, ReactNode } from "react";
import { Layout as AntdLayout } from "antd";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export const Layout = memo<Props>((props) => {
  return (
    <Container>
      <AntdLayout.Header>
        <Title>Система управления техническим обслуживанием самолетов</Title>
      </AntdLayout.Header>
      <AntdLayout.Content>{props.children}</AntdLayout.Content>
    </Container>
  );
});

Layout.displayName = "Layout";

const Container = styled(AntdLayout)`
  min-height: 100vh;

  .ant-layout-header {
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      padding-left: 16px;
      padding-right: 16px;
    }
  }

  .ant-layout-content {
    padding: 50px;

    @media (max-width: 768px) {
      padding: 16px;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #fff;
  font-size: 1.5em;

  @media (max-width: 768px) {
    font-size: 1.3em;
    line-height: 1;
  }
`;
