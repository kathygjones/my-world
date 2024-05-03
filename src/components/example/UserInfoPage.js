import React from 'react'
import { useUser } from '@fs/zion-user'
import { useTranslation } from 'react-i18next'
import { parse, format } from '@fs/zion-locale/date-fns'
import {
  colors,
  Row,
  Grid,
  LayoutBand,
  List,
  ListItem,
  PersonBlock,
  Separator,
  ExpandableListItem,
  H1,
  Image,
  Subheading,
} from '@fs/zion-ui'
import { NoticeLoading } from '@fs/zion-icon'
import ErrorBoundary from '@fs/zion-error-boundary'
import usePersonDetails from './personDetailsService'
import usePersonPortrait from './portraitService'
import ResponsiveDebug from './ResponsiveDebug'

import leaf from './leaf1.svg'

export default function UserInfoPage() {
  const [t] = useTranslation()
  const user = useUser()

  if (!user.signedIn) return <NoticeLoading />

  return (
    <>
      <LayoutBand marginY="lg" color={colors.green02}>
        <Row alignY="bottom">
          <Image src={leaf} />
          <H1 size="H3">
            User Data
            <Subheading>Receiving and displaying user data</Subheading>
          </H1>
        </Row>
      </LayoutBand>

      <LayoutBand marginY="lg">
        <H1 size="H3">{t('welcome.message.name', 'Welcome to FamilySearch, {name}', { name: user.displayName })}</H1>
        <Separator size="lg" />

        <ErrorBoundary>
          <UserInfo user={user} />
        </ErrorBoundary>
        <ResponsiveDebug />
      </LayoutBand>
    </>
  )
}

const UserInfo = React.memo(({ user }) => {
  const [{ portraitUrl }] = usePersonPortrait(user.personId)
  const [{ status: detailsStatus, details }] = usePersonDetails(user.personId)

  const fallback = (
    <Row alignX="center">
      <NoticeLoading size="lg" />
    </Row>
  )
  if (!(user && detailsStatus)) return fallback
  if (detailsStatus === 'FETCHING' || !details) return fallback

  const sex = user && user.gender ? user.gender.toLowerCase() : 'unknown'
  let birthDate
  try {
    birthDate = details.summary.lifespanBegin.date.original
    const parsedDate = parse(details.summary.lifespanBegin.date.formal, '+yyyy-MM-dd', new Date())
    birthDate = format(parsedDate, 'PPPP')
  } catch (err) {
    // console.warn('invalid birth date', err)
  }

  return (
    <Grid>
      <PersonBlock
        size="lg"
        avatarProps={{
          src: portraitUrl || '',
          sex,
        }}
        name={user.displayName}
        details={`${user.personId}`}
      />
      <List>
        <ExpandableListItem primaryText="Identification">
          <ListItem primaryText="CIS" endElement={<ListItem.MetaText text={user.cisId} />} />
          <ListItem primaryText="PID" endElement={<ListItem.MetaText text={user.personId} />} />
          <ListItem primaryText="Family Name" endElement={<ListItem.MetaText text={details.familyName} />} />
          <ListItem primaryText="Full Name" endElement={<ListItem.MetaText text={details.fullName} />} />
          <ListItem primaryText="Display Name" endElement={<ListItem.MetaText text={user.displayName} />} />
          <ListItem primaryText="Contact Name" endElement={<ListItem.MetaText text={user.contactName} />} />
          <ListItem primaryText="Gender" endElement={<ListItem.MetaText text={user.gender} />} />
        </ExpandableListItem>
        <ExpandableListItem primaryText="Birth">
          <ListItem primaryText="Lifespan" endElement={<ListItem.MetaText text={details.summary.lifespan} />} />
          <ListItem primaryText="Date of Birth" endElement={<ListItem.MetaText text={birthDate} />} />
          <ListItem
            primaryText="Place of Birth"
            endElement={
              <ListItem.MetaText text={details.summary.lifespanBegin && details.summary.lifespanBegin.place.original} />
            }
          />
        </ExpandableListItem>
        <ExpandableListItem primaryText="Stats">
          <ListItem
            primaryText="Contributor Count"
            endElement={<ListItem.MetaText text={details.personStats.contributorCount} />}
          />
          <ListItem
            primaryText="User Change Count"
            endElement={<ListItem.MetaText text={details.personStats.userChangeCount} />}
          />
        </ExpandableListItem>
      </List>
    </Grid>
  )
})
