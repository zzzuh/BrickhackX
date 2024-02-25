import { State } from 'country-state-city';
import Dropdown from './Dropdown';

const StateComponent = ({countryCode = 'US'}) => {
    const data = State.getStatesOfCountry(countryCode).map(state => ({
        value: state.name,
        displayValue: `${state.name} - ${state.isoCode}`
    }))
	return <Dropdown className="flex align-middle justify-center" options={data}></Dropdown>
}

export default StateComponent;