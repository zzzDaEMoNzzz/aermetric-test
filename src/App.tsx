import { Layout } from "antd";

import { Aircrafts } from "@/components/Aircrafts";

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header>
        <h1>{"Система управления \nтехническим обслуживанием самолетов"}</h1>
      </Layout.Header>
      <Layout.Content style={{ padding: 50 }}>
        <Aircrafts />
      </Layout.Content>
    </Layout>
  );
}

export default App;
