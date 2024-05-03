import React from 'react'
import { MenuNewWindow } from '@fs/zion-icon'
import { Button, Image, H4, FlowGrid, Separator, useContainerWidth, Subheading } from '@fs/zion-ui'

import leaf1 from './leaf1.svg'
import leaf2 from './leaf2.svg'
import leaf3 from './leaf3.svg'
import leaf4 from './leaf4.svg'

export default function Resources() {
  const atWidth = useContainerWidth()

  return (
    <FlowGrid gutters="lg" columnCount={atWidth({ default: 1, md: 2, lg: 4 })}>
      <div>
        <Image src={leaf1} width={70} />
        <Separator />
        <H4 size="H5" supplementary>
          Zion Design System
          <Separator />
          <Subheading>
            A design system is key to creating a consistent site experience for all users. When used properly, all
            experiences will have consistent branding, accessibiliy, and usability.
          </Subheading>
        </H4>
        <Separator />
        <Button emphasis="medium" color="gray" Icon={MenuNewWindow} to="https://beta.familysearch.org/frontier/zionui/">
          Zion UI
        </Button>
      </div>
      <div>
        <Image src={leaf2} width={70} />
        <Separator />
        <H4 size="H5" supplementary>
          Frontier Docs
          <Separator />
          <Subheading>
            Frontier has information on how to get your machine going. We guide you through getting started as a
            developer and set you up for success as you create apps.
          </Subheading>
        </H4>
        <Separator />
        <Button
          emphasis="medium"
          color="gray"
          Icon={MenuNewWindow}
          to="https://beta.familysearch.org/frontier/docs/getting-started/setup"
        >
          Frontier Docs
        </Button>
      </div>
      <div>
        <Image src={leaf3} width={70} />
        <Separator />
        <H4 size="H5" supplementary>
          React
          <Separator />
          <Subheading>
            We are using React! If you are not comfortable coding in React, check out their documentation to get
            familiar with how a React app is built.
          </Subheading>
        </H4>
        <Separator />
        <Button emphasis="medium" color="gray" Icon={MenuNewWindow} to="https://react.dev/">
          React
        </Button>
      </div>
      <div>
        <Image src={leaf4} width={70} />
        <Separator />
        <H4 size="H5" supplementary>
          Storybook
          <Separator />
          <Subheading>
            Storybook is home to all of the Zion UI components. It contains all the information you need to implement
            all of what you see here and more.
          </Subheading>
        </H4>
        <Separator />
        <Button emphasis="medium" color="gray" Icon={MenuNewWindow} to="https://beta.familysearch.org/frontier/zion/">
          Storybook
        </Button>
      </div>
    </FlowGrid>
  )
}
