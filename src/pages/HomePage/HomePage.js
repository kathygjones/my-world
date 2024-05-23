import React from 'react'
import { colors, Grid, LayoutBand, Separator, useContainerWidth, H1, H2, Subheading } from '@fs/zion-ui'

import { css } from '@emotion/core'

const backdropCss = css`
  backdrop-filter: blur(10px);
`

const HomePage = () => {
  const atWidth = useContainerWidth()

  return (
    <>
      <LayoutBand marginY="md" alignY="middle" minHeight={600} css={atWidth({ default: backdropCss, lg: null })}>
        <Grid>
          <div columns={atWidth({ default: 12, lg: 6 })} css={atWidth({ default: backdropCss, lg: null })}>
            <H1 size="H3">
              Welcome to the start of your new Frontier application.
              <Separator />
              <Subheading>Learn from the resources below as you follow along in the code.</Subheading>
            </H1>
          </div>
        </Grid>
      </LayoutBand>
      <LayoutBand marginY="xl" color={colors.green03} alignY="middle">
        <H2 size="H3" centered>
          Are you ready to learn more?
          <Separator />
          <Subheading>Check out the resources below and reach out on Slack if you need additional support.</Subheading>
        </H2>
        <Separator size="xxl" />
      </LayoutBand>
      <LayoutBand marginY="xxl" alignY="middle">
        <H2 centered size="H3">
          Sign in as you explore
          <Separator />
          <Subheading>
            Some of these components require you to sign in to see what is happening. Look around to see what works and
            then sign in to see the rest.
          </Subheading>
        </H2>
      </LayoutBand>
      <LayoutBand marginY="lg" color={colors.gray02}>
        <Grid gutters="lg" alignItemsY="middle">
          <H2 order={atWidth({ default: 1, lg: 0 })} size="H3" columns={atWidth({ lg: 6 })}>
            Component Examples
            <Separator />
            <Subheading>
              Tab through the examples below to get familiar with how we develop Frontier apps. Be sure to follow along
              in the code as you explore.
            </Subheading>
          </H2>
        </Grid>
      </LayoutBand>
      <LayoutBand marginY="xxl" color={colors.green03}>
        <H2 size="H3" centered>
          This starter file is created by Frontier Core. We are here to help. If you have any questions about this app
          or how to get started, join #frontier-office and #zion on Slack.
        </H2>
      </LayoutBand>
    </>
  )
}

export default HomePage
