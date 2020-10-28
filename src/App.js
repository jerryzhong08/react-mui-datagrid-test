import React from 'react';

import { columns, columnsHidden, groupColumns } from './data/mock_columns';
import { users } from './data/mock_users';
import { investments } from './data/mock_pie_charts';

import { Datagrid } from 'react-mui-datagrid';

import SampleAvatar0 from './images/SampleAvatar0.png';
import SampleAvatar1 from './images/SampleAvatar1.png';
import SampleAvatar2 from './images/SampleAvatar2.png';
import SampleAvatar3 from './images/SampleAvatar3.png';
import SampleAvatar4 from './images/SampleAvatar4.png';
import SampleAvatar5 from './images/SampleAvatar5.png';
import SampleAvatar6 from './images/SampleAvatar6.png';
import SampleAvatar7 from './images/SampleAvatar7.png';
import SampleAvatar8 from './images/SampleAvatar8.png';
import SampleAvatar9 from './images/SampleAvatar9.png';
import SampleAvatar10 from './images/SampleAvatar10.png';
import SampleAvatar11 from './images/SampleAvatar11.png';
import SampleAvatar12 from './images/SampleAvatar12.png';

export default function App() {

  const rowDefault = {
    suffix: 'Mr.',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    gender: 'Male',
    roles: ['Supplier'],
    contacts: [],
    country: '',
    city: '',
    currency: 'USD',
    asset: 0,
    debt: 0,
    netAsset: 0,
  };

  const avatars = {
    avatar0: SampleAvatar0,
    avatar1: SampleAvatar1,
    avatar2: SampleAvatar2,
    avatar3: SampleAvatar3,
    avatar4: SampleAvatar4,
    avatar5: SampleAvatar5,
    avatar6: SampleAvatar6,
    avatar7: SampleAvatar7,
    avatar8: SampleAvatar8,
    avatar9: SampleAvatar9,
    avatar10: SampleAvatar10,
    avatar11: SampleAvatar11,
    avatar12: SampleAvatar12,
  };

  // s_users store the data and are affected by user updates (e.g. delete, edit)
  const [s_users, setUsers] = React.useState(users.slice(0, 1000));
  // const [s_users, setUsers] = React.useState([]);
  // s_rows reflect data transformation made to the data (e.g. currency convert)
  const [s_rows, setRows] = React.useState(s_users);
  const [s_columnInfo, setColumnInfo] = React.useState({
    columns: columns,
    columnsHidden: columnsHidden,
    // columnsHidden: [],
    // groupColumns: groupColumns,
    groupColumns: [],
  });

  const handleSettingsUpdate = (columns, columnsHidden, groupColumns) => {
    setColumnInfo({
      columns: columns,
      columnsHidden: columnsHidden,
      groupColumns: groupColumns,
    });
  }
  
  const handleUserAdd = (rowNew) => {
    const userNew = Object.keys(s_columnInfo.columns).reduce((acc, key) => {
      acc[key] = rowNew[key];
      return acc;
    }, { mutable: true });
    const usersNew = [userNew, ...s_users];
    setUsers(usersNew);
    setRows(usersNew);
  }

  const handleUserUpdate = (rowNew) => {
    const indexFound = s_users.findIndex(user => user.id === rowNew.id);
    if (indexFound !== -1) {
      const userNew = Object.keys(s_columnInfo.columns).reduce((acc, key) => {
        acc[key] = rowNew[key];
        return acc;
      }, { mutable: true });
      const usersNew = [
        ...s_users.slice(0, indexFound),
        userNew,
        ...s_users.slice(indexFound + 1)
      ];
      setUsers(usersNew);
      setRows(usersNew);
    }
  }

  const handleUserDelete = (rowId) => {
    const usersNew = s_users.filter(user => user.id !== rowId);
    setUsers(usersNew);
    setRows(usersNew);
  }

  const handleRowTransform = (rowNew) => {
    const indexFound = s_rows.findIndex(row => row.id === rowNew.id);
    if (indexFound !== -1) {
      setRows([
        ...s_rows.slice(0, indexFound),
        rowNew,
        ...s_rows.slice(indexFound + 1)
      ]);
    }
  };

  // eliminate all date transformation made to the data
  const handleRowRefresh = () => {
    setRows(s_users);
  };

  const currencies = {
    USD: 1,
    AUD: 0.71,
    BRL: 0.18,
    CZK: 0.043,
    DKK: 0.16,
    ECD: 0.37,
    EUR: 1.17,
    GBP: 1.28,
    HKD: 0.13,
    JPY: 0.0095,
    LYD: 0.73,
    RMB: 0.15,
    RUB: 0.013,
    TVD: 0.74,
  };

  const currencyConverter = {
    convert(sourceAmount, source, target) {
      if (source === target) return sourceAmount;
      return (sourceAmount * currencies[source] / currencies[target]).toFixed(2) * 1.0;
    },
    getOptionList() { return Object.keys(currencies); },
    handleConvert(event, row) {
      const assetNew = this.convert(row.asset, row.currency, event.target.value);
      const debtNew = this.convert(row.debt, row.currency, event.target.value);
      const netAssetNew = this.convert(row.netAsset, row.currency, event.target.value);
      this.callback({ ...row, 
        currency : event.target.value,
        asset: assetNew,
        debt: debtNew,
        netAsset: netAssetNew,
      });
    },
  };
  currencyConverter.callback = handleRowTransform;
  s_columnInfo.columns.currency.converter = currencyConverter;

  const regionSelector = {
    regions: {
      'USA': ['Atlanta', 'Boston', 'Dallas', 'Denver', 'Los Angales', 'New York'],
      'Australia': ['Melbourne', 'Sydney'],
      'Brazil': ['Rio de', 'Sao Paulo'],
      'Switzerland': ['Basel', 'Geneva', 'Zurich'],
      'China': ['Beijing', 'Shanghai', 'Hongkong'],
      'Czechia': ['Brno', 'Prague'],
      'German': ['Berlin', 'Frankfurt', 'Munich'],
      'Spain': ['Barcelona', 'Granada', 'Madrid'],
      'France': ['Marseille', 'Nice', 'Paris'],
      'Greenland': ['Nuuk','Sisimiut'],
      'Italy': ['Florence', 'Milan', 'Rome'],
      'Grenada': ['Bogles', 'Tivoli'],
      'Japan': ['Kyoto', 'Osaka', 'Tokyo'],
      'Libya': ['Benghzai', 'Tripoli'],
      'Russia': ['Moscow', 'Saint Petersburg'],
      'England': ['Liverpool', 'London', 'Manchester'],
    },
    currentKey: null,
    getKeys() { return Object.keys(this.regions); },
    setKey(key) { this.currentKey = key; },
    getValues() { return this.currentKey ? this.regions[this.currentKey] : []; },
  };
  
  const countrySelector = {
    getOptionList() { return regionSelector.getKeys(); },
    handleSelect(value) { regionSelector.setKey(value); },
  }
  s_columnInfo.columns.country.selector = countrySelector;

  const citySelector = {
    getOptionList() { return regionSelector.getValues(); }
  }
  s_columnInfo.columns.city.selector = citySelector;

  const suffixSelector = {
    getOptionList() { return ['Mr.', 'Mrs.']; },
  };
  s_columnInfo.columns.suffix.selector = suffixSelector;

  const genderSelector = {
    getOptionList() { return ['Male', 'Female', 'Other']; },
  };
  s_columnInfo.columns.gender.selector = genderSelector;

  const currencySelector = {
    getOptionList() { return Object.keys(currencies); },
  };
  s_columnInfo.columns.currency.selector = currencySelector;

  const rolesSelector = {
    getOptionList() { return ['Supplier', 'Consumer', 'Broker']; },
  };
  s_columnInfo.columns.roles.selector = rolesSelector;

  const contactsSelector = {
    getOptionList() { return ['Mobile', 'Office', 'Fax']; },
  };
  s_columnInfo.columns.contacts.selector = contactsSelector;

  return (
    <div style={{ margin: '1rem' }}>
      <Datagrid
        meta={{
          facet: 'classic',
          size: 'regular',
          context: 'user',
          title: 'New Users',
          desc: 'users joined since start of year',
          width: '98vw',
          height: '65vh',
        }}
        columns={s_columnInfo.columns}
        columnsHidden={s_columnInfo.columnsHidden}
        groupColumns={s_columnInfo.groupColumns}
        defaultRow={rowDefault}
        // defaultRow={{}}
        rows={s_rows}
        pieCharts={{ 'investments': investments }}
        images={{ 'avatar': avatars }}
        // rowsPerPageOptions={[15, 25, 50]}
        useVirtualization={true}
        showStats={'top'}
        onRowUpdated={handleUserUpdate}
        onRowDeleted={handleUserDelete}
        onSettingsUpdated={handleSettingsUpdate}
        onRowAdded={handleUserAdd}
        onRowRefresh={handleRowRefresh}
        enableExport={true}
        showTopToolbar={true}
        // key={'users'}
      />
    </div>
  );
}

// export default App
