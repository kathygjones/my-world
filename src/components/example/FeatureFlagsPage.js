import React from 'react'
import { Separator, LayoutBand, WhiteTheme, H2, H1, Subheading, colors, Row, Image, Paragraph } from '@fs/zion-ui'
import { useFeatureFlags } from '@fs/zion-flags'
import grumpyCatImage from './grumpy-cat.jpg'

import leaf from './leaf3.svg'

const FeatureFlagsPage = () => {
  const { frontier_craTemplate_flagTab, frontier_craTemplate_flagTabWhiteText } = useFeatureFlags([
    'frontier_craTemplate_flagTab',
    'frontier_craTemplate_flagTabWhiteText',
  ])
  const TextColorWrapper =
    frontier_craTemplate_flagTabWhiteText.isOn || frontier_craTemplate_flagTabWhiteText.isControl ? WhiteTheme : 'span'
  const textOptions = {
    happy: "Today is not just another day. It's a new opportunity.",
    grumpy: 'I tried looking at the bright side. It hurt my eyes.',
  }
  let text = 'A bit awkward, but you have found the control version of this flag.'
  if (frontier_craTemplate_flagTab.treatment === 'custom') {
    text = frontier_craTemplate_flagTab.config.text
  } else if (textOptions[frontier_craTemplate_flagTab.treatment]) {
    text = textOptions[frontier_craTemplate_flagTab.treatment]
  }
  const isGrumpy = frontier_craTemplate_flagTab.treatment === 'grumpy'

  return (
    <>
      <LayoutBand marginY="lg" color={colors.green02}>
        <Row alignY="bottom">
          <Image src={leaf} />
          <H1 size="H3">
            Feature Flags
            <Subheading>Continuous delivery in apps</Subheading>
          </H1>
        </Row>
      </LayoutBand>
      <LayoutBand marginY="lg">
        <Paragraph>
          This page has a text flag which is boolean. This flag determines if the text on the picture is white or black.
          It is currently set to: {frontier_craTemplate_flagTabWhiteText.treatment}
        </Paragraph>
        <Paragraph>
          This page has an emotion flag which is currently set to: {frontier_craTemplate_flagTab.treatment}. If it is
          happy, you will see a randomly selected image. If it is set to grumpy, you will see grumpy cat.
        </Paragraph>
      </LayoutBand>
      <LayoutBand style={{ minHeight: 500 }} image={isGrumpy ? grumpyCatImage : 'https://picsum.photos/1200/500'}>
        <TextColorWrapper>
          <Separator size="xl" />
          <div style={{ maxWidth: 500 }}>
            <H2>{text}</H2>
          </div>
        </TextColorWrapper>
      </LayoutBand>
    </>
  )
}
export default FeatureFlagsPage
