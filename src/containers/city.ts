import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {focusCity} from '../model/city'
import {CitiesUl} from '../components/city'
import {Root} from '../store'
import {selectCity} from '../selectors'

export const Cities = connect(
  (root: Root) => ({
    cities: root.city.cities,
    focusedCity: selectCity(root)
  }),
  dispatch =>
    bindActionCreators(
      {
        onChangeFocus: focusCity
      },
      dispatch
    )
)(CitiesUl)
