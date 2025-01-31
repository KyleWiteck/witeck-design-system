import { Box, Button, Card, Center, Container, Flex, Icons, Stack, Text } from '@KyleWiteck/witeck-design/components';

export function Demo() {
  return (
    <Flex display="flex" flex="1" height="fullVH" position="relative" direction="column">
      <Box width="full">
        <Container size="xl">
          <Flex direction="column" width="full" height="full">
            <Stack direction="column" spacing="6" flex="1" width="full" height="auto" paddingY="10">
              <Stack
                direction="row"
                flexWrap="wrap"
                width="full"
                border="1px"
                borderColor="border"
                padding="4"
                borderRadius="base"
                backgroundColor="white"
                fontWeight="bold"
                alignItems="center"
                justifyContent={{ mobile: 'space-between' }}
              >
                <Text width="fitContent" fontSize="xl" whiteSpace="nowrap" fontWeight="semibold">
                  Welcome, User
                </Text>
                <Stack
                  direction="row"
                  maxWidth="fitContent"
                  alignItems="center"
                  justifyContent={{ mobile: 'space-between', tablet: 'flex-start' }}
                  flexWrap="wrap"
                >
                  <Button variant="text" icon={<Icons.History />}>
                    Recently Viewed
                  </Button>
                  <Button variant="text" icon={<Icons.Gear />}>
                    Settings
                  </Button>
                </Stack>
              </Stack>
              <Stack direction="unset" flexWrap="wrap" spacing="6" height="auto" flex="1" alignContent="flex-start">
                <Card
                  flexGrow={1}
                  headerChildren={
                    <Stack direction="row" flexWrap="nowrap" alignItems="center" width="full">
                      <Center boxSize="10">
                        <Icons.Drag boxSize="6" width="6" />
                      </Center>
                      <Text
                        element="h3"
                        fontWeight="medium"
                        fontSize="inherit"
                        display="inline"
                        flexDirection="row"
                        alignItems="center"
                      >
                        You have
                        <Text
                          element="span"
                          display="inline-flex"
                          alignItems="center"
                          justifyContent="center"
                          marginX="1"
                          borderRadius="full"
                          height="6"
                          width="6"
                          color="white"
                          style={{ backgroundColor: '#fe9a1e' }}
                        >
                          1
                        </Text>
                        action-items that require your attention today!
                      </Text>
                    </Stack>
                  }
                >
                  <Button
                    variant="text"
                    width="full"
                    height="auto"
                    size="custom"
                    justifyContent="flex-start"
                    style={{ minHeight: '85px' }}
                  >
                    <Flex
                      gap="4"
                      direction="row"
                      width="full"
                      color="black"
                      flexWrap="wrap"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Center flex="1" height="full" maxWidth="16">
                        <Text color="neutral500" fontSize="xs">
                          EOA
                        </Text>
                      </Center>
                      <Stack spacing="1" flex="1" maxWidth="48">
                        <Text fontWeight="medium">John Doe</Text>
                        <Text color="neutral500" fontSize="xs">
                          Resource Tracking Worker
                        </Text>
                      </Stack>
                      <Stack spacing="1" flex="1" maxWidth="48" width="fitContent">
                        <Text color="neutral500" fontWeight="medium">
                          End of Assignment
                        </Text>
                        <Text color="neutral500" fontWeight="medium">
                          06/01/2023
                        </Text>
                        <Text fontSize="xs">Status: Filled</Text>
                      </Stack>
                      <Center width={{ mobile: 'full', tablet: 'auto' }} flex="1">
                        <Stack
                          spacing="8"
                          direction="row"
                          maxWidth="64"
                          flex="1"
                          justifyContent={{ mobile: 'space-around', tablet: 'flex-end' }}
                        >
                          <Center
                            element="div"
                            border="2px"
                            borderColor="border2"
                            width="9"
                            height="9"
                            borderRadius="full"
                            style={{
                              paddingLeft: '0 !important'
                            }}
                          >
                            <Icons.Mail color="neutral500" />
                          </Center>
                          <Button
                            element="div"
                            variant="primary"
                            size="square"
                            style={{
                              borderRadius: '100%',
                              height: '36px',
                              width: '36px'
                            }}
                          >
                            <Icons.ArrowRight />
                          </Button>
                        </Stack>
                      </Center>
                    </Flex>
                  </Button>
                </Card>
                <Card
                  flex="1"
                  paddingBottom="4"
                  headerChildren={
                    <Flex direction="row" justifyContent="space-between" alignItems="center" width="full">
                      <Text
                        element="h3"
                        fontWeight="medium"
                        fontSize="inherit"
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        Upcoming Events
                      </Text>
                      <Text fontSize="xs" color="neutral600">
                        May, 2023
                      </Text>
                    </Flex>
                  }
                >
                  <Stack
                    direction="row"
                    paddingX="2"
                    width="full"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingBottom="2"
                  >
                    <Stack direction="row" width="full" justifyContent="space-between" alignItems="center">
                      {[
                        { day: 'fri', number: 19 },
                        { day: 'sat', number: 20 },
                        { day: 'sun', number: 21 },
                        { day: 'mon', number: 22 },
                        { day: 'tue', number: 23 },
                        { day: 'wed', number: 24 },
                        { day: 'thu', number: 25 }
                      ].map(({ day, number }, indx) => (
                        <Stack
                          display={{ mobile: indx > 4 ? 'none' : undefined, tablet: 'flex' }}
                          spacing="0.5"
                          paddingY="1.5"
                          paddingX="1"
                          key={day + number}
                          minWidth="9"
                          borderTop={indx === 0 ? '2px' : undefined}
                          backgroundColor={indx === 0 ? 'primary100' : undefined}
                          color={indx === 0 ? 'primary' : 'neutral600'}
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text fontWeight="medium" marginX="auto" width="fitContent" fontSize="lg">
                            {number}
                          </Text>
                          <Text marginX="auto" width="fitContent" fontSize="xs" textTransform="capitalize">
                            {day}
                          </Text>
                        </Stack>
                      ))}
                    </Stack>
                    <Center
                      style={{
                        transform: 'rotate(90deg)'
                      }}
                    >
                      <Icons.ChevronUp />
                    </Center>
                  </Stack>
                  <Box
                    width="full"
                    // height="px"
                    borderBottom="1px"
                    borderColor="border2"
                    style={{ boxShadow: '0px 0px 1px 1px rgba(0,0,0,0.2)' }}
                  />
                  <Stack width="full" justifyContent="center" padding="4" color="neutral600">
                    <Box margin="auto" width="16" height="16" background="neutral100" borderRadius="base" />
                    <Text textAlign="center" variant="body2">
                      You have no interviews, engagement <br /> start or engagement end dates for the <br />
                      displayed time period.
                    </Text>
                  </Stack>
                </Card>
              </Stack>
              <Card
                collapsible
                defaultCollapse={true}
                headerChildren={
                  <Stack direction="row" alignItems="center" width="full">
                    <Icons.Drag />

                    <Text
                      element="h3"
                      fontWeight="medium"
                      fontSize="inherit"
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                    >
                      Review Talent
                    </Text>
                  </Stack>
                }
              >
                <Center width="full" padding="4.5" paddingBottom="6">
                  <Stack spacing="6">
                    <Box margin="auto" width="16" height="16" background="neutral100" borderRadius="base" />
                    <Text textAlign="center" color="neutral600" variant="body2">
                      You have no talent to review.
                      <br />
                      Recently submitted candidates and quotes to your <br />
                      open requests will appear here.
                    </Text>
                  </Stack>
                </Center>
              </Card>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
