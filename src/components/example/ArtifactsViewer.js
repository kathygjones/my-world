import React from 'react'
import { colors, LayoutBand, Skeleton, Image } from '@fs/zion-ui'
import { css } from '@emotion/core'
import { useZionAxios } from '@fs/zion-axios'
import { HorizontalScroller } from '@fs/zion-ui/quarks-authorized-use-only'
import Banner from './Banner'

const artifactsCss = css`
  margin: 0 -24px;
`
const artifactsViewSkeletonCss = css`
  margin: 0 -24px;
  display: flex;
  & > div {
    margin-right: 8px;
  }
`

const ArtifactsViewSkeleton = () => {
  return (
    <div css={artifactsViewSkeletonCss}>
      <Skeleton.Image height={250} width={183} />
      <Skeleton.Image height={250} width={186} />
      <Skeleton.Image height={250} width={250} />
      <Skeleton.Image height={250} width={181} />
      <Skeleton.Image height={250} width={373} />
      <Skeleton.Image height={250} width={200} />
    </div>
  )
}

const ArtifactsViewer = ({ user: { cisId } }) => {
  const artifactsUrl = `/service/memories/presentation/patrons/${cisId}/artifacts`
  // Use our custom hook
  const [{ data, error, loading }] = useZionAxios(artifactsUrl)

  function renderError() {
    return (
      <Banner
        color={colors.danger20}
        message="Sorry! Something went wrong and we couldn't display your ancesters' photos."
      />
    )
  }

  function renderArtifacts() {
    if (data?.artifact?.length > 0) {
      const photos = data.artifact
        // Filtering to only find images (not PDF documents)
        ?.filter((item) => item.category === 'IMAGE')
        // only get the first 12 images in the list
        .slice(0, 12)
        .map((item) => ({ url: item.url, alt: item.title || item.originalFilename }))
      return (
        <div css={artifactsCss}>
          <PhotoViewer photos={photos} />
        </div>
      )
    }
    return renderNoArtifacts()
  }

  function renderNoArtifacts() {
    return (
      <Banner
        color={colors.yellow20}
        message="Sorry but your ancestors must have been camera shy, we couldn't find any photos"
      />
    )
  }

  // use-axios-client provides these states for us:
  return (
    <LayoutBand>
      {loading && (!data || !data.length) && <ArtifactsViewSkeleton />}
      {error && renderError()}
      {data && renderArtifacts()}
    </LayoutBand>
  )
}

const photoViewerCss = css`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
`

const PhotoViewer = ({ photos, height = 250 }) => {
  return (
    <HorizontalScroller
      buttonColor="gray"
      buttonEmphasis="high"
      buttonSize="md"
      css={photoViewerCss}
      style={{ height }}
    >
      {photos.map((photo) => (
        <Image noCrop src={photo.url} alt={photo.alt} height={height} width="auto" />
      ))}
    </HorizontalScroller>
  )
}

export default React.memo(ArtifactsViewer)
