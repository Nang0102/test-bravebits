import {
  Card,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { Home} from "../components"
import {ResourceListExample} from "../components"
import {Search} from "../components"

export default function HomePage() {
  return (

     <Home > 

      <Layout>
      <TitleBar
        title="Page name"
        primaryAction={{
          size:"large",
          content: "Add page",
          onAction: () => console.log("Primary action"),
        }}
      />
        <Layout.Section>
          <Search/>
      <ResourceListExample/>
        </Layout.Section>
      </Layout>
   </Home> 
  );
}
