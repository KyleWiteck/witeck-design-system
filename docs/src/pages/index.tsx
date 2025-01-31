import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Button, Flex, Icons, Stack, Text } from '@peopleticker/magnit-design/components';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';

import './index.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Stack
      className="hero"
      textAlign="center"
      alignItems="center"
      paddingX="10"
      paddingY="10"
      element="header"
      backgroundColor="primary100"
      gap="4"
    >
      <Icons.MagnitIconLogo boxSize="20" />
      <Stack textAlign="center" alignItems="center" gap="0.5">
        <Text variant="display" element="h1" fontWeight="medium" className="hero__title">
          {siteConfig.title}
        </Text>
        <Text element="h5" variant="h5">
          {siteConfig.tagline}
        </Text>
      </Stack>
      <Flex gap="4" paddingTop="4.5">
        <Button
          size="lg"
          className="primary"
          element={Link}
          fontWeight="medium"
          to="/docs/guides/introduction/getting-started"
        >
          Get Started
        </Button>
        {/* INFO: Hide demo for now, needs to be polished */}
        {/* <Button */}
        {/*   variant="outlined" */}
        {/*   className="outlined" */}
        {/*   fontWeight="medium" */}
        {/*   textDecoration="none" */}
        {/*   size="lg" */}
        {/*   element={Link} */}
        {/*   to="/docs/demo" */}
        {/* > */}
        {/*   Try Demo */}
        {/* </Button> */}
      </Flex>
    </Stack>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
