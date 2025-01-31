import { Box, Stack, Text } from '@peopleticker/magnit-design/components';
import ComposableFeature from '@site/static/img/undraw_building_blocks_re_5ahy.svg';
import ProductivityFeature from '@site/static/img/undraw_data_re_80ws.svg';
import ConsistencyFeature from '@site/static/img/undraw_design_notes_re_eklr.svg';
import ScalabilityFeature from '@site/static/img/undraw_mobile_wireframe_re_jxui.svg';
import ReactFeature from '@site/static/img/undraw_react_re_g3ui.svg';
import RunTimeFeature from '@site/static/img/undraw_speed_test_re_pe1f.svg';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Boost productivity',
    Svg: ProductivityFeature,
    description: 'Streamline collaboration, deliver projects faster, and increase profitability.'
  },
  {
    title: 'Brand consistency',
    Svg: ConsistencyFeature,
    description: 'Enhance brand recognition and market value effortlessly.'
  },
  {
    title: 'Scalability and flexibility',
    Svg: ScalabilityFeature,
    description: 'Scale projects easier without compromising efficiency.'
  },
  {
    title: 'Powered by React',
    Svg: ReactFeature,
    description: 'The most popular frontend library, promotes reusable, efficient, and declarative development.'
  },
  {
    title: 'Zero-runtime Stylesheets',
    Svg: RunTimeFeature,
    description: 'Stylesheets are precompiled at build time, with the power of TypeScript.'
  },
  {
    title: 'Composable',
    Svg: ComposableFeature,
    description: 'Components are designed to be easily combined and nested, allowing flexible and scalable UI.'
  }
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <Stack element="figure" textAlign="center" alignItems="center">
      <Svg height="200" width="200" role="img" />
      <Text element="h6" variant="h6">
        {title}
      </Text>
      <Text variant="body2" textAlign="center">
        {description}
      </Text>
    </Stack>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <Box width="full" backgroundColor="white">
      <Box
        element="section"
        gap="12"
        gridTemplateColumns={{ mobile: '1x', tablet: '3x' }}
        display="grid"
        alignItems="center"
        padding="8"
        style={{ maxWidth: '1200px' }}
        marginX="auto"
      >
        {FeatureList.map(props => (
          <Feature key={props.title} {...props} />
        ))}
      </Box>
    </Box>
  );
}
