import Link from '@docusaurus/Link';
import { Stack, Text } from '@KyleWiteck/witeck-design/components';
import { themeValues } from '@KyleWiteck/witeck-design/utils';
import { PropsWithChildren, ReactNode } from 'react';

interface PropsDataRowProps {
  name: React.ReactNode;
  type?: React.ReactNode;
  default?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
}

export function PropsDataRow(props: PropsDataRowProps) {
  return (
    <tr>
      <td>
        {props.name} {props.required && <span style={{ color: themeValues.color.error }}>*</span>}
      </td>
      <td style={{ maxWidth: '300px' }}>
        <code>{props.type ?? ' - '}</code>
      </td>
      <td>
        <code>{props.default ?? 'undefined'}</code>
      </td>
      <td>{props.description ?? ' - '}</td>
    </tr>
  );
}

export function PropsTable(
  props: PropsWithChildren<{
    hideElementProp?: boolean;
    hideChildren?: boolean;
    defaultElement?: string;
    hideSprinkles?: boolean;
    hideAttributes?: boolean;
    hideStyles?: boolean;
    componentSpecificProps?: PropsDataRowProps[];
    omitSprinkles?: string[];
  }>
) {
  const {
    defaultElement = 'div',
    children,
    hideSprinkles = false,
    hideElementProp = false,
    hideChildren = false,
    hideAttributes = false,
    hideStyles = false,
    componentSpecificProps = [],
    omitSprinkles = []
  } = props;
  const SprinkleLinkWrapper = ({ link }: { link: ReactNode }) =>
    omitSprinkles.length > 0 ? (
      <>
        {'Omit<'} {link} {`, "${omitSprinkles.join('" | "')}">`}
      </>
    ) : (
      link
    );

  return (
    <Stack gap="0.5" fontSize="sm">
      <Text>
        Required<span style={{ color: themeValues.color.error }}>*</span>
      </Text>
      <table className="props-table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Type</td>
            <td>Default</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {children}

          {!hideStyles && (
            <PropsDataRow name="style" type="React.CSSProperties" description="Inline styles in standard React." />
          )}

          {!hideElementProp && (
            <PropsDataRow
              name="element"
              type="React.ElementType"
              default={defaultElement}
              description="Dynamically changes the type of element rendered."
            />
          )}

          {!hideChildren && <PropsDataRow name="children" type="React.ReactNode" />}

          {!hideSprinkles && (
            <PropsDataRow
              name="Sprinkle Props"
              type={
                <SprinkleLinkWrapper
                  link={
                    <Link to="/docs/guides/styles-and-theming/sprinkles#sprinkles-props">Sprinkle style props</Link>
                  }
                />
              }
              default={'Props Set'}
              description={
                <>
                  Styling props that provide a set of predefined style values and enabling TS-friendly IntelliSense.
                  These get applied like normal props. Check out{' '}
                  <Link to="/docs/guides/styles-and-theming/style-basics">Styling Basics</Link> for more.{' '}
                </>
              }
            />
          )}

          {!hideAttributes && (
            <PropsDataRow
              name="Standard HTML attributes"
              type={`React.ComponentProps<${defaultElement}>`}
              default={'Props Set'}
              description={
                <>
                  HTML Element attributes for <code>{`<${defaultElement}>`}</code>.
                  {!hideElementProp && (
                    <>
                      <br />
                      It changes depending on <b>element</b> prop.
                    </>
                  )}
                </>
              }
            />
          )}

          {componentSpecificProps &&
            componentSpecificProps.length > 0 &&
            componentSpecificProps.map(props => (
              <PropsDataRow key={`${props?.name} ${props?.description}`} {...props} />
            ))}
        </tbody>
      </table>
    </Stack>
  );
}
