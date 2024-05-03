import React from 'react'

import HomePageComponent from './HomePage'
import WagonWheelComponent from './WagonWheel'
import PurposeStatementGeneratorComponent from './PurposeStatementGenerator'

export default {
  title: 'Home Page',
}

export const HomePage = () => <HomePageComponent />

export const PurposeStatementGenerator = () => <PurposeStatementGeneratorComponent />

export const WagonWheel = (args) => <WagonWheelComponent {...args} />

WagonWheel.args = {
  animationDuration: '30s',
  color: '#000',
}
