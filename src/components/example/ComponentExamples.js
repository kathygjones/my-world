import React, { Suspense } from 'react'
import {
  Paragraph,
  colors,
  DialogOverlay,
  Grid,
  Row,
  LayoutBand,
  Separator,
  Skeleton,
  useContainerWidth,
  useOverlay,
  Tab,
  Tabs,
  H3,
  Subheading,
} from '@fs/zion-ui'

import ErrorBoundary from '@fs/zion-error-boundary'
import { NoticeLoading } from '@fs/zion-icon'
import { css } from '@emotion/core'
import zionDebug from '@fs/zion-debug'

import PurposeStatementGenerator from './PurposeStatementGenerator'
import WagonWheel from './WagonWheel'
import ResponsiveDebug from './ResponsiveDebug'
import RequireSignedInUser from './RequireSignedInUser'

const debug = zionDebug('frontier:cra:example')
const WagonWheelControl = React.lazy(() => import('./WagonWheelControl'))
const ArtifactsViewer = React.lazy(() => import('./ArtifactsViewer'))

const wagonButtonCss = css`
  cursor: pointer;
  border: none;
  background-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -html-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  &:focus {
    outline: none;
    background-color: ${colors.gray02};
  }
`

const ComponentExamples = () => {
  // Initiate state variables and hooks
  const atWidth = useContainerWidth()
  const overlay = useOverlay({})
  const [wheelColor, setWheelColor] = React.useState(colors.gray100)
  const [wheelSpeed, setWheelSpeed] = React.useState('0s')

  const handleWheelSpeedChange = React.useCallback(
    (speed) => {
      debug(`changing wheel animation speed: ${speed}`)
      setWheelSpeed(speed)
    },
    [setWheelSpeed]
  )

  const handleWheelColorChange = React.useCallback(
    (color) => {
      debug(`changing wheel color: ${color}`)
      setWheelColor(color)
    },
    [setWheelColor]
  )

  return (
    <>
      <LayoutBand minHeight={420}>
        <Separator />
        <ErrorBoundary>
          <Tabs color="green" fullWidth>
            <Tab title="Dynamic Rendering">
              <Separator size="md" />
              <Grid>
                <div columns={atWidth({ lg: 6 })}>
                  <H3 size="H4">
                    Dynamic Wagon Wheel
                    <Subheading>
                      We can receive information from the user and dynamically update the page based on their inputs.
                    </Subheading>
                  </H3>
                  <Separator />
                  <Paragraph size="sm">
                    Click on the Wagon Wheel to customize it&apos;s color and rotation. This example can help you learn
                    how to receive inputs from the user and update the page dynamically.
                  </Paragraph>
                </div>
                <button
                  columns={atWidth({ lg: 6 })}
                  aria-label="Configure wagon wheel"
                  css={wagonButtonCss}
                  type="button"
                  tabIndex={0}
                  onClick={overlay.handleClick}
                >
                  <WagonWheel
                    alt="Wagon Wheel"
                    color={wheelColor}
                    animationDuration={wheelSpeed}
                    handleClick={overlay.handleClick}
                  />
                </button>
              </Grid>
              {/* Overlay */}
              <DialogOverlay title="Wagon Wheel Controls" {...overlay}>
                <Suspense
                  fallback={
                    <Row alignX="center">
                      <NoticeLoading size="md" />
                    </Row>
                  }
                >
                  <WagonWheelControl
                    color={wheelColor}
                    animationDuration={wheelSpeed}
                    handleColorChange={handleWheelColorChange}
                    handleAnimationDurationChange={handleWheelSpeedChange}
                  />
                </Suspense>
              </DialogOverlay>
            </Tab>
            <Tab title="Zion Form">
              <Separator size="md" />
              <PurposeStatementGenerator />
            </Tab>
            <Tab title="Photo Display">
              <Separator size="md" />
              <React.Suspense fallback={<Skeleton.Image height={250} />}>
                <RequireSignedInUser
                  Component={ArtifactsViewer}
                  fallback={
                    <LayoutBand minHeight={300} color={colors.green02} alignY="middle">
                      <Separator size="xxs" />
                      <Paragraph size="sm" centered>
                        We really want to show you some pictures of your ancestors but you must sign in first.
                      </Paragraph>
                    </LayoutBand>
                  }
                />
              </React.Suspense>
            </Tab>
          </Tabs>
        </ErrorBoundary>
      </LayoutBand>

      <ResponsiveDebug />
    </>
  )
}

export default ComponentExamples
